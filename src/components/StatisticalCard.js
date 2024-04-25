import React from 'react';
import './StatisticalCard.css';

const StatisticalCard = ({ title, value, className, backgroundColor }) => {
  const formattedValue = (value / 1000000).toFixed(2) + 'M';
  

  return (
    <div className={`statistical-card ${className}`} style={{ backgroundColor: backgroundColor }}>
      <h3>{title}</h3>
      <div>
      <p>{formattedValue}</p>
      </div>
    </div>
  );
};

export default StatisticalCard;
