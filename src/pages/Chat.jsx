import { useEffect, useState } from "react";

export default function Chat({ user }) {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  // Load messages once when page opens
  useEffect(() => {
    try {
      const saved = localStorage.getItem("messages");
      if (saved) {
        setMessages(JSON.parse(saved));
      }
    } catch (err) {
      console.error("Failed to load messages:", err);
      setMessages([]);
    }
  }, []);

  // Save messages to browser
  const saveMessages = (data) => {
    localStorage.setItem("messages", JSON.stringify(data));
  };

  const sendMessage = () => {
    if (!text.trim()) return;

    const newMessage = {
      id: Date.now(),
      user: user || "Unknown",
      text: text.trim()
    };

    const updatedMessages = [...messages, newMessage];

    setMessages(updatedMessages);
    saveMessages(updatedMessages);
    setText("");
  };

  return (
    <div className="container">
      <div className="card">

        <h1>💬 Chat</h1>

        {/* Messages */}
        <div className="chat-box">
          {messages.length === 0 ? (
            <p style={{ color: "#777" }}>
              No messages yet 💜 Start chatting with Cherry 🍒
            </p>
          ) : (
            messages.map((m) => (
              <div key={m.id} className="msg">
                <strong>{m.user}: </strong>
                {m.text}
              </div>
            ))
          )}
        </div>

        {/* Input */}
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Message Cherry 🍒..."
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        />

        <button onClick={sendMessage}>
          Send 💜
        </button>

      </div>
    </div>
  );
}