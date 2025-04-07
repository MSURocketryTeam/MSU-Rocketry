import React, { useState, useEffect } from "react";

import "./flightStages.css";

const sensorFields = [
    "Armed",
    "Liftoff",
    "Burnout",
    "Apogee",
    "Main Deploy",
    "Descent",
    "Landed",
  ];

export const FlightStages = ({
    imgSrc,
    imgAlt,
    title,
    description,
    buttonText,
    link,
    onStart,
    simulatedData,
    data,
    startTime,
  }) => {


  const [elapsed, setElapsed] = useState("0:00:00");

  // update the timer every second when started
  useEffect(() => {
    if (!startTime) return;

    const interval = setInterval(() => {
      const now = new Date();
      const diff = Math.floor((now - startTime) / 1000); // in seconds

      const hrs = String(Math.floor(diff / 3600)).padStart(1, "0");
      const mins = String(Math.floor((diff % 3600) / 60)).padStart(2, "0");
      const secs = String(diff % 60).padStart(2, "0");

      setElapsed(`${hrs}:${mins}:${secs}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  const handleStart = () => {
    onStart();
  };

  const altitude = data.altitude ?? simulatedData.altitude ?? 0;
  const acceleration = data.acceleration ?? simulatedData.altitude ?? 0;


  let stage = "Armed";

  if (acceleration > 0) {
    stage = "Liftoff";
  } else if (acceleration < 0) {
    stage = "Burnout";
  } 


    return (
      <div className="outer-box-stages">
        {sensorFields.map((label, index) => (
       <div
       className={`flight-stage-row ${
         label === stage || sensorFields.indexOf(label) < sensorFields.indexOf(stage)
           ? "stage-reached"
           : ""
       }`}
       key={index}
     >
       <span className="stage-label">{label}:</span>
       <span className="time-value">
         {label === "Armed" ? elapsed : "0:00:00"}
       </span>
     </div>
   ))}
      <button className="start-button" onClick={handleStart}>
        Start Timer
      </button>
      </div>
    );
  };