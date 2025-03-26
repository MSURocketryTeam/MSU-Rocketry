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
        <div className="stage-container">
            <div className="stage-title">
                Stage of Flight
            </div>
            <ul className="data">
                <ol>
                    Lift Off: <span className="time">{liftOffTime ?? "0.00.00"}</span>
                </ol>
                <ol>
                    Burn Out: <span className="time">{burnOutTime ?? "0.00.00"}</span>
                </ol>
                <ol>
                    Apogee Main Parachute: <span className="time">{apogeeParachuteTime ?? "0.00.00"}</span>
                </ol>
                <ol>
                    Air Brake: <span className="time">{airBrakeTime ?? "0.00.00"}</span>
                </ol>
                <ol>
                    Drogue Parachute: <span className="time">{drogueParachuteTime ?? "0.00.00"}</span>
                </ol>
                <ol>
                    Landed: <span className='time'>{landedTime ?? "0.00.00"}</span>
                </ol>
            </ul>
        </div>
    );
};