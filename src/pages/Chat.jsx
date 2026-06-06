import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
} from "firebase/firestore";

export default function Chat({ user }) {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("time")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
      );
    });

    return () => unsub();
  }, []);

  const sendMessage = async () => {
    if (!text.trim()) return;

    await addDoc(collection(db, "messages"), {
      text,
      user,
      time: serverTimestamp()
    });

    setText("");
  };

  return (
    <div className="container">
      <div className="card">

        <h1>💬 Chat Room</h1>

        <div className="chat-box">
          {messages.map((m) => (
            <div key={m.id} className="msg">
              <strong>{m.user}: </strong>
              {m.text}
            </div>
          ))}
        </div>

        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Message Cherry 🍒..."
        />

        <button onClick={sendMessage}>
          Send 💜
        </button>

      </div>
    </div>
  );
}