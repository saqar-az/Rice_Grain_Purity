import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/pages/TestPage.css";
import InfoCard from "../Components/InfoCard";
import coachImg from "../assets/icon.png";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const TestPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/"); 
      return;
    }

    fetch("http://localhost:8000/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user info");
        return res.json();
      })
      .then((data) => {
        setUserInfo(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        localStorage.removeItem("token");
        navigate("/");
      });
  }, [navigate]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleTryAgain = () => {
    setSelectedFile(null); 
  };

const handleAnalyse = async () => {
  if (!selectedFile) return;

  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("image", selectedFile);

  try {
    const response = await fetch("http://localhost:8000/analyse", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) throw new Error("Failed to analyse image");

    const result = await response.json();

    navigate("/result", { state: { result, userInfo } });
  } catch (err) {
    console.error(err);
  }
};

  return (
    <div className="api-panel">
      <Navbar />
      {loading ? (
        <div className="loading-message">Loading user info...</div>
      ) : (
        userInfo && (
          <InfoCard
            image={coachImg}
            name={userInfo.full_name}
            username={userInfo.username}
            phone={userInfo.phone}
            email={userInfo.email}
          />
        )
      )}

      <div className="api-cards">
        <div className="api-flex-cards">
          <button className="try-again-button" type="button" onClick={handleTryAgain}>
            <div className="try-again-button-text">Try Again</div>
          </button>
          <div className="upload">
            <div className="upload-container">
              <label htmlFor="file-upload" className="upload-label">
                {selectedFile ? selectedFile.name : "Click or drag a file here"}
              </label>
              <input
                id="file-upload"
                type="file"
                onChange={handleFileChange}
                className="upload-input"
              />
            </div>
          </div>
          <button className="analyse-button" type="button" onClick={handleAnalyse}>
            <div className="analyse-button-text">Analyse</div>
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TestPage;
