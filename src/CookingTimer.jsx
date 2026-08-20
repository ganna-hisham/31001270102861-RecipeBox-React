import { useState, useEffect } from 'react';

function CookingTimer({ initialMinutes = 10 }) {
  const [secondsLeft, setSecondsLeft] = useState(initialMinutes * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isActive) {
      alert('Time is up! Your recipe is ready!');
      setIsActive(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, secondsLeft]);

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="timer-box">
      <h4>Timer: {formatTime(secondsLeft)}</h4>
      <button onClick={() => setIsActive(!isActive)}>
        {isActive ? 'Pause' : 'Start Cooking'}
      </button>
      <button
        onClick={() => {
          setIsActive(false);
          setSecondsLeft(initialMinutes * 60);
        }}
      >
        Reset
      </button>
    </div>
  );
}

export default CookingTimer;
