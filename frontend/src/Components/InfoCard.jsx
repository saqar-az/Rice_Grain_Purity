import PropTypes from "prop-types";
import "../styles/Components/InfoCard.css";
import userIcon from "../assets/icon.png";
import { useNavigate } from "react-router-dom";

const InfoCard = ({ image, name, username, phone, email }) => {
  const navigate = useNavigate();

  const goToHomePage = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="user-info"> 
      <div className="user-side-card">
        <div
          className="user-image"
          style={{ backgroundImage: `url(${image})` }}
        ></div>

        <div className="user-details">
          <div className="user-details-text">Name: {name}</div>
          <div className="user-details-text">Username: {username}</div>
          <div className="user-details-text">Phone: {phone || "None"}</div>
          <div className="user-details-text">Email: {email}</div>
        </div>

        <div className="buttons">
          <div className="tab" onClick={goToHomePage}>
            <div className="tab-bg"></div>
            <div className="tab-content">
              <div
                className="tab-icon"
                style={{ backgroundImage: `url(${userIcon})` }}
              ></div>
              <div className="tab-label">Sign Out</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

InfoCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  phone: PropTypes.string,
  email: PropTypes.string.isRequired,
};

export default InfoCard;
