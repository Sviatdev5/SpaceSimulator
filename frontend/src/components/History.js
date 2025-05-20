import React, { useState, useEffect } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import Timer from "./Timer";
import Header from "./Header";
import { useAuth } from "../context/AuthContext";
import { getIdToken } from "firebase/auth";

function History({missions, elapsedTime, setMissions, setElapsedTime, selectedMission, isProgress,isMenuVisible }) {

  const {currentUser } = useAuth();
  const [showConfirm, setShowConfirm] = useState(false);
  const [missionToDelete, setMissionToDelete] = useState(null);

  // Видалення місії
  const deleteMission = (missiontimestamp) => {
  setMissionToDelete(missiontimestamp);
  setShowConfirm(true);
};


 const confirmLogout = async (e) => {
  e.preventDefault();
  if (!missionToDelete) return;

  try {
    const token = await getIdToken(currentUser, true);

    const response = await fetch(`http://localhost:5001/api/missions/${currentUser.uid}/${missionToDelete}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    // Оновлюємо список місій
    setMissions((prev) => prev.filter((mission) => mission.timestamp !== missionToDelete));
    setShowConfirm(false);
    setMissionToDelete(null);
  } catch (error) {
    console.error(error);
  }
};


const cancelLogout = (e) => {
  e.preventDefault();
  setShowConfirm(false);
  setMissionToDelete(null);
};

  

  // Очистити всі місії
  const deleteAllMission = async() => {
    if(!currentUser){
      console.log("Користувач не авторизований");
      return;
    }



    try{
      const token = await getIdToken(currentUser, true);

      const response = await fetch(`http://localhost:5001/api/missions/${currentUser.uid}`,{
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Місії видалено:", data);
      setMissions([]);


    }catch{

    }
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
      {showConfirm && (
  <form onSubmit={confirmLogout} className="confirm-form">
    <h2>Чи дійсно бажаєте видалити експедицію?</h2>
    <div>
      <button type="submit">Так</button>
      <button type="button" onClick={cancelLogout}>Ні</button>
    </div>
  </form>
)}
      {/* Завершені експедиції */}
      <div className="journeysOld">
        <h3>Завершені експедиції</h3>
        {missions.length > 0 ? (
          missions.map((mission) => (
            <div key={mission.timestamp} className="mode-buttonT">
              <IoCloseCircleSharp className="delete-icon" onClick={() => deleteMission(mission.timestamp)} />
               { console.log(mission.id) }
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
      <button id="end-mission" onClick={() => deleteAllMission()}>Очистити всі експедиції</button>
    </div>

    

    </div>
  );
}

export default History;

