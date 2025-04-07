import React from "react";
import { SensorData } from "./sensors/sensorData.jsx";
import { FlightStages } from "./stages/flightStages.jsx";

import "./flightData.css";

export const FlightData = ({
    imgSrc,
    imgAlt,
    title,
    description,
    buttonText,
    link,
    data,
    onStart,
    simulatedData,
    startTime,

  }) => {
    return (
      <div className="outer-box">
        <div className="title-box">
          <div className="title-fd">
              <p>Flight Data</p>
            </div>
        </div>
        <SensorData data={data}/>
        <FlightStages onStart={onStart} simulatedData={simulatedData} startTime={startTime} data={data}/>
      </div>
    );
  };