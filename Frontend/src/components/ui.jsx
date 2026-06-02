import { useState } from "react";
import { Music, ArrowRight } from "lucide-react";
import { BRAND, BRAND_DARK, BRAND_LIGHT } from "../constants.jsx";

export function Avatar({ initials, size = 48 }) {
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: BRAND_LIGHT, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: size * 0.3, color: BRAND_DARK, border: `2px solid ${BRAND}`, flexShrink: 0 }}>
      {initials}
    </div>
  );
}

export function Logo({ size = 40 }) {
  return (
    <img src="/image.png" alt="Muziki Kwetu Logo" style={{ width: size, height: size, objectFit: "contain", background: "transparent" }} onError={e => { e.target.style.display = "none"; }} />
  );
}

export function SectionHeader({ label, title, color, light }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 60 }}>
      <div style={{ display: "inline-block", background: light ? "rgba(255,255,255,0.1)" : BRAND_LIGHT, color: light ? "#FAD7A0" : BRAND, borderRadius: 20, padding: "6px 20px", fontSize: 12, fontFamily: "sans-serif", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>
        {label}
      </div>
      <h2 style={{ fontFamily: "'Georgia', serif", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 800, color: light ? "white" : "#1a1a1a", margin: 0 }}>
        {title}
      </h2>
      <div style={{ width: 60, height: 4, background: color, margin: "20px auto 0", borderRadius: 2 }} />
    </div>
  );
}

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", org: "", message: "" });
  const [sent, setSent] = useState(false);

  const inputStyle = { width: "100%", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, padding: "12px 16px", color: "white", fontFamily: "sans-serif", fontSize: 14, outline: "none", marginBottom: 16, boxSizing: "border-box" };

  if (sent) return (
    <div style={{ textAlign: "center", padding: "40px 0" }}>
      <div style={{ width: 60, height: 60, borderRadius: "50%", background: "rgba(192,57,43,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
        <Music size={28} color="#FAD7A0" />
      </div>
      <h4 style={{ color: "white", fontFamily: "sans-serif", marginBottom: 8 }}>Message envoyé !</h4>
      <p style={{ color: "rgba(255,255,255,0.6)", fontFamily: "sans-serif", fontSize: 14 }}>Nous vous répondrons très prochainement.</p>
    </div>
  );

  return (
    <div>
      <input placeholder="Votre nom *" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle} />
      <input placeholder="Email *" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={inputStyle} />
      <input placeholder="Organisation / Institution" value={form.org} onChange={e => setForm({ ...form, org: e.target.value })} style={inputStyle} />
      <textarea placeholder="Votre message *" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={4} style={{ ...inputStyle, resize: "vertical", marginBottom: 20 }} />
      <button onClick={e => { e.preventDefault(); if (form.name && form.email && form.message) setSent(true); }} style={{ width: "100%", background: BRAND, color: "white", border: "none", borderRadius: 10, padding: "14px", fontSize: 15, fontFamily: "sans-serif", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
        Envoyer le message <ArrowRight size={18} />
      </button>
    </div>
  );
}
