import React, { useState, useEffect } from "react";

function Timer({ isProgress, elapsedTime, finalTime }) {

  // Функція для форматування часу
  const formatTime = (time) => {
    let hours = Math.floor(time / 3600);
    let minutes = Math.floor((time % 3600) / 60);
    let seconds = time % 60;

    const padZero = (value) => (value < 10 ? `0${value}` : value);

    if (hours === 0 && minutes === 0) {
      return `${padZero(seconds)}`;
    } else if (hours === 0) {
      return `${padZero(minutes)}:${padZero(seconds)}`;
    } else {
      return `${hours}:${padZero(minutes)}:${padZero(seconds)}с`;
    }
  };

  return (
    <div className="mission-timer">
      {isProgress ? formatTime(elapsedTime) : formatTime(finalTime)}
    </div>
  );
}

export default Timer;
