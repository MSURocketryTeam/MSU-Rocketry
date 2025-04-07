import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { Card } from "./components/Card.jsx";
import { FlightData } from "./components/flight data/flightData.jsx";
import { Time } from "./components/time/time.jsx";
import { Graphs } from "./components/graphs/graphs.jsx";
import { Map } from "./components/map/map.jsx";



function App() {
  const [timerStarted, setTimerStarted] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [secondsSinceStart, setSecondsSinceStart] = useState(0);

  const [simulatedData, setSimulatedData] = useState({
    altitude: 0,
    acceleration: 0,
  });



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

  useEffect(() => {
    if (!startTime) return;

    const interval = setInterval(() => {
      const elapsed = Math.floor((new Date() - startTime) / 1000);
      setSecondsSinceStart(elapsed);
      setSimulatedData(simulateRocketFlight(elapsed));
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  const simulateRocketFlight = (t) => {

    const g = 9.81;
    const targetApogee = 3048;
    const thrust = 1000;
    const mass = 50;
    const a = (thrust / mass) - g;
    const tbSquared = (2 * targetApogee) / (a * (1 + a / g));
    const burnTime = Math.sqrt(tbSquared);
    const v_b = a * burnTime;
    const h_b = 0.5 * a * burnTime ** 2;
    const dt = t - burnTime;
    const burnout_height = h_b + v_b * dt - 0.5 * g * dt ** 2;

    let altitude = 0;
    let acceleration = 0;
    let velocity = 0;


    if (t <= burnTime) {
      altitude = 0.5 * a * t ** 2;
      acceleration = a;
      velocity = a * t;
    } else {
      const dt = t - burnTime;
      altitude = h_b + v_b * dt - 0.5 * g * dt ** 2;
      acceleration = -g;
      velocity = v_b - g * dt;
    }

    return {
      altitude: Math.max(0, altitude * 3.28084), 
      acceleration,
      velocity,
    };
  }

  const handleStart = () => {
    setStartTime(new Date());
    setTimerStarted(true);
  };

  return (
    <>
      <div className="title">
        <p>MSU Rocketry</p>
        </div>
      <div className="flight-data">
        <FlightData data={sensorData} onStart={handleStart} simulatedData={simulatedData}
        startTime={startTime}/>
      </div>
      <div className="time">
        <Time/>
      </div>
      <div className="graphs">
        <Graphs data={sensorData} isActive={timerStarted} 
        simulatedData={simulatedData}
        startTime={startTime}/>
      </div>
      <div className="map">
        <Map/>
      </div>
    </>
  );
}

export default App;
