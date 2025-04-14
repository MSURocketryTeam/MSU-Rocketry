import React, { useState, useEffect, useRef } from 'react';
import './StageTracker.css';
import Clock from './Clock';

const stages = [
  { id: 'armed', label: 'Armed' },
  { id: 'liftoff', label: 'Liftoff' },
  { id: 'airbrake', label: 'Air Brake Deployment' },
  { id: 'apogee', label: 'Apogee' },
  { id: 'drogue', label: 'Drogue Parachute' },
  { id: 'main', label: 'Main Parachute' },
  { id: 'landed', label: 'Landed' }
];

const StageTracker = ({ currentStage, isArmed }) => {
  const [allClocksStarted, setAllClocksStarted] = useState(false);
  const prevStageRef = useRef(null);

  useEffect(() => {
    if (isArmed && !allClocksStarted) {
      setAllClocksStarted(true);
    }
  }, [isArmed, allClocksStarted]);

  useEffect(() => {
    if (currentStage && currentStage !== prevStageRef.current) {
      prevStageRef.current = currentStage;
    }
  }, [currentStage]);

  const getStageStatus = (stageId) => {
    const stageIndex = stages.findIndex(stage => stage.id === stageId);
    const currentIndex = stages.findIndex(stage => stage.id === currentStage);
    
    if (currentIndex === -1) return 'pending';
    if (stageIndex < currentIndex) return 'completed';
    if (stageIndex === currentIndex) return 'current';
    return 'pending';
  };

  return (
    <div className="stage-tracker">
      <h2>Flight Stages</h2>
      <div className="stages-list">
        {stages.map((stage, index) => (
          <div key={stage.id} className="stage-item">
            <div className={`stage-indicator ${getStageStatus(stage.id)}`}>
              {getStageStatus(stage.id) === 'completed' && (
                <span className="checkmark">✓</span>
              )}
              {getStageStatus(stage.id) === 'current' && (
                <span className="current-dot"></span>
              )}
            </div>
            <div className="stage-label">{stage.label}</div>
            <div className={`stage-time ${getStageStatus(stage.id)}`}>
              <Clock 
                stageStatus={getStageStatus(stage.id)}
                autoStart={allClocksStarted}
              />
            </div>
            {index < stages.length - 1 && <div className="stage-connector"></div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StageTracker; 