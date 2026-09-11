import cv2
import numpy as np
from tensorflow import keras
from tensorflow.keras.utils import img_to_array, array_to_img
from fastapi import FastAPI, Depends, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from collections import Counter
import models, schemas, utils
from database import engine, get_db
from auth import router as auth_router, get_current_user, create_access_token


models.Base.metadata.create_all(bind=engine)
app = FastAPI()

MODEL_PATH = "models/best.keras"
cnn_model = keras.models.load_model(MODEL_PATH)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)

from fastapi import status

@app.post("/user/signup")
def signup(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.username == user.username).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    hashed_pw = utils.hash_password(user.password)
    new_user = models.User(
        full_name=user.fullName,
        username=user.username,
        email=user.email,
        hashed_password=hashed_pw,
        phone=user.phone
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    access_token = create_access_token(data={"sub": new_user.username})

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": schemas.UserOut.from_orm(new_user)
    }


@app.get("/me", response_model=schemas.UserOut)
def read_current_user(current_user: models.User = Depends(get_current_user)):
    return current_user


classes = ['Arborio', 'Basmati', 'Ipsala', 'Jasmine', 'Karacadag']
IMG_SIZE = 224
VALUE = 0

def segment_grains_array(img):
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    _, thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)
    kernel = np.ones((3,3), np.uint8)
    opening = cv2.morphologyEx(thresh, cv2.MORPH_OPEN, kernel, iterations=2)
    contours, _ = cv2.findContours(opening, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    grain_images, boxes = [], []
    for cnt in contours:
        x, y, w, h = cv2.boundingRect(cnt)
        if w > 10 and h > 10:
            margin = max(2, int(0.05 * max(w, h)))
            x0 = max(x - margin, 0)
            y0 = max(y - margin, 0)
            x1 = min(x + w + margin, img.shape[1])
            y1 = min(y + h + margin, img.shape[0])
            grain = img[y0:y1, x0:x1]
            grain_images.append(grain)
            boxes.append((x0, y0, x1 - x0, y1 - y0))
    return grain_images, boxes, img

def preprocess_like_one(crop_bgr, img_size=224, value=0):
    rgb = cv2.cvtColor(crop_bgr, cv2.COLOR_BGR2RGB)
    h, w = rgb.shape[:2]
    if h != w:
        if h > w:
            pad = h - w
            left, right = pad // 2, pad - pad // 2
            rgb = cv2.copyMakeBorder(rgb, 0, 0, left, right, cv2.BORDER_CONSTANT, value=(value, value, value))
        else:
            pad = w - h
            top, bottom = pad // 2, pad - pad // 2
            rgb = cv2.copyMakeBorder(rgb, top, bottom, 0, 0, cv2.BORDER_CONSTANT, value=(value, value, value))

    pil_img = array_to_img(rgb)
    pil_resized = pil_img.resize((img_size, img_size))
    arr = img_to_array(pil_resized).astype("float32") / 255.0
    return arr

def predict_each(crop_img):
    base = preprocess_like_one(crop_img, IMG_SIZE, VALUE)
    augmentation = [
        base,
        np.fliplr(base),
        np.flipud(base),
        np.rot90(base, 1),
        np.rot90(base, 2),
        np.rot90(base, 3),
    ]
    batch = np.stack(augmentation, axis=0)
    probs_batch = cnn_model.predict(batch, verbose=0)

    aug_max_class = np.argmax(probs_batch, axis=1)
    aug_max_score = probs_batch[np.arange(len(augmentation)), aug_max_class]
    best_aug_idx = int(np.argmax(aug_max_score))
    best_class_idx = int(aug_max_class[best_aug_idx])
    best_score = float(aug_max_score[best_aug_idx])

    return classes[best_class_idx], best_score

@app.post("/analyse")
async def analyse_image(image: UploadFile = File(...)):
    contents = await image.read()
    np_arr = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

    grains, boxes, original_img = segment_grains_array(img)

    predictions, confidences = [], []
    for g in grains:
        label, conf = predict_each(g)
        predictions.append(label)
        confidences.append(conf)

    counts = Counter(predictions)
    total = sum(counts.values()) if counts else 1

    purity_per_class = {
    cls: (count / total) * 100
    for cls, count in counts.items()
    }
    main_class, main_count = counts.most_common(1)[0]

    return {
    "class_counts": dict(counts),
    "purity_per_class": purity_per_class,
    "main_class": main_class,
    "predictions": predictions,
    "confidences": confidences
    }

    
