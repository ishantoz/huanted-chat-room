import { format, formatDistanceToNow } from 'date-fns';
import localforage from 'localforage';
import { TUser } from '../type';

export function delay(duration: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(duration);
    }, duration);
  });
}

export function formatNumber(num: number) {
  if (num >= 1e6) return (num / 1e6).toFixed(1) + 'm';
  if (num >= 1e3) return (num / 1e3).toFixed(1) + 'k';
  return num.toString();
}

/**
 * Utility function to display a human-readable time difference.
 * @param utcTimestamp - A UTC timestamp string or `Date` object to calculate time from.
 * @returns A formatted time difference as a string.
 */
export const getTimeDisplay = (utcTimestamp: string | Date): string => {
  // Validate input and ensure it is a Date object
  const messageTime =
    typeof utcTimestamp === 'string' ? new Date(utcTimestamp) : utcTimestamp;

  if (isNaN(messageTime.getTime())) {
    throw new Error('Invalid UTC timestamp provided.');
  }

  const now = new Date();
  const timeDiffInSeconds = Math.floor(
    (now.getTime() - messageTime.getTime()) / 1000
  );

  // Precomputed constants for readability
  const SECONDS_IN_A_MINUTE = 60;
  const SECONDS_IN_A_DAY = 86400;

  // Display seconds for differences under a minute
  if (timeDiffInSeconds < SECONDS_IN_A_MINUTE) {
    return `${timeDiffInSeconds} second${
      timeDiffInSeconds === 1 ? '' : 's'
    } ago`;
  }

  // Display relative time for differences under a day
  if (timeDiffInSeconds < SECONDS_IN_A_DAY) {
    return formatDistanceToNow(messageTime, { addSuffix: true });
  }

  // Display formatted date for older timestamps
  return format(messageTime, 'eee, MMM d, yyyy h:mm a');
};

export function textareaAutoAdjustHeight(
  field: HTMLTextAreaElement | null,
  maxHeight: number = 150
) {
  if (field) {
    field.style.height = 'auto';
    if (field.scrollHeight > field.offsetHeight) {
      const newHeight = Math.min(field.scrollHeight, maxHeight);
      if (newHeight !== parseFloat(field.style.height)) {
        field.style.height = `${newHeight}px`;
      }
    }
  }
}

export const getUser = async () => {
  let user: TUser | null = await localforage.getItem('user');
  if (user) {
    return user;
  }

  let username: string | null;
  do {
    username = window.prompt('Enter your name:');
  } while (!username);
  const uuid = crypto.randomUUID();
  user = {
    username: username,
    uuid,
    avatar: '',
  };
  localforage.setItem('user', user);
  return user;
};
