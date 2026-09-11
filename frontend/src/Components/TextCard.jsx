import "../styles/Components/TextCard.css";

const TextCard = ({ image, title, description }) => {
  return (
    <div className="text-card-card">
      <div
        className="rectangle68"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className="text-card-content">
        <div className="text-card-card-title">{title}</div>
        <div className="text-card-card-subtitle">{description}</div>
      </div>
    </div>
  );
};

export default TextCard;
