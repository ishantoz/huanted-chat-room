import type { RefObject } from 'react';

import { useCallback, useEffect, useRef } from 'react';

export function useSmoothScroll<T extends HTMLElement>(): [
  RefObject<T>,
  () => void
] {
  const ref = useRef<T>(null);

  const smoothScrollToBottom = useCallback(() => {
    if (ref.current) {
      const container = ref.current;
      const scrollHeight = container.scrollHeight;
      const height = container.clientHeight;
      const maxScrollTop = scrollHeight - height;

      const startTime = performance.now();
      const startScrollTop = container.scrollTop;
      const duration = 300;

      const animateScroll = (currentTime: number) => {
        const elapsedTime = currentTime - startTime;
        if (elapsedTime < duration) {
          const progress = elapsedTime / duration;
          const easeProgress = 0.5 - Math.cos(progress * Math.PI) / 2;
          container.scrollTop =
            startScrollTop + (maxScrollTop - startScrollTop) * easeProgress;
          requestAnimationFrame(animateScroll);
        } else {
          container.scrollTop = maxScrollTop;
        }
      };

      requestAnimationFrame(animateScroll);
    }
  }, []);

  return [ref, smoothScrollToBottom];
}

export function useChatScrollToBottomOnUpdate<T>(
  ref: RefObject<T>,
  dependencies: any[], // eslint-disable-line @typescript-eslint/no-explicit-any
  smoothScrollToBottom: () => void
) {
  useEffect(() => {
    if (ref.current) {
      const container = ref.current as unknown as HTMLElement;
      const scrollPosition = container.scrollTop;
      const visibleHeight = container.clientHeight;
      const contentHeight = container.scrollHeight;

      const distanceToBottom = contentHeight - (scrollPosition + visibleHeight);
      const threshold = visibleHeight * 1.5; // 1.5 times the screen height

      if (distanceToBottom < threshold) {
        requestAnimationFrame(() =>
          requestAnimationFrame(smoothScrollToBottom)
        );
      } else if (distanceToBottom < visibleHeight * 2) {
        setTimeout(() => smoothScrollToBottom(), 40); // Delayed smooth scroll
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, smoothScrollToBottom, ...dependencies]);
}
