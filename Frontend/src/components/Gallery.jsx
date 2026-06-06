import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Play,
  //  Volume2,
    VolumeX } from "lucide-react";
import { BRAND } from "../constants.jsx";
import { SectionHeader } from "./ui";

// Images
import img1 from "../assets/Colonie de vacances-  Mater dei.jpg.jpeg";
import img2 from "../assets/Formation à Buholo 2.jpg.jpeg";
import img3 from "../assets/Formation à Buholo.jpg.jpeg";
import img4 from "../assets/Formation de Piano .jpg.jpeg";
import img5 from "../assets/violon Choeur de petits chanteurs Mater Dei- Bukavu.jpg.jpeg";
import img6 from "../assets/WhatsApp Image 2026-06-02 at 11.12.13 AM.jpeg";
import img7 from "../assets/WhatsApp Image 2026-06-02 at 11.12.15 AM.jpeg";
import img8 from "../assets/WhatsApp Image 2026-06-02 at 11.12.20 AM.jpeg";

// Videos
import vid1 from "../assets/Atelier d'harmonisation musicale et initiation au violon 🎻.mp4";
import vid2 from "../assets/Réseautage Choeur de petits chanteurs Saint Grégoire le Grand Karhale.mp4";

const images = [
  { src: img1, caption: "Colonie de vacances — Mater Dei", tag: "Jeunesse" },
  { src: img2, caption: "Formation à Buholo (2)", tag: "Formation" },
  { src: img3, caption: "Formation à Buholo", tag: "Formation" },
  { src: img4, caption: "Formation de Piano", tag: "Piano" },
  { src: img5, caption: "Violon — Chœur Mater Dei Bukavu", tag: "Violon" },
  { src: img6, caption: "Activité Muziki Kwetu", tag: "Événement" },
  { src: img7, caption: "Activité Muziki Kwetu", tag: "Événement" },
  { src: img8, caption: "Activité Muziki Kwetu", tag: "Événement" },
];

const videos = [
  { src: vid1, caption: "Atelier d'harmonisation musicale & initiation au violon 🎻", tag: "Atelier" },
  { src: vid2, caption: "Réseautage — Chœur de petits chanteurs Saint Grégoire le Grand, Karhale", tag: "Chœur" },
];

// All media combined for lightbox
const allMedia = [
  ...images.map(i => ({ ...i, type: "image" })),
  ...videos.map(v => ({ ...v, type: "video" })),
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null);

  const prev = () => setLightbox(i => (i - 1 + allMedia.length) % allMedia.length);
  const next = () => setLightbox(i => (i + 1) % allMedia.length);

  return (
    <section id="gallery" style={{ padding: "100px 24px", background: "#0d0505" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeader label="Galerie" title="Muziki Kwetu en Images & Vidéos" color="#FAD7A0" light />

        <p style={{ textAlign: "center", fontFamily: "sans-serif", color: "rgba(255,255,255,0.55)", fontSize: 15, marginTop: -36, marginBottom: 48 }}>
          Concerts, ateliers, formations et moments forts du programme à travers le Kivu.
        </p>

        {/* Images grid */}
        <h3 style={{ fontFamily: "sans-serif", color: "#FAD7A0", fontSize: 14, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>Photos</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14, marginBottom: 48 }}>
          {images.map((photo, i) => (
            <div key={i} onClick={() => setLightbox(i)}
              style={{ position: "relative", borderRadius: 12, overflow: "hidden", cursor: "pointer", aspectRatio: "4/3", background: "#1a0a0a" }}
              onMouseEnter={e => { e.currentTarget.querySelector(".ov").style.opacity = "1"; e.currentTarget.querySelector("img").style.transform = "scale(1.05)"; }}
              onMouseLeave={e => { e.currentTarget.querySelector(".ov").style.opacity = "0"; e.currentTarget.querySelector("img").style.transform = "scale(1)"; }}>
              <img src={photo.src} alt={photo.caption} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.4s" }} />
              <div className="ov" style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 55%)", opacity: 0, transition: "opacity 0.3s", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 14 }}>
                <span style={{ background: BRAND, color: "white", fontSize: 11, fontFamily: "sans-serif", fontWeight: 700, padding: "3px 10px", borderRadius: 12, alignSelf: "flex-start", marginBottom: 6 }}>{photo.tag}</span>
                <span style={{ color: "white", fontFamily: "sans-serif", fontSize: 13 }}>{photo.caption}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Videos grid */}
        <h3 style={{ fontFamily: "sans-serif", color: "#FAD7A0", fontSize: 14, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>Vidéos</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 14 }}>
          {videos.map((video, i) => (
            <div key={i} onClick={() => setLightbox(images.length + i)}
              style={{ position: "relative", borderRadius: 12, overflow: "hidden", cursor: "pointer", aspectRatio: "16/9", background: "#1a0a0a" }}
              onMouseEnter={e => { e.currentTarget.querySelector(".vov").style.opacity = "1"; }}
              onMouseLeave={e => { e.currentTarget.querySelector(".vov").style.opacity = "0"; }}>
              <video src={video.src} muted playsInline style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <div className="vov" style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)", opacity: 0, transition: "opacity 0.3s", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: BRAND, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.4)" }}>
                  <Play size={24} color="white" fill="white" />
                </div>
              </div>
              {/* Always-visible bottom bar */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent)", padding: "16px 14px 12px" }}>
                <span style={{ background: BRAND, color: "white", fontSize: 11, fontFamily: "sans-serif", fontWeight: 700, padding: "3px 10px", borderRadius: 12, marginRight: 8 }}>{video.tag}</span>
                <span style={{ color: "rgba(255,255,255,0.85)", fontFamily: "sans-serif", fontSize: 12 }}>{video.caption}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div onClick={() => setLightbox(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.94)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <button onClick={e => { e.stopPropagation(); prev(); }} style={{ position: "absolute", left: 16, background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "50%", width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "white", zIndex: 1 }}>
            <ChevronLeft size={24} />
          </button>

          <div onClick={e => e.stopPropagation()} style={{ maxWidth: "85vw", maxHeight: "85vh", textAlign: "center" }}>
            {allMedia[lightbox].type === "image" ? (
              <img src={allMedia[lightbox].src} alt={allMedia[lightbox].caption} style={{ maxWidth: "100%", maxHeight: "75vh", borderRadius: 12, objectFit: "contain" }} />
            ) : (
              <video src={allMedia[lightbox].src} controls autoPlay muted playsInline style={{ maxWidth: "100%", maxHeight: "75vh", borderRadius: 12 }} />
            )}
            <div style={{ marginTop: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
              {allMedia[lightbox].type === "video" && (
                <span style={{ display: "flex", alignItems: "center", gap: 4, color: "rgba(255,255,255,0.4)", fontFamily: "sans-serif", fontSize: 12 }}>
                  <VolumeX size={14} /> Son désactivé par défaut
                </span>
              )}
              <span style={{ background: BRAND, color: "white", fontSize: 11, fontFamily: "sans-serif", fontWeight: 700, padding: "3px 12px", borderRadius: 12 }}>{allMedia[lightbox].tag}</span>
              <span style={{ color: "white", fontFamily: "sans-serif", fontSize: 14 }}>{allMedia[lightbox].caption}</span>
            </div>
            <div style={{ marginTop: 10, fontFamily: "sans-serif", fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
              {lightbox + 1} / {allMedia.length}
            </div>
          </div>

          <button onClick={e => { e.stopPropagation(); next(); }} style={{ position: "absolute", right: 16, background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "50%", width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "white", zIndex: 1 }}>
            <ChevronRight size={24} />
          </button>
          <button onClick={() => setLightbox(null)} style={{ position: "absolute", top: 16, right: 16, background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "50%", width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "white" }}>
            <X size={20} />
          </button>
        </div>
      )}
    </section>
  );
}
