import { useCallback, useEffect, useState } from 'react';

export type TimerProps = {
  onTimerEnd: () => void;
  time: number;
  direction: 'up' | 'down';
};

export const useTimer = ({ onTimerEnd, time, direction }: TimerProps) => {
  const [timer, setTimer] = useState(direction === 'up' ? 0 : time);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + (direction === 'up' ? 1 : -1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timer >= time && direction === 'up') onTimerEnd();
    if (timer <= 0 && direction === 'down') onTimerEnd();
  }, [timer, time, onTimerEnd, direction]);

  return { timer, setTimer };
};

export const useCurrentTime = ({ onTimeChange }: { onTimeChange?: () => void } = {}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => onCurrentTimeChange(), 1000);
    return () => clearInterval(interval);
  }, []);

  const onCurrentTimeChange = useCallback(() => {
    setCurrentTime(new Date());
    onTimeChange?.();
  }, [onTimeChange]);

  return { currentTime, setCurrentTime };
};
