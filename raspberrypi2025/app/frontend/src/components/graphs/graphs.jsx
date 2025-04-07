import React from "react";
import { LineChart } from "./altitudeGraph/altitudeGraph.jsx"

import "./graphs.css";

export const Graphs = ({
    imgSrc,
    imgAlt,
    title,
    description,
    buttonText,
    link,
    data,
    isActive,
    simulatedData,
    startTime,
  
  }) => {
    return (
      <div className="outer-box">
        <LineChart data={data} isActive={isActive} simulatedData={simulatedData} startTime={startTime}/>
      </div>
    );
  };