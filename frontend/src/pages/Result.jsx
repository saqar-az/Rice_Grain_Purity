import { useLocation, useNavigate } from "react-router-dom";
import "../styles/pages/TestPage.css";
import InfoCard from "../Components/InfoCard";
import coachImg from "../assets/icon.png";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import RiceCard from "../Components/RiceCard";

const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { result, userInfo } = location.state || {};

  const handleTryAgain = () => {
    navigate("/test");
  };

  return (
    <div className="api-panel">
      <Navbar />

      {userInfo && (
        <InfoCard
          image={coachImg}
          name={userInfo.full_name}
          username={userInfo.username}
          phone={userInfo.phone}
          email={userInfo.email}
        />
      )}

      <div className="api-cards">
        <div className="api-flex-cards">
          <button className="try-again-button" onClick={handleTryAgain}>
            <div className="try-again-button-text">Try Again</div>
          </button>
          <div className="output-container">
            {result && result.purity_per_class ? (
              Object.entries(result.purity_per_class).map(([type, purity]) => (
                <RiceCard
                  key={type}
                  type={type}
                  percentage={purity.toFixed(2)}
                  onMoreInfo={() => navigate(`/grain/${type}`)}
                />
              ))
            ) : (
              <div className="output-text">No result available</div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Result;
