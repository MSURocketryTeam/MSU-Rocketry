import React from "react";

import "./Stages.css";

export const Stages = ({ 
    liftOffTime,
    burnOutTime,
    apogeeParachuteTime,
    airBrakeTime,
    drogueParachuteTime,
    landedTime,
 }) => {
    return (
      <div className="row">
        <div className="panel">
          <h2>Stages of Flight</h2>
          <div className="data-row">
            <span>Lift Off:</span>
            {liftOffTime ? <span className="green">liftOffTime</span> : <span className="red">0.00.00</span>}
          </div>
          <div className="data-row">
            <span>Burn Out:</span>
            {burnOutTime ? <span className="green">burnOutTime</span> : <span className="red">0.00.00</span>}
          </div>
          <div className="data-row">
            <span>Apogee Main Parachute:</span>
            {apogeeParachuteTime ? <span className="green">agogeeParachuteTime</span> : <span className="red">0.00.00</span>}
          </div>
          <div className="data-row">
            <span>Air Brake:</span>
            {airBrakeTime ? <span className="green">airBrakeTime</span> : <span className="red">0.00.00</span>}
          </div>
          <div className="data-row">
            <span>Drogue Parachute:</span>
            {drogueParachuteTime ? <span className="green">drogueParachuteTime</span> : <span className="red">0.00.00</span>}
          </div>
          <div className="data-row">
            <span>Landed:</span>
            {landedTime ? <span className="green">landedTime</span> : <span className="red">0.00.00</span>}
          </div>
        </div>
      </div>
    );
};