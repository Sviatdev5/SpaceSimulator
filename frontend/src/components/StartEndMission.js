import React, { useState } from "react";

function StartEndMission({ isProgress, setIsProgress }) {
    const [bgColor, setBgColor] = useState(""); // Початковий колір
    const handleMissionChange = () => {
        setIsProgress((prev) => {
          const newProgress = !prev; // Перемикаємо значення
      
          // Міняємо колір кнопки
          setBgColor(newProgress ? "#ae1b1b" : "#00AEEF");
      
          return newProgress; // Повертаємо новий стан
        });
      };
  
  return (
    <button 
      id="start-mission" 
      onClick={handleMissionChange} 
      onMouseEnter={() => !isProgress && setBgColor("green")}
      onMouseLeave={() => !isProgress && setBgColor("#00AEEF")}
      style={{ backgroundColor: bgColor }}
      >
        {isProgress ? "Завершити експедицію" : "Почати експедицію"}
        </button>
  )
}

export default StartEndMission;