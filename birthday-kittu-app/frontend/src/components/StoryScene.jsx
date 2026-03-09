export default function StoryScene({ icon, text, code }) {
  return (
    <section className="story-scene glass">
      <div className="scene-icon" aria-hidden="true">{icon}</div>
      {code ? <pre>{code}</pre> : <p className="typing">{text}</p>}
    </section>
  );
}
