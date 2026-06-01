import { useState, useEffect, useRef } from "react";
import { Music, Home, Info, BookOpen, Users, Mail, Menu, X, MapPin, Phone, Facebook, Twitter, MessageCircle, ChevronDown, ArrowRight, Star, Heart, Globe, Award, Mic, Guitar, Radio, Calendar, Target, Layers, FileText, DollarSign, Handshake, ChevronRight } from "lucide-react";

const BRAND = "#C0392B";
const BRAND_DARK = "#922B21";
const BRAND_LIGHT = "#FADBD8";

const navLinks = [
  { label: "Accueil", href: "#home", icon: <Home size={16} /> },
  { label: "À propos", href: "#about", icon: <Info size={16} /> },
  { label: "Programme", href: "#programme", icon: <BookOpen size={16} /> },
  { label: "Sous-projets", href: "#subprojects", icon: <Layers size={16} /> },
  { label: "Équipe", href: "#team", icon: <Users size={16} /> },
  { label: "Contact", href: "#contact", icon: <Mail size={16} /> },
];

const subprojects = [
  { icon: <Music size={28} />, title: "École Populaire de Musique", desc: "Formation musicale de base accessible à tous : solfège, chant, instruments, éveil musical.", target: "Enfants, jeunes, amateurs" },
  { icon: <Mic size={28} />, title: "Chœur Symphonique du Kivu", desc: "Grand chœur mixte inclusif avec répétitions régulières, concerts et enregistrements.", target: "Passionnés de chant choral" },
  { icon: <Guitar size={28} />, title: "Orchestre Symphonique du Kivu", desc: "Ensemble instrumental régional avec ateliers d'instruments et tournées culturelles.", target: "Musiciens formés ou en formation" },
  { icon: <Star size={28} />, title: "Festival MUZIKI KWETU", desc: "Valorisation des talents musicaux locaux via concerts, compétitions et conférences.", target: "Artistes, élèves, public large" },
  { icon: <Award size={28} />, title: "Label Jeune Talent", desc: "Identification, formation et promotion de jeunes musiciens via coaching et mentorat.", target: "Jeunes artistes 13–26 ans" },
  { icon: <Radio size={28} />, title: "MUZIKI & Patrimoine", desc: "Sauvegarde des musiques traditionnelles du Kivu par collecte, transcription et spectacles.", target: "Chercheurs, communautés locales" },
];

const team = [
  { name: "Audace BISONGA", role: "Directeur Général", email: "plumaudacebisonga@gmail.com", initials: "AB" },
  { name: "Yves MWAMI", role: "Directeur Artistique & Secrétaire Administratif", email: "yves.mwami@gmail.com", initials: "YM" },
  { name: "Toni IRAGI", role: "Responsable Pédagogique", email: "iragijacques1912@gmail.com", initials: "TI" },
  { name: "Clément CIHANDO", role: "Responsable Pédagogique Adjoint", email: "cihandomweze@gmail.com", initials: "CC" },
  { name: "ROMUALD Z.", role: "Directeur Musical & Chef d'Orchestre", email: "hyaziha@gmail.com", initials: "RZ" },
  { name: "Romain RAMAZANI", role: "Communication & Chargé de Communication", email: "romainramazani022@gmail.com", initials: "RR" },
];

const domaines = [
  "Formation musicale (Solfège, harmonie, technique vocale, instrument)",
  "Ateliers communautaires / Master class",
  "Création de contenus musicaux",
  "Organisation de concerts et événements",
  "Sensibilisation à travers la musique",
  "Collaboration artistique & Entrepreneuriat",
  "Logistique & Évènementiel",
];

const budget = [
  { label: "Achat du terrain & documents", amount: "100 000$", pct: 11 },
  { label: "Construction du centre", amount: "600 000$", pct: 67 },
  { label: "Équipement musical & pédagogique", amount: "100 000$", pct: 11 },
  { label: "Programmes de formation", amount: "60 000$", pct: 7 },
  { label: "Communication & coordination", amount: "25 000$", pct: 3 },
  { label: "Fonds de démarrage", amount: "15 000$", pct: 2 },
];

function Avatar({ initials, size = 48 }) {
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: BRAND_LIGHT, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: size * 0.3, color: BRAND_DARK, border: `2px solid ${BRAND}`, flexShrink: 0 }}>
      {initials}
    </div>
  );
}

function Logo({ size = 40 }) {
  return (
    <img src="/mnt/user-data/uploads/icon.jpeg" alt="Muziki Kwetu Logo" style={{ width: size, height: size, borderRadius: 8, objectFit: "contain", background: "white" }} onError={e => { e.target.style.display = "none"; }} />
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [expandedFaq, setExpandedFaq] = useState(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = navLinks.map(n => n.href.slice(1));
      for (let s of [...sections].reverse()) {
        const el = document.getElementById(s);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(s);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.slice(1))?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div style={{ fontFamily: "'Georgia', serif", color: "#1a1a1a", minHeight: "100vh", overflowX: "hidden" }}>
      {/* Navbar */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.92)",
        backdropFilter: "blur(10px)",
        boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.12)" : "none",
        borderBottom: scrolled ? `2px solid ${BRAND}` : "none",
        transition: "all 0.3s ease",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} onClick={() => scrollTo("#home")}>
            <Logo size={44} />
            <div>
              <div style={{ fontFamily: "'Georgia', serif", fontWeight: 800, fontSize: 20, color: BRAND, letterSpacing: "-0.3px", lineHeight: 1.1 }}>MUZIKI KWETU</div>
              <div style={{ fontSize: 10, color: "#888", letterSpacing: 1.5, textTransform: "uppercase", fontFamily: "sans-serif" }}>Programme de Musique</div>
            </div>
          </div>

          {/* Desktop links */}
          <div style={{ display: "flex", gap: 4, alignItems: "center" }} className="desktop-nav">
            {navLinks.map(link => (
              <button key={link.href} onClick={() => scrollTo(link.href)} style={{
                display: "flex", alignItems: "center", gap: 6, padding: "8px 14px",
                background: activeSection === link.href.slice(1) ? BRAND : "transparent",
                color: activeSection === link.href.slice(1) ? "white" : "#444",
                border: "none", borderRadius: 8, cursor: "pointer", fontSize: 14,
                fontFamily: "sans-serif", fontWeight: 500, transition: "all 0.2s",
              }}>
                {link.icon}
                {link.label}
              </button>
            ))}
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
                <span style={{ color: BRAND }}>{link.icon}</span>
                {link.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" style={{ minHeight: "100vh", background: `linear-gradient(135deg, #1a0a0a 0%, #3d0e0e 40%, #6b1a1a 70%, ${BRAND} 100%)`, display: "flex", alignItems: "center", position: "relative", overflow: "hidden", paddingTop: 68 }}>
        {/* Decorative circles */}
        {[...Array(5)].map((_, i) => (
          <div key={i} style={{
            position: "absolute", borderRadius: "50%",
            border: `1px solid rgba(255,255,255,${0.05 + i * 0.02})`,
            width: 200 + i * 120, height: 200 + i * 120,
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
          }} />
        ))}
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px", position: "relative", zIndex: 1, width: "100%" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }} className="hero-grid">
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 20, padding: "6px 16px", marginBottom: 24 }}>
                <MapPin size={14} color="white" />
                <span style={{ color: "rgba(255,255,255,0.9)", fontSize: 12, fontFamily: "sans-serif", letterSpacing: 1 }}>BUKAVU · GOMA · UVIRA · KINDU — RDC</span>
              </div>
              <h1 style={{ fontFamily: "'Georgia', serif", fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 900, color: "white", lineHeight: 1.1, marginBottom: 20 }}>
                La Musique,<br />
                <span style={{ color: "#FAD7A0" }}>Chez Nous,</span><br />
                Pour Nous.
              </h1>
              <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 18, lineHeight: 1.8, marginBottom: 36, fontFamily: "sans-serif", maxWidth: 480 }}>
                MUZIKI KWETU est un programme artistique, social et éducatif qui transforme la musique en outil de cohésion sociale et d'insertion professionnelle pour la jeunesse congolaise.
              </p>
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                <button onClick={() => scrollTo("#programme")} style={{ display: "flex", alignItems: "center", gap: 8, background: BRAND, color: "white", border: "none", borderRadius: 10, padding: "14px 28px", fontSize: 15, fontFamily: "sans-serif", fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}>
                  Notre Programme <ArrowRight size={18} />
                </button>
                <button onClick={() => scrollTo("#contact")} style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.12)", color: "white", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 10, padding: "14px 28px", fontSize: 15, fontFamily: "sans-serif", fontWeight: 600, cursor: "pointer" }}>
                  Nous Contacter
                </button>
              </div>
              <div style={{ display: "flex", gap: 32, marginTop: 48 }}>
                {[["2022", "Fondé en"], ["4", "Villes"], ["6", "Sous-projets"], ["900K$", "Budget estimé"]].map(([val, label]) => (
                  <div key={label}>
                    <div style={{ fontSize: 28, fontWeight: 800, color: "#FAD7A0", fontFamily: "sans-serif" }}>{val}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", fontFamily: "sans-serif", letterSpacing: 0.5 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div style={{ position: "relative" }}>
                <div style={{ width: 280, height: 280, borderRadius: "50%", background: "rgba(255,255,255,0.05)", border: `3px solid rgba(255,255,255,0.15)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: 220, height: 220, borderRadius: "50%", background: "rgba(255,255,255,0.08)", border: `3px solid rgba(255,255,255,0.2)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <img src="/mnt/user-data/uploads/icon.jpeg" alt="Muziki Kwetu" style={{ width: 160, height: 160, borderRadius: "50%", objectFit: "contain", background: "white", padding: 8 }} onError={e => { e.target.style.display = "none"; }} />
                  </div>
                </div>
                {[{icon: <Music size={20} />, pos: {top: -10, right: 20}}, {icon: <Mic size={20} />, pos: {bottom: 10, left: -10}}, {icon: <Guitar size={20} />, pos: {top: "50%", right: -20}}].map((item, i) => (
                  <div key={i} style={{ position: "absolute", ...item.pos, width: 44, height: 44, borderRadius: "50%", background: BRAND, display: "flex", alignItems: "center", justifyContent: "center", color: "white", boxShadow: "0 4px 12px rgba(0,0,0,0.3)" }}>
                    {item.icon}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", animation: "bounce 2s infinite" }}>
          <ChevronDown size={28} color="rgba(255,255,255,0.5)" />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "100px 24px", background: "#fffdf9" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHeader label="À propos" title="Qui sommes-nous ?" color={BRAND} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }} className="two-col">
            <div>
              <p style={{ fontSize: 17, lineHeight: 1.9, color: "#444", marginBottom: 20, fontFamily: "sans-serif" }}>
                MUZIKI KWETU est né de la passion commune de jeunes artistes, chanteurs, musiciens et amateurs de musique engagés pour la promotion de la culture locale et le développement des talents musicaux à Bukavu et dans la région des Grands Lacs.
              </p>
              <p style={{ fontSize: 17, lineHeight: 1.9, color: "#444", marginBottom: 20, fontFamily: "sans-serif" }}>
                Le projet a vu le jour en <strong>2022</strong>, porté par une équipe dynamique désireuse de créer un espace d'expression, de formation et de valorisation de la musique congolaise, en particulier celle des jeunes.
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
                      <ChevronRight size={16} color={BRAND} style={{ marginTop: 2, flexShrink: 0 }} />
                      {d}
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

      {/* PROGRAMME */}
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
                    <div style={{ height: "100%", width: `${item.pct}%`, background: `linear-gradient(90deg, ${BRAND_DARK}, ${BRAND})`, borderRadius: 4, transition: "width 1s ease" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Partenaires */}
          <div style={{ marginTop: 60 }}>
            <h3 style={{ fontFamily: "sans-serif", fontSize: 20, fontWeight: 700, color: "#222", marginBottom: 24, display: "flex", alignItems: "center", gap: 8 }}>
              <Handshake size={22} color={BRAND} /> Partenaires Envisagés
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {["Institut Français de Bukavu", "Coopération Suisse", "Croix Rouge", "Fondation Orange", "ENABEL", "Centre Heri Kwetu", "PEDER", "Foyer EK'ABANA", "Kwetu Art", "Ndaro Art Culture", "Centre Culturel EKA", "Music Fund", "Notes Chrétiennes", "Les Voix du Levant"].map(p => (
                <span key={p} style={{ background: BRAND_LIGHT, color: BRAND_DARK, border: `1px solid ${BRAND}`, borderRadius: 20, padding: "6px 16px", fontSize: 13, fontFamily: "sans-serif", fontWeight: 500 }}>{p}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SUBPROJECTS */}
      <section id="subprojects" style={{ padding: "100px 24px", background: "#1a0a0a" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHeader label="Sous-projets" title="Nos Programmes Détaillés" color="#FAD7A0" light />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {subprojects.map((sp, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: 28, transition: "all 0.3s", cursor: "default" }}
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

      {/* TEAM */}
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

      {/* CONTACT */}
      <section id="contact" style={{ padding: "100px 24px", background: `linear-gradient(135deg, #1a0a0a, #3d0e0e)` }}>
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
                      {item.href ? (
                        <a href={item.href} style={{ fontFamily: "sans-serif", fontSize: 15, color: "white", textDecoration: "none" }}>{item.value}</a>
                      ) : (
                        <span style={{ fontFamily: "sans-serif", fontSize: 15, color: "white" }}>{item.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 12, marginTop: 36 }}>
                {[{ icon: <Facebook size={20} />, label: "Facebook" }, { icon: <MessageCircle size={20} />, label: "WhatsApp" }, { icon: <Twitter size={20} />, label: "Twitter X" }].map((s, i) => (
                  <div key={i} style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "rgba(255,255,255,0.8)" }}>
                    {s.icon}
                  </div>
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

      {/* Footer */}
      <footer style={{ background: "#0d0505", padding: "40px 24px", borderTop: `3px solid ${BRAND}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Logo size={36} />
            <div>
              <div style={{ fontFamily: "'Georgia', serif", fontWeight: 800, fontSize: 16, color: BRAND }}>MUZIKI KWETU</div>
              <div style={{ fontFamily: "sans-serif", fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Programme de Musique — Bukavu, RDC</div>
            </div>
          </div>
          <div style={{ fontFamily: "sans-serif", fontSize: 12, color: "rgba(255,255,255,0.4)", textAlign: "center" }}>
            © 2025 MUZIKI KWETU · muzikikwetu243@gmail.com<br />
            Fait à Bukavu — <em>La musique, chez nous, pour nous.</em>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {navLinks.slice(0, 4).map(link => (
              <button key={link.href} onClick={() => scrollTo(link.href)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", cursor: "pointer", fontFamily: "sans-serif", fontSize: 12 }}>
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes bounce { 0%, 100% { transform: translateX(-50%) translateY(0); } 50% { transform: translateX(-50%) translateY(-10px); } }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-grid > div:last-child { display: none; }
          .two-col { grid-template-columns: 1fr !important; }
        }
        * { box-sizing: border-box; }
        body { margin: 0; }
        section, nav, footer { scroll-margin-top: 68px; }
        button:hover { opacity: 0.9; }
      `}</style>
    </div>
  );
}

function SectionHeader({ label, title, color, light }) {
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

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", org: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
  };

  if (sent) return (
    <div style={{ textAlign: "center", padding: "40px 0" }}>
      <div style={{ width: 60, height: 60, borderRadius: "50%", background: "rgba(192,57,43,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
        <Music size={28} color="#FAD7A0" />
      </div>
      <h4 style={{ color: "white", fontFamily: "sans-serif", marginBottom: 8 }}>Message envoyé !</h4>
      <p style={{ color: "rgba(255,255,255,0.6)", fontFamily: "sans-serif", fontSize: 14 }}>Nous vous répondrons très prochainement.</p>
    </div>
  );

  const inputStyle = { width: "100%", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 10, padding: "12px 16px", color: "white", fontFamily: "sans-serif", fontSize: 14, outline: "none", marginBottom: 16, boxSizing: "border-box" };

  return (
    <div>
      <input placeholder="Votre nom *" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={inputStyle} />
      <input placeholder="Email *" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={inputStyle} />
      <input placeholder="Organisation / Institution" value={form.org} onChange={e => setForm({ ...form, org: e.target.value })} style={inputStyle} />
      <textarea placeholder="Votre message *" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={4} style={{ ...inputStyle, resize: "vertical", marginBottom: 20 }} />
      <button onClick={handleSubmit} style={{ width: "100%", background: BRAND, color: "white", border: "none", borderRadius: 10, padding: "14px", fontSize: 15, fontFamily: "sans-serif", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
        Envoyer le message <ArrowRight size={18} />
      </button>
    </div>
  );
}
