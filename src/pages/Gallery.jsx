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

export default function Gallery({ user }) {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "photos"), orderBy("time"));

    const unsub = onSnapshot(q, (snapshot) => {
      setPhotos(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
      );
    });

    return () => unsub();
  }, []);

  // Convert file → base64 (FREE method, no storage needed)
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const upload = async () => {
    if (!file || !desc) return;

    const image = await toBase64(file);

    await addDoc(collection(db, "photos"), {
      image,
      desc,
      user,
      time: serverTimestamp()
    });

    setFile(null);
    setDesc("");
  };

  return (
    <div className="container">
      <div className="card">

        <h1>📸 Gallery</h1>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <input
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Describe this memory..."
        />

        <button onClick={upload}>
          Upload Memory 💖
        </button>

        <div className="gallery-grid">
          {photos.map((p) => (
            <div key={p.id} className="photo-card">
              <img src={p.image} />
              <p><strong>{p.user}</strong></p>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}