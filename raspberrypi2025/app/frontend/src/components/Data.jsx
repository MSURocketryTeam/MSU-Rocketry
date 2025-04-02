import React from "react";
import "./Data.css"; 



export const Data = ({ title, accX, accY, accZ, alt, temp }) => {

  
  return (
    
    <div className="container-data">
      <h1>{title}</h1>
      <div className="data-list-container">
        <ul className="data-list">
          <li className="data-row">{accX}</li>
          <li className="data-row">{accY}</li>
          <li className="data-row">{accZ}</li>
          <li className="data-row">{alt}</li>
          <li className="data-row">{temp}</li>
          <li className="data-row">{temp}</li>
          <li className="data-row">{temp}</li>
        </ul>
      </div>
    </div>
  );
};
