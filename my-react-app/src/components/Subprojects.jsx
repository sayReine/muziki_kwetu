import { Users } from "lucide-react";
import { BRAND, subprojects } from "../constants.jsx";
import { SectionHeader } from "./ui";

export default function Subprojects() {
  return (
    <section id="subprojects" style={{ padding: "100px 24px", background: "#1a0a0a" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeader label="Sous-projets" title="Nos Programmes Détaillés" color="#FAD7A0" light />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
          {subprojects.map((sp, i) => (
            <div key={i}
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: 28, transition: "all 0.3s", cursor: "default" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(192,57,43,0.15)"; e.currentTarget.style.borderColor = BRAND; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}>
              <div style={{ color: "#FAD7A0", marginBottom: 16 }}>{sp.icon}</div>
              <h3 style={{ fontFamily: "sans-serif", fontSize: 17, fontWeight: 700, color: "white", marginBottom: 10, lineHeight: 1.3 }}>{sp.title}</h3>
              <p style={{ fontFamily: "sans-serif", fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.7, marginBottom: 16 }}>{sp.desc}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Users size={14} color={BRAND} />
                <span style={{ fontSize: 12, color: BRAND, fontFamily: "sans-serif" }}>{sp.target}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
