import "./prayer.css";

export const Prayer = ({ title, time, titleClass, timeClass }) => (
  <div className="prayer-container">
    <h2 className={titleClass}>{title}</h2>
    <p className={timeClass}>{time}</p>
  </div>
);