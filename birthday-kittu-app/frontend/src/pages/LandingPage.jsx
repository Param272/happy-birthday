export default function LandingPage({ onStart }) {
  return (
    <section className="full-screen center">
      <div className="glass hero-card">
        <h1>Hey Kittu 👋</h1>
        <p>Someone made a tiny corner of the internet just for your birthday.</p>
        <button className="btn" type="button" onClick={onStart}>
          Start the Birthday Adventure 🎉
        </button>
      </div>
      <div className="balloons" aria-hidden="true">
        <span>🎈</span><span>🎈</span><span>🎈</span><span>✨</span><span>🎊</span>
      </div>
    </section>
  );
}
