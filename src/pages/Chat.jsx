import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function Chat({ user }) {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    loadMessages();

    const channel = supabase
      .channel("chat-room")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  const loadMessages = async () => {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("id", { ascending: true });

    if (!error) setMessages(data);
  };

  const sendMessage = async () => {
    if (!text.trim()) return;

    const { error } = await supabase.from("messages").insert([
      {
        sender: user,
        text: text.trim(),
      },
    ]);

    if (error) {
      console.log("SEND ERROR:", error);
    }

    setText("");
  };

  return (
    <div className="container">
      <div className="card">

        <h1>💬 Cherry Chat 🍒</h1>

        <div className="chat-box">
          {messages.map((m) => (
            <div key={m.id} className="msg">
              <strong>{m.sender}: </strong>
              {m.text}
            </div>
          ))}
        </div>

        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Message Cherry 🍒..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <button onClick={sendMessage}>
          Send 💜
        </button>

      </div>
    </div>
  );
}