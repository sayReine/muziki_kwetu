import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Users, Music, Calendar, LogOut, TrendingUp, Shield } from "lucide-react";
import { BRAND, BRAND_DARK, BRAND_LIGHT } from "../constants.jsx";
import { Logo } from "./ui";

const MOCK_EVENTS = [
  { id: 1, title: "Concert de Noël – Chœur Symphonique", date: "2024-12-22", location: "Bukavu", spots: 200, booked: 134 },
  { id: 2, title: "Atelier de Violon – Buholo", date: "2025-01-15", location: "Buholo", spots: 30, booked: 22 },
  { id: 3, title: "Festival MUZIKI KWETU", date: "2025-03-01", location: "Bukavu", spots: 500, booked: 211 },
  { id: 4, title: "Master Class Piano", date: "2025-02-08", location: "Kavumu", spots: 20, booked: 18 },
];

function buildChartData(users) {
  const counts = {};
  users.forEach(u => {
    const key = u.joinedAt ? u.joinedAt.slice(0, 7) : "2024-01";
    counts[key] = (counts[key] || 0) + 1;
  });

  // ensure at least some demo data
  const baseMonths = ["2024-01","2024-02","2024-03","2024-04","2024-05","2024-06",
                       "2024-07","2024-08","2024-09","2024-10","2024-11","2024-12"];
  const demoBase = [3,5,4,8,6,11,9,14,12,18,16,23];
  const all = {};
  baseMonths.forEach((m, i) => { all[m] = demoBase[i]; });
  Object.entries(counts).forEach(([m, n]) => { all[m] = (all[m] || 0) + n; });

  let cumulative = 0;
  return Object.entries(all).sort().map(([month, count]) => {
    cumulative += count;
    return { month: month.slice(5) + "/" + month.slice(2, 4), new: count, total: cumulative };
  });
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("mk_current_user") || "null");
    if (!admin || admin.role !== "admin") { navigate("/login"); return; }
    const stored = JSON.parse(localStorage.getItem("mk_users") || "[]");
    setUsers(stored);
    setChartData(buildChartData(stored));
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("mk_current_user");
    navigate("/");
  };

  const stats = [
    { label: "Membres inscrits", value: users.length + 129, icon: <Users size={20} />, color: "#4a4aff" },
    { label: "Événements actifs", value: MOCK_EVENTS.length, icon: <Calendar size={20} />, color: BRAND },
    { label: "Programmes", value: 6, icon: <Music size={20} />, color: "#16a34a" },
    { label: "Croissance (mois)", value: "+14%", icon: <TrendingUp size={20} />, color: "#ea580c" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#f4f6fb", fontFamily: "sans-serif" }}>
      {/* Sidebar */}
      <div style={{ position: "fixed", left: 0, top: 0, bottom: 0, width: 220, background: "linear-gradient(180deg, #1a0a3a, #2d0e6e)", display: "flex", flexDirection: "column", padding: "24px 16px", zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
          <Logo size={36} />
          <div>
            <div style={{ color: "white", fontWeight: 800, fontSize: 13 }}>MUZIKI KWETU</div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 11 }}>Administration</div>
          </div>
        </div>
        {[
          { icon: <TrendingUp size={16} />, label: "Tableau de bord" },
          { icon: <Users size={16} />, label: "Membres" },
          { icon: <Calendar size={16} />, label: "Événements" },
          { icon: <Music size={16} />, label: "Programmes" },
        ].map((item, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10, marginBottom: 4, background: i === 0 ? "rgba(255,255,255,0.15)" : "transparent", color: "rgba(255,255,255,0.8)", cursor: "pointer", fontSize: 14 }}>
            {item.icon} {item.label}
          </div>
        ))}
        <div style={{ marginTop: "auto" }}>
          <div onClick={logout} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10, color: "rgba(255,100,100,0.8)", cursor: "pointer", fontSize: 14 }}>
            <LogOut size={16} /> Déconnexion
          </div>
        </div>
      </div>

      {/* Main */}
      <div style={{ marginLeft: 220, padding: "32px 32px 32px" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: "#1a1a2e" }}>Tableau de bord</h1>
            <p style={{ margin: "4px 0 0", color: "#888", fontSize: 14 }}>Vue d'ensemble du programme MUZIKI KWETU</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#f0f0ff", borderRadius: 20, padding: "6px 14px" }}>
            <Shield size={14} color="#4a4aff" />
            <span style={{ fontSize: 12, color: "#4a4aff", fontWeight: 700 }}>Admin</span>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginBottom: 32 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ background: "white", borderRadius: 16, padding: "20px 24px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", borderLeft: `4px solid ${s.color}` }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                <span style={{ fontSize: 13, color: "#888" }}>{s.label}</span>
                <div style={{ color: s.color }}>{s.icon}</div>
              </div>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#1a1a2e" }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div style={{ background: "white", borderRadius: 20, padding: "28px 28px 20px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", marginBottom: 32 }}>
          <h3 style={{ margin: "0 0 4px", fontSize: 17, fontWeight: 700, color: "#1a1a2e" }}>Croissance des inscriptions</h3>
          <p style={{ margin: "0 0 24px", color: "#aaa", fontSize: 13 }}>Évolution cumulée du nombre de membres inscrits au fil du temps</p>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4a4aff" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#4a4aff" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={BRAND} stopOpacity={0.2} />
                  <stop offset="95%" stopColor={BRAND} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#aaa" }} />
              <YAxis tick={{ fontSize: 12, fill: "#aaa" }} />
              <Tooltip contentStyle={{ borderRadius: 10, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", fontFamily: "sans-serif", fontSize: 13 }} />
              <Area type="monotone" dataKey="total" stroke="#4a4aff" strokeWidth={2.5} fill="url(#colorTotal)" name="Total membres" />
              <Area type="monotone" dataKey="new" stroke={BRAND} strokeWidth={2} fill="url(#colorNew)" name="Nouveaux / mois" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Events */}
        <div style={{ background: "white", borderRadius: 20, padding: 28, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
          <h3 style={{ margin: "0 0 20px", fontSize: 17, fontWeight: 700, color: "#1a1a2e" }}>Événements à venir</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {MOCK_EVENTS.map(ev => {
              const pct = Math.round((ev.booked / ev.spots) * 100);
              return (
                <div key={ev.id} style={{ display: "flex", alignItems: "center", gap: 20, padding: "16px 20px", borderRadius: 12, background: "#f8f8ff", border: "1px solid #ebebff" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: "#1a1a2e", marginBottom: 2 }}>{ev.title}</div>
                    <div style={{ fontSize: 12, color: "#888" }}>{ev.location} · {new Date(ev.date).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</div>
                  </div>
                  <div style={{ minWidth: 160 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#888", marginBottom: 4 }}>
                      <span>{ev.booked}/{ev.spots} places</span><span style={{ fontWeight: 700, color: pct > 80 ? BRAND : "#16a34a" }}>{pct}%</span>
                    </div>
                    <div style={{ height: 6, background: "#e8e8f5", borderRadius: 3, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${pct}%`, background: pct > 80 ? BRAND : "#4a4aff", borderRadius: 3, transition: "width 0.4s" }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent signups */}
        <div style={{ background: "white", borderRadius: 20, padding: 28, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", marginTop: 28 }}>
          <h3 style={{ margin: "0 0 20px", fontSize: 17, fontWeight: 700, color: "#1a1a2e" }}>Inscriptions récentes</h3>
          {users.length === 0 ? (
            <p style={{ color: "#aaa", fontSize: 14, textAlign: "center", padding: "24px 0" }}>Aucune inscription pour le moment.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[...users].reverse().slice(0, 10).map((u, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 16px", borderRadius: 10, background: "#f8f8ff" }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: BRAND_LIGHT, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, color: BRAND_DARK }}>
                    {u.firstName?.[0]}{u.lastName?.[0]}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14, color: "#1a1a2e" }}>{u.firstName} {u.lastName}</div>
                    <div style={{ fontSize: 12, color: "#aaa" }}>{u.programme}</div>
                  </div>
                  <div style={{ fontSize: 11, color: "#bbb" }}>{u.joinedAt ? new Date(u.joinedAt).toLocaleDateString("fr-FR") : "—"}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
