import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { Data } from "./components/Data.jsx";
import { Stages } from "./components/Stages.jsx";
import { Graph } from "./components/Graph.jsx";

function App() {
  const [sensorData, setSensorData] = useState({
    accx: null,
    accy: null,
    accz: null,
    altitude: null,
    temperature: null
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5002/data");
        setSensorData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="container">
          <div className="container-raw-data">
            <Data title="Sensor Data" accX = {sensorData.accx ?? "Waiting..."} accY = {sensorData.accy ?? "Waiting..."} accZ = {sensorData.accz ?? "Waiting..."} alt = {sensorData.altitude ?? "Waiting..."} temp = {sensorData.temperature ?? "Waiting..."}/>
          </div>
          <Graph/>
          <Graph/>
          <div className="container-track-stages">
            <Stages data={sensorData} />
          </div>
          <Graph/>
          <Graph/>
      </div>
    </>
  );
}

export default App;


