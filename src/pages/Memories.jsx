import { useState } from "react";

export default function Memories() {
  const [memories] = useState([]);

  return (
    <div className="container">
      <div className="card">

        <h1>❤️ Memories</h1>

        <p>All uploaded memories will appear here.</p>

        {memories.length === 0 ? (
          <p style={{ marginTop: "20px", color: "#777" }}>
            No memories yet. Start uploading in Gallery 💜
          </p>
        ) : (
          <div className="gallery-grid">
            {memories.map((m) => (
              <div className="photo-card" key={m.id}>
                <img src={m.image} />
                <p>{m.desc}</p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}