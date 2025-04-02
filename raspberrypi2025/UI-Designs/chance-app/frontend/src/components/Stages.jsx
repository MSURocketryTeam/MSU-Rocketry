import React from "react";
import "./Stages.css";
import Clock from "./Clock.jsx";



export const Stages = ({data}) => {
  
  return (
    <div className="container-stages">
        <div className="stage-title">
          <h1>Stages of Flight</h1>
        </div>
        <div className="stages">
          <ul className="stages-list">
              <li>Staged</li>
              <li>Liftoff</li>
              <li>Air Brake Deployment</li>
              <li>Apogee</li>
              <li>Main Parachute Deployment</li>
              <li>Drogue Parachute Deployment</li>
              <li>Landed</li>
          </ul>
          <div className="clock-container">
          <ul className="clock-list">
              <Clock/>
              <Clock/>
              <Clock/>
              <Clock/>
              <Clock/>
              <Clock/>
              <Clock/>
          </ul>
          </div>
        </div>


    </div>

  );
};
