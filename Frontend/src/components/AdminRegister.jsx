import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User, Shield, Eye, EyeOff, ArrowRight } from "lucide-react";
import { BRAND, BRAND_DARK } from "../constants.jsx";
import { Logo } from "./ui";

export default function AdminRegister() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "", secret: "" });
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const ADMIN_SECRET = "muziki-admin-2024"; // kept in app, not visible on normal pages

  const inputStyle = {
    width: "100%", padding: "12px 16px 12px 44px", borderRadius: 10,
    border: "1.5px solid #e0e0e0", fontSize: 14, fontFamily: "sans-serif",
    outline: "none", boxSizing: "border-box", color: "#222", transition: "border-color 0.2s",
  };
  const focus = e => e.target.style.borderColor = BRAND;
  const blur = e => e.target.style.borderColor = "#e0e0e0";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) { setError("Remplissez tous les champs."); return; }
    if (form.password !== form.confirm) { setError("Les mots de passe ne correspondent pas."); return; }
    if (form.secret !== ADMIN_SECRET) { setError("Code secret administrateur invalide."); return; }

    const admins = JSON.parse(localStorage.getItem("mk_admins") || "[]");
    if (admins.find(a => a.email === form.email)) { setError("Cet email est déjà utilisé."); return; }
    admins.push({ name: form.name, email: form.email, password: form.password, role: "admin" });
    localStorage.setItem("mk_admins", JSON.stringify(admins));
    setDone(true);
  };

  if (done) return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0a0a1a, #1a0a3a, #2d0e6e)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ background: "white", borderRadius: 20, padding: "40px 36px", maxWidth: 400, width: "100%", textAlign: "center" }}>
        <Shield size={48} color={BRAND} style={{ marginBottom: 16 }} />
        <h2 style={{ fontFamily: "'Georgia', serif", color: BRAND, marginBottom: 12 }}>Compte admin créé !</h2>
        <p style={{ fontFamily: "sans-serif", fontSize: 14, color: "#666", marginBottom: 24 }}>Vous pouvez maintenant vous connecter.</p>
        <button onClick={() => navigate("/login")} style={{ background: `linear-gradient(135deg, ${BRAND_DARK}, ${BRAND})`, color: "white", border: "none", borderRadius: 10, padding: "12px 28px", fontFamily: "sans-serif", fontWeight: 700, cursor: "pointer" }}>
          Se connecter
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0a0a1a 0%, #1a0a3a 50%, #2d0e6e 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      {[...Array(4)].map((_, i) => (
        <div key={i} style={{ position: "fixed", borderRadius: "50%", border: `1px solid rgba(100,100,255,${0.06 + i * 0.02})`, width: 200 + i * 150, height: 200 + i * 150, top: "50%", left: "50%", transform: "translate(-50%, -50%)", pointerEvents: "none" }} />
      ))}
      <div style={{ width: "100%", maxWidth: 440, position: "relative", zIndex: 1 }}>
        <div style={{ background: "white", borderRadius: 20, padding: "40px 36px", boxShadow: "0 24px 64px rgba(0,0,0,0.4)" }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <Logo size={52} />
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 12, background: "#f0f0ff", borderRadius: 20, padding: "4px 14px" }}>
              <Shield size={13} color="#4a4aff" />
              <span style={{ fontFamily: "sans-serif", fontSize: 12, color: "#4a4aff", fontWeight: 700 }}>ACCÈS ADMINISTRATEUR</span>
            </div>
            <h1 style={{ fontFamily: "'Georgia', serif", fontSize: 22, fontWeight: 800, color: "#2d0e6e", margin: "12px 0 4px" }}>Créer un compte Admin</h1>
            <p style={{ fontFamily: "sans-serif", fontSize: 13, color: "#888", margin: 0 }}>Inscription réservée aux administrateurs MUZIKI KWETU</p>
          </div>

          <form onSubmit={handleSubmit}>
            {[
              { key: "name", icon: <User size={16} />, placeholder: "Nom complet *", type: "text" },
              { key: "email", icon: <Mail size={16} />, placeholder: "Email administrateur *", type: "email" },
            ].map(({ key, icon, placeholder, type }) => (
              <div key={key} style={{ position: "relative", marginBottom: 12 }}>
                <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#aaa", pointerEvents: "none" }}>{icon}</div>
                <input type={type} placeholder={placeholder} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} style={inputStyle} onFocus={focus} onBlur={blur} />
              </div>
            ))}

            <div style={{ position: "relative", marginBottom: 12 }}>
              <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#aaa", pointerEvents: "none" }}><Lock size={16} /></div>
              <input type={showPwd ? "text" : "password"} placeholder="Mot de passe *" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} style={{ ...inputStyle, paddingRight: 44 }} onFocus={focus} onBlur={blur} />
              <button type="button" onClick={() => setShowPwd(s => !s)} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#aaa", padding: 0 }}>
                {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <div style={{ position: "relative", marginBottom: 12 }}>
              <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#aaa", pointerEvents: "none" }}><Lock size={16} /></div>
              <input type="password" placeholder="Confirmer le mot de passe *" value={form.confirm} onChange={e => setForm({ ...form, confirm: e.target.value })} style={inputStyle} onFocus={focus} onBlur={blur} />
            </div>

            <div style={{ position: "relative", marginBottom: 8 }}>
              <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#aaa", pointerEvents: "none" }}><Shield size={16} /></div>
              <input type="password" placeholder="Code secret administrateur *" value={form.secret} onChange={e => setForm({ ...form, secret: e.target.value })} style={inputStyle} onFocus={focus} onBlur={blur} />
            </div>

            {error && <p style={{ fontFamily: "sans-serif", fontSize: 13, color: BRAND, margin: "10px 0", textAlign: "center" }}>{error}</p>}

            <button type="submit" style={{ width: "100%", background: "linear-gradient(135deg, #1a0a3a, #2d0e6e)", color: "white", border: "none", borderRadius: 10, padding: "14px", fontSize: 15, fontFamily: "sans-serif", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 16 }}>
              Créer le compte <ArrowRight size={18} />
            </button>
          </form>

          <p style={{ textAlign: "center", fontFamily: "sans-serif", fontSize: 13, color: "#aaa", marginTop: 20, marginBottom: 0 }}>
            Déjà admin ?{" "}
            <span onClick={() => navigate("/login")} style={{ color: "#4a4aff", fontWeight: 700, cursor: "pointer" }}>Se connecter</span>
          </p>
        </div>
        <p style={{ textAlign: "center", marginTop: 20, fontFamily: "sans-serif", fontSize: 13, color: "rgba(255,255,255,0.5)", cursor: "pointer" }} onClick={() => navigate("/")}>
          ← Retour au site
        </p>
      </div>
    </div>
  );
}
