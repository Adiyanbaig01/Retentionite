import { useState } from "react";
import { Trophy, Zap, Flame, Crown, Medal, ArrowUp, ArrowDown, Minus, BookOpen, Star, TrendingUp } from "lucide-react";
import { useApp, PLANET_LINE } from "../store";
import { useTheme } from "./ThemeContext";

// Extended mock leaderboard data (global + friends)
const GLOBAL_USERS = [
  { id: "g1", name: "Priya Sharma", username: "@priya_studies", initials: "PS", gradient: ["#10B981", "#14B8A6"], xp: 15200, streak: 45, level: 16, rank: "Galactic Scholar", subjects: 8, change: 0 },
  { id: "g2", name: "Alex Kim", username: "@alexkim", initials: "AK", gradient: ["#8B5CF6", "#6366F1"], xp: 13800, streak: 38, level: 15, rank: "Nova Sage", subjects: 6, change: 2 },
  { id: "g3", name: "Sofia Chen", username: "@sofialearns", initials: "SC", gradient: ["#EC4899", "#F43F5E"], xp: 12900, streak: 30, level: 14, rank: "Star Voyager", subjects: 7, change: -1 },
  { id: "g4", name: "Raj Patel", username: "@rajstudy", initials: "RP", gradient: ["#F59E0B", "#F97316"], xp: 11400, streak: 22, level: 13, rank: "Comet Rider", subjects: 5, change: 1 },
  { id: "g5", name: "Emma Wilson", username: "@emma_w", initials: "EW", gradient: ["#06B6D4", "#0EA5E9"], xp: 10700, streak: 19, level: 12, rank: "Comet Rider", subjects: 6, change: -2 },
  { id: "g6", name: "Marcus Liu", username: "@marcusl", initials: "ML", gradient: ["#34D399", "#22C55E"], xp: 9800, streak: 14, level: 11, rank: "Nebula Explorer", subjects: 4, change: 3 },
  { id: "g7", name: "Zara Ahmed", username: "@zarastudy", initials: "ZA", gradient: ["#A78BFA", "#C084FC"], xp: 8900, streak: 11, level: 10, rank: "Space Explorer", subjects: 5, change: 0 },
];

const SUBJECT_BOARDS = [
  { subject: "Biology 🌱", leaders: [
    { name: "Priya S.", initials: "PS", xp: 4200, cards: 340, gradient: ["#10B981", "#14B8A6"] },
    { name: "Adiyan B.", initials: "AB", xp: 3800, cards: 280, gradient: ["#8B5CF6", "#6366F1"] },
    { name: "Sofia C.", initials: "SC", xp: 3100, cards: 220, gradient: ["#EC4899", "#F43F5E"] },
  ]},
  { subject: "Mathematics 🔢", leaders: [
    { name: "Alex K.", initials: "AK", xp: 5100, cards: 410, gradient: ["#8B5CF6", "#6366F1"] },
    { name: "Adiyan B.", initials: "AB", xp: 4800, cards: 390, gradient: ["#8B5CF6", "#6366F1"] },
    { name: "Emma W.", initials: "EW", xp: 3900, cards: 310, gradient: ["#06B6D4", "#0EA5E9"] },
  ]},
  { subject: "Physics ⚛️", leaders: [
    { name: "Marcus L.", initials: "ML", xp: 3600, cards: 290, gradient: ["#34D399", "#22C55E"] },
    { name: "Raj P.", initials: "RP", xp: 3100, cards: 250, gradient: ["#F59E0B", "#F97316"] },
    { name: "Adiyan B.", initials: "AB", xp: 2800, cards: 210, gradient: ["#8B5CF6", "#6366F1"] },
  ]},
];

const COLOR_MAP: Record<string, [string, string]> = {
  "from-pink-500 to-rose-500": ["#EC4899", "#F43F5E"],
  "from-emerald-500 to-teal-500": ["#10B981", "#14B8A6"],
  "from-blue-500 to-indigo-500": ["#3B82F6", "#6366F1"],
  "from-violet-500 to-purple-500": ["#8B5CF6", "#A855F7"],
  "from-amber-500 to-orange-500": ["#F59E0B", "#F97316"],
};

export function Leaderboard() {
  const { user, friends, subjects } = useApp();
  const { T } = useTheme();
  const [tab, setTab] = useState<"global" | "friends" | "subjects">("global");
  const [period, setPeriod] = useState<"week" | "month" | "alltime">("month");

  const myFriends = friends.filter((f) => f.status === "friend");

  // Build friends leaderboard: include user at their position
  const friendsBoard = [
    { id: "me", name: user.name, username: user.username, initials: user.avatarInitials, gradientArr: ["#8B5CF6", "#6366F1"], xp: user.xp, streak: user.streak, level: user.level, rank: user.rank, isMe: true, change: 1 },
    ...myFriends.map((f) => {
      const [c1, c2] = COLOR_MAP[f.avatarGradient] || ["#8B5CF6", "#6366F1"];
      return { id: f.id, name: f.name, username: f.username, initials: f.avatarInitials, gradientArr: [c1, c2], xp: f.xp, streak: f.streak, level: f.level, rank: f.status, isMe: false, change: 0 };
    }),
  ].sort((a, b) => b.xp - a.xp);

  const myGlobalRank = 8; // simulated
  const myFriendsRank = friendsBoard.findIndex((f) => f.isMe) + 1;

  const cardStyle = {
    background: T.cardBg,
    border: `1px solid ${T.cardBorder}`,
    backdropFilter: T.showSpaceBg ? "blur(12px)" : "none",
    boxShadow: T.cardShadow,
  };

  const globalList = [...GLOBAL_USERS].sort((a, b) => b.xp - a.xp);
  // Insert "you" at rank 8
  const fullGlobal = [
    ...globalList.slice(0, 7),
    { id: "me", name: user.name, username: user.username, initials: user.avatarInitials, gradient: ["#8B5CF6", "#6366F1"], xp: user.xp, streak: user.streak, level: user.level, rank: user.rank, subjects: subjects.length, change: 1, isMe: true },
    ...globalList.slice(7),
  ];

  function RankChange({ change }: { change: number }) {
    if (change > 0) return <div className="flex items-center gap-0.5" style={{ color: "#34D399", fontSize: "0.65rem" }}><ArrowUp className="w-3 h-3" />{change}</div>;
    if (change < 0) return <div className="flex items-center gap-0.5" style={{ color: "#F87171", fontSize: "0.65rem" }}><ArrowDown className="w-3 h-3" />{Math.abs(change)}</div>;
    return <div className="flex items-center" style={{ color: T.textMuted, fontSize: "0.65rem" }}><Minus className="w-3 h-3" /></div>;
  }

  function RankRow({ entry, pos, isCompact = false }: { entry: any; pos: number; isCompact?: boolean }) {
    const isMe = entry.isMe || entry.id === "me";
    const medals = ["🥇", "🥈", "🥉"];
    const gradArr = entry.gradientArr || entry.gradient || ["#8B5CF6", "#6366F1"];
    return (
      <div
        className={`flex items-center gap-3 p-3 rounded-2xl transition-all ${isCompact ? "" : "hover:translate-y-[-1px]"}`}
        style={{
          background: isMe ? T.navActiveBg : T.cardBg,
          border: isMe ? `1px solid ${T.navActiveBorder}` : `1px solid ${T.cardBorder}`,
          boxShadow: isMe ? `0 0 12px ${T.primaryGlow}` : T.cardShadow,
        }}
      >
        {/* Rank */}
        <div className="w-8 text-center flex-shrink-0">
          {pos <= 3 ? (
            <span style={{ fontSize: "1.1rem" }}>{medals[pos - 1]}</span>
          ) : (
            <span className="text-sm" style={{ fontWeight: 700, color: isMe ? T.navActiveText : T.textMuted }}>{pos}</span>
          )}
        </div>

        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs"
            style={{ backgroundImage: `linear-gradient(135deg, ${gradArr[0]}, ${gradArr[1]})`, fontWeight: 700 }}
          >
            {entry.initials}
          </div>
          {isMe && (
            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center"
              style={{ background: T.primaryColor, border: `1px solid ${T.cardBg}` }}>
              <Star className="w-2.5 h-2.5 text-white" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-sm truncate" style={{ fontWeight: isMe ? 700 : 500, color: isMe ? T.navActiveText : T.textPrimary }}>
              {entry.name}
            </span>
            {isMe && <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ background: T.primaryColor, color: "#fff", fontWeight: 600, fontSize: "0.55rem" }}>YOU</span>}
          </div>
          <div className="text-xs" style={{ color: T.textMuted }}>{entry.username}</div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="text-right">
            <div className="text-xs" style={{ fontWeight: 700, color: T.xpBadgeColor }}>⚡ {entry.xp.toLocaleString()}</div>
            <div className="text-xs" style={{ color: T.streakBadgeColor }}>🔥 {entry.streak}</div>
          </div>
          <div className="w-6 flex items-center justify-center">
            <RankChange change={entry.change ?? 0} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-7 max-w-[1100px]">
      {/* Header */}
      <div className="flex items-start justify-between mb-7">
        <div>
          <h1 className="mb-1" style={{ fontSize: "1.625rem", fontWeight: 800, letterSpacing: "-0.5px", fontFamily: "'Space Grotesk', sans-serif", color: T.textPrimary }}>
            Leaderboard 🏆
          </h1>
          <p className="text-sm" style={{ color: T.textMuted }}>
            See how you rank among explorers worldwide.
          </p>
        </div>
        <div className="flex gap-2">
          {(["week", "month", "alltime"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className="text-sm px-4 py-2 rounded-xl transition-colors capitalize"
              style={{
                background: period === p ? T.navActiveBg : T.inputBg,
                border: period === p ? `1px solid ${T.navActiveBorder}` : `1px solid ${T.inputBorder}`,
                color: period === p ? T.navActiveText : T.textMuted,
                fontWeight: period === p ? 600 : 400,
              }}
            >
              {p === "alltime" ? "All Time" : p === "week" ? "This Week" : "This Month"}
            </button>
          ))}
        </div>
      </div>

      {/* My rank banner */}
      <div
        className="rounded-3xl p-5 mb-6 flex items-center gap-5"
        style={{
          background: T.levelCardBg,
          border: `1px solid ${T.levelCardBorder}`,
          boxShadow: `0 0 24px ${T.primaryGlow}`,
        }}
      >
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-white flex-shrink-0"
          style={{ backgroundImage: "linear-gradient(135deg, #8B5CF6, #6366F1)", fontWeight: 800, fontSize: "1.25rem" }}
        >
          {user.avatarInitials}
        </div>
        <div className="flex-1">
          <div className="text-sm mb-0.5" style={{ fontWeight: 700, color: T.textPrimary }}>{user.name}</div>
          <div className="text-xs" style={{ color: T.textMuted }}>{user.username} · {user.rank}</div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Global Rank", val: `#${myGlobalRank}`, icon: <Crown className="w-4 h-4" />, color: T.streakBadgeColor },
            { label: "Friends Rank", val: `#${myFriendsRank}`, icon: <Trophy className="w-4 h-4" />, color: T.primaryColor },
            { label: "Total XP", val: user.xp.toLocaleString(), icon: <Zap className="w-4 h-4" />, color: T.xpBadgeColor },
          ].map((s) => (
            <div key={s.label} className="text-center px-4 py-2 rounded-2xl" style={{ background: T.inputBg, border: `1px solid ${T.inputBorder}` }}>
              <div className="flex items-center justify-center mb-1" style={{ color: s.color }}>{s.icon}</div>
              <div className="text-sm" style={{ fontWeight: 800, color: T.textPrimary }}>{s.val}</div>
              <div className="text-xs" style={{ color: T.textMuted }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-5" style={{ borderBottom: `1px solid ${T.dividerColor}`, paddingBottom: 0 }}>
        {([
          { id: "global", label: "Global Top 10" },
          { id: "friends", label: "Friends" },
          { id: "subjects", label: "By Subject" },
        ] as const).map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="px-5 py-3 text-sm transition-all"
            style={{
              color: tab === t.id ? T.navActiveText : T.navInactiveText,
              fontWeight: tab === t.id ? 600 : 400,
              borderBottom: tab === t.id ? `2px solid ${T.primaryColor}` : "2px solid transparent",
              marginBottom: "-1px",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── GLOBAL TAB ── */}
      {tab === "global" && (
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-3">
            {/* Podium */}
            <div className="flex items-end justify-center gap-4 mb-6 pt-4">
              {[fullGlobal[1], fullGlobal[0], fullGlobal[2]].map((entry, podiumIdx) => {
                const actualPos = podiumIdx === 0 ? 2 : podiumIdx === 1 ? 1 : 3;
                const heights = [140, 170, 120];
                const h = heights[podiumIdx];
                const gradArr = entry.gradientArr || entry.gradient || ["#8B5CF6", "#6366F1"];
                const podiumColors: Record<number, string> = { 1: "#FFD700", 2: "#C0C0C0", 3: "#CD7F32" };
                return (
                  <div key={entry.id} className="flex flex-col items-center gap-2" style={{ width: 120 }}>
                    {actualPos === 1 && <Crown className="w-6 h-6 mb-1" style={{ color: "#FFD700" }} />}
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-white"
                      style={{ backgroundImage: `linear-gradient(135deg, ${gradArr[0]}, ${gradArr[1]})`, fontWeight: 800, fontSize: "1.1rem", boxShadow: `0 4px 16px ${gradArr[0]}60` }}
                    >
                      {entry.initials}
                    </div>
                    <div className="text-center">
                      <div className="text-xs" style={{ fontWeight: 700, color: T.textPrimary }}>{entry.name.split(" ")[0]}</div>
                      <div className="text-xs" style={{ color: T.xpBadgeColor, fontWeight: 600 }}>⚡ {entry.xp.toLocaleString()}</div>
                    </div>
                    <div
                      className="w-full flex items-center justify-center rounded-t-2xl"
                      style={{
                        height: h,
                        background: `linear-gradient(180deg, ${podiumColors[actualPos]}25, ${podiumColors[actualPos]}10)`,
                        border: `1px solid ${podiumColors[actualPos]}40`,
                        borderBottom: "none",
                      }}
                    >
                      <span style={{ fontSize: "1.75rem" }}>
                        {actualPos === 1 ? "🥇" : actualPos === 2 ? "🥈" : "🥉"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Full list starting from #4 */}
            <div className="space-y-2">
              {fullGlobal.slice(3).map((entry, i) => (
                <RankRow key={entry.id} entry={entry} pos={i + 4} />
              ))}
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-4">
            {/* Rising stars */}
            <div className="rounded-2xl p-5" style={cardStyle}>
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4" style={{ color: T.primaryColor }} />
                <h3 className="text-sm" style={{ fontWeight: 700, color: T.textPrimary }}>Rising Stars</h3>
              </div>
              <div className="space-y-3">
                {[
                  { name: "Marcus Liu", initials: "ML", gradient: ["#34D399", "#22C55E"], xpGain: "+840", rank: 6 },
                  { name: "Sofia Chen", initials: "SC", gradient: ["#EC4899", "#F43F5E"], xpGain: "+720", rank: 3 },
                  { name: "Raj Patel", initials: "RP", gradient: ["#F59E0B", "#F97316"], xpGain: "+690", rank: 4 },
                ].map((r, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs flex-shrink-0"
                      style={{ backgroundImage: `linear-gradient(135deg, ${r.gradient[0]}, ${r.gradient[1]})`, fontWeight: 700 }}
                    >
                      {r.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs truncate" style={{ fontWeight: 600, color: T.textPrimary }}>{r.name}</div>
                      <div className="text-xs" style={{ color: T.textMuted }}>Rank #{r.rank}</div>
                    </div>
                    <span className="text-xs" style={{ color: "#34D399", fontWeight: 700 }}>{r.xpGain}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly stats */}
            <div className="rounded-2xl p-5" style={cardStyle}>
              <h3 className="text-sm mb-4" style={{ fontWeight: 700, color: T.textPrimary }}>
                Global Stats
              </h3>
              <div className="space-y-3">
                {[
                  { label: "Total Explorers", val: "50,412", icon: "🚀" },
                  { label: "Cards This Week", val: "2.4M+", icon: "🃏" },
                  { label: "Avg. Retention", val: "89%", icon: "🧠" },
                  { label: "Active Streaks", val: "12,800", icon: "🔥" },
                ].map((s) => (
                  <div key={s.label} className="flex items-center justify-between">
                    <span className="text-xs" style={{ color: T.textMuted }}>{s.icon} {s.label}</span>
                    <span className="text-xs" style={{ fontWeight: 700, color: T.textPrimary }}>{s.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── FRIENDS TAB ── */}
      {tab === "friends" && (
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-2">
            {friendsBoard.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-5xl mb-3">👥</div>
                <p className="text-sm" style={{ color: T.textMuted }}>Add friends to see how you compare!</p>
              </div>
            ) : (
              friendsBoard.map((entry, i) => <RankRow key={entry.id} entry={entry} pos={i + 1} />)
            )}
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl p-5" style={cardStyle}>
              <h3 className="text-sm mb-4" style={{ fontWeight: 700, color: T.textPrimary }}>
                <Medal className="w-4 h-4 inline mr-2" style={{ color: T.streakBadgeColor }} />
                Your Friend Stats
              </h3>
              <div className="space-y-3">
                {[
                  { label: "Your Rank", val: `#${myFriendsRank} of ${friendsBoard.length}`, icon: "🏆" },
                  { label: "XP Ahead", val: myFriendsRank > 1 ? `${(friendsBoard[myFriendsRank - 2]?.xp - user.xp).toLocaleString()} to #${myFriendsRank - 1}` : "You're #1! 🎉", icon: "⚡" },
                  { label: "Streak Rank", val: `#${[...friendsBoard].sort((a, b) => b.streak - a.streak).findIndex((f) => f.isMe) + 1}`, icon: "🔥" },
                  { label: "Total Friends", val: myFriends.length, icon: "👥" },
                ].map((s) => (
                  <div key={s.label} className="flex items-center justify-between py-1.5" style={{ borderBottom: `1px solid ${T.dividerColor}` }}>
                    <span className="text-xs" style={{ color: T.textMuted }}>{s.icon} {s.label}</span>
                    <span className="text-xs" style={{ fontWeight: 700, color: T.textPrimary }}>{s.val}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl p-5" style={cardStyle}>
              <h3 className="text-sm mb-3" style={{ fontWeight: 700, color: T.textPrimary }}>Longest Streaks</h3>
              <div className="space-y-2">
                {[...friendsBoard].sort((a, b) => b.streak - a.streak).slice(0, 4).map((f, i) => (
                  <div key={f.id} className="flex items-center gap-2.5">
                    <span className="text-xs w-5" style={{ color: T.textMuted }}>{i + 1}.</span>
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs flex-shrink-0"
                      style={{ backgroundImage: `linear-gradient(135deg, ${f.gradientArr[0]}, ${f.gradientArr[1]})`, fontWeight: 700 }}
                    >
                      {f.initials}
                    </div>
                    <span className="text-xs flex-1 truncate" style={{ color: f.isMe ? T.navActiveText : T.textSecondary, fontWeight: f.isMe ? 600 : 400 }}>
                      {f.name.split(" ")[0]}
                    </span>
                    <span className="text-xs" style={{ color: T.streakBadgeColor, fontWeight: 600 }}>🔥 {f.streak}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── BY SUBJECT TAB ── */}
      {tab === "subjects" && (
        <div className="grid grid-cols-3 gap-5">
          {SUBJECT_BOARDS.map((board) => (
            <div key={board.subject} className="rounded-2xl p-5" style={cardStyle}>
              <h3 className="text-sm mb-4" style={{ fontWeight: 700, color: T.textPrimary }}>{board.subject}</h3>
              <div className="space-y-3">
                {board.leaders.map((leader, i) => {
                  const medals = ["🥇", "🥈", "🥉"];
                  const isMe = leader.name === "Adiyan B.";
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-2.5 p-2 rounded-xl"
                      style={{ background: isMe ? T.navActiveBg : "transparent", border: isMe ? `1px solid ${T.navActiveBorder}` : "1px solid transparent" }}
                    >
                      <span className="w-5 text-center">{medals[i]}</span>
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs flex-shrink-0"
                        style={{ backgroundImage: `linear-gradient(135deg, ${leader.gradient[0]}, ${leader.gradient[1]})`, fontWeight: 700 }}
                      >
                        {leader.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs truncate" style={{ fontWeight: isMe ? 700 : 500, color: isMe ? T.navActiveText : T.textPrimary }}>{leader.name}</div>
                        <div className="text-xs" style={{ color: T.textMuted }}>{leader.cards} cards</div>
                      </div>
                      <span className="text-xs" style={{ color: T.xpBadgeColor, fontWeight: 600 }}>{leader.xp.toLocaleString()}</span>
                    </div>
                  );
                })}
              </div>

              {/* View All */}
              <button
                className="w-full mt-3 py-2 rounded-xl text-xs transition-all"
                style={{ background: T.inputBg, border: `1px solid ${T.inputBorder}`, color: T.textMuted }}
              >
                View Full Board
              </button>
            </div>
          ))}

          {/* Per-subject from user's subjects */}
          {subjects.slice(0, 3).map((s) => (
            <div key={s.id} className="rounded-2xl p-5" style={cardStyle}>
              <h3 className="text-sm mb-4" style={{ fontWeight: 700, color: T.textPrimary }}>
                {s.emoji} {s.name}
              </h3>
              <div className="space-y-3">
                {[
                  { name: "You", initials: user.avatarInitials, gradient: ["#8B5CF6", "#6366F1"], xp: Math.floor(s.mastered * 12), cards: s.mastered, isMe: true },
                  { name: "Priya S.", initials: "PS", gradient: ["#10B981", "#14B8A6"], xp: Math.floor(s.mastered * 15), cards: s.mastered + 20, isMe: false },
                  { name: "Alex K.", initials: "AK", gradient: ["#8B5CF6", "#6366F1"], xp: Math.floor(s.mastered * 9), cards: Math.floor(s.mastered * 0.8), isMe: false },
                ].sort((a, b) => b.xp - a.xp).map((leader, i) => {
                  const medals = ["🥇", "🥈", "🥉"];
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-2.5 p-2 rounded-xl"
                      style={{ background: leader.isMe ? T.navActiveBg : "transparent", border: leader.isMe ? `1px solid ${T.navActiveBorder}` : "1px solid transparent" }}
                    >
                      <span className="w-5 text-center">{medals[i]}</span>
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs flex-shrink-0"
                        style={{ backgroundImage: `linear-gradient(135deg, ${leader.gradient[0]}, ${leader.gradient[1]})`, fontWeight: 700 }}
                      >
                        {leader.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs truncate" style={{ fontWeight: leader.isMe ? 700 : 500, color: leader.isMe ? T.navActiveText : T.textPrimary }}>
                          {leader.name}
                          {leader.isMe && <span className="ml-1 text-xs px-1 rounded" style={{ background: T.primaryColor, color: "#fff", fontSize: "0.5rem" }}>YOU</span>}
                        </div>
                        <div className="text-xs" style={{ color: T.textMuted }}>{leader.cards} mastered</div>
                      </div>
                      <div style={{ color: PLANET_LINE[s.planet], fontWeight: 700, fontSize: "0.6875rem" }}>{leader.xp.toLocaleString()}</div>
                    </div>
                  );
                })}
              </div>

              {/* Progress bar */}
              <div className="mt-3">
                <div className="flex justify-between mb-1">
                  <span className="text-xs" style={{ color: T.textMuted }}>Your progress</span>
                  <span className="text-xs" style={{ color: PLANET_LINE[s.planet], fontWeight: 600 }}>{s.progress}%</span>
                </div>
                <div className="w-full rounded-full h-1.5" style={{ background: T.xpBarBg }}>
                  <div
                    className="h-1.5 rounded-full transition-all duration-700"
                    style={{ width: s.progress + "%", background: PLANET_LINE[s.planet], boxShadow: `0 0 6px ${PLANET_LINE[s.planet]}80` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
