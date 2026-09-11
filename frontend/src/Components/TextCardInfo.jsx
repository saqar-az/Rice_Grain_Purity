import "../styles/Components/TextCardInfo.css";

const TextCardInfo = ({ picture, title, text }) => {
  return (
    <div className="at-text-container">
      <div className="at-header">
        <div 
          className="at-rectangle69" 
          style={{ backgroundImage: `url(${picture})` }} 
        ></div>
        <div className="at-rectangle70"></div>
        <div className="at-title">{title}</div>
      </div>
      <div className="at-body">
        {text.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
};

export default TextCardInfo;

