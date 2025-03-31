import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { Card } from "./components/Card.jsx";
import { Stages } from "./components/Stages.jsx";
import { Acceleration } from "./components/Acceleration.jsx";
import { Location } from "./components/Location.jsx";
import { Temperature, Force } from "./components/Temp-Force.jsx";

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
    <body>
      <div className="container">
        <Stages></Stages>

        <div className="row">
          <Acceleration></Acceleration>
          <Location></Location>
        </div>

        <div className="row">
          <Temperature></Temperature>
          <Force></Force>
        </div>
      </div>
    </body>
  );
}

export default App;

/*
 <div className="title">
        <h1>MSU Rocketry Ground Station</h1>
  </div>
  div className="data">
        <Card title="Acceleration X" description={sensorData.accx ?? "Loading..."} />
        <Card title="Acceleration Y" description={sensorData.accy ?? "Loading..."} />
        <Card title="Acceleration Z" description={sensorData.accz ?? "Loading..."} />
        <Card title="Altitude" description={sensorData.altitude ?? "Loading..."} />
        <Card title="Temperature" description={sensorData.temperature ?? "Loading..."} />
      </div>
 */
