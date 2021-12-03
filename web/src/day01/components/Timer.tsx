import React, { useEffect, useState } from 'react';
import { useInterval } from '../hooks/useInterval';
import Gear from '../resources/images/gear.svg?component';
import './Timer.css';

export const Timer = () => {
  const [active, setActive] = useState(false);
  const [seconds, setSeconds] = useState(900);

  const tick = (): boolean => {
    if (!seconds) return true;
    setSeconds((s) => s - 1);
    return false;
  };

  useInterval(tick, active ? 1000 : null);

  const toggleState = () => {
    setActive((a) => !a);
  };

  const circumference = 246 * 2 * Math.PI;
  const percent = seconds / 900;
  const offset = circumference - percent * circumference;

  return (
    <div className="timer-wrapper">
      <svg className="timer-progress-ring">
        <circle
          className="timer-progress-ring__track"
          stroke-width="4"
          fill="transparent"
          r="246"
          cx="250"
          cy="250"
        />
        <circle
          className="timer-progress-ring__circle"
          stroke-width="4"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          fill="transparent"
          r="246"
          cx="250"
          cy="250"
        />
      </svg>
      <div className="timer-content">
        <span className="timer-countdown">
          {getMinutes(seconds)}:{getSeconds(seconds)}
        </span>
        <button className="timer-button" onClick={toggleState}>
          {active ? 'stop' : 'start'}
        </button>
        <br />
        <span className="timer-settings-button">
          <Gear />
        </span>
      </div>
    </div>
  );
};

const pad = (num: number): string => {
  if (num < 10) return num.toString().padStart(2, '0');
  return num.toString();
};

const getMinutes = (seconds: number): string => {
  return pad(Math.floor(seconds / 60));
};

const getSeconds = (seconds: number): string => {
  return pad(seconds % 60);
};
