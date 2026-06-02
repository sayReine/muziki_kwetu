import { Menu, X, LogIn, UserPlus } from "lucide-react";
import { BRAND, 
  // BRAND_DARK,
   navLinks } from "../constants.jsx";
import { Logo } from "./ui";

export default function Navbar({ scrolled, activeSection, menuOpen, setMenuOpen, scrollTo, onNavigate }) {
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.92)",
      backdropFilter: "blur(10px)",
      boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.12)" : "none",
      borderBottom: scrolled ? `2px solid ${BRAND}` : "none",
      transition: "all 0.3s ease",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} onClick={() => scrollTo("#home")}>
          <Logo size={75} />
          <div>
            <div style={{ fontFamily: "'Georgia', serif", fontWeight: 800, fontSize: 20, color: BRAND, letterSpacing: "-0.3px", lineHeight: 1.1 }}>MUZIKI KWETU</div>
            <div style={{ fontSize: 10, color: "#888", letterSpacing: 1.5, textTransform: "uppercase", fontFamily: "sans-serif" }}>Programme de Musique</div>
          </div>
        </div>

        {/* Desktop nav links */}
        <div style={{ display: "flex", gap: 2, alignItems: "center" }} className="desktop-nav">
          {navLinks.map(link => (
            <button key={link.href} onClick={() => scrollTo(link.href)} style={{
              display: "flex", alignItems: "center", gap: 6, padding: "8px 12px",
              background: activeSection === link.href.slice(1) ? BRAND : "transparent",
              color: activeSection === link.href.slice(1) ? "white" : "#444",
              border: "none", borderRadius: 8, cursor: "pointer", fontSize: 13,
              fontFamily: "sans-serif", fontWeight: 500, transition: "all 0.2s",
            }}>
              {link.icon}{link.label}
            </button>
          ))}
        </div>

        {/* Auth buttons */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }} className="desktop-nav">
          <button onClick={() => onNavigate("login")} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", background: "transparent", color: BRAND, border: `1.5px solid ${BRAND}`, borderRadius: 8, cursor: "pointer", fontSize: 13, fontFamily: "sans-serif", fontWeight: 600, transition: "all 0.2s" }}>
            <LogIn size={15} /> Connexion
          </button>
          <button onClick={() => onNavigate("register")} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", background: BRAND, color: "white", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 13, fontFamily: "sans-serif", fontWeight: 600, transition: "all 0.2s" }}>
            <UserPlus size={15} /> S'inscrire
          </button>
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", color: BRAND }} className="hamburger">
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background: "white", borderTop: `2px solid ${BRAND}`, padding: "12px 24px 20px" }}>
          {navLinks.map(link => (
            <button key={link.href} onClick={() => scrollTo(link.href)} style={{
              display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "12px 0",
              background: "none", border: "none", borderBottom: "1px solid #f0f0f0",
              cursor: "pointer", fontSize: 15, fontFamily: "sans-serif", color: "#333", fontWeight: 500,
            }}>
              <span style={{ color: BRAND }}>{link.icon}</span>{link.label}
            </button>
          ))}
          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <button onClick={() => { onNavigate("login"); setMenuOpen(false); }} style={{ flex: 1, padding: "11px", background: "transparent", color: BRAND, border: `1.5px solid ${BRAND}`, borderRadius: 8, cursor: "pointer", fontFamily: "sans-serif", fontSize: 14, fontWeight: 600 }}>
              Connexion
            </button>
            <button onClick={() => { onNavigate("register"); setMenuOpen(false); }} style={{ flex: 1, padding: "11px", background: BRAND, color: "white", border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "sans-serif", fontSize: 14, fontWeight: 600 }}>
              S'inscrire
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
