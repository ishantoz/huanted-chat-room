export default function BG() {
  return (
    <div className="absolute left-0 top-0 right-0 bottom-0 bg-[#0a0d1a] rounded-xl pointer-events-none z-[-1] overflow-hidden">
      {Array.from({ length: 20 }).map((_, index) => {
        // Generate random positions, sizes, and opacity
        const randomTop = `${Math.random() * 100}%`;
        const randomLeft = `${Math.random() * 100}%`;
        const randomSize = `${Math.random() * 5 + 2}rem`; // Sizes between 2rem and 7rem
        const randomOpacity = Math.random() * 0.4 + 0.1; // Opacity between 0.1 and 0.6

        // Randomly select an emoji from a horror-themed list
        const emojis = [
          '👻',
          '☠️',
          '🎃',
          '🕸️',
          '🧟',
          '🕷️',
          '💀',
          '🧛',
          '🪦',
          '🩸',
        ];
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

        return (
          <span
            key={index}
            style={{
              position: 'absolute',
              top: randomTop,
              left: randomLeft,
              fontSize: randomSize,
              opacity: randomOpacity,
              transform: 'translate(-50%, -50%)',
              color: '#ffffff1a', // Subtle color for low contrast
            }}
          >
            {randomEmoji}
          </span>
        );
      })}
    </div>
  );
}
