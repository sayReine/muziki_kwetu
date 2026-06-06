import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, Phone, ArrowRight, Eye, EyeOff, Music, CheckCircle } from "lucide-react";
import { BRAND, BRAND_DARK, BRAND_LIGHT, subprojects } from "../constants.jsx";
import { Logo } from "./ui";

const programmes = subprojects.map(s => s.title);

export default function Register({ onNavigate }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showPwd, setShowPwd] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    password: "", confirm: "", programme: "", level: "", motivation: "",
  });
  const [error, setError] = useState("");

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const inputStyle = {
    width: "100%", padding: "12px 16px 12px 44px", borderRadius: 10,
    border: "1.5px solid #e0e0e0", fontSize: 14, fontFamily: "sans-serif",
    outline: "none", boxSizing: "border-box", color: "#222", transition: "border-color 0.2s",
  };
  const plainInput = { ...inputStyle, paddingLeft: 16 };
  const focus = e => e.target.style.borderColor = BRAND;
  const blur = e => e.target.style.borderColor = "#e0e0e0";

  const nextStep = () => {
    if (step === 1 && (!form.firstName || !form.lastName || !form.email || !form.phone)) {
      setError("Veuillez remplir tous les champs."); return;
    }
    if (step === 2 && (!form.password || form.password !== form.confirm)) {
      setError("Les mots de passe ne correspondent pas."); return;
    }
    if (step === 3 && !form.programme) {
      setError("Veuillez choisir un programme."); return;
    }
    setError(""); setStep(s => s + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.motivation) { setError("Veuillez écrire une motivation."); return; }
    const users = JSON.parse(localStorage.getItem("mk_users") || "[]");
    users.push({ ...form, role: "user", joinedAt: new Date().toISOString() });
    localStorage.setItem("mk_users", JSON.stringify(users));
    setDone(true);
  };

  const Icon = ({ icon, ...rest }) => <div style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#aaa", pointerEvents: "none" }}>{icon}</div>;

  if (done) return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, #1a0a0a, #3d0e0e, ${BRAND})`, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ background: "white", borderRadius: 20, padding: "48px 36px", maxWidth: 420, width: "100%", textAlign: "center", boxShadow: "0 24px 64px rgba(0,0,0,0.3)" }}>
        <div style={{ width: 72, height: 72, borderRadius: "50%", background: BRAND_LIGHT, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
          <CheckCircle size={36} color={BRAND} />
        </div>
        <h2 style={{ fontFamily: "'Georgia', serif", fontSize: 24, fontWeight: 800, color: BRAND, marginBottom: 12 }}>Inscription envoyée !</h2>
        <p style={{ fontFamily: "sans-serif", fontSize: 15, color: "#666", lineHeight: 1.7, marginBottom: 28 }}>
          Bienvenue dans la famille <strong>MUZIKI KWETU</strong>, {form.firstName} !<br />
          Votre demande d'inscription au programme <strong>{form.programme}</strong> a été reçue. Nous vous contacterons bientôt.
        </p>
        <button onClick={() => navigate("/")} style={{ background: `linear-gradient(135deg, ${BRAND_DARK}, ${BRAND})`, color: "white", border: "none", borderRadius: 10, padding: "12px 28px", fontSize: 15, fontFamily: "sans-serif", fontWeight: 700, cursor: "pointer" }}>
          Retour au site
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, #1a0a0a 0%, #3d0e0e 50%, ${BRAND} 100%)`, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      {[...Array(4)].map((_, i) => (
        <div key={i} style={{ position: "fixed", borderRadius: "50%", border: `1px solid rgba(255,255,255,${0.04 + i * 0.02})`, width: 200 + i * 150, height: 200 + i * 150, top: "50%", left: "50%", transform: "translate(-50%, -50%)", pointerEvents: "none" }} />
      ))}

      <div style={{ width: "100%", maxWidth: 480, position: "relative", zIndex: 1 }}>
        <div style={{ background: "white", borderRadius: 20, padding: "40px 36px", boxShadow: "0 24px 64px rgba(0,0,0,0.3)" }}>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
              <Logo size={52} />
            </div>
            <h1 style={{ fontFamily: "'Georgia', serif", fontSize: 22, fontWeight: 800, color: BRAND, margin: "0 0 4px" }}>Rejoindre MUZIKI KWETU</h1>
            <p style={{ fontFamily: "sans-serif", fontSize: 13, color: "#888", margin: 0 }}>Inscription au programme — Étape {step} / 4</p>
          </div>

          {/* Step progress */}
          <div style={{ display: "flex", gap: 6, marginBottom: 28 }}>
            {[1, 2, 3, 4].map(n => (
              <div key={n} style={{ flex: 1, height: 4, borderRadius: 2, background: n <= step ? BRAND : "#f0f0f0", transition: "background 0.3s" }} />
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1 — Personal info */}
            {step === 1 && (
              <div>
                <p style={{ fontFamily: "sans-serif", fontSize: 13, fontWeight: 700, color: "#555", marginBottom: 14, textTransform: "uppercase", letterSpacing: 1 }}>Informations personnelles</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                  <div style={{ position: "relative" }}>
                    <Icon icon={<User size={16} />} />
                    <input placeholder="Prénom *" value={form.firstName} onChange={e => set("firstName", e.target.value)} style={inputStyle} onFocus={focus} onBlur={blur} />
                  </div>
                  <div style={{ position: "relative" }}>
                    <Icon icon={<User size={16} />} />
                    <input placeholder="Nom *" value={form.lastName} onChange={e => set("lastName", e.target.value)} style={inputStyle} onFocus={focus} onBlur={blur} />
                  </div>
                </div>
                <div style={{ position: "relative", marginBottom: 12 }}>
                  <Icon icon={<Mail size={16} />} />
                  <input type="email" placeholder="Adresse email *" value={form.email} onChange={e => set("email", e.target.value)} style={inputStyle} onFocus={focus} onBlur={blur} />
                </div>
                <div style={{ position: "relative", marginBottom: 4 }}>
                  <Icon icon={<Phone size={16} />} />
                  <input type="tel" placeholder="Téléphone *" value={form.phone} onChange={e => set("phone", e.target.value)} style={inputStyle} onFocus={focus} onBlur={blur} />
                </div>
              </div>
            )}

            {/* Step 2 — Password */}
            {step === 2 && (
              <div>
                <p style={{ fontFamily: "sans-serif", fontSize: 13, fontWeight: 700, color: "#555", marginBottom: 14, textTransform: "uppercase", letterSpacing: 1 }}>Sécurité du compte</p>
                <div style={{ position: "relative", marginBottom: 12 }}>
                  <Icon icon={<Lock size={16} />} />
                  <input type={showPwd ? "text" : "password"} placeholder="Mot de passe *" value={form.password} onChange={e => set("password", e.target.value)} style={{ ...inputStyle, paddingRight: 44 }} onFocus={focus} onBlur={blur} />
                  <button type="button" onClick={() => setShowPwd(s => !s)} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#aaa", padding: 0 }}>
                    {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <div style={{ position: "relative", marginBottom: 4 }}>
                  <Icon icon={<Lock size={16} />} />
                  <input type="password" placeholder="Confirmer le mot de passe *" value={form.confirm} onChange={e => set("confirm", e.target.value)} style={inputStyle} onFocus={focus} onBlur={blur} />
                </div>
                {form.password && form.confirm && form.password !== form.confirm && (
                  <p style={{ fontFamily: "sans-serif", fontSize: 12, color: BRAND, margin: "8px 0 0" }}>Les mots de passe ne correspondent pas.</p>
                )}
              </div>
            )}

            {/* Step 3 — Programme choice */}
            {step === 3 && (
              <div>
                <p style={{ fontFamily: "sans-serif", fontSize: 13, fontWeight: 700, color: "#555", marginBottom: 14, textTransform: "uppercase", letterSpacing: 1 }}>Choisir un programme</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
                  {programmes.map(p => (
                    <label key={p} onClick={() => set("programme", p)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 10, border: `1.5px solid ${form.programme === p ? BRAND : "#e0e0e0"}`, background: form.programme === p ? BRAND_LIGHT : "white", cursor: "pointer", transition: "all 0.2s" }}>
                      <div style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${form.programme === p ? BRAND : "#ccc"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        {form.programme === p && <div style={{ width: 8, height: 8, borderRadius: "50%", background: BRAND }} />}
                      </div>
                      <span style={{ fontFamily: "sans-serif", fontSize: 14, color: form.programme === p ? BRAND_DARK : "#444", fontWeight: form.programme === p ? 600 : 400 }}>{p}</span>
                    </label>
                  ))}
                </div>
                <div style={{ position: "relative" }}>
                  <select value={form.level} onChange={e => set("level", e.target.value)} style={{ ...plainInput, appearance: "none", color: form.level ? "#222" : "#aaa" }}>
                    <option value="">Niveau musical actuel</option>
                    <option>Débutant</option>
                    <option>Intermédiaire</option>
                    <option>Avancé</option>
                    <option>Professionnel</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 4 — Motivation */}
            {step === 4 && (
              <div>
                <p style={{ fontFamily: "sans-serif", fontSize: 13, fontWeight: 700, color: "#555", marginBottom: 14, textTransform: "uppercase", letterSpacing: 1 }}>Lettre de motivation</p>
                <div style={{ background: BRAND_LIGHT, borderRadius: 10, padding: "12px 16px", marginBottom: 16, borderLeft: `3px solid ${BRAND}` }}>
                  <p style={{ fontFamily: "sans-serif", fontSize: 13, color: BRAND_DARK, margin: 0, lineHeight: 1.6 }}>
                    Programme choisi : <strong>{form.programme}</strong>
                  </p>
                </div>
                <textarea
                  placeholder="Pourquoi souhaitez-vous rejoindre MUZIKI KWETU ? Parlez-nous de votre parcours musical et de vos objectifs... *"
                  value={form.motivation} onChange={e => set("motivation", e.target.value)}
                  rows={6} style={{ ...plainInput, resize: "vertical", lineHeight: 1.6 }}
                  onFocus={focus} onBlur={blur}
                />
              </div>
            )}

            {error && <p style={{ fontFamily: "sans-serif", fontSize: 13, color: BRAND, margin: "12px 0 0", textAlign: "center" }}>{error}</p>}

            <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
              {step > 1 && (
                <button type="button" onClick={() => { setStep(s => s - 1); setError(""); }} style={{ flex: 1, background: "#f5f5f5", color: "#555", border: "none", borderRadius: 10, padding: "13px", fontSize: 14, fontFamily: "sans-serif", fontWeight: 600, cursor: "pointer" }}>
                  ← Retour
                </button>
              )}
              {step < 4 ? (
                <button type="button" onClick={nextStep} style={{ flex: 2, background: `linear-gradient(135deg, ${BRAND_DARK}, ${BRAND})`, color: "white", border: "none", borderRadius: 10, padding: "13px", fontSize: 14, fontFamily: "sans-serif", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  Continuer <ArrowRight size={16} />
                </button>
              ) : (
                <button type="submit" style={{ flex: 2, background: `linear-gradient(135deg, ${BRAND_DARK}, ${BRAND})`, color: "white", border: "none", borderRadius: 10, padding: "13px", fontSize: 14, fontFamily: "sans-serif", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  <Music size={16} /> Soumettre mon inscription
                </button>
              )}
            </div>
          </form>

          <p style={{ textAlign: "center", fontFamily: "sans-serif", fontSize: 14, color: "#888", marginTop: 20, marginBottom: 0 }}>
            Déjà membre ?{" "}
            <span onClick={() => navigate("/login")} style={{ color: BRAND, fontWeight: 700, cursor: "pointer" }}>Se connecter</span>
          </p>
        </div>

        <p style={{ textAlign: "center", marginTop: 20, fontFamily: "sans-serif", fontSize: 13, color: "rgba(255,255,255,0.6)", cursor: "pointer" }} onClick={() => navigate("/")}>
          ← Retour au site
        </p>
      </div>
    </div>
  );
}
