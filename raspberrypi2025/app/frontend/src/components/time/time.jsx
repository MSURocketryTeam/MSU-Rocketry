import React, { useState, useEffect } from "react";

import "./time.css";

export const Time = ({
    imgSrc,
    imgAlt,
    title,
    description,
    buttonText,
    link,
  
  }) => {
    const [time, setTime] = useState("");

    useEffect(() => {
      const updateTime = () => {
        const now = new Date();
        const militaryTime = now.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
        setTime(militaryTime);
      };
  
      updateTime(); // initial call
      const interval = setInterval(updateTime, 1000); // update every second
      return () => clearInterval(interval); // cleanup
    }, []);

    return (
      <div className="outer-box">
        <div className="inner-box">
           <h2 className="military-time">{time}</h2>
        </div>
      </div>
    );
  };