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

      if (timeDiffInMilliseconds <= 1000 * 60) {
        delay = 1000;
      } else if (timeDiffInMilliseconds <= 1000 * 60 * 60) {
        delay = 1000 * 60;
      } else if (timeDiffInMilliseconds < 1000 * 60 * 60) {
        delay = 1000 * 60 * 60;
      }

      const intervalId = setInterval(() => {
        const newTimeDiffInMilliseconds =
          new Date().getTime() - new Date(time).getTime();
        let newDelay = 0;

        if (newTimeDiffInMilliseconds <= 1000 * 60) {
          newDelay = 1000;
        } else if (newTimeDiffInMilliseconds <= 1000 * 60 * 60) {
          newDelay = 1000 * 60;
        }

        const newTimeDisplay = getTimeDisplay(time);
        setTimeDisplay(newTimeDisplay);

        if (newDelay !== delay) {
          clearInterval(intervalId);
          updateTimeDisplay();
        }
      }, delay);

      return () => clearInterval(intervalId);
    };

    return updateTimeDisplay();
  }, [time]);

  return (
    <span className="text-xs pl-2 text-neutral-400/80">
      {prefix} {timeDisplay}
    </span>
  );
}
