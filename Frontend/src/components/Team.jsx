import { Mail } from "lucide-react";
import { BRAND, team } from "../constants.jsx";
import { Avatar, SectionHeader } from "./ui";

export default function Team() {
  return (
    <section id="team" style={{ padding: "100px 24px", background: "#fffdf9" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeader label="Équipe" title="Administration MUZIKI KWETU" color={BRAND} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {team.map((member, i) => (
            <div key={i} style={{ background: "white", borderRadius: 16, padding: 28, boxShadow: "0 2px 20px rgba(0,0,0,0.06)", display: "flex", gap: 16, alignItems: "flex-start" }}>
              <Avatar initials={member.initials} size={52} />
              <div>
                <div style={{ fontFamily: "sans-serif", fontWeight: 700, fontSize: 16, color: "#222", marginBottom: 4 }}>{member.name}</div>
                <div style={{ fontFamily: "sans-serif", fontSize: 13, color: BRAND, fontWeight: 500, marginBottom: 8, lineHeight: 1.4 }}>{member.role}</div>
                <a href={`mailto:${member.email}`} style={{ fontFamily: "sans-serif", fontSize: 12, color: "#888", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
                  <Mail size={12} />{member.email}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
