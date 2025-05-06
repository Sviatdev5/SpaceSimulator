import React, { useState } from "react";
import remove_image from "../img/space.jpg"
import Controls from "./Controls";
import Parameters from "./Parameters";
import StartEndMission from "./StartEndMission";
import Header from "./Header";
function ShipSection({currentMode,setCurrentMode, setIsModeSelected, isModeSelected,selectedMission, isProgress, setIsProgress, isMenuVisible }) {
  

  // Функція для оновлення режиму
  const handleModeChange = (modeKey) => {
      setCurrentMode(modeKey);
      setIsModeSelected(true)
  }

  return (
    <div>
    <Header isMenuVisible = {isMenuVisible}/>
    <div id="ship" className="section">
      <h2>Космічний корабель</h2>
      {selectedMission &&
      <> <p id="text-ship">Обрана експедиція: {selectedMission.title}</p>
      <Controls onClick={handleModeChange} currentMode={currentMode}/> 
      </>
      }
      {isModeSelected &&
       <>
      <StartEndMission isProgress={isProgress} setIsProgress={setIsProgress}/>
      <Parameters currentMode={currentMode} />
      </>
      }
      {!selectedMission &&
      <> <p id="text-ship">Виберіть спочатку експедицію</p>
      <img id="remove_image" src={remove_image}  alt="Космічний корабель" /> 
      </>
      }
    </div>
    </div>
  );
}

export default ShipSection;