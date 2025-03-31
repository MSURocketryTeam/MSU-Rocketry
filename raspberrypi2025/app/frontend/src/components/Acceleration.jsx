import React from "react";

import "./Acceleration.css";

export const Acceleration = (accX, accY, accZ) => {
    return (
        <div className="panel">
            <h2>Acceleration</h2>
            <div className="data-row">
              <span>X:</span>
              <span>0.00</span>
            </div>
            <div className="data-row">
              <span>Y:</span>
              <span>{accY ? accY : "0.00"}</span>
            </div>
            <div className="data-row">
              <span>Z:</span>
              <span>{accZ ? accZ : "0.00"}</span>
            </div>
          </div>
    );
};