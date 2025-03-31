import React from "react";

import "./Temp-Force.css";

export const Temperature = (temp) => {
    return (
        <div className="panel">
            <h2>Temp: 0.00</h2>
          </div>
    );
};

export const Force = (force) => {
    return (
        <div className="panel">
            <h2>G-Force: 0.00</h2>
          </div>
    );
};