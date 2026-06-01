import { BookOpen, Target, Heart, DollarSign, Handshake } from "lucide-react";
import { BRAND, BRAND_DARK, BRAND_LIGHT, budget } from "../constants.jsx";
import { SectionHeader } from "./ui";

const partners = ["Institut Français de Bukavu", "Coopération Suisse", "Croix Rouge", "Fondation Orange", "ENABEL", "Centre Heri Kwetu", "PEDER", "Foyer EK'ABANA", "Kwetu Art", "Ndaro Art Culture", "Centre Culturel EKA", "Music Fund", "Notes Chrétiennes", "Les Voix du Levant"];

export default function Programme() {
  return (
    <section id="programme" style={{ padding: "100px 24px", background: "#f8f4f0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeader label="Programme" title="Programme de Musique MUZIKI KWETU" color={BRAND} />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginBottom: 60 }}>
          {[
            { icon: <BookOpen size={32} />, title: "Contexte & Justification", text: "La musique est un puissant vecteur de paix, d'expression et d'unité dans un contexte marqué par les conflits, les déplacements et le chômage des jeunes au Kivu." },
            { icon: <Target size={32} />, title: "Objectif Général", text: "Promouvoir la musique dans un cadre africain ancré dans les réalités socioéconomiques locales, créer un conservatoire et un orchestre symphonique du Kivu." },
            { icon: <Heart size={32} />, title: "Impact Attendu", text: "Insertion professionnelle de jeunes musiciens, émergence d'un orchestre symphonique, contribution à la paix et à la reconstruction par l'art." },
          ].map((card, i) => (
            <div key={i} style={{ background: "white", borderRadius: 16, padding: 32, boxShadow: "0 2px 20px rgba(0,0,0,0.06)", borderTop: `4px solid ${BRAND}` }}>
              <div style={{ color: BRAND, marginBottom: 16 }}>{card.icon}</div>
              <h3 style={{ fontFamily: "sans-serif", fontSize: 18, fontWeight: 700, color: "#222", marginBottom: 12 }}>{card.title}</h3>
              <p style={{ fontFamily: "sans-serif", fontSize: 14, color: "#666", lineHeight: 1.8 }}>{card.text}</p>
            </div>
          ))}
        </div>

        {/* Budget */}
        <div style={{ background: "white", borderRadius: 20, padding: 40, boxShadow: "0 4px 30px rgba(0,0,0,0.08)" }}>
          <h3 style={{ fontFamily: "sans-serif", fontSize: 22, fontWeight: 700, color: "#222", marginBottom: 8, display: "flex", alignItems: "center", gap: 10 }}>
            <DollarSign size={24} color={BRAND} /> Budget Estimatif Global : <span style={{ color: BRAND }}>900 000$</span>
          </h3>
          <p style={{ fontFamily: "sans-serif", color: "#888", marginBottom: 32, fontSize: 14 }}>Répartition des fonds nécessaires au développement du programme</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {budget.map((item, i) => (
              <div key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontFamily: "sans-serif" }}>
                  <span style={{ fontSize: 14, color: "#444" }}>{item.label}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: BRAND }}>{item.amount}</span>
                </div>
                <div style={{ height: 8, background: "#f0f0f0", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${item.pct}%`, background: `linear-gradient(90deg, ${BRAND_DARK}, ${BRAND})`, borderRadius: 4 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Partners */}
        <div style={{ marginTop: 60 }}>
          <h3 style={{ fontFamily: "sans-serif", fontSize: 20, fontWeight: 700, color: "#222", marginBottom: 24, display: "flex", alignItems: "center", gap: 8 }}>
            <Handshake size={22} color={BRAND} /> Partenaires Envisagés
          </h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {partners.map(p => (
              <span key={p} style={{ background: BRAND_LIGHT, color: BRAND_DARK, border: `1px solid ${BRAND}`, borderRadius: 20, padding: "6px 16px", fontSize: 13, fontFamily: "sans-serif", fontWeight: 500 }}>{p}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
