import React, { useState } from "react";

function ModalWindow({ isOpen, onClose, mission, onSave }){
if (!isOpen) return null;
return(
<div className="modal-overlay">
          <div className="modal">
            <h3>Редагувати місію</h3>
            <form onSubmit={onSave}>
              <label>
                Назва:
                <input
                  type="text"
                  name="title"
                  defaultValue={mission?.title}
                  required
                />
              </label>
              <label>
                Опис:
                <textarea
                  name="description"
                  defaultValue={mission?.description}
                  required
                />
              </label>
              <div className="modal-buttons">
                <button type="submit">Зберегти</button>
                <button type="button" onClick={onClose}>
                  Скасувати
                </button>
              </div>
            </form>
          </div>
        </div>
)}

export default ModalWindow;