import React, { useState, useEffect, useRef } from "react";

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


  const [stageTimes, setStageTimes] = useState({});
  const [currentStage, setCurrentStage] = useState("Armed");
  const [apogeeReached, setApogeeReached] = useState(false);
  const previousAltitudeRef = useRef(null);

  const altitude = data.altitude ?? simulatedData.altitude ?? 0;
  const acceleration = data.acceleration ?? simulatedData.acceleration ?? 0;

  let newStage = "Armed";

  if (!startTime) {
    newStage = "Armed";
  } else if (!apogeeReached && acceleration > 1) {
    newStage = "Liftoff";
  } else if (!apogeeReached && acceleration < 0) {
    newStage = "Burnout";
  } else if (apogeeReached && altitude > 8000) {
    newStage = "Apogee";
  } else if (apogeeReached && altitude > 500) {
    newStage = "Descent";
  } else if (apogeeReached && altitude <= 500) {
    newStage = "Landed";
  }

  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!startTime) return;

    const interval = setInterval(() => {
      setTick((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  const getElapsedTime = (since) => {
    const elapsedSeconds = Math.floor((new Date() - since) / 1000);
    const hrs = String(Math.floor(elapsedSeconds / 3600)).padStart(1, "0");
    const mins = String(Math.floor((elapsedSeconds % 3600) / 60)).padStart(2, "0");
    const secs = String(elapsedSeconds % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  // update the timer every second when started
  useEffect(() => {
    if (!startTime) return;
  
    const now = new Date();
    const elapsedSeconds = Math.floor((now - startTime) / 1000);
  
    const hrs = String(Math.floor(elapsedSeconds / 3600)).padStart(1, "0");
    const mins = String(Math.floor((elapsedSeconds % 3600) / 60)).padStart(2, "0");
    const secs = String(elapsedSeconds % 60).padStart(2, "0");
    const elapsed = `${hrs}:${mins}:${secs}`;
  
    if (newStage !== currentStage) {
      setStageTimes((prev) => ({
        ...prev,
        [newStage]: getElapsedTime(startTime), // ⬅ use a helper
      }));
      setCurrentStage(newStage);
    }    
  }, [altitude, acceleration, apogeeReached, startTime, newStage, currentStage, tick]);
  const handleStart = () => {
    onStart();
  };


  useEffect(() => {
    const prev = previousAltitudeRef.current;

    if (
      prev != null &&
      altitude < prev &&
      !apogeeReached &&
      startTime // only after flight starts
    ) {
      console.log("Apogee detected at:", prev);
      setApogeeReached(true);
    }

    previousAltitudeRef.current = altitude;
  }, [altitude, apogeeReached, startTime]);


    return (
      <div className="outer-box-stages">
        {sensorFields.map((label, index) => (
       <div
       className={`flight-stage-row ${
        startTime &&
        (label === newStage ||
          sensorFields.indexOf(label) < sensorFields.indexOf(newStage))
          ? "stage-reached"
          : ""
      }`}
       key={index}
     >
       <span className="stage-label">{label}:</span>
       <span className="time-value">
        {(() => {
    const thisStageIndex = sensorFields.indexOf(label);
    const currentStageIndex = sensorFields.indexOf(currentStage);

    if (stageTimes[label]) {
      // ✅ Stage reached → show frozen time
      return stageTimes[label];
    } else if (
      startTime &&
      thisStageIndex === currentStageIndex + 1 // ⏱ Next stage
    ) {
      // ✅ Live count-up for the upcoming stage
      return getElapsedTime(startTime);
    } else {
      // ⏳ Future stage
      return "0:00:00";
    }
  })()}
      </span>
     </div>
   ))}
      <button className="start-button" onClick={handleStart}>
        Start Timer
      </button>
      </div>
    );
  };