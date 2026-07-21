import React, { useEffect, useRef, useState } from "react";

function Timer() {
  const [timeVal, setTimerVal] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerId = useRef(null);

  //   const handleStart = () => {
  //     setIsRunning(true);

  //     timerId.current = setInterval(() => {
  //       setTimerVal((time) => time + 1);
  //     }, 1000);
  //   };

  //   const stopTimer = () => {
  //     if (timerId) {
  //       clearInterval(timerId.current);
  //     }
  //     setIsRunning(false);
  //   };

  useEffect(() => {
    if (isRunning) {
      timerId.current = setTimeout(() => {
        setTimerVal((time) => time + 1);
      }, 1000);
    }

    return () => clearTimeout(timerId.current);
  }, [isRunning, timeVal]);

  return (
    <div>
      <p>Timer value: {timeVal}</p>
      {!isRunning && <button onClick={() => setIsRunning(true)}>Start</button>}
      {isRunning && <button onClick={() => setIsRunning(false)}>Stop</button>}
    </div>
  );
}

export default Timer;
