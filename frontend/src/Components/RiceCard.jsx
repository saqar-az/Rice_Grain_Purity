import "../styles/Components/RiceCard.css";

const RiceCard = ({ type, percentage, onMoreInfo }) => {
  return (
    <div className="rice-card">
      <div className="rice-type">{type}</div>
      <div className="rice-percentage">{percentage}%</div>
      <button className="more-info-btn" onClick={onMoreInfo}>
        click for more info 
      </button>
    </div>
  );
};

export default RiceCard;
