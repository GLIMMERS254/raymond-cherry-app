export default function Login({ setLoggedIn, setUser }) {
  const enter = (name) => {
    setUser(name);
    setLoggedIn(true);
  };

  return (
    <div className="container">
      <div className="card">
        <h1>💜 Forever Us 💖</h1>

        <p
          style={{
            marginBottom: "25px",
            color: "#666",
            fontSize: "18px"
          }}
        >
          Choose who is entering
        </p>

        <button
          onClick={() => enter("Raymond 💜")}
          style={{ marginBottom: "10px" }}
        >
          Raymond 💜
        </button>

        <button
          onClick={() => enter("Cherry 🍒")}
        >
          Cherry 🍒
        </button>

      </div>
    </div>
  );
}