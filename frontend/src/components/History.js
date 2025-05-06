import React, { useState, useEffect } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import Timer from "./Timer";
import Header from "./Header";

function History({missions, elapsedTime, setMissions, setElapsedTime, selectedMission, isProgress,isMenuVisible }) {
  


  // Видалення місії
  const deleteMission = (missionToDelete) => {
    setMissions((prev) => prev.filter((m) => m.timestamp !== missionToDelete.timestamp));
  };

  // Очистити всі місії
  const deleteAllMission = () => {
    setMissions([]);
  };

  return (
    <div>
    <Header isMenuVisible = {isMenuVisible}/>
    <div id="journeys" className="section">
      <h2>Мої подорожі</h2>
      <p>Перегляньте минулі та поточні експедиції.</p>

      {/* Поточна експедиція */}
      <div className="journeysNew">
        <h3>Поточна експедиція</h3>
        <br/>
        {selectedMission && isProgress ? (
          <div className="mode-buttonT">
            <div id={selectedMission.id} className="button-content">
              <h3 className="button-title">{selectedMission.title}</h3>
              <p className="button-text">{selectedMission.description}</p>
              <Timer isProgress={isProgress} elapsedTime={elapsedTime} finalTime={0} />
            </div>
          </div>
        ) : (
          <p>Наразі немає активної експедиції</p>
        )}
      </div>

      {/* Завершені експедиції */}
      <div className="journeysOld">
        <h3>Завершені експедиції</h3>
        {missions.length > 0 ? (
          missions.map((mission) => (
            <div key={mission.timestamp} className="mode-buttonT">
              <IoCloseCircleSharp className="delete-icon" onClick={() => deleteMission(mission)} />
              <div id={mission.id} className="button-content">
                <h3 className="button-title">{mission.title}</h3>
                <p className="button-text">{mission.description}</p>
                <Timer isProgress={false} elapsedTime={0} finalTime={mission.finalTime} />
              </div>
            </div>
          ))
        ) : (
          <p>Наразі немає завершених експедицій</p>
        )}
      </div>
      <button id="end-mission" onClick={deleteAllMission}>Очистити всі експедиції</button>
    </div>
    </div>
  );
}

export default History;

