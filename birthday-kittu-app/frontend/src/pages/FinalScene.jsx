export default function FinalScene({ onRestart }) {
  return (
    <section className="full-screen center">
      <div className="glass hero-card final-card">
        <h1>Happy Birthday Kittu 🎂</h1>
        <p>Hope today is full of laughter, surprises, and good memories.</p>
        <button className="btn" type="button" onClick={onRestart}>
          Restart the Birthday Adventure
        </button>
      </div>
    </section>
  );
}
