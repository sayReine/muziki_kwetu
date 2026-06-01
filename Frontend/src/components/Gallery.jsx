import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Camera } from "lucide-react";
import { BRAND, BRAND_LIGHT } from "../constants.jsx";
import { SectionHeader } from "./ui";

// To add your own photos:
// 1. Open each photo in Google Drive
// 2. Click Share → Anyone with the link
// 3. Copy the file ID from the URL: drive.google.com/file/d/FILE_ID/view
// 4. Paste the FILE_ID in the id field below
const photos = [
  { id: "1pBHBASHs3rFMJFo_ILmqJdCFGu6X3Zqv", caption: "Concert Muziki Kwetu", tag: "Concert" },
  { id: "1Iy3HMFqkXvN8w2eKlT5RpDcOuYsAjBmZ", caption: "Répétition du Chœur Symphonique", tag: "Chœur" },
  { id: "1KdN2xPqRtWvYmUoLsEjFhGbCiAzXwVnM", caption: "Atelier de formation musicale", tag: "Formation" },
  { id: "1QrStUvWxYzAbCdEfGhIjKlMnOpQrStUv", caption: "Festival MUZIKI KWETU", tag: "Festival" },
  { id: "1TuVwXyZaBcDeFgHiJkLmNoPqRsTuVwXy", caption: "Orchestre Symphonique du Kivu", tag: "Orchestre" },
  { id: "1ZaBcDeFgHiJkLmNoPqRsTuVwXyZaBcDe", caption: "Label Jeune Talent — Coaching", tag: "Talent" },
  { id: "1FgHiJkLmNoPqRsTuVwXyZaBcDeFgHiJk", caption: "Patrimoine musical du Kivu", tag: "Patrimoine" },
  { id: "1LmNoPqRsTuVwXyZaBcDeFgHiJkLmNoPq", caption: "Jeunes musiciens en scène", tag: "Scène" },
];

function driveUrl(id) {
  return `https://drive.google.com/thumbnail?id=${id}&sz=w600`;
}

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null); // index or null

  const prev = () => setLightbox(i => (i - 1 + photos.length) % photos.length);
  const next = () => setLightbox(i => (i + 1) % photos.length);

  return (
    <section id="gallery" style={{ padding: "100px 24px", background: "#0d0505" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeader label="Galerie" title="Muziki Kwetu en Images" color="#FAD7A0" light />

        <p style={{ textAlign: "center", fontFamily: "sans-serif", color: "rgba(255,255,255,0.6)", fontSize: 15, marginTop: -36, marginBottom: 48 }}>
          Découvrez nos concerts, ateliers, répétitions et événements culturels à travers le Kivu.
        </p>

        {/* Photo grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
          {photos.map((photo, i) => (
            <div key={i} onClick={() => setLightbox(i)}
              style={{ position: "relative", borderRadius: 12, overflow: "hidden", cursor: "pointer", aspectRatio: "4/3", background: "#1a0a0a", border: "1px solid rgba(255,255,255,0.08)" }}
              onMouseEnter={e => e.currentTarget.querySelector(".overlay").style.opacity = "1"}
              onMouseLeave={e => e.currentTarget.querySelector(".overlay").style.opacity = "0"}>
              <img
                src={driveUrl(photo.id)}
                alt={photo.caption}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.4s" }}
                onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }}
              />
              {/* Fallback placeholder */}
              <div style={{ display: "none", width: "100%", height: "100%", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8, background: "rgba(192,57,43,0.15)", position: "absolute", top: 0, left: 0 }}>
                <Camera size={32} color="rgba(255,255,255,0.3)" />
                <span style={{ fontFamily: "sans-serif", fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{photo.caption}</span>
              </div>
              {/* Hover overlay */}
              <div className="overlay" style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)", opacity: 0, transition: "opacity 0.3s", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 16 }}>
                <span style={{ background: BRAND, color: "white", fontSize: 11, fontFamily: "sans-serif", fontWeight: 700, padding: "3px 10px", borderRadius: 12, alignSelf: "flex-start", marginBottom: 6 }}>{photo.tag}</span>
                <span style={{ color: "white", fontFamily: "sans-serif", fontSize: 13, fontWeight: 500 }}>{photo.caption}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Drive folder link */}
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <a href="https://drive.google.com/drive/folders/1JgG8wr26R9dNEuUmNJkcR9qs8H68UKYE" target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.08)", border: `1px solid ${BRAND}`, color: "#FAD7A0", borderRadius: 10, padding: "12px 28px", fontFamily: "sans-serif", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
            <Camera size={18} /> Voir toute la galerie sur Google Drive
          </a>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div onClick={() => setLightbox(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.92)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <button onClick={e => { e.stopPropagation(); prev(); }} style={{ position: "absolute", left: 20, background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "50%", width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "white" }}>
            <ChevronLeft size={24} />
          </button>
          <div onClick={e => e.stopPropagation()} style={{ maxWidth: "80vw", maxHeight: "80vh", textAlign: "center" }}>
            <img src={driveUrl(photos[lightbox].id)} alt={photos[lightbox].caption} style={{ maxWidth: "100%", maxHeight: "70vh", borderRadius: 12, objectFit: "contain" }} />
            <div style={{ marginTop: 12, color: "white", fontFamily: "sans-serif", fontSize: 15 }}>{photos[lightbox].caption}</div>
            <div style={{ marginTop: 6, color: BRAND, fontFamily: "sans-serif", fontSize: 12, fontWeight: 700 }}>{photos[lightbox].tag}</div>
          </div>
          <button onClick={e => { e.stopPropagation(); next(); }} style={{ position: "absolute", right: 20, background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "50%", width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "white" }}>
            <ChevronRight size={24} />
          </button>
          <button onClick={() => setLightbox(null)} style={{ position: "absolute", top: 20, right: 20, background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "50%", width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "white" }}>
            <X size={20} />
          </button>
        </div>
      )}
    </section>
  );
}
