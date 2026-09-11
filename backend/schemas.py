from pydantic import BaseModel, ConfigDict, EmailStr

class UserCreate(BaseModel):
    fullName: str
    username: str
    email: EmailStr
    password: str
    phone: str | None = None

class UserOut(BaseModel):
    id: int
    full_name: str
    username: str
    email: EmailStr
    phone: str | None

    model_config = ConfigDict(from_attributes=True)
