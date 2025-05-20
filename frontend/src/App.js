
import React, { useContext, useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./components/Home";
import ShipSection from "./components/ShipSection";
import MissionS from "./components/MissionS";
import History from "./components/History";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";
import Register from "./components/Register";
import { db } from "./firebase";
import { addDoc, setDoc, doc, collection, getDocs } from "firebase/firestore";
import { useAuth } from "./context/AuthContext";
import { getIdToken } from "firebase/auth";


function App() {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [selectedMission, setSelectedMission] = useState(null);
  const [isProgress, setIsProgress] = useState(false);
  const [missions, setMissions] = useState([]);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [currentMode, setCurrentMode] = useState('normal_mode');
  const [isModeSelected, setIsModeSelected] = useState(false);
  const { currentUser } = useAuth();

  // Отримання місій із захищеного API
  useEffect(() => {
    const fetchMissions = async () => {
      if (!currentUser) {
        console.log("Користувач не авторизований");
        return;
      }

      try {
        const token = await getIdToken(currentUser, true); // Оновлюємо токен
        console.log("Токен:", token);

        const response = await fetch(`http://localhost:5001/api/missions/${currentUser.uid}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Помилка HTTP: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Отримані місії:", data);
        setMissions(data);
      } catch (error) {
        console.error("Помилка при отриманні місій:", error);
        alert("Error fetching missions: " + error.message);
      }
    };

    fetchMissions();
  }, [currentUser]);
  useEffect(() => {
    const writeMissions = async()=> {
      if (!currentUser) {
        console.log("Користувач не авторизований");
        return;
      }

      try {
        const token = await getIdToken(currentUser, true); // Оновлюємо токен
        console.log("Токен:", token);

        const missionData = {
          ...selectedMission, // розпакування місії
          timestamp: Date.now(),
          finalTime: elapsedTime
        };

        const response = await fetch(`http://localhost:5001/api/missions/${currentUser.uid}`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(missionData)
        });

        if (!response.ok) {
          throw new Error(`Помилка HTTP: ${response.status} - ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log("Місію успішно збережено:", data);
        setMissions((prev) => [...prev, { ...missionData }]);

      } catch (error) {
        console.error("Помилка при записі  місій:", error);
        alert("Error fetching missions: " + error.message);
      }
    };
    if(!isProgress && selectedMission){
      writeMissions();
    }
  }, [isProgress, elapsedTime]);
  

  // Таймер для поточної місії
  useEffect(() => {
    let missionTimer;

    if (isProgress) {
      setElapsedTime(0);
      missionTimer = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(missionTimer);
    }

    return () => clearInterval(missionTimer);
  }, [isProgress]);

  const handleMissionClick = (mission) => {
    alert(`Обрано місію: ${mission.title}`);
    setSelectedMission(mission);
  };

  const handleLoginSuccess = () => {
    setMenuVisible(true);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home onLoginSuccess={handleLoginSuccess} isMenuVisible={isMenuVisible} />} />
          <Route path="/ship" element={<ProtectedRoute><ShipSection currentMode={currentMode} isModeSelected={isModeSelected} setCurrentMode={setCurrentMode} setIsModeSelected={setIsModeSelected} selectedMission={selectedMission} isProgress={isProgress} isMenuVisible={isMenuVisible} setIsProgress={setIsProgress} /></ProtectedRoute>} />
          <Route path="/missions" element={<MissionS onMissionClick={handleMissionClick} isProgress={isProgress} isMenuVisible={isMenuVisible} />} />
          <Route path="/journeys" element={<ProtectedRoute><History missions={missions} setMissions={setMissions} setElapsedTime={setElapsedTime} elapsedTime={elapsedTime} selectedMission={selectedMission} isProgress={isProgress} isMenuVisible={isMenuVisible} /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;