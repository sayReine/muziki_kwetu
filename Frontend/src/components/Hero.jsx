import { MapPin, ArrowRight, Music, Mic, Guitar, ChevronDown } from "lucide-react";
import { BRAND } from "../constants.jsx";
import { Logo } from "./ui";

export default function Hero({ scrollTo, onNavigate }) {
  return (
    <section id="home" style={{ minHeight: "100vh", background: `linear-gradient(135deg, #1a0a0a 0%, #3d0e0e 40%, #6b1a1a 70%, ${BRAND} 100%)`, display: "flex", alignItems: "center", position: "relative", overflow: "hidden", paddingTop: 68 }}>
      {[...Array(5)].map((_, i) => (
        <div key={i} style={{ position: "absolute", borderRadius: "50%", border: `1px solid rgba(255,255,255,${0.05 + i * 0.02})`, width: 200 + i * 120, height: 200 + i * 120, top: "50%", left: "50%", transform: "translate(-50%, -50%)", pointerEvents: "none" }} />
      ))}

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px", position: "relative", zIndex: 1, width: "100%" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }} className="hero-grid">
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 20, padding: "6px 16px", marginBottom: 24 }}>
              <MapPin size={14} color="white" />
              <span style={{ color: "rgba(255,255,255,0.9)", fontSize: 12, fontFamily: "sans-serif", letterSpacing: 1 }}>BUKAVU · GOMA · UVIRA · KINDU — RDC</span>
            </div>
            <h1 style={{ fontFamily: "'Georgia', serif", fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 900, color: "white", lineHeight: 1.1, marginBottom: 20 }}>
              La Musique,<br /><span style={{ color: "#FAD7A0" }}>Chez Nous,</span><br />Pour Nous.
            </h1>
            <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 18, lineHeight: 1.8, marginBottom: 36, fontFamily: "sans-serif", maxWidth: 480 }}>
              MUZIKI KWETU est un programme artistique, social et éducatif qui transforme la musique en outil de cohésion sociale et d'insertion professionnelle pour la jeunesse congolaise.
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <button onClick={() => scrollTo("#programme")} style={{ display: "flex", alignItems: "center", gap: 8, background: BRAND, color: "white", border: "none", borderRadius: 10, padding: "14px 28px", fontSize: 15, fontFamily: "sans-serif", fontWeight: 600, cursor: "pointer" }}>
                Notre Programme <ArrowRight size={18} />
              </button>
              <button onClick={() => scrollTo("#contact")} style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.12)", color: "white", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 10, padding: "14px 28px", fontSize: 15, fontFamily: "sans-serif", fontWeight: 600, cursor: "pointer" }}>
                Nous Contacter
              </button>
              <button onClick={() => onNavigate("register")} style={{ display: "flex", alignItems: "center", gap: 8, background: "#FAD7A0", color: "#7B241C", border: "none", borderRadius: 10, padding: "14px 28px", fontSize: 15, fontFamily: "sans-serif", fontWeight: 700, cursor: "pointer" }}>
                S'inscrire au programme
              </button>
            </div>
            <div style={{ display: "flex", gap: 32, marginTop: 48 }}>
              {[["2022", "Fondé en"], ["4", "Villes"], ["6", "Sous-projets"], ["900K$", "Budget estimé"]].map(([val, label]) => (
                <div key={label}>
                  <div style={{ fontSize: 28, fontWeight: 800, color: "#FAD7A0", fontFamily: "sans-serif" }}>{val}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", fontFamily: "sans-serif", letterSpacing: 0.5 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ position: "relative" }}>
              <div style={{ width: 280, height: 280, borderRadius: "50%", background: "rgba(255,255,255,0.05)", border: "3px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 220, height: 220, borderRadius: "50%", background: "rgba(255,255,255,0.08)", border: "3px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Logo size={450} style={{objectFit: "contain"}} />
                </div>
              </div>
              {[{ icon: <Music size={20} />, pos: { top: -10, right: 20 } }, { icon: <Mic size={20} />, pos: { bottom: 10, left: -10 } }, { icon: <Guitar size={20} />, pos: { top: "50%", right: -20 } }].map((item, i) => (
                <div key={i} style={{ position: "absolute", ...item.pos, width: 44, height: 44, borderRadius: "50%", background: BRAND, display: "flex", alignItems: "center", justifyContent: "center", color: "white", boxShadow: "0 4px 12px rgba(0,0,0,0.3)" }}>
                  {item.icon}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", animation: "bounce 2s infinite" }}>
        <ChevronDown size={28} color="rgba(255,255,255,0.5)" />
      </div>
    </section>
  );
}
