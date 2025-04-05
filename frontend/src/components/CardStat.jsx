import React from "react";

const CardStat = ({ title, value, color }) => {
  return (
    <div className={`p-6 rounded-lg shadow-lg text-white ${color}`}>
      <h4 className="text-lg font-semibold">{title}</h4>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

export default CardStat;
