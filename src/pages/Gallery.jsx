import { useState, useEffect } from "react";

export default function Gallery({ user }) {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("photos");
    if (saved) setPhotos(JSON.parse(saved));
  }, []);

  const savePhotos = (data) => {
    localStorage.setItem("photos", JSON.stringify(data));
  };

  const toBase64 = (file) =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
    });

  const upload = async () => {
    if (!file || !desc) return;

    const image = await toBase64(file);

    const newPhoto = {
      id: Date.now(),
      user,
      desc,
      image
    };

    const updated = [newPhoto, ...photos];

    setPhotos(updated);
    savePhotos(updated);

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
          Upload 💜
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