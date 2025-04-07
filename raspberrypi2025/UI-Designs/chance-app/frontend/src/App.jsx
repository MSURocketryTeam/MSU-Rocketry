import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./App.css";
import { Sensor } from "./components/Sensor.jsx";
import Graph from "./components/Graph.jsx";
import StageTracker from "./components/StageTracker.jsx";
import logo from "./images/logo-full.png";

function App() {
  const [sensorData, setSensorData] = useState({
    accx: null,
    accy: null,
    accz: null,
    altitude: null,
    temperature: null
  });

  const [currentStage, setCurrentStage] = useState('armed');
  const [maxAltitude, setMaxAltitude] = useState(0);
  const [previousAltitude, setPreviousAltitude] = useState(0);

  const [graphData, setGraphData] = useState({
    acceleration: {
      accx: [],
      accy: [],
      accz: []
    },
    altitude: []
  });

  const [timeLabels, setTimeLabels] = useState([]);

  const detectStage = useCallback((data) => {
    const accMagnitude = Math.sqrt(
      Math.pow(data.accx, 2) + 
      Math.pow(data.accy, 2) + 
      Math.pow(data.accz, 2)
    );

    // Update max altitude
    if (data.altitude > maxAltitude) {
      setMaxAltitude(data.altitude);
    }

    // Detect stage changes
    switch (currentStage) {
      case 'armed':
        if (accMagnitude > 2) { // Significant acceleration
          setCurrentStage('liftoff');
        }
        break;
      
      case 'liftoff':
        if (data.altitude > 1) { // Descending after initial climb
          setCurrentStage('airbrake');
        }
        break;
      
      case 'airbrake':
        if (data.altitude > 1) { // 80% of max altitude
          setCurrentStage('apogee');
        }
        break;
      
      case 'apogee':
        if (data.altitude > 1) { // 50% of max altitude
          setCurrentStage('drogue');
        }
        break;
      
      case 'drogue':
        if (data.altitude > 1) { // 20% of max altitude
          setCurrentStage('main');
        }
        break;
      
      case 'main':
        if (data.altitude > 1) { // Near ground and stable
          setCurrentStage('landed');
        }
        break;
    }

    setPreviousAltitude(data.altitude);
  }, [currentStage, maxAltitude, previousAltitude]);

  const updateGraphData = useCallback((newData) => {
    const currentTime = new Date().toLocaleTimeString();
    
    setTimeLabels(prev => {
      const newLabels = [...prev, currentTime];
      return newLabels.slice(-20);
    });
    
    setGraphData(prev => ({
      acceleration: {
        accx: [...prev.acceleration.accx, newData.accx].slice(-20),
        accy: [...prev.acceleration.accy, newData.accy].slice(-20),
        accz: [...prev.acceleration.accz, newData.accz].slice(-20)
      },
      altitude: [...prev.altitude, newData.altitude].slice(-20)
    }));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5002/data");
        setSensorData(res.data);
        detectStage(res.data);
        updateGraphData(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, [detectStage, updateGraphData]);

  return (
    <>
      <div className="container">
        <div className="sidebar">
          <img src={logo} alt="logo"/>
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
              <StageTracker currentStage={currentStage} />
            </div>
            <div className="graphs-container">
              <div className="graphs">
                <Graph 
                  title="Acceleration Over Time" 
                  datasets={[
                    {
                      label: "Acceleration X",
                      data: graphData.acceleration.accx,
                      borderColor: 'rgb(255, 99, 132)',
                      backgroundColor: 'rgba(255, 99, 132, 0.1)',
                      tension: 0.1,
                      fill: true
                    },
                    {
                      label: "Acceleration Y",
                      data: graphData.acceleration.accy,
                      borderColor: 'rgb(54, 162, 235)',
                      backgroundColor: 'rgba(54, 162, 235, 0.1)',
                      tension: 0.1,
                      fill: true
                    },
                    {
                      label: "Acceleration Z",
                      data: graphData.acceleration.accz,
                      borderColor: 'rgb(75, 192, 192)',
                      backgroundColor: 'rgba(75, 192, 192, 0.1)',
                      tension: 0.1,
                      fill: true
                    }
                  ]}
                  labels={timeLabels}
                />
              </div>
              <div className="graphs">
                <Graph 
                  title="Altitude Over Time" 
                  datasets={[{
                    label: "Altitude",
                    data: graphData.altitude,
                    borderColor: 'rgb(153, 102, 255)',
                    backgroundColor: 'rgba(153, 102, 255, 0.1)',
                    tension: 0.1,
                    fill: true
                  }]}
                  labels={timeLabels}
                />
              </div>
            </div>  
          </div>
        </div>
      </div>
    </>
  );
}

export default App;


