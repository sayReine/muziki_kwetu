import { MapPin, Target, Layers, ChevronRight } from "lucide-react";
import { BRAND, domaines } from "../constants.jsx";
import { SectionHeader } from "./ui";

export default function About() {
  return (
    <section id="about" style={{ padding: "100px 24px", background: "#fffdf9" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeader label="À propos" title="Qui sommes-nous ?" color={BRAND} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }} className="two-col">
          <div>
            <p style={{ fontSize: 17, lineHeight: 1.9, color: "#444", marginBottom: 20, fontFamily: "sans-serif" }}>
              MUZIKI KWETU est né de la passion commune de jeunes artistes, chanteurs, musiciens et amateurs de musique engagés pour la promotion de la culture locale et le développement des talents musicaux à Bukavu et dans la région des Grands Lacs.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.9, color: "#444", marginBottom: 20, fontFamily: "sans-serif" }}>
              Le projet a vu le jour en <strong>2022</strong>, porté par une équipe dynamique désireuse de créer un espace d'expression, de formation et de valorisation de la musique congolaise.
            </p>
            <p style={{ fontSize: 17, lineHeight: 1.9, color: "#444", fontFamily: "sans-serif" }}>
              Le mot <strong style={{ color: BRAND }}>"KWETU"</strong>, qui signifie <em>"chez nous"</em> en swahili, reflète l'identité locale, la proximité et l'ancrage culturel de l'initiative.
            </p>
            <blockquote style={{ borderLeft: `4px solid ${BRAND}`, marginTop: 32, paddingLeft: 20, fontStyle: "italic", color: "#666", lineHeight: 1.8 }}>
              "Aujourd'hui, MUZIKI KWETU se positionne comme un acteur culturel innovant, ouvert aux partenariats, à la formation et à l'exportation de la musique locale vers des scènes plus larges, tout en gardant son essence : <strong>la musique, chez nous, pour nous.</strong>"
              <footer style={{ marginTop: 8, fontStyle: "normal", fontSize: 13, fontFamily: "sans-serif", fontWeight: 600, color: BRAND }}>— Audace BISONGA, Directeur Général</footer>
            </blockquote>
          </div>

          <div>
            <div style={{ background: "white", borderRadius: 16, padding: 32, boxShadow: "0 4px 30px rgba(0,0,0,0.08)", marginBottom: 24 }}>
              <h3 style={{ color: BRAND, fontSize: 18, fontWeight: 700, marginBottom: 20, fontFamily: "sans-serif", display: "flex", alignItems: "center", gap: 8 }}>
                <Target size={20} /> Mission
              </h3>
              <p style={{ color: "#555", lineHeight: 1.8, fontFamily: "sans-serif" }}>
                Promouvoir la musique locale, encadrer les jeunes talents et valoriser le patrimoine musical à travers la formation, la création et la diffusion artistique.
              </p>
            </div>

            <div style={{ background: "white", borderRadius: 16, padding: 32, boxShadow: "0 4px 30px rgba(0,0,0,0.08)", marginBottom: 24 }}>
              <h3 style={{ color: BRAND, fontSize: 18, fontWeight: 700, marginBottom: 16, fontFamily: "sans-serif", display: "flex", alignItems: "center", gap: 8 }}>
                <Layers size={20} /> Domaines d'action
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {domaines.map((d, i) => (
                  <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "6px 0", fontFamily: "sans-serif", fontSize: 14, color: "#555", borderBottom: i < domaines.length - 1 ? "1px solid #f5f5f5" : "none" }}>
                    <ChevronRight size={16} color={BRAND} style={{ marginTop: 2, flexShrink: 0 }} />{d}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ background: BRAND, borderRadius: 16, padding: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <MapPin size={18} color="white" />
                <span style={{ color: "white", fontWeight: 700, fontSize: 16, fontFamily: "sans-serif" }}>Localisation</span>
              </div>
              <p style={{ color: "rgba(255,255,255,0.9)", fontFamily: "sans-serif", margin: 0, lineHeight: 1.7 }}>
                Bukavu · Goma · Uvira · Kindu<br />
                <span style={{ fontSize: 13, opacity: 0.8 }}>République Démocratique du Congo</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
