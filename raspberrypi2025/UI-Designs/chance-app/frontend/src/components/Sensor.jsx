import React from "react";
import "./Sensor.css";



export const Sensor = ({title, data}) => {

  
  return (
    <div className="sensor-container">
        <h1>{title}</h1>
        <div className="sensor-data">
            <p>{data ?? "Waiting..."}</p>
        </div>
    </div>
  );
};
