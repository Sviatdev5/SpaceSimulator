import React, { useState } from "react";
import Timer from "./Timer";

function StopTimer({ currentTimerId, isProgress }) {
    const [elapsedTime, setElapsedTime] = useState(0);
    const [finalTime, setFinalTime] = useState(null); // Для збереження завершеного часу

    return (
        <div>
            <Timer
                currentTimerId={currentTimerId}
                isProgress={isProgress}
                elapsedTime={elapsedTime}
                setElapsedTime={setElapsedTime}
                onStop={(time) => setFinalTime(time)} // Збереження часу завершеної місії
            />
            {finalTime !== null && <p>Час завершеної місії: {finalTime} сек</p>}
        </div>
    );
}

export default StopTimer;

