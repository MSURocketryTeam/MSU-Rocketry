import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { Sensor } from "./components/Sensor.jsx";
import logo from "./images/logo-full.png";


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
        <div className="sidebar">
          <img src={logo} alt="logo"/>
          <h1>MSU Rocketry</h1>
          <div className="sidebar-links">
            <a href="#">Home</a>
            <a href="#">Sensor Data</a>
            <a href="#">Graphs</a>
            <a href="#">Raw Data</a>
          </div>
        </div>
        <div className="data-container">
          <div className="data">
            <Sensor title="Acceleration X" data={sensorData.accx} />
            <Sensor title="Acceleration Y" data={sensorData.accy} />
            <Sensor title="Acceleration Z" data={sensorData.accz} />
            <Sensor title="Altitude" data={sensorData.altitude} />
            <Sensor title="Temperature" data={sensorData.temperature} />
          </div>
          <div className="stages-graphs">
            <div className="stages">

            </div>
            <div className="graphs-container">
              <div className="graphs">

              </div>
              <div className="graphs">

              </div>
            </div>  
          </div>
        </div>
      </div>
    </>
  );
}

export default App;


