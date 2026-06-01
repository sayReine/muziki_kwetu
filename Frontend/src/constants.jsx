import { Music, Home, Info, BookOpen, Users, Mail, Layers, Star, Award, Mic, Guitar, Radio } from "lucide-react";

export const BRAND = "#C0392B";
export const BRAND_DARK = "#922B21";
export const BRAND_LIGHT = "#FADBD8";

export const navLinks = [
  { label: "Accueil", href: "#home", icon: <Home size={16} /> },
  { label: "À propos", href: "#about", icon: <Info size={16} /> },
  { label: "Programme", href: "#programme", icon: <BookOpen size={16} /> },
  { label: "Sous-projets", href: "#subprojects", icon: <Layers size={16} /> },
  { label: "Galerie", href: "#gallery", icon: <Star size={16} /> },
  { label: "Équipe", href: "#team", icon: <Users size={16} /> },
  { label: "Contact", href: "#contact", icon: <Mail size={16} /> },
];

export const subprojects = [
  { icon: <Music size={28} />, title: "École Populaire de Musique", desc: "Formation musicale de base accessible à tous : solfège, chant, instruments, éveil musical.", target: "Enfants, jeunes, amateurs" },
  { icon: <Mic size={28} />, title: "Chœur Symphonique du Kivu", desc: "Grand chœur mixte inclusif avec répétitions régulières, concerts et enregistrements.", target: "Passionnés de chant choral" },
  { icon: <Guitar size={28} />, title: "Orchestre Symphonique du Kivu", desc: "Ensemble instrumental régional avec ateliers d'instruments et tournées culturelles.", target: "Musiciens formés ou en formation" },
  { icon: <Star size={28} />, title: "Festival MUZIKI KWETU", desc: "Valorisation des talents musicaux locaux via concerts, compétitions et conférences.", target: "Artistes, élèves, public large" },
  { icon: <Award size={28} />, title: "Label Jeune Talent", desc: "Identification, formation et promotion de jeunes musiciens via coaching et mentorat.", target: "Jeunes artistes 13–26 ans" },
  { icon: <Radio size={28} />, title: "MUZIKI & Patrimoine", desc: "Sauvegarde des musiques traditionnelles du Kivu par collecte, transcription et spectacles.", target: "Chercheurs, communautés locales" },
];

export const team = [
  { name: "Audace BISONGA", role: "Directeur Général", email: "plumaudacebisonga@gmail.com", initials: "AB" },
  { name: "Yves MWAMI", role: "Directeur Artistique & Secrétaire Administratif", email: "yves.mwami@gmail.com", initials: "YM" },
  { name: "Toni IRAGI", role: "Responsable Pédagogique", email: "iragijacques1912@gmail.com", initials: "TI" },
  { name: "Clément CIHANDO", role: "Responsable Pédagogique Adjoint", email: "cihandomweze@gmail.com", initials: "CC" },
  { name: "ROMUALD Z.", role: "Directeur Musical & Chef d'Orchestre", email: "hyaziha@gmail.com", initials: "RZ" },
  { name: "Romain RAMAZANI", role: "Communication & Chargé de Communication", email: "romainramazani022@gmail.com", initials: "RR" },
];

export const domaines = [
  "Formation musicale (Solfège, harmonie, technique vocale, instrument)",
  "Ateliers communautaires / Master class",
  "Création de contenus musicaux",
  "Organisation de concerts et événements",
  "Sensibilisation à travers la musique",
  "Collaboration artistique & Entrepreneuriat",
  "Logistique & Évènementiel",
];

export const budget = [
  { label: "Achat du terrain & documents", amount: "100 000$", pct: 11 },
  { label: "Construction du centre", amount: "600 000$", pct: 67 },
  { label: "Équipement musical & pédagogique", amount: "100 000$", pct: 11 },
  { label: "Programmes de formation", amount: "60 000$", pct: 7 },
  { label: "Communication & coordination", amount: "25 000$", pct: 3 },
  { label: "Fonds de démarrage", amount: "15 000$", pct: 2 },
];
