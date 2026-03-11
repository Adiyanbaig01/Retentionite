import { Link, useLocation, useNavigate } from "react-router-dom-dom";
import profilePhoto from "../../assets/adiyan_profile.png";
import logo from "../../assets/app_logo.png";
import {
  Sparkles,
  LayoutDashboard,
  CreditCard,
  Calendar,
  Target,
  BarChart3,
  Settings,
  Bell,
  Search,
  User,
  BookOpen,
  Users,
  ChevronDown,
  Zap,
  Flame,
  Gift,
  X,
  Trophy,
} from "lucide-react";
import { ReactNode, useState } from "react";
import { SpaceBackground } from "./SpaceBackground";
import { useApp } from "../store";
import { useTheme } from "./ThemeContext";

const navItems = [
  { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard", emoji: "🌌" },
  { path: "/flashcards", icon: CreditCard, label: "Flashcards", emoji: "✨" },
  { path: "/notes", icon: BookOpen, label: "Notes", emoji: "📝" },
  { path: "/calendar", icon: Calendar, label: "Study Calendar", emoji: "🗓️" },
  { path: "/focus", icon: Target, label: "Focus Mode", emoji: "🎯" },
  { path: "/analytics", icon: BarChart3, label: "Analytics", emoji: "📊" },
];

const bottomItems = [
  { path: "/profile", icon: User, label: "Profile", emoji: "👤" },
  { path: "/settings", icon: Settings, label: "Settings", emoji: "⚙️" },
];

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, friends, sharedItems } = useApp();
  const { T, theme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [showNotifs, setShowNotifs] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const unreadShared = sharedItems.filter((s) => !s.read).length;
  const pendingFriends = friends.filter((f) => f.status === "pending").length;
  const totalNotifs = unreadShared + pendingFriends;

  const levelProgress = (user.xp % 1000) / 10;

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{ background: T.appBg, transition: "background 0.4s ease" }}
    >
      <SpaceBackground />

      {/* Sidebar */}
      <aside
        className="relative z-20 w-60 flex-shrink-0 flex flex-col space-scroll overflow-y-auto"
        style={{
          background: T.sidebarBg,
          borderRight: `1px solid ${T.sidebarBorder}`,
          backdropFilter: T.showSpaceBg ? "blur(24px)" : "none",
          transition: "background 0.4s ease, border-color 0.4s ease",
        }}
      >
        {/* Logo */}
        <div className="px-5 pt-5 pb-4" style={{ borderBottom: `1px solid ${T.dividerColor}` }}>
          <Link to="/" className="flex items-center gap-2.5 group">
            <img
              src={logo}
              alt="Retentionite"
              className="w-9 h-9"
              style={{ objectFit: "contain" }}
            />
            <div>
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: "1.125rem",
                  letterSpacing: "-0.3px",
                  color: T.textPrimary,
                }}
              >
                Retentionite
              </span>
              <div
                className="text-xs"
                style={{ color: T.primaryColor, fontWeight: 500, lineHeight: 1 }}
              >
                {theme === "duolingo" ? "Study Champion 🦉" : theme === "rose" ? "Knowledge Bloom 🌸" : theme === "ocean" ? "Ocean Explorer 🌊" : "Space Explorer"}
              </div>
            </div>
          </Link>
        </div>

        {/* User card */}
        <div className="px-3 py-3" style={{ borderBottom: `1px solid ${T.dividerColor}` }}>
          <Link
            to="/profile"
            className="flex items-center gap-3 rounded-2xl p-2.5 transition-all group"
            style={{ background: T.userCardBg, border: `1px solid ${T.userCardBorder}` }}
          >
            <div
              className="w-9 h-9 rounded-xl overflow-hidden flex-shrink-0"
              style={{ border: `1px solid ${T.primaryBorder}` }}
            >
              <img src={profilePhoto} alt="Adiyan Baig" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm truncate" style={{ fontWeight: 600, color: T.textPrimary }}>
                {user.name}
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span style={{ color: T.xpBadgeColor, fontSize: "0.6875rem", fontWeight: 600 }}>
                  ⚡ {user.xp.toLocaleString()} XP
                </span>
                <span style={{ color: T.textMuted, fontSize: "0.6875rem" }}>·</span>
                <span style={{ color: T.streakBadgeColor, fontSize: "0.6875rem" }}>
                  🔥 {user.streak}
                </span>
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 flex-shrink-0" style={{ color: T.textMuted }} />
          </Link>

          {/* XP Progress bar */}
          <div className="mt-2.5 px-1">
            <div className="flex justify-between mb-1">
              <span style={{ fontSize: "0.625rem", color: T.textMuted, fontWeight: 500 }}>
                Lv.{user.level} {user.rank}
              </span>
              <span style={{ fontSize: "0.625rem", color: T.textMuted }}>
                {user.xp % 1000}/1000 XP
              </span>
            </div>
            <div className="w-full rounded-full h-1.5" style={{ background: T.xpBarBg }}>
              <div
                className="h-1.5 rounded-full"
                style={{
                  width: levelProgress + "%",
                  background: T.xpBarFill,
                  boxShadow: `0 0 8px ${T.primaryGlow}`,
                  transition: "width 0.5s ease",
                }}
              />
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-3 space-y-0.5">
          <div
            className="px-3 mb-2 uppercase"
            style={{
              fontSize: "0.625rem",
              fontWeight: 700,
              color: T.sectionLabelColor,
              letterSpacing: "0.1em",
            }}
          >
            Navigation
          </div>
          {navItems.map((item) => {
            const isActive =
              location.pathname === item.path ||
              (item.path === "/notes" && location.pathname.startsWith("/notes"));
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 text-sm group"
                style={{
                  background: isActive ? T.navActiveBg : "transparent",
                  border: isActive ? `1px solid ${T.navActiveBorder}` : "1px solid transparent",
                  color: isActive ? T.navActiveText : T.navInactiveText,
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                <Icon
                  className="w-4 h-4 flex-shrink-0"
                  style={{ color: isActive ? T.navActiveIcon : T.navInactiveIcon }}
                />
                {item.label}
                {isActive && (
                  <div
                    className="ml-auto w-1.5 h-1.5 rounded-full"
                    style={{
                      background: T.navDot,
                      boxShadow: `0 0 6px ${T.navDot}`,
                    }}
                  />
                )}
              </Link>
            );
          })}

          <div
            className="px-3 mt-4 mb-2 uppercase"
            style={{
              fontSize: "0.625rem",
              fontWeight: 700,
              color: T.sectionLabelColor,
              letterSpacing: "0.1em",
            }}
          >
            Social
          </div>
          <Link
            to="/profile"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 text-sm"
            style={{
              background: location.pathname === "/profile" ? T.navActiveBg : "transparent",
              border:
                location.pathname === "/profile"
                  ? `1px solid ${T.navActiveBorder}`
                  : "1px solid transparent",
              color:
                location.pathname === "/profile" ? T.navActiveText : T.navInactiveText,
              fontWeight: location.pathname === "/profile" ? 600 : 400,
            }}
          >
            <Users
              className="w-4 h-4 flex-shrink-0"
              style={{
                color:
                  location.pathname === "/profile" ? T.navActiveIcon : T.navInactiveIcon,
              }}
            />
            Friends & Profile
            {pendingFriends > 0 && (
              <div
                className="ml-auto text-xs px-1.5 py-0.5 rounded-full"
                style={{
                  background: "rgba(236,72,153,0.2)",
                  color: "#F9A8D4",
                  fontWeight: 600,
                  fontSize: "0.6rem",
                }}
              >
                {pendingFriends}
              </div>
            )}
          </Link>

          <Link
            to="/leaderboard"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 text-sm"
            style={{
              background: location.pathname === "/leaderboard" ? T.navActiveBg : "transparent",
              border: location.pathname === "/leaderboard" ? `1px solid ${T.navActiveBorder}` : "1px solid transparent",
              color: location.pathname === "/leaderboard" ? T.navActiveText : T.navInactiveText,
              fontWeight: location.pathname === "/leaderboard" ? 600 : 400,
            }}
          >
            <Trophy
              className="w-4 h-4 flex-shrink-0"
              style={{ color: location.pathname === "/leaderboard" ? T.navActiveIcon : T.navInactiveIcon }}
            />
            Leaderboard
            {location.pathname === "/leaderboard" && (
              <div className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: T.navDot, boxShadow: `0 0 6px ${T.navDot}` }} />
            )}
          </Link>
        </nav>

        {/* Bottom */}
        <div
          className="px-3 pb-4 space-y-0.5"
          style={{ borderTop: `1px solid ${T.dividerColor}`, paddingTop: "12px" }}
        >
          {bottomItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm"
                style={{
                  color: isActive ? T.navActiveText : T.navInactiveText,
                  background: isActive ? T.navActiveBg : "transparent",
                  border: isActive ? `1px solid ${T.navActiveBorder}` : "1px solid transparent",
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                <Icon
                  className="w-4 h-4 flex-shrink-0"
                  style={{ color: isActive ? T.navActiveIcon : T.navInactiveIcon }}
                />
                {item.label}
              </Link>
            );
          })}

          {/* Level card */}
          <div
            className="mt-3 rounded-2xl p-3"
            style={{
              background: T.levelCardBg,
              border: `1px solid ${T.levelCardBorder}`,
            }}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span style={{ fontSize: "1rem" }}>
                {theme === "duolingo" ? "🦉" : theme === "rose" ? "🌸" : theme === "ocean" ? "🌊" : "🚀"}
              </span>
              <span style={{ color: T.textPrimary, fontSize: "0.75rem", fontWeight: 700 }}>
                {user.rank}
              </span>
              <span
                className="ml-auto text-xs px-1.5 py-0.5 rounded-full"
                style={{
                  background: T.primaryLight,
                  color: T.primaryColor,
                  fontWeight: 600,
                }}
              >
                Lv.{user.level}
              </span>
            </div>
            <div
              className="flex items-center gap-3 text-xs"
              style={{ color: T.textSecondary }}
            >
              <div className="flex items-center gap-1">
                <Flame className="w-3 h-3" style={{ color: T.streakBadgeColor }} />
                <span>{user.streak} day streak</span>
              </div>
              <div className="flex items-center gap-1">
                <Zap className="w-3 h-3" style={{ color: T.xpBadgeColor }} />
                <span>{user.xp.toLocaleString()} XP</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="relative z-10 flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header
          className="flex-shrink-0 flex items-center gap-4 px-6 py-3"
          style={{
            background: T.headerBg,
            borderBottom: `1px solid ${T.headerBorder}`,
            backdropFilter: T.showSpaceBg ? "blur(20px)" : "none",
            transition: "background 0.4s ease",
          }}
        >
          {/* Search */}
          <div className="flex-1 max-w-md relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
              style={{ color: T.textMuted }}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search flashcards, subjects, notes..."
              className="w-full pl-9 pr-4 py-2 rounded-xl text-sm outline-none transition-all"
              style={{
                background: T.searchBg,
                border: `1px solid ${T.searchBorder}`,
                color: T.searchText,
                fontFamily: "'Space Grotesk', sans-serif",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = T.primaryColor;
                e.currentTarget.style.boxShadow = `0 0 0 3px ${T.primaryGlow}`;
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = T.searchBorder;
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {/* Shared items badge */}
            {unreadShared > 0 && (
              <button
                onClick={() => navigate("/profile")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs transition-all"
                style={{
                  background: T.primaryLight,
                  border: `1px solid ${T.primaryBorder}`,
                  color: T.primaryColor,
                  fontWeight: 600,
                }}
              >
                <Gift className="w-3.5 h-3.5" />
                {unreadShared} shared
              </button>
            )}

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifs((v) => !v)}
                className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-all"
                style={{
                  background: T.inputBg,
                  border: `1px solid ${T.inputBorder}`,
                  color: T.textSecondary,
                }}
              >
                <Bell className="w-4 h-4" />
                {totalNotifs > 0 && (
                  <div
                    className="absolute top-1 right-1 w-2 h-2 rounded-full"
                    style={{ background: T.primaryColor, boxShadow: `0 0 6px ${T.primaryColor}` }}
                  />
                )}
              </button>

              {showNotifs && (
                <div
                  className="absolute right-0 top-full mt-2 w-72 rounded-2xl overflow-hidden"
                  style={{
                    background: T.popupBg,
                    border: `1px solid ${T.popupBorder}`,
                    backdropFilter: "blur(20px)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                    zIndex: 100,
                  }}
                >
                  <div
                    className="flex items-center justify-between px-4 py-3"
                    style={{ borderBottom: `1px solid ${T.dividerColor}` }}
                  >
                    <span
                      className="text-sm"
                      style={{ fontWeight: 600, color: T.textPrimary }}
                    >
                      Notifications
                    </span>
                    <button onClick={() => setShowNotifs(false)}>
                      <X className="w-4 h-4" style={{ color: T.textMuted }} />
                    </button>
                  </div>
                  <div className="p-3 space-y-2 max-h-64 overflow-y-auto space-scroll">
                    {sharedItems
                      .filter((s) => !s.read)
                      .map((item) => (
                        <div
                          key={item.id}
                          className="flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all"
                          style={{
                            background: T.primaryLight,
                            border: `1px solid ${T.primaryBorder}`,
                          }}
                          onClick={() => {
                            navigate("/profile");
                            setShowNotifs(false);
                          }}
                        >
                          <div className="text-xl">{item.subjectEmoji}</div>
                          <div className="flex-1 min-w-0">
                            <div
                              className="text-xs"
                              style={{ fontWeight: 600, color: T.textPrimary }}
                            >
                              {item.fromName} shared a deck!
                            </div>
                            <div className="text-xs mt-0.5" style={{ color: T.textMuted }}>
                              {item.subjectName} · {item.cardCount} cards
                            </div>
                          </div>
                        </div>
                      ))}
                    {friends
                      .filter((f) => f.status === "pending")
                      .map((f) => (
                        <div
                          key={f.id}
                          className="flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all"
                          style={{
                            background: "rgba(236,72,153,0.08)",
                            border: "1px solid rgba(236,72,153,0.15)",
                          }}
                          onClick={() => {
                            navigate("/profile");
                            setShowNotifs(false);
                          }}
                        >
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs flex-shrink-0"
                            style={{
                              background: `linear-gradient(135deg, ${f.avatarGradient.includes("pink") ? "#EC4899" : "#8B5CF6"}, #4F46E5)`,
                              fontWeight: 700,
                            }}
                          >
                            {f.avatarInitials}
                          </div>
                          <div>
                            <div
                              className="text-xs"
                              style={{ fontWeight: 600, color: T.textPrimary }}
                            >
                              Friend request from {f.name}
                            </div>
                            <div className="text-xs mt-0.5" style={{ color: T.textMuted }}>
                              Lv.{f.level} · {f.xp.toLocaleString()} XP
                            </div>
                          </div>
                        </div>
                      ))}
                    {totalNotifs === 0 && (
                      <div
                        className="text-center py-4 text-xs"
                        style={{ color: T.textMuted }}
                      >
                        All caught up! {theme === "duolingo" ? "🦉" : theme === "rose" ? "🌸" : theme === "ocean" ? "🌊" : "🚀"}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Avatar */}
            <Link to="/profile">
              <div
                className="w-9 h-9 rounded-xl overflow-hidden cursor-pointer transition-all hover:scale-105"
                style={{
                  boxShadow: `0 0 12px ${T.primaryGlow}`,
                  border: `1.5px solid ${T.primaryBorder}`,
                }}
              >
                <img src={profilePhoto} alt="Adiyan Baig" className="w-full h-full object-cover" />
              </div>
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main
          className="flex-1 overflow-y-auto space-scroll"
          style={{ background: T.showSpaceBg ? "transparent" : T.appBg }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
