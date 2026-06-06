export default function Home({ user }) {
  const startDate = new Date("2026-01-15");
  const today = new Date();

  const diffTime = today - startDate;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  const years = Math.floor(diffDays / 365);
  const months = Math.floor((diffDays % 365) / 30);
  const days = diffDays;

  return (
    <div className="container">
      <div className="card">

        <h1 className="hero-title">
          💜 Raymond & Cherry 🍒 💖
        </h1>

        <p className="hero-subtitle">
          Welcome back, {user}
        </p>

        <div className="counter-box">
          <h2>❤️ Together For</h2>
          <h1>{years} Years {months} Months {days} Days</h1>
        </div>

        <p>
          This is our private world — built with love,
          memories, and every moment we share.
        </p>

      </div>
    </div>
  );
}