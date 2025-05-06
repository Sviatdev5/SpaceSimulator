import React from 'react';

function Controls({ onClick, currentMode, disabled }) {
    const modes = [
        { id: 'normal_mode', label: 'Звичайний режим', key: 'normal_mode' },
        { id: 'hyperspace_flight', label: 'Політ у гіперпросторі', key: 'hyperspace_flight' },
        { id: 'remont', label: 'Ремонт на орбіті', key: 'remont' },
        { id: 'combat_readiness', label: 'Бойова готовність', key: 'combat_readiness' },
        { id: 'emergency_mode', label: 'Аварійний режим', key: 'emergency_mode' },
        { id: 'stels', label: 'Стелс-режим', key: 'stels' },
    ];

    const handleModeChange = (modeLabel, modeKey) => {
      /* alert(`Обрано режим: ${modeLabel}`);*/
        if (typeof onClick === 'function') {
            onClick(modeKey);
        }
    };

    return (
        <div className="controls">
            {modes.map((mode) => (
                <button
                    key={mode.id}
                    id={mode.id}
                    className={`mode-button ${currentMode === mode.key ? 'active' : ''}`}
                    onClick={() => handleModeChange(mode.label, mode.key)}
                    disabled={disabled} // Вимикаємо кнопки, якщо місія триває
                >
                    {mode.label}
                </button>
            ))}
        </div>
    );
}

export default Controls;