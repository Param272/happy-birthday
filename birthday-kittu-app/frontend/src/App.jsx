import { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import LandingPage from './pages/LandingPage.jsx';
import FinalScene from './pages/FinalScene.jsx';
import StoryScene from './components/StoryScene.jsx';
import Modal from './components/Modal.jsx';
import FloatingHeartsGame from './components/FloatingHeartsGame.jsx';
import { burstCelebration, finalFireworks } from './animations/celebration.js';

const API_BASE = 'http://localhost:4000/api';

const scenes = [
  { icon: '🧑‍💻', text: 'So… it was almost Kittu’s birthday…' },
  { icon: '🤔', text: 'What should I do? A simple message? Nah… too boring.' },
  { icon: '💡', text: 'Let’s build a tiny website instead.' },
  { icon: '⌨️', code: 'if (today == kittuBirthday) {\n  celebrate();\n}' },
  { icon: '🙂', text: 'Because some people deserve more than just a text message.' }
];

export default function App() {
  const [stage, setStage] = useState('landing');
  const [modal, setModal] = useState(null);
  const [score, setScore] = useState(0);
  const rootRef = useRef(null);

  const cards = useMemo(
    () => [
      { title: '🎁 Open Surprise', type: 'message' },
      { title: '💌 Read Birthday Note', type: 'note' },
      { title: '🌟 Generate Compliment', type: 'compliment' },
      { title: '🎮 Play Mini Game', type: 'game' }
    ],
    []
  );

  useEffect(() => {
    gsap.fromTo('.glass', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 });
  }, [stage]);

  useEffect(() => {
    fetch(`${API_BASE}/score`)
      .then((r) => r.json())
      .then((d) => setScore(d.score ?? 0))
      .catch(() => setScore(0));
  }, []);

  const throwConfetti = () => {
    burstCelebration();
  };

  const startAdventure = () => {
    setStage('story');
    throwConfetti();
  };

  const openCard = async (type) => {
    if (type === 'message') {
      const data = await fetch(`${API_BASE}/message`).then((r) => r.json());
      setModal({ title: 'Birthday Surprise', text: data.message });
      return;
    }
    if (type === 'compliment') {
      const data = await fetch(`${API_BASE}/compliment`).then((r) => r.json());
      setModal({ title: 'Fresh Compliment', text: data.compliment });
      return;
    }
    if (type === 'note') {
      setModal({
        title: 'A small note',
        text: 'Kittu, hope this year gives you plenty of joy, fun surprises, and tiny reasons to smile every day.'
      });
      return;
    }
    setModal({ title: 'Mini Game', game: true });
  };

  const addPoints = async (increment) => {
    const data = await fetch(`${API_BASE}/score`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ increment })
    }).then((r) => r.json());
    setScore(data.score ?? score);
    if ((data.score ?? 0) >= 100) throwConfetti();
  };

  const goFinal = () => {
    setStage('final');
    finalFireworks();
  };

  const restart = async () => {
    await fetch(`${API_BASE}/score/reset`, { method: 'POST' });
    setScore(0);
    setStage('landing');
  };

  return (
    <main ref={rootRef}>
      {stage === 'landing' ? <LandingPage onStart={startAdventure} /> : null}

      {stage === 'story' ? (
        <div className="page-wrap">
          <h2 className="section-title">Birthday Story Scroll 📖</h2>
          {scenes.map((scene) => (
            <StoryScene key={scene.text ?? scene.code} icon={scene.icon} text={scene.text} code={scene.code} />
          ))}

          <section className="hints">
            <div className="glass hint">Also… building this website took effort. Just saying 😌</div>
            <div className="glass hint">Some people just deserve a little extra effort.</div>
          </section>

          <section className="cards-grid">
            {cards.map((card) => (
              <button key={card.title} type="button" className="glass card-btn" onClick={() => openCard(card.type)}>
                {card.title}
              </button>
            ))}
          </section>

          <div className="center">
            <button className="btn" type="button" onClick={goFinal}>
              Go to Final Birthday Scene 🎆
            </button>
          </div>
        </div>
      ) : null}

      {stage === 'final' ? <FinalScene onRestart={restart} /> : null}

      {modal ? (
        <Modal title={modal.title} text={modal.text} onClose={() => setModal(null)}>
          {modal.game ? <FloatingHeartsGame score={score} onCollect={addPoints} /> : null}
        </Modal>
      ) : null}
    </main>
  );
}
