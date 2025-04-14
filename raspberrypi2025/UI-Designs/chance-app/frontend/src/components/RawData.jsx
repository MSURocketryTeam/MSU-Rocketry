import React from "react";
import "./RawData.css";

export const RawData = ({ data }) => {
  return (
    <div className="raw-data-container">
      <h1>Raw Data</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Acceleration X</th>
              <th>Acceleration Y</th>
              <th>Acceleration Z</th>
              <th>Altitude</th>
              <th>Temperature</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.accx}</td>
                <td>{row.accy}</td>
                <td>{row.accz}</td>
                <td>{row.altitude}</td>
                <td>{row.temperature}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RawData;