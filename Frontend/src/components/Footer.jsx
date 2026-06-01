import { BRAND, navLinks } from "../constants.jsx";
import { Logo } from "./ui";

export default function Footer({ scrollTo }) {
  return (
    <footer style={{ background: "#0d0505", padding: "40px 24px", borderTop: `3px solid ${BRAND}` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Logo size={36} />
          <div>
            <div style={{ fontFamily: "'Georgia', serif", fontWeight: 800, fontSize: 16, color: BRAND }}>MUZIKI KWETU</div>
            <div style={{ fontFamily: "sans-serif", fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Programme de Musique — Bukavu, RDC</div>
          </div>
        </div>
        <div style={{ fontFamily: "sans-serif", fontSize: 12, color: "rgba(255,255,255,0.4)", textAlign: "center" }}>
          © 2025 MUZIKI KWETU · muzikikwetu243@gmail.com<br />
          Fait à Bukavu — <em>La musique, chez nous, pour nous.</em>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {navLinks.slice(0, 4).map(link => (
            <button key={link.href} onClick={() => scrollTo(link.href)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", cursor: "pointer", fontFamily: "sans-serif", fontSize: 12 }}>
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </footer>
  );
}
