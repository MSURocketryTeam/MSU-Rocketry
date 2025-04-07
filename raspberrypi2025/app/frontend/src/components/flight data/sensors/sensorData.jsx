import React from "react";

import "./sensorData.css";

const sensorFields = [
    { label: "Acceleration X", key: "accx" },
    { label: "Acceleration Y", key: "accy" },
    { label: "Acceleration Z", key: "accz" },
    { label: "Altitude", key: "altitude" },
    { label: "Temperature", key: "temperature" },
    { label: "Longitude", key: "longitude" },
    { label: "Latitude", key: "latitude" },
    { label: "G Force", key: "gForce" },
  ];

export const SensorData = ({
    imgSrc,
    imgAlt,
    title,
    description,
    buttonText,
    link,
    data,
  
  }) => {
    return (
      <div className="outer-box-sensor">
        {sensorFields.map(({ label, key }, index) => (
        <div className="sensor-row" key={index}>
          <span className="sensor-label">{label}:</span>
          <span className="sensor-value">{data[key] ?? "X"}</span>
        </div>
      ))}
      </div>
    );
  };