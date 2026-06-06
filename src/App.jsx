import { useState } from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Gallery from "./pages/Gallery";
import Memories from "./pages/Memories";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  const [page, setPage] = useState("home");

  if (!loggedIn) {
    return (
      <Login setLoggedIn={setLoggedIn} setUser={setUser} />
    );
  }

  return (
    <>
      <div className="top-title">
        💜 Raymond & Cherry 🍒 💖
      </div>

      <nav className="navbar">
        <button onClick={() => setPage("home")}>🏠 Home</button>
        <button onClick={() => setPage("chat")}>💬 Chat</button>
        <button onClick={() => setPage("gallery")}>📸 Gallery</button>
        <button onClick={() => setPage("memories")}>❤️ Memories</button>
      </nav>

      {page === "home" && <Home user={user} />}
      {page === "chat" && <Chat user={user} />}
      {page === "gallery" && <Gallery user={user} />}
      {page === "memories" && <Memories />}
    </>
  );
}

export default App;