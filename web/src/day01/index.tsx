import React from 'react';
import { Timer } from './components/Timer';
import './index.css';

export const Day01 = () => {
  return (
    <div className="container">
      <h1 className="title">Day 01 - Pomodoro Timer</h1>
      <div className="content">
        <Timer />
      </div>
    </div>
  );
};
