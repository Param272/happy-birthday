import { useMemo, useState } from 'react';

export default function FloatingHeartsGame({ score, onCollect }) {
  const [burst, setBurst] = useState(0);

  const hearts = useMemo(
    () => Array.from({ length: 12 }, (_, i) => ({ id: i, x: (i * 8) % 90 + 5, delay: (i % 6) * 0.4 })),
    []
  );

  const collect = () => {
    setBurst((b) => b + 1);
    onCollect(10);
  };

  return (
    <div className="game-box glass">
      <h3>Collect hearts for Kittu</h3>
      <p>Love Points for Kittu ❤️: <strong>{score}</strong></p>
      <div className="heart-zone" key={burst}>
        {hearts.map((heart) => (
          <button
            key={heart.id}
            type="button"
            className="heart"
            style={{ left: `${heart.x}%`, animationDelay: `${heart.delay}s` }}
            onClick={collect}
          >
            ❤️
          </button>
        ))}
      </div>
      {score >= 100 ? <p className="achievement">Achievement unlocked: Professional Smile Generator 😄</p> : null}
    </div>
  );
}
