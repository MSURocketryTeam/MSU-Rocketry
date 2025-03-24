import React from "react";

import "./Card.css";

export const Card = ({
  imgSrc,
  imgAlt,
  title,
  description,
  buttonText,
  link,
}) => {
  return (
    <div className="card-container">
      {title && <h2 className="card-title">{title}</h2>}
      {description && <p className="card-data">{description}</p>}
    </div>
  );
};