import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, MapPin, Music, Play, Pause, SkipForward, SkipBack, LogOut, Ticket, Check, Volume2 } from "lucide-react";
import { BRAND, BRAND_DARK, BRAND_LIGHT } from "../constants.jsx";
import { Logo } from "./ui";

const EVENTS = [
  { id: 1, title: "Concert de Noël – Chœur Symphonique", date: "2024-12-22", location: "Bukavu", spots: 200, booked: 134, tags: ["Concert", "Chœur"] },
  { id: 2, title: "Atelier de Violon – Buholo", date: "2025-01-15", location: "Buholo", spots: 30, booked: 22, tags: ["Atelier", "Violon"] },
  { id: 3, title: "Festival MUZIKI KWETU", date: "2025-03-01", location: "Bukavu", spots: 500, booked: 211, tags: ["Festival"] },
  { id: 4, title: "Master Class Piano", date: "2025-02-08", location: "Kavumu", spots: 20, booked: 18, tags: ["Piano", "Masterclass"] },
];

const TRACKS = [
  { title: "Atelier d'harmonisation & Violon 🎻", artist: "MUZIKI KWETU", src: "/src/assets/Atelier d'harmonisation musicale et initiation au violon 🎻.mp4" },
  { title: "Réseautage – Chœur Saint Grégoire", artist: "Karhale", src: "/src/assets/Réseautage Choeur de petits chanteurs Saint Grégoire le Grand Karhale.mp4" },
];

