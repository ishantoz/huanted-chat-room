import { useEffect, useState } from 'react';
import { getTimeDisplay } from '../lib/utils';

export default function DisplayTime({
  time,
  prefix = '',
}: {
  time: string;
  prefix?: string;
}) {
  const [timeDisplay, setTimeDisplay] = useState(getTimeDisplay(time));

  useEffect(() => {
    const updateTimeDisplay = () => {
      const timeDiffInMilliseconds =
        new Date().getTime() - new Date(time).getTime();
      let delay = 0;

      if (timeDiffInMilliseconds > 1000 * 60 * 60) {
        return;
      }

      // If the time is less than a minute ago, update every second
      if (timeDiffInMilliseconds <= 1000 * 60) {
        delay = 1000; // 1 second
      }
      // If the time is within the last hour, update every minute
      else if (timeDiffInMilliseconds <= 1000 * 60 * 60) {
        delay = 1000 * 60; // 1 minute
      }
      // If the time is within the last 24 hours, update every hour
      else if (timeDiffInMilliseconds < 1000 * 60 * 60) {
        delay = 1000 * 60 * 60; // 1 hour
      }

      // Set a new interval with dynamic delay
      const intervalId = setInterval(() => {
        // Recalculate time difference on each interval
        const newTimeDiffInMilliseconds =
          new Date().getTime() - new Date(time).getTime();
        let newDelay = 0;

        if (newTimeDiffInMilliseconds <= 1000 * 60) {
          newDelay = 1000; // 1 second
        } else if (newTimeDiffInMilliseconds <= 1000 * 60 * 60) {
          newDelay = 1000 * 60; // 1 minute
        }

        // Update the time display and reset the interval if necessary
        const newTimeDisplay = getTimeDisplay(time);
        setTimeDisplay(newTimeDisplay);
        // If the delay changed, clear the previous interval and set a new one
        if (newDelay !== delay) {
          clearInterval(intervalId);
          updateTimeDisplay();
        }
      }, delay);

      return () => clearInterval(intervalId);
    };

    // Start the update logic
    return updateTimeDisplay();
  }, [time]); // Re-run effect when `time` prop changes

  return (
    <span className="text-[12px] pl-2 text-neutral-400">
      {prefix} {timeDisplay}
    </span>
  );
}
