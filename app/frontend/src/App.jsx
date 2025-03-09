import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"
import { Card } from "./components/Card.jsx"; 

function App() {
  const [xbeeData, setXbeeData] = useState("Fetching data...");

  useEffect(() => {
    // Function to fetch data
    const fetchData = async () => {
      try {
        // Get request for data
        const response = await axios.get("http://localhost:5002/data"); // Make sure this matches with Flask port
        setXbeeData(response.data.xbee_data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call function

    const interval = setInterval(fetchData, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div class="title">
        <h1>MSU Rocketry Ground Station</h1>
      </div>

      <div class="data">
        <Card
          title="Acceleration X"
          description={JSON.stringify(xbeeData, null, 2)}
        />
        <Card
          title="Acceleration Y"
          description={JSON.stringify(xbeeData, null, 2)}
        />  
        <Card
          title="Acceleration Z"
          description={JSON.stringify(xbeeData, null, 2)}
        /> 
                <Card
          title="Altitude"
          description={JSON.stringify(xbeeData, null, 2)}
        />
        <Card
          title="GPS"
          description={JSON.stringify(xbeeData, null, 2)}
        />  
        <Card
          title="Temperature"
          description={JSON.stringify(xbeeData, null, 2)}
        /> 
      </div>   
    </>
  );
  
}

export default App;