function formatDate(d) {
  return new Date(d).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

export default function UserDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [bookedEvents, setBookedEvents] = useState([]);
  const [trackIdx, setTrackIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("mk_current_user") || "null");
    if (!u || u.role === "admin") { navigate("/login"); return; }
    setUser(u);
    setBookedEvents(JSON.parse(localStorage.getItem(`mk_bookings_${u.email}`) || "[]"));
  }, [navigate]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) { audioRef.current.pause(); setPlaying(false); }
    else { audioRef.current.play(); setPlaying(true); }
  };

  const changeTrack = (idx) => {
    setTrackIdx(idx);
    setPlaying(false);
    setProgress(0);
    setTimeout(() => { audioRef.current?.load(); }, 50);
  };

  const bookEvent = (eventId) => {
    if (!user) return;
    const updated = bookedEvents.includes(eventId)
      ? bookedEvents.filter(id => id !== eventId)
      : [...bookedEvents, eventId];
    setBookedEvents(updated);
    localStorage.setItem(`mk_bookings_${user.email}`, JSON.stringify(updated));
  };

  const logout = () => {
    localStorage.removeItem("mk_current_user");
    navigate("/");
  };

  const sortedEvents = [...EVENTS].sort((a, b) => new Date(a.date) - new Date(b.date));

  if (!user) return null;

  return (
    <div style={{ minHeight: "100vh", background: "#f8f4f0", fontFamily: "sans-serif" }}>
      {/* Navbar */}
      <div style={{ position: "sticky", top: 0, background: "white", borderBottom: "1px solid #f0f0f0", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64, zIndex: 100, boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Logo size={36} />
          <span style={{ fontFamily: "'Georgia', serif", fontWeight: 800, fontSize: 16, color: BRAND }}>MUZIKI KWETU</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: BRAND_LIGHT, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: BRAND_DARK, fontSize: 14 }}>
              {user.firstName?.[0]}{user.lastName?.[0]}
            </div>
            <span style={{ fontSize: 14, fontWeight: 600, color: "#333" }}>{user.firstName}</span>
          </div>
          <button onClick={logout} style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "1px solid #e0e0e0", borderRadius: 8, padding: "8px 14px", cursor: "pointer", color: "#888", fontSize: 13 }}>
            <LogOut size={14} /> Déconnexion
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "36px 24px", display: "grid", gridTemplateColumns: "1fr 360px", gap: 28 }}>
        {/* Left */}
        <div>
          {/* Welcome */}
          <div style={{ background: `linear-gradient(135deg, ${BRAND_DARK}, ${BRAND})`, borderRadius: 20, padding: "28px 32px", color: "white", marginBottom: 28 }}>
            <p style={{ margin: "0 0 4px", fontSize: 13, opacity: 0.8 }}>Bienvenue,</p>
            <h1 style={{ margin: "0 0 6px", fontFamily: "'Georgia', serif", fontSize: 26, fontWeight: 800 }}>{user.firstName} {user.lastName} 🎵</h1>
            <p style={{ margin: 0, fontSize: 14, opacity: 0.8 }}>Programme : <strong>{user.programme || "MUZIKI KWETU"}</strong></p>
          </div>

          {/* Events */}
          <h2 style={{ margin: "0 0 16px", fontSize: 18, fontWeight: 800, color: "#1a1a1a", display: "flex", alignItems: "center", gap: 8 }}>
            <Calendar size={18} color={BRAND} /> Événements à venir
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 28 }}>
            {sortedEvents.map(ev => {
              const isBooked = bookedEvents.includes(ev.id);
              const spotsLeft = ev.spots - ev.booked;
              const full = spotsLeft <= 0;
              return (
                <div key={ev.id} style={{ background: "white", borderRadius: 16, padding: "20px 24px", boxShadow: "0 2px 12px rgba(0,0,0,0.05)", border: isBooked ? `2px solid ${BRAND}` : "2px solid transparent", display: "flex", alignItems: "flex-start", gap: 20 }}>
                  <div style={{ background: full ? "#fee2e2" : BRAND_LIGHT, borderRadius: 12, padding: "12px 14px", textAlign: "center", minWidth: 56 }}>
                    <div style={{ fontSize: 20, fontWeight: 800, color: full ? "#dc2626" : BRAND }}>
                      {new Date(ev.date).getDate()}
                    </div>
                    <div style={{ fontSize: 10, color: full ? "#dc2626" : BRAND_DARK, fontWeight: 600, textTransform: "uppercase" }}>
                      {new Date(ev.date).toLocaleDateString("fr-FR", { month: "short" })}
                    </div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: "0 0 6px", fontSize: 15, fontWeight: 700, color: "#1a1a1a" }}>{ev.title}</h3>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, color: "#888", marginBottom: 8 }}>
                      <MapPin size={13} /> {ev.location}
                    </div>
                    <div style={{ display: "flex", gap: 6 }}>
                      {ev.tags.map(t => <span key={t} style={{ background: BRAND_LIGHT, color: BRAND_DARK, fontSize: 11, fontWeight: 600, borderRadius: 10, padding: "2px 10px" }}>{t}</span>)}
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
                    <span style={{ fontSize: 12, color: full ? "#dc2626" : "#16a34a", fontWeight: 600 }}>
                      {full ? "Complet" : `${spotsLeft} places restantes`}
                    </span>
                    <button
                      onClick={() => !full && bookEvent(ev.id)}
                      disabled={full && !isBooked}
                      style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 10, border: "none", cursor: full && !isBooked ? "not-allowed" : "pointer", fontFamily: "sans-serif", fontWeight: 700, fontSize: 13, background: isBooked ? "#16a34a" : full ? "#f0f0f0" : BRAND, color: isBooked || full ? (isBooked ? "white" : "#aaa") : "white", transition: "all 0.2s" }}
                    >
                      {isBooked ? <><Check size={14} /> Réservé</> : <><Ticket size={14} /> Réserver</>}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* My bookings */}
          {bookedEvents.length > 0 && (
            <div style={{ background: "white", borderRadius: 16, padding: "20px 24px", boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
              <h3 style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 700, color: "#1a1a1a", display: "flex", alignItems: "center", gap: 8 }}>
                <Ticket size={16} color={BRAND} /> Mes réservations ({bookedEvents.length})
              </h3>
              {EVENTS.filter(e => bookedEvents.includes(e.id)).map(ev => (
                <div key={ev.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #f5f5f5" }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#1a1a1a" }}>{ev.title}</div>
                    <div style={{ fontSize: 12, color: "#aaa" }}>{formatDate(ev.date)} · {ev.location}</div>
                  </div>
                  <div style={{ background: "#dcfce7", color: "#16a34a", fontSize: 11, fontWeight: 700, borderRadius: 10, padding: "3px 10px", display: "flex", alignItems: "center", gap: 4 }}>
                    <Check size={11} /> Confirmé
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right — Music Player */}
        <div>
          <div style={{ background: "linear-gradient(180deg, #1a0a0a, #2d0505)", borderRadius: 24, padding: 28, position: "sticky", top: 88, color: "white" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
              <Volume2 size={16} color="#FAD7A0" />
              <span style={{ fontSize: 13, fontWeight: 700, color: "#FAD7A0", textTransform: "uppercase", letterSpacing: 1 }}>Écouter la musique</span>
            </div>

            {/* Current track art */}
            <div style={{ width: "100%", aspectRatio: "1", borderRadius: 16, background: `linear-gradient(135deg, ${BRAND_DARK}, #000)`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, overflow: "hidden" }}>
              <Music size={64} color="rgba(255,255,255,0.2)" />
            </div>

            <h3 style={{ margin: "0 0 4px", fontSize: 16, fontWeight: 800 }}>{TRACKS[trackIdx].title}</h3>
            <p style={{ margin: "0 0 20px", fontSize: 13, color: "rgba(255,255,255,0.5)" }}>{TRACKS[trackIdx].artist}</p>

            {/* Progress */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ height: 4, background: "rgba(255,255,255,0.1)", borderRadius: 2, overflow: "hidden", cursor: "pointer" }}
                onClick={e => {
                  if (!audioRef.current) return;
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pct = (e.clientX - rect.left) / rect.width;
                  audioRef.current.currentTime = pct * audioRef.current.duration;
                }}>
                <div style={{ height: "100%", width: `${progress}%`, background: BRAND, borderRadius: 2, transition: "width 0.2s" }} />
              </div>
            </div>

            {/* Controls */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20 }}>
              <button onClick={() => changeTrack((trackIdx - 1 + TRACKS.length) % TRACKS.length)} style={{ background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "50%", width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "white" }}>
                <SkipBack size={18} />
              </button>
              <button onClick={togglePlay} style={{ background: BRAND, border: "none", borderRadius: "50%", width: 56, height: 56, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "white", boxShadow: `0 4px 20px ${BRAND}88` }}>
                {playing ? <Pause size={24} /> : <Play size={24} fill="white" />}
              </button>
              <button onClick={() => changeTrack((trackIdx + 1) % TRACKS.length)} style={{ background: "rgba(255,255,255,0.1)", border: "none", borderRadius: "50%", width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "white" }}>
                <SkipForward size={18} />
              </button>
            </div>

            {/* Track list */}
            <div style={{ marginTop: 24, borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 16 }}>
              {TRACKS.map((t, i) => (
                <div key={i} onClick={() => changeTrack(i)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10, cursor: "pointer", background: trackIdx === i ? "rgba(255,255,255,0.1)" : "transparent", marginBottom: 4 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: trackIdx === i ? BRAND : "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {trackIdx === i && playing ? <Pause size={14} color="white" /> : <Play size={14} color="white" fill={trackIdx === i ? "white" : "transparent"} />}
                  </div>
                  <div style={{ flex: 1, overflow: "hidden" }}>
                    <div style={{ fontSize: 13, fontWeight: trackIdx === i ? 700 : 400, color: trackIdx === i ? "white" : "rgba(255,255,255,0.6)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.title}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>{t.artist}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Audio element */}
          <audio
            ref={audioRef}
            src={TRACKS[trackIdx].src}
            onTimeUpdate={() => {
              if (audioRef.current?.duration) setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
            }}
            onEnded={() => { setPlaying(false); changeTrack((trackIdx + 1) % TRACKS.length); }}
          />
        </div>
      </div>
    </div>
  );
}
