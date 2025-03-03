import React from "react";
import "./card.css"; // Import CSS for styling

const Card = ({ children, className }) => {
  return <div className={`card ${className}`}>{children}</div>;
};

const CardContent = ({ children }) => {
  return <div className="card-content">{children}</div>;
};

export { Card, CardContent };
