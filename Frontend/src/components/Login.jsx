import { useState } from "react";
import { Music, Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { BRAND, BRAND_DARK, BRAND_LIGHT } from "../constants.jsx";
import { Logo } from "./ui";

export default function Login({ onNavigate }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");

  const inputStyle = {
    width: "100%", padding: "12px 16px 12px 44px", borderRadius: 10,
    border: `1.5px solid #e0e0e0`, fontSize: 15, fontFamily: "sans-serif",
    outline: "none", boxSizing: "border-box", color: "#222",
    transition: "border-color 0.2s",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) { setError("Veuillez remplir tous les champs."); return; }
    // TODO: connect to backend auth
    setError("Connexion en cours...");
  };

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, #1a0a0a 0%, #3d0e0e 50%, ${BRAND} 100%)`, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      {/* Decorative circles */}
      {[...Array(4)].map((_, i) => (
        <div key={i} style={{ position: "fixed", borderRadius: "50%", border: `1px solid rgba(255,255,255,${0.04 + i * 0.02})`, width: 200 + i * 150, height: 200 + i * 150, top: "50%", left: "50%", transform: "translate(-50%, -50%)", pointerEvents: "none" }} />
      ))}

      <div style={{ width: "100%", maxWidth: 440, position: "relative", zIndex: 1 }}>
        {/* Card */}
        <div style={{ background: "white", borderRadius: 20, padding: "40px 36px", boxShadow: "0 24px 64px rgba(0,0,0,0.3)" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
              <Logo size={64} />
            </div>
            <h1 style={{ fontFamily: "'Georgia', serif", fontSize: 26, fontWeight: 800, color: BRAND, margin: "0 0 6px" }}>MUZIKI KWETU</h1>
            <p style={{ fontFamily: "sans-serif", fontSize: 14, color: "#888", margin: 0 }}>Connexion à votre espace membre</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div style={{ position: "relative", marginBottom: 16 }}>
              <Mail size={18} color="#aaa" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
              <input
                type="email" placeholder="Adresse email"
                value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = BRAND}
                onBlur={e => e.target.style.borderColor = "#e0e0e0"}
              />
            </div>

            {/* Password */}
            <div style={{ position: "relative", marginBottom: 8 }}>
              <Lock size={18} color="#aaa" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)" }} />
              <input
                type={showPwd ? "text" : "password"} placeholder="Mot de passe"
                value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
                style={{ ...inputStyle, paddingRight: 44 }}
                onFocus={e => e.target.style.borderColor = BRAND}
                onBlur={e => e.target.style.borderColor = "#e0e0e0"}
              />
              <button type="button" onClick={() => setShowPwd(s => !s)} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#aaa", padding: 0 }}>
                {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div style={{ textAlign: "right", marginBottom: 24 }}>
              <span style={{ fontFamily: "sans-serif", fontSize: 13, color: BRAND, cursor: "pointer" }}>Mot de passe oublié ?</span>
            </div>

            {error && <p style={{ fontFamily: "sans-serif", fontSize: 13, color: BRAND, marginBottom: 16, textAlign: "center" }}>{error}</p>}

            <button type="submit" style={{ width: "100%", background: `linear-gradient(135deg, ${BRAND_DARK}, ${BRAND})`, color: "white", border: "none", borderRadius: 10, padding: "14px", fontSize: 15, fontFamily: "sans-serif", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              Se connecter <ArrowRight size={18} />
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "24px 0" }}>
            <div style={{ flex: 1, height: 1, background: "#f0f0f0" }} />
            <span style={{ fontFamily: "sans-serif", fontSize: 12, color: "#ccc" }}>OU</span>
            <div style={{ flex: 1, height: 1, background: "#f0f0f0" }} />
          </div>

          <p style={{ textAlign: "center", fontFamily: "sans-serif", fontSize: 14, color: "#888", margin: 0 }}>
            Pas encore membre ?{" "}
            <span onClick={() => onNavigate("register")} style={{ color: BRAND, fontWeight: 700, cursor: "pointer" }}>
              S'inscrire au programme
            </span>
          </p>
        </div>

        {/* Back to site */}
        <p style={{ textAlign: "center", marginTop: 20, fontFamily: "sans-serif", fontSize: 13, color: "rgba(255,255,255,0.6)", cursor: "pointer" }} onClick={() => onNavigate("home")}>
          ← Retour au site
        </p>
      </div>
    </div>
  );
}
