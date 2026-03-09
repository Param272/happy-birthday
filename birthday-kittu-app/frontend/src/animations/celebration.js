import confetti from 'canvas-confetti';

export const burstCelebration = () => {
  confetti({ particleCount: 140, spread: 90, origin: { y: 0.65 } });
};

export const finalFireworks = () => {
  confetti({ particleCount: 240, spread: 120, startVelocity: 45 });
};
