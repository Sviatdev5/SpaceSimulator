import React from 'react';

// Об'єкт із режимами
const modes = {
    normal_mode: {
        fuel: 70,
        energy: 50,
        crew: '6 / 10',
        shields: 80,
        hull: 90,
        hyperdrive: 'Так',
        temperature: '250°C',
        maneuverability: 70,
        weapons: 'Так',
        food: '40 днів',
        oxygen: 65,
        communication: 'Стабільний',
    },
    hyperspace_flight: {
        fuel: 30,
        energy: 90,
        crew: '6 / 10',
        shields: 60,
        hull: 80,
        hyperdrive: 'Заряджається',
        temperature: '500°C',
        maneuverability: 50,
        weapons: 'Ні',
        food: '35 днів',
        oxygen: 50,
        communication: 'Перешкоди',
    },
    remont: {
        fuel: 60,
        energy: 40,
        crew: '5 / 10',
        shields: 90,
        hull: 100,
        hyperdrive: 'Ні',
        temperature: '200°C',
        maneuverability: 40,
        weapons: 'Ні',
        food: '50 днів',
        oxygen: 80,
        communication: 'Стабільний',
    },
    combat_readiness: {
        fuel: 50,
        energy: 70,
        crew: '6 / 10',
        shields: 100,
        hull: 85,
        hyperdrive: 'Так',
        temperature: '300°C',
        maneuverability: 90,
        weapons: 'Так',
        food: '30 днів',
        oxygen: 60,
        communication: 'Посилений сигнал',
    },
    emergency_mode: {
        fuel: 20,
        energy: 20,
        crew: '4 / 10',
        shields: 30,
        hull: 50,
        hyperdrive: 'Ні',
        temperature: '600°C',
        maneuverability: 20,
        weapons: 'Ні',
        food: '10 днів',
        oxygen: 30,
        communication: 'Відсутній',
    },
    stels: {
        fuel: 40,
        energy: 60,
        crew: '6 / 10',
        shields: 70,
        hull: 80,
        hyperdrive: 'Так',
        temperature: '150°C',
        maneuverability: 100,
        weapons: 'Так',
        food: '45 днів',
        oxygen: 70,
        communication: 'Приглушений сигнал',
    },
};

// Масив для динамічного відображення параметрів
const parametersList = [
    { label: 'Паливо:', key: 'fuel', isProgress: true },
    { label: 'Енергія:', key: 'energy', isProgress: true },
    { label: 'Чисельність екіпажу:', key: 'crew', isProgress: false },
    { label: 'Щити:', key: 'shields', isProgress: true },
    { label: 'Корпус:', key: 'hull', isProgress: true },
    { label: 'Гіпердвигун заряджений:', key: 'hyperdrive', isProgress: false },
    { label: 'Температура корпусу:', key: 'temperature', isProgress: false },
    { label: 'Маневреність:', key: 'maneuverability', isProgress: true },
    { label: 'Зброя активована:', key: 'weapons', isProgress: false },
    { label: 'Запаси продовольства:', key: 'food', isProgress: false },
    { label: 'Кисень:', key: 'oxygen', isProgress: true },
    { label: 'Стан зв’язку:', key: 'communication', isProgress: false },
];

function Parameters({ currentMode }) {
    // Отримуємо параметри для поточного режиму
    const params = modes[currentMode] || modes.normal_mode; // За замовчуванням normal_mode

    return (
        <div className="parameters">
            {parametersList.map((param) => (
                <div className="param" key={param.key}>
                    <label>{param.label}</label>
                    {param.isProgress ? (
                        <>
                            <progress value={params[param.key]} max="100" />
                            <span>{params[param.key]}%</span>
                        </>
                    ) : (
                        <span>{params[param.key]}</span>
                    )}
                </div>
            ))}
        </div>
    );
}

export default Parameters;