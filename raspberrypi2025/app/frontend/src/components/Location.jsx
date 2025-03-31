import React from "react";

import "./Location.css";

export const Location = (altitude, longitude, latitude) => {
    return (
        <div className="panel">
            <h2>Location</h2>
            <div className="data-row">
              <span>Altitude</span>
              <span>0.00</span>
            </div>
            <div className="data-row">
              <span>Longitude</span>
              <span>0.00</span>
            </div>
            <div className="data-row">
              <span>latitude</span>
              <span>0.00</span>
            </div>
          </div>
    );
};