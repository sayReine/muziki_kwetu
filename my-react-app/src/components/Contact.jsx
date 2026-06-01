import { Mail, Phone, MapPin, Share2, XIcon, MessageCircle } from "lucide-react";
import { BRAND } from "../constants.jsx";
import { SectionHeader, ContactForm } from "./ui";

export default function Contact() {
  return (
    <section id="contact" style={{ padding: "100px 24px", background: "linear-gradient(135deg, #1a0a0a, #3d0e0e)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <SectionHeader label="Contact" title="Rejoignez Notre Mission" color="#FAD7A0" light />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60 }} className="two-col">
          <div>
            <p style={{ fontFamily: "sans-serif", fontSize: 17, color: "rgba(255,255,255,0.8)", lineHeight: 1.9, marginBottom: 32 }}>
              Nous recherchons des partenaires, financeurs et collaborateurs partageant notre vision de transformer la musique en vecteur de paix, d'éducation et d'insertion professionnelle au Kivu.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                { icon: <Mail size={20} />, label: "Email", value: "muzikikwetu243@gmail.com", href: "mailto:muzikikwetu243@gmail.com" },
                { icon: <Phone size={20} />, label: "Téléphone", value: "+243 979 486 495 / +243 972 882 394", href: "tel:+243979486495" },
                { icon: <MapPin size={20} />, label: "Adresse", value: "Bukavu, Province du Sud-Kivu, RDC", href: null },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(192,57,43,0.3)", display: "flex", alignItems: "center", justifyContent: "center", color: "#FAD7A0", flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontFamily: "sans-serif", fontSize: 12, color: "rgba(255,255,255,0.5)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 2 }}>{item.label}</div>
                    {item.href
                      ? <a href={item.href} style={{ fontFamily: "sans-serif", fontSize: 15, color: "white", textDecoration: "none" }}>{item.value}</a>
                      : <span style={{ fontFamily: "sans-serif", fontSize: 15, color: "white" }}>{item.value}</span>}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 36 }}>
              {[{ icon: <Share2 size={20} />, href: "#" }, { icon: <MessageCircle size={20} />, href: "#" }, { icon: <XIcon size={20} />, href: "#" }].map((s, i) => (
                <a key={i} href={s.href} style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.8)", textDecoration: "none" }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: 40 }}>
              <h3 style={{ fontFamily: "sans-serif", fontSize: 20, fontWeight: 700, color: "white", marginBottom: 24 }}>Demande de Partenariat</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
