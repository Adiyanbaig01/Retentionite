import { Link } from "react-router-dom";
import {
  Clock, Flame, Zap, BookOpen, TrendingUp, ArrowRight, Play, Star,
  Plus, ChevronRight, Target, Rocket, Users, Trophy, Brain, CheckCircle2, Circle,
} from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";
import { useApp, PLANET_GRADIENTS, PLANET_GLOW } from "../store";
import { useTheme } from "./ThemeContext";
import { useState } from "react";
import { AddSubjectModal } from "./AddSubjectModal";

const weeklyData = [
  { day: "Mon", xp: 120, cards: 15 },
  { day: "Tue", xp: 280, cards: 32 },
  { day: "Wed", xp: 190, cards: 24 },
  { day: "Thu", xp: 340, cards: 40 },
  { day: "Fri", xp: 210, cards: 28 },
  { day: "Sat", xp: 390, cards: 45 },
  { day: "Sun", xp: 150, cards: 18 },
];

export function Dashboard() {
  const { user, subjects, friends } = useApp();
  const { T, theme } = useTheme();
  const [showAddSubject, setShowAddSubject] = useState(false);
  const [challengeDone, setChallengeDone] = useState([false, false, false]);

  const cardStyle = {
    background: T.cardBg,
    border: `1px solid ${T.cardBorder}`,
    backdropFilter: T.showSpaceBg ? "blur(12px)" : "none",
    boxShadow: T.cardShadow,
  };

  const recentAchievements = [
    {
      label: "7-Day Streak", emoji: "🔥", desc: "Studied 7 days in a row",
      color: `${T.streakBadgeColor}18`, border: `${T.streakBadgeColor}35`, text: T.streakBadgeColor,
    },
    {
      label: "Speed Learner", emoji: "⚡", desc: "Reviewed 50+ cards in session",
      color: `${T.primaryColor}18`, border: `${T.primaryColor}35`, text: T.primaryColor,
    },
    {
      label: "Science Master", emoji: "🔬", desc: "90%+ accuracy in Biology",
      color: `${T.secondaryColor}18`, border: `${T.secondaryColor}35`, text: T.secondaryColor,
    },
  ];

  const upcomingReviews = subjects.slice(0, 4).map((s, i) => ({
    subject: s.name,
    topic: s.description.split(",")[0],
    emoji: s.emoji,
    cards: Math.floor(Math.random() * 10) + 3,
    dueIn: i === 0 ? "Now" : i === 1 ? "2h" : i === 2 ? "5h" : "Tomorrow",
    urgent: i === 0,
  }));

  const onlineFriends = friends.filter((f) => f.isOnline && f.status === "friend").slice(0, 3);

  return (
    <div className="p-7 max-w-[1240px]">
      {/* Header */}
      <div className="flex items-start justify-between mb-7">
        <div>
          <h1
            className="mb-1"
            style={{
              fontSize: "1.625rem",
              fontWeight: 800,
              letterSpacing: "-0.5px",
              fontFamily: "'Space Grotesk', sans-serif",
              color: T.textPrimary,
            }}
          >
            Welcome back, {user.name.split(" ")[0]} {theme === "duolingo" ? "🦉" : theme === "rose" ? "🌸" : theme === "ocean" ? "🌊" : "🚀"}
          </h1>
          <p className="text-sm" style={{ color: T.textMuted }}>
            You have{" "}
            <span style={{ color: T.primaryColor, fontWeight: 600 }}>
              {subjects.reduce((acc, s) => acc + (s.cards - s.mastered), 0)} cards
            </span>{" "}
            due today — {theme === "duolingo" ? "let's keep that streak going!" : theme === "rose" ? "bloom through your reviews!" : theme === "ocean" ? "ride the wave of knowledge!" : "your cosmos awaits!"}
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowAddSubject(true)}
            className="flex items-center gap-2 text-sm px-4 py-2.5 rounded-xl transition-all"
            style={{
              background: T.inputBg,
              border: `1px solid ${T.inputBorder}`,
              color: T.textSecondary,
              fontWeight: 500,
            }}
          >
            <Plus className="w-4 h-4" />
            New Subject
          </button>
          <Link
            to="/focus"
            className="flex items-center gap-2 text-sm px-5 py-2.5 rounded-xl transition-all"
            style={{
              background: T.primaryBg,
              color: T.textOnPrimary,
              fontWeight: 600,
              boxShadow: `0 4px 14px ${T.primaryGlow}`,
            }}
          >
            <Play className="w-4 h-4 fill-current" />
            Start Review
          </Link>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-4 gap-5 mb-6">
        {[
          {
            label: "Study Time",
            value: "2h 14m",
            sub: "+18min from yesterday",
            icon: <Clock className="w-5 h-5" style={{ color: T.xpBadgeColor }} />,
            badge: "↑ 18min",
            badgeColor: `${T.xpBadgeColor}25`,
            badgeText: T.xpBadgeColor,
          },
          {
            label: "Current Streak",
            value: `${user.streak} days`,
            sub: "Keep it going! 🔥",
            icon: <Flame className="w-5 h-5" style={{ color: T.streakBadgeColor }} />,
            badge: "Personal Best",
            badgeColor: `${T.streakBadgeColor}25`,
            badgeText: T.streakBadgeColor,
          },
          {
            label: "XP Points",
            value: user.xp.toLocaleString(),
            sub: "+280 XP today",
            icon: <Zap className="w-5 h-5" style={{ color: T.primaryColor }} />,
            badge: "+280 today",
            badgeColor: `${T.primaryColor}25`,
            badgeText: T.primaryColor,
          },
          {
            label: "Due Reviews",
            value: `${subjects.reduce((a, s) => a + (s.cards - s.mastered), 0)} cards`,
            sub: `Across ${subjects.length} subjects`,
            icon: <BookOpen className="w-5 h-5" style={{ color: T.secondaryColor }} />,
            badge: `${subjects.length} subjects`,
            badgeColor: `${T.secondaryColor}25`,
            badgeText: T.secondaryColor,
          },
        ].map((card) => (
          <div
            key={card.label}
            className="rounded-3xl p-5 transition-all hover:translate-y-[-2px]"
            style={cardStyle}
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center"
                style={{ background: T.primaryLight, border: `1px solid ${T.primaryBorder}` }}
              >
                {card.icon}
              </div>
              <span
                className="text-xs px-2 py-0.5 rounded-full"
                style={{ background: card.badgeColor, color: card.badgeText, fontWeight: 600, fontSize: "0.6875rem" }}
              >
                {card.badge}
              </span>
            </div>
            <div style={{ fontWeight: 800, fontSize: "1.5rem", letterSpacing: "-0.5px", color: T.textPrimary }}>
              {card.value}
            </div>
            <div className="text-xs" style={{ color: T.textMuted }}>
              {card.label}
            </div>
            <div className="text-xs mt-1" style={{ color: T.textMuted, opacity: 0.7 }}>
              {card.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Daily Challenge Banner */}
      {(() => {
        const doneCount = challengeDone.filter(Boolean).length;
        const allDone = doneCount === 3;
        const challenges = [
          { label: "Review 20 cards", emoji: "🃏", xp: 50 },
          { label: "Study 25 minutes", emoji: "⏱️", xp: 40 },
          { label: "Finish 1 subject", emoji: "✅", xp: 80 },
        ];
        return (
          <div
            className="rounded-3xl p-5 mb-6 relative overflow-hidden"
            style={{
              background: allDone
                ? `linear-gradient(135deg, rgba(52,211,153,0.15), rgba(52,211,153,0.05))`
                : T.levelCardBg,
              border: allDone ? `1px solid rgba(52,211,153,0.3)` : `1px solid ${T.levelCardBorder}`,
              boxShadow: allDone ? `0 0 20px rgba(52,211,153,0.15)` : "none",
            }}
          >
            {/* Background decoration */}
            <div
              className="absolute right-0 top-0 bottom-0 flex items-center pr-6 pointer-events-none"
              style={{ opacity: 0.07 }}
            >
              <Trophy style={{ width: 80, height: 80, color: T.primaryColor }} />
            </div>

            <div className="relative z-10 flex items-center gap-6">
              <div className="flex-shrink-0">
                <div className="text-2xl mb-0.5">{allDone ? "🎉" : "🎯"}</div>
                <div className="text-xs" style={{ color: T.textMuted, fontWeight: 600 }}>Daily Challenge</div>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm" style={{ fontWeight: 700, color: T.textPrimary }}>
                    {allDone ? "All challenges completed! 🌟" : `${doneCount}/3 challenges done`}
                  </span>
                  <div
                    className="px-2 py-0.5 rounded-full text-xs"
                    style={{
                      background: allDone ? "rgba(52,211,153,0.2)" : T.primaryLight,
                      color: allDone ? "#34D399" : T.primaryColor,
                      fontWeight: 600,
                    }}
                  >
                    {allDone ? "+170 XP earned" : "+170 XP total"}
                  </div>
                </div>
                <div className="w-full rounded-full h-1.5 mb-3" style={{ background: T.xpBarBg }}>
                  <div
                    className="h-1.5 rounded-full transition-all duration-700"
                    style={{
                      width: `${(doneCount / 3) * 100}%`,
                      background: allDone ? "linear-gradient(90deg, #34D399, #10B981)" : T.xpBarFill,
                      boxShadow: allDone ? "0 0 8px rgba(52,211,153,0.5)" : `0 0 8px ${T.primaryGlow}`,
                    }}
                  />
                </div>
                <div className="flex gap-3">
                  {challenges.map((c, i) => (
                    <button
                      key={i}
                      onClick={() => setChallengeDone((prev) => prev.map((d, idx) => idx === i ? !d : d))}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs transition-all"
                      style={{
                        background: challengeDone[i]
                          ? "rgba(52,211,153,0.15)"
                          : T.inputBg,
                        border: challengeDone[i]
                          ? "1px solid rgba(52,211,153,0.3)"
                          : `1px solid ${T.inputBorder}`,
                        color: challengeDone[i] ? "#34D399" : T.textMuted,
                        fontWeight: challengeDone[i] ? 600 : 400,
                        textDecoration: challengeDone[i] ? "line-through" : "none",
                        opacity: challengeDone[i] ? 0.8 : 1,
                      }}
                    >
                      {challengeDone[i]
                        ? <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
                        : <Circle className="w-3.5 h-3.5 flex-shrink-0" />
                      }
                      {c.emoji} {c.label}
                      <span style={{ color: T.xpBadgeColor, fontWeight: 700 }}>+{c.xp}</span>
                    </button>
                  ))}
                </div>
              </div>

              <Link
                to="/leaderboard"
                className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs transition-all"
                style={{
                  background: T.inputBg,
                  border: `1px solid ${T.inputBorder}`,
                  color: T.textSecondary,
                  fontWeight: 600,
                }}
              >
                <Trophy className="w-3.5 h-3.5" style={{ color: T.streakBadgeColor }} />
                Leaderboard
              </Link>
            </div>
          </div>
        );
      })()}

      {/* Middle row */}
      <div className="grid grid-cols-3 gap-5 mb-6">
        {/* Weekly Chart */}
        <div className="col-span-2 rounded-3xl p-6" style={cardStyle}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 style={{ fontWeight: 700, color: T.textPrimary }}>Weekly Activity</h3>
              <p className="text-xs mt-0.5" style={{ color: T.textMuted }}>XP earned per day</p>
            </div>
            <div className="flex gap-2">
              {["Week", "Month", "Year"].map((p, i) => (
                <button
                  key={p}
                  className="text-xs px-3 py-1.5 rounded-lg transition-colors"
                  style={{
                    background: i === 0 ? T.navActiveBg : T.inputBg,
                    color: i === 0 ? T.navActiveText : T.textMuted,
                    border: i === 0 ? `1px solid ${T.navActiveBorder}` : `1px solid ${T.inputBorder}`,
                    fontWeight: i === 0 ? 600 : 400,
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={150}>
            <AreaChart data={weeklyData}>
              <defs>
                <linearGradient id="xpGradDash" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={T.primaryColor} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={T.primaryColor} stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <Tooltip
                contentStyle={{
                  background: T.popupBg,
                  border: `1px solid ${T.popupBorder}`,
                  borderRadius: "12px",
                  fontSize: "12px",
                  color: T.textPrimary,
                }}
                formatter={(v) => [`${v} XP`, ""]}
              />
              <Area
                type="monotone"
                dataKey="xp"
                stroke={T.primaryColor}
                strokeWidth={2.5}
                fill="url(#xpGradDash)"
                dot={{ fill: T.primaryColor, r: 3, strokeWidth: 0 }}
                activeDot={{ r: 5, fill: T.primaryColor }}
              />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex justify-between mt-2">
            {weeklyData.map((d) => (
              <span key={d.day} className="text-xs flex-1 text-center" style={{ color: T.textMuted }}>
                {d.day}
              </span>
            ))}
          </div>
        </div>

        {/* Achievements & Friends */}
        <div className="space-y-4">
          {/* Achievements */}
          <div className="rounded-3xl p-5" style={cardStyle}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm" style={{ fontWeight: 700, color: T.textPrimary }}>Achievements</h3>
              <Star className="w-4 h-4" style={{ color: T.streakBadgeColor }} />
            </div>
            <div className="space-y-2.5">
              {recentAchievements.map((a) => (
                <div
                  key={a.label}
                  className="flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-all"
                  style={{ background: a.color, border: `1px solid ${a.border}` }}
                >
                  <div className="text-base">{a.emoji}</div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs truncate" style={{ color: a.text, fontWeight: 600 }}>
                      {a.label}
                    </div>
                    <div className="text-xs truncate" style={{ color: T.textMuted }}>
                      {a.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Online friends */}
          <div className="rounded-3xl p-5" style={cardStyle}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm" style={{ fontWeight: 700, color: T.textPrimary }}>Friends Online</h3>
              <Link to="/profile">
                <Users className="w-4 h-4" style={{ color: T.textMuted }} />
              </Link>
            </div>
            <div className="space-y-2">
              {onlineFriends.map((f) => (
                <div key={f.id} className="flex items-center gap-2.5">
                  <div className="relative">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs"
                      style={{
                        fontWeight: 700,
                        backgroundImage: `linear-gradient(135deg, ${f.avatarGradient.replace("from-", "").replace("to-", "").split(" ").map(c => {
                          const map: Record<string, string> = {
                            "pink-500": "#EC4899", "rose-500": "#F43F5E", "emerald-500": "#10B981",
                            "teal-500": "#14B8A6", "blue-500": "#3B82F6", "indigo-500": "#6366F1",
                            "violet-500": "#8B5CF6", "purple-500": "#A855F7", "amber-500": "#F59E0B",
                            "orange-500": "#F97316",
                          };
                          return map[c] || "#8B5CF6";
                        }).join(", ")})`,
                      }}
                    >
                      {f.avatarInitials}
                    </div>
                    <div
                      className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2"
                      style={{ background: "#10B981", borderColor: T.cardBg }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs truncate" style={{ fontWeight: 500, color: T.textPrimary }}>
                      {f.name}
                    </div>
                    <div className="text-xs" style={{ color: T.textMuted }}>
                      Lv.{f.level} · {f.xp.toLocaleString()} XP
                    </div>
                  </div>
                </div>
              ))}
              {onlineFriends.length === 0 && (
                <p className="text-xs text-center py-2" style={{ color: T.textMuted }}>
                  No friends online now
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-3 gap-5">
        {/* Knowledge Galaxy */}
        <div className="col-span-2 rounded-3xl p-6" style={cardStyle}>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 style={{ fontWeight: 700, color: T.textPrimary }}>
                {theme === "duolingo" ? "Knowledge Garden 🌿" : theme === "rose" ? "Knowledge Garden 🌸" : theme === "ocean" ? "Knowledge Ocean 🌊" : "Knowledge Galaxy 🌌"}
              </h3>
              <p className="text-xs mt-0.5" style={{ color: T.textMuted }}>
                Your subject mastery — hover to explore
              </p>
            </div>
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
              style={{ background: T.primaryLight, border: `1px solid ${T.primaryBorder}` }}
            >
              <TrendingUp className="w-3.5 h-3.5" style={{ color: T.primaryColor }} />
              <span className="text-xs" style={{ color: T.primaryColor, fontWeight: 600 }}>
                Level {user.level}
              </span>
            </div>
          </div>

          {/* Planet / bubble visualization */}
          <div className="flex items-end gap-4 mb-5 justify-center px-4">
            {subjects.slice(0, 5).map((s, i) => {
              const sizes = [90, 65, 110, 55, 75];
              const size = sizes[i % sizes.length];
              const gradient = PLANET_GRADIENTS[s.planet];
              const glow = PLANET_GLOW[s.planet];
              return (
                <Link to="/analytics" key={s.id} className="flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="text-xs" style={{ color: T.textSecondary, fontWeight: 600 }}>
                    {s.progress}%
                  </div>
                  <div
                    className="rounded-full flex items-center justify-center relative planet-float transition-transform group-hover:scale-110"
                    style={{
                      width: size,
                      height: size,
                      backgroundImage: `linear-gradient(135deg, ${gradient.split(" ").map(c => {
                        const colorMap: Record<string, string> = {
                          "from-violet-400": "#A78BFA", "via-purple-400": "#C084FC", "to-indigo-500": "#6366F1",
                          "from-blue-400": "#60A5FA", "via-sky-400": "#38BDF8", "to-blue-500": "#3B82F6",
                          "from-pink-400": "#F472B6", "via-rose-400": "#FB7185", "to-fuchsia-500": "#D946EF",
                          "from-cyan-400": "#22D3EE", "via-teal-400": "#2DD4BF", "to-sky-500": "#0EA5E9",
                          "from-amber-400": "#FBBF24", "via-yellow-400": "#FDE047", "to-orange-500": "#F97316",
                          "from-emerald-400": "#34D399", "to-green-500": "#22C55E",
                          "to-teal-500": "#14B8A6",
                        };
                        return colorMap[c] || c;
                      }).filter((_, idx) => idx === 0 || idx === gradient.split(" ").length - 1).join(", ")})`,
                      boxShadow: `0 8px 32px ${glow}, 0 0 0 1px rgba(255,255,255,0.1)`,
                      animationDelay: `${i * 0.8}s`,
                    }}
                  >
                    <span style={{ fontSize: size / 3 + "px" }}>{s.emoji}</span>
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{ border: "2px solid rgba(255,255,255,0.2)", transform: "scale(1.15)", borderRadius: "50%" }}
                    />
                  </div>
                  <div className="text-xs text-center" style={{ color: T.textSecondary, fontWeight: 600 }}>
                    {s.name}
                  </div>
                  <div className="text-xs" style={{ color: T.textMuted }}>
                    {s.mastered}/{s.cards}
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Progress bars */}
          <div className="space-y-2.5">
            {subjects.slice(0, 5).map((s) => (
              <div key={s.id} className="flex items-center gap-3">
                <span className="text-sm w-28 flex-shrink-0" style={{ color: T.textSecondary }}>
                  {s.emoji} {s.name}
                </span>
                <div className="flex-1 rounded-full h-1.5" style={{ background: T.xpBarBg }}>
                  <div
                    className="h-1.5 rounded-full transition-all duration-700"
                    style={{
                      width: s.progress + "%",
                      background: `linear-gradient(90deg, ${PLANET_GLOW[s.planet].replace("0.5", "1")}, ${PLANET_GLOW[s.planet].replace("0.5", "0.7")})`,
                      boxShadow: `0 0 8px ${PLANET_GLOW[s.planet]}`,
                    }}
                  />
                </div>
                <span className="text-xs w-8 text-right" style={{ color: T.textMuted }}>
                  {s.progress}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Reviews */}
        <div className="rounded-3xl p-6" style={cardStyle}>
          <div className="flex items-center justify-between mb-5">
            <h3 style={{ fontWeight: 700, color: T.textPrimary }}>Upcoming Reviews</h3>
            <Target className="w-4 h-4" style={{ color: T.textMuted }} />
          </div>
          <div className="space-y-2.5">
            {upcomingReviews.map((r) => (
              <div
                key={r.topic}
                className="p-3.5 rounded-2xl border transition-all cursor-pointer hover:translate-y-[-1px]"
                style={{
                  background: r.urgent ? T.navActiveBg : T.inputBg,
                  border: r.urgent ? `1px solid ${T.navActiveBorder}` : `1px solid ${T.inputBorder}`,
                }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <div className="text-sm truncate flex items-center gap-1.5" style={{ color: T.textPrimary, fontWeight: 600 }}>
                      <span>{r.emoji}</span> {r.subject}
                    </div>
                    <div className="text-xs truncate mt-0.5" style={{ color: T.textMuted }}>
                      {r.topic}
                    </div>
                    <div className="text-xs mt-1.5" style={{ color: T.textMuted }}>
                      {r.cards} cards
                    </div>
                  </div>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full flex-shrink-0"
                    style={{
                      background: r.urgent ? T.primaryColor : T.inputBg,
                      color: r.urgent ? T.textOnPrimary : T.textMuted,
                      fontWeight: 600,
                      boxShadow: r.urgent ? `0 0 8px ${T.primaryGlow}` : "none",
                    }}
                  >
                    {r.dueIn}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <Link
            to="/flashcards"
            className="mt-4 w-full flex items-center justify-center gap-1.5 py-3 rounded-2xl text-sm transition-all"
            style={{
              background: T.primaryBg,
              color: T.textOnPrimary,
              fontWeight: 600,
              boxShadow: `0 4px 14px ${T.primaryGlow}`,
            }}
          >
            <Rocket className="w-3.5 h-3.5" />
            Start Review Session
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          {/* Quick stats */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            {[
              { label: "Friends", val: friends.filter((f) => f.status === "friend").length, icon: <Users className="w-3.5 h-3.5" /> },
              { label: "Subjects", val: subjects.length, icon: <BookOpen className="w-3.5 h-3.5" /> },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-xl p-2.5 text-center"
                style={{ background: T.primaryLight, border: `1px solid ${T.primaryBorder}` }}
              >
                <div className="flex items-center justify-center gap-1 mb-0.5" style={{ color: T.primaryColor }}>
                  {s.icon}
                </div>
                <div className="text-sm" style={{ fontWeight: 700, color: T.textPrimary }}>{s.val}</div>
                <div className="text-xs" style={{ color: T.textMuted }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showAddSubject && <AddSubjectModal onClose={() => setShowAddSubject(false)} />}
    </div>
  );
}
