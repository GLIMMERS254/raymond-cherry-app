import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function Gallery({ user }) {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    loadPhotos();

    const channel = supabase
      .channel("gallery-room")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "photos"
        },
        (payload) => {
          setPhotos((prev) => [payload.new, ...prev]);
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  const loadPhotos = async () => {
    const { data } = await supabase
      .from("photos")
      .select("*")
      .order("id", { ascending: false });

    setPhotos(data || []);
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

    await supabase.from("photos").insert([
      {
        sender: user,
        image,
        description: desc
      }
    ]);

    setFile(null);
    setDesc("");
  };

  return (
    <div className="container">
      <div className="card">

        <h1>📸 Shared Gallery</h1>

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
              <p><strong>{p.sender}</strong></p>
              <p>{p.description}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}