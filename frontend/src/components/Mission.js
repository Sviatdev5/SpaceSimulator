import React from "react";
import { IoCloseCircleSharp, IoHammerSharp } from "react-icons/io5";

function Mission({ mission, onClick, onDelete, onEdit,isProgress}) { // Деструктуризуємо props
  return (
    <div className="mode-buttonM" id={mission.id}>
      <IoCloseCircleSharp className="delete-icon" onClick={()=> {!isProgress && onDelete(mission)}}/>
      <IoHammerSharp className="edit-icon" onClick={() => {!isProgress && onEdit(mission)}}/>
      <div  className="button-content" onClick={() => {!isProgress && onClick(mission)}}>
        <h3 className="button-title">{mission.title}</h3>
        <p className="button-text">{mission.description}</p>
      </div>
    </div>
  );
}

export default Mission;