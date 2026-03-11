import { useState } from "react";
import { useApp, PLANET_LINE } from "../store";
import { useTheme } from "./ThemeContext";
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, CartesianGrid,
} from "recharts";
import { TrendingUp, Award, Clock, Zap, Target, Brain, Calendar } from "lucide-react";

const weeklyStudy = [
  { day: "Mon", minutes: 45, cards: 28 },
  { day: "Tue", minutes: 90, cards: 52 },
  { day: "Wed", minutes: 60, cards: 34 },
  { day: "Thu", minutes: 120, cards: 71 },
  { day: "Fri", minutes: 75, cards: 45 },
  { day: "Sat", minutes: 140, cards: 89 },
  { day: "Sun", minutes: 35, cards: 20 },
];

const monthlyXP = [
  { week: "W1", xp: 820 },
  { week: "W2", xp: 1240 },
  { week: "W3", xp: 980 },
  { week: "W4", xp: 1480 },
  { week: "W5", xp: 1620 },
];

const glassCard = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.08)",
  backdropFilter: "blur(12px)",
};

const tooltipStyle = {
  contentStyle: {
    background: "rgba(10,13,35,0.95)",
    border: "1px solid rgba(139,92,246,0.3)",
    borderRadius: "12px",
    fontSize: "12px",
    color: "#fff",
  },
};

// Ebbinghaus forgetting curve simulation per subject
function generateEbbinghausCurve(baseRetention: number, reviews: number) {
  const points = [];
  const days = [0, 1, 3, 7, 14, 21, 30, 45, 60];
  for (const day of days) {
    // Simulate forgetting curve with review boosts
    const baseDecay = baseRetention * Math.exp(-0.3 * (day / (reviews * 5 + 1)));
    const reviewed = day >= 7 && reviews >= 2;
    const boost = reviewed ? 10 * Math.log(reviews + 1) : 0;
    const rate = Math.min(98, Math.max(30, baseDecay + boost));
    points.push({ day: day === 0 ? "Learn" : `D${day}`, rate: Math.round(rate), dayNum: day });
  }
  return points;
}

export function Analytics() {
  const { subjects } = useApp();
  const { T } = useTheme();
  const [period, setPeriod] = useState(0);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);

  const selectedSubject = subjects.find((s) => s.id === selectedSubjectId) || subjects[0];

  // Build retention data for selected subject
  const retentionData = selectedSubject
    ? selectedSubject.retentionData
    : [];

  // Combined view - all subjects overlaid
  const showAll = selectedSubjectId === "all";
  
  const subjectPieData = subjects.map((s) => ({
    name: s.name,
    value: Math.round((s.mastered / subjects.reduce((a, x) => a + x.mastered, 0)) * 100),
    color: PLANET_LINE[s.planet],
    subject: s,
  }));

  const cardStyle = {
    background: T.cardBg,
    border: `1px solid ${T.cardBorder}`,
    backdropFilter: T.showSpaceBg ? "blur(12px)" : "none",
    boxShadow: T.cardShadow,
  };

  const tooltipStyle = {
    contentStyle: {
      background: T.popupBg,
      border: `1px solid ${T.popupBorder}`,
      borderRadius: "12px",
      fontSize: "12px",
      color: T.textPrimary,
    },
  };

  return (
    <div className="p-7 max-w-[1240px]">
      {/* Header */}
      <div className="flex items-start justify-between mb-7">
        <div>
          <h1
            className="mb-1"
            style={{ fontSize: "1.625rem", fontWeight: 800, letterSpacing: "-0.5px", fontFamily: "'Space Grotesk', sans-serif", color: T.textPrimary }}
          >
            Analytics 📊
          </h1>
          <p className="text-sm" style={{ color: T.textMuted }}>
            Track your learning patterns and optimize your study sessions.
          </p>
        </div>
        <div className="flex gap-2">
          {["7 days", "30 days", "3 months"].map((p, i) => (
            <button
              key={p}
              onClick={() => setPeriod(i)}
              className="text-sm px-4 py-2 rounded-xl transition-colors"
              style={{
                background: period === i ? T.navActiveBg : T.inputBg,
                border: period === i ? `1px solid ${T.navActiveBorder}` : `1px solid ${T.inputBorder}`,
                color: period === i ? T.navActiveText : T.textMuted,
                fontWeight: period === i ? 600 : 400,
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-4 gap-5 mb-6">
        {[
          { label: "Avg. Daily Study", val: "81 min", change: "+12%", icon: <Clock className="w-5 h-5" style={{ color: T.xpBadgeColor }} />, up: true },
          { label: "Cards Reviewed", val: "339", change: "+24%", icon: <Target className="w-5 h-5" style={{ color: T.primaryColor }} />, up: true },
          { label: "Retention Rate", val: "89%", change: "+3%", icon: <TrendingUp className="w-5 h-5" style={{ color: "#34D399" }} />, up: true },
          { label: "Total XP", val: "6,140", change: "+580", icon: <Zap className="w-5 h-5" style={{ color: T.streakBadgeColor }} />, up: true },
        ].map((s) => (
          <div key={s.label} className="rounded-3xl p-5" style={cardStyle}>
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center"
                style={{ background: T.primaryLight, border: `1px solid ${T.primaryBorder}` }}
              >
                {s.icon}
              </div>
              <span
                className="text-xs px-2 py-0.5 rounded-full"
                style={{
                  background: s.up ? "rgba(52,211,153,0.15)" : "rgba(244,63,94,0.15)",
                  color: s.up ? "#34D399" : "#F87171",
                  fontWeight: 600,
                  fontSize: "0.6875rem",
                }}
              >
                {s.up ? "↑" : "↓"} {s.change}
              </span>
            </div>
            <div className="mb-0.5" style={{ fontWeight: 800, fontSize: "1.5rem", letterSpacing: "-0.5px", color: T.textPrimary }}>
              {s.val}
            </div>
            <div className="text-xs" style={{ color: T.textMuted }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-3 gap-5 mb-5">
        {/* Daily Study Chart */}
        <div className="col-span-2 rounded-3xl p-6" style={cardStyle}>
          <h3 className="mb-1" style={{ fontWeight: 700, color: T.textPrimary }}>Daily Study Time</h3>
          <p className="text-xs mb-5" style={{ color: T.textMuted }}>Minutes spent studying per day</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyStudy} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke={T.dividerColor} vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: T.textMuted }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: T.textMuted }} axisLine={false} tickLine={false} />
              <Tooltip {...tooltipStyle} formatter={(v) => [`${v} min`, "Study Time"]} />
              <Bar dataKey="minutes" radius={[8, 8, 0, 0]} fill="url(#barGradA)" />
              <defs>
                <linearGradient id="barGradA" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={T.primaryColor} />
                  <stop offset="100%" stopColor={T.primaryColor} stopOpacity={0.5} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Subject breakdown */}
        <div className="rounded-3xl p-6" style={cardStyle}>
          <h3 className="mb-1" style={{ fontWeight: 700, color: T.textPrimary }}>Subject Focus</h3>
          <p className="text-xs mb-4" style={{ color: T.textMuted }}>This week</p>
          <div className="flex justify-center mb-4">
            <PieChart width={160} height={160}>
              <Pie
                data={subjectPieData}
                cx={80} cy={80}
                innerRadius={45}
                outerRadius={72}
                paddingAngle={3}
                dataKey="value"
              >
                {subjectPieData.map((entry, i) => (
                  <Cell key={`cell-${i}`} fill={entry.color} strokeWidth={0} />
                ))}
              </Pie>
            </PieChart>
          </div>
          <div className="space-y-2">
            {subjects.slice(0, 4).map((s) => (
              <div key={s.id} className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: PLANET_LINE[s.planet] }} />
                <span className="text-xs flex-1" style={{ color: T.textSecondary }}>
                  {s.name}
                </span>
                <span className="text-xs" style={{ color: T.textMuted, fontWeight: 600 }}>
                  {s.mastered} cards
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Memory Retention Curves per Subject ── */}
      <div className="rounded-3xl p-6 mb-5" style={cardStyle}>
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Brain className="w-5 h-5" style={{ color: T.primaryColor }} />
              <h3 style={{ fontWeight: 700, color: T.textPrimary }}>Memory Retention Curves</h3>
            </div>
            <p className="text-xs" style={{ color: T.textMuted }}>
              Ebbinghaus forgetting curve — how well you retain knowledge over time per subject
            </p>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: T.primaryLight, border: `1px solid ${T.primaryBorder}` }}>
            <TrendingUp className="w-3.5 h-3.5" style={{ color: T.primaryColor }} />
            <span className="text-xs" style={{ color: T.primaryColor, fontWeight: 600 }}>Spaced Repetition</span>
          </div>
        </div>

        {/* Subject selector */}
        <div className="flex gap-2 flex-wrap mb-6">
          <button
            onClick={() => setSelectedSubjectId("all")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs transition-all"
            style={{
              background: showAll ? T.navActiveBg : T.inputBg,
              border: showAll ? `1px solid ${T.navActiveBorder}` : `1px solid ${T.inputBorder}`,
              color: showAll ? T.navActiveText : T.textMuted,
              fontWeight: showAll ? 600 : 400,
            }}
          >
            🌌 All Subjects
          </button>
          {subjects.map((s) => {
            const isSelected = selectedSubjectId === s.id || (!selectedSubjectId && s.id === subjects[0].id);
            return (
              <button
                key={s.id}
                onClick={() => setSelectedSubjectId(s.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs transition-all"
                style={{
                  background: isSelected && !showAll ? `${PLANET_LINE[s.planet]}20` : T.inputBg,
                  border: isSelected && !showAll ? `1px solid ${PLANET_LINE[s.planet]}50` : `1px solid ${T.inputBorder}`,
                  color: isSelected && !showAll ? PLANET_LINE[s.planet] : T.textMuted,
                  fontWeight: isSelected && !showAll ? 600 : 400,
                }}
              >
                {s.emoji} {s.name}
              </button>
            );
          })}
        </div>

        {/* Chart */}
        {!showAll ? (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: `${PLANET_LINE[selectedSubject.planet]}20` }}
              >
                <span>{selectedSubject.emoji}</span>
              </div>
              <div>
                <div className="text-sm" style={{ fontWeight: 700, color: T.textPrimary }}>
                  {selectedSubject.name}
                </div>
                <div className="text-xs" style={{ color: T.textMuted }}>
                  {selectedSubject.mastered}/{selectedSubject.cards} cards mastered · {selectedSubject.retentionData[selectedSubject.retentionData.length - 1]?.rate}% current retention
                </div>
              </div>
              <div className="ml-auto text-right">
                <div
                  className="text-lg"
                  style={{ fontWeight: 800, color: PLANET_LINE[selectedSubject.planet] }}
                >
                  {selectedSubject.retentionData[selectedSubject.retentionData.length - 1]?.rate}%
                </div>
                <div className="text-xs" style={{ color: T.textMuted }}>Long-term retention</div>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={retentionData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={T.dividerColor} vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: T.textMuted }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: T.textMuted }} axisLine={false} tickLine={false} domain={[40, 100]} tickFormatter={(v) => `${v}%`} />
                <Tooltip
                  contentStyle={{ background: T.popupBg, border: `1px solid ${PLANET_LINE[selectedSubject.planet]}50`, borderRadius: "12px", fontSize: "12px", color: T.textPrimary }}
                  formatter={(v) => [`${v}%`, "Retention"]}
                />
                <Line
                  type="monotone"
                  dataKey="rate"
                  stroke={PLANET_LINE[selectedSubject.planet]}
                  strokeWidth={3}
                  dot={(props: any) => {
                    const { cx, cy, payload } = props;
                    return (
                      <circle
                        key={payload.day}
                        cx={cx}
                        cy={cy}
                        r={payload.reviews > 1 ? 6 : 4}
                        fill={payload.reviews > 1 ? PLANET_LINE[selectedSubject.planet] : T.inputBg}
                        stroke={PLANET_LINE[selectedSubject.planet]}
                        strokeWidth={2}
                      />
                    );
                  }}
                  activeDot={{ r: 7, fill: PLANET_LINE[selectedSubject.planet] }}
                />
              </LineChart>
            </ResponsiveContainer>

            {/* Legend */}
            <div className="flex items-center gap-5 mt-3 px-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ background: PLANET_LINE[selectedSubject.planet] }} />
                <span className="text-xs" style={{ color: T.textMuted }}>Review session point</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full border-2" style={{ borderColor: PLANET_LINE[selectedSubject.planet], background: T.inputBg }} />
                <span className="text-xs" style={{ color: T.textMuted }}>Passive decay point</span>
              </div>
              <div className="ml-auto text-xs" style={{ color: T.textMuted }}>
                💡 Larger dots = more review sessions completed
              </div>
            </div>
          </div>
        ) : (
          /* All subjects overlay */
          <div>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={T.dividerColor} vertical={false} />
                <XAxis
                  dataKey="day"
                  type="category"
                  allowDuplicatedCategory={false}
                  tick={{ fontSize: 11, fill: T.textMuted }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis tick={{ fontSize: 11, fill: T.textMuted }} axisLine={false} tickLine={false} domain={[40, 100]} tickFormatter={(v) => `${v}%`} />
                <Tooltip
                  contentStyle={{ background: T.popupBg, border: `1px solid ${T.popupBorder}`, borderRadius: "12px", fontSize: "12px", color: T.textPrimary }}
                  formatter={(v, name) => [`${v}%`, name]}
                />
                {subjects.map((s) => (
                  <Line
                    key={s.id}
                    id={s.id}
                    data={s.retentionData}
                    type="monotone"
                    dataKey="rate"
                    name={s.name}
                    stroke={PLANET_LINE[s.planet]}
                    strokeWidth={2}
                    dot={{ fill: PLANET_LINE[s.planet], r: 3, strokeWidth: 0 }}
                    activeDot={{ r: 5 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>

            {/* Legend */}
            <div className="flex flex-wrap gap-3 mt-3">
              {subjects.map((s) => (
                <div key={s.id} className="flex items-center gap-1.5">
                  <div className="w-3 h-1.5 rounded-full" style={{ background: PLANET_LINE[s.planet] }} />
                  <span className="text-xs" style={{ color: T.textMuted }}>{s.emoji} {s.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Retention tips */}
        <div className="mt-5 grid grid-cols-3 gap-3">
          {[
            { tip: "Best time to review", val: `Day ${selectedSubject?.retentionData[2]?.day?.replace("Day ", "") || "7"}`, icon: "⏰", color: T.primaryLight, border: T.primaryBorder },
            { tip: "Current retention", val: `${selectedSubject?.retentionData.at(-1)?.rate || 88}%`, icon: "🧠", color: "rgba(52,211,153,0.1)", border: "rgba(52,211,153,0.2)" },
            { tip: "Review sessions", val: `${selectedSubject?.retentionData.at(-1)?.reviews || 4}x`, icon: "📚", color: `${T.streakBadgeColor}15`, border: `${T.streakBadgeColor}30` },
          ].map((t) => (
            <div
              key={t.tip}
              className="flex items-center gap-3 p-3 rounded-2xl"
              style={{ background: t.color, border: `1px solid ${t.border}` }}
            >
              <span className="text-xl">{t.icon}</span>
              <div>
                <div className="text-sm" style={{ fontWeight: 700, color: T.textPrimary }}>{t.val}</div>
                <div className="text-xs" style={{ color: T.textMuted }}>{t.tip}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-2 gap-5 mb-5">
        {/* XP Progress */}
        <div className="rounded-3xl p-6" style={cardStyle}>
          <h3 className="mb-1" style={{ fontWeight: 700, color: T.textPrimary }}>XP Progress</h3>
          <p className="text-xs mb-5" style={{ color: T.textMuted }}>Weekly XP earned</p>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={monthlyXP}>
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: T.textMuted }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: T.textMuted }} axisLine={false} tickLine={false} />
              <Tooltip {...tooltipStyle} formatter={(v) => [`${v} XP`, ""]} />
              <Line
                type="monotone"
                dataKey="xp"
                stroke={T.primaryColor}
                strokeWidth={3}
                dot={{ fill: T.primaryColor, r: 4, strokeWidth: 0 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Subject mastery table */}
        <div className="rounded-3xl p-6" style={cardStyle}>
          <h3 className="mb-1" style={{ fontWeight: 700, color: T.textPrimary }}>Subject Mastery</h3>
          <p className="text-xs mb-4" style={{ color: T.textMuted }}>Progress across all your subjects</p>
          <div className="space-y-3">
            {subjects.map((s) => (
              <div key={s.id} className="flex items-center gap-3">
                <span className="text-base">{s.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs" style={{ color: T.textSecondary, fontWeight: 500 }}>
                      {s.name}
                    </span>
                    <span className="text-xs" style={{ color: PLANET_LINE[s.planet], fontWeight: 600 }}>
                      {s.progress}%
                    </span>
                  </div>
                  <div className="w-full rounded-full h-1.5" style={{ background: T.xpBarBg }}>
                    <div
                      className="h-1.5 rounded-full transition-all duration-700"
                      style={{
                        width: s.progress + "%",
                        background: PLANET_LINE[s.planet],
                        boxShadow: `0 0 6px ${PLANET_LINE[s.planet]}80`,
                      }}
                    />
                  </div>
                </div>
                <div className="text-xs w-12 text-right" style={{ color: T.textMuted }}>
                  {s.mastered}/{s.cards}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="rounded-3xl p-6" style={cardStyle}>
        <div className="flex items-center gap-2 mb-5">
          <Award className="w-5 h-5" style={{ color: T.streakBadgeColor }} />
          <h3 style={{ fontWeight: 700, color: T.textPrimary }}>Earned Badges</h3>
          <span className="text-xs ml-1" style={{ color: T.textMuted }}>· 8 of 24 unlocked</span>
        </div>
        <div className="flex gap-4 flex-wrap">
          {[
            { emoji: "🔥", label: "7-Day Streak", earned: true },
            { emoji: "⚡", label: "Speed Learner", earned: true },
            { emoji: "🔬", label: "Science Master", earned: true },
            { emoji: "🌙", label: "Night Owl", earned: true },
            { emoji: "🚀", label: "Level 10", earned: false },
            { emoji: "🏆", label: "30-Day Streak", earned: false },
            { emoji: "🌟", label: "1000 Cards", earned: false },
            { emoji: "🎓", label: "Scholar", earned: false },
          ].map((b) => (
            <div
              key={b.label}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl transition-all"
              style={{
                background: b.earned ? T.primaryLight : T.inputBg,
                border: b.earned ? `1px solid ${T.primaryBorder}` : `1px solid ${T.inputBorder}`,
                opacity: b.earned ? 1 : 0.5,
                filter: b.earned ? "none" : "grayscale(0.6)",
              }}
            >
              <div className="text-2xl">{b.emoji}</div>
              <span
                className="text-xs text-center"
                style={{ color: b.earned ? T.textPrimary : T.textMuted, fontWeight: b.earned ? 600 : 400 }}
              >
                {b.label}
              </span>
              {b.earned && <Calendar className="w-3 h-3" style={{ color: T.primaryColor }} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
