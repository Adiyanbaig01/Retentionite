import { useState } from "react";
import { ChevronLeft, ChevronRight, Flame, BookOpen, Target, Plus, Clock } from "lucide-react";
import { useApp, PLANET_LINE } from "../store";
import { useTheme } from "./ThemeContext";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// Mock study activity data
function generateActivityData(year: number, month: number) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const data: Record<number, { minutes: number; cards: number; xp: number }> = {};
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    if (date <= new Date() && Math.random() > 0.25) {
      const minutes = Math.floor(Math.random() * 120) + 10;
      data[d] = { minutes, cards: Math.floor(minutes * 0.7), xp: minutes * 4 };
    }
  }
  return data;
}

function getIntensity(minutes: number) {
  if (!minutes) return 0;
  if (minutes < 20) return 1;
  if (minutes < 45) return 2;
  if (minutes < 75) return 3;
  return 4;
}

export function StudyCalendar() {
  const { subjects } = useApp();
  const { T } = useTheme();
  const now = new Date();
  const [viewYear, setViewYear] = useState(now.getFullYear());
  const [viewMonth, setViewMonth] = useState(now.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const activityData = generateActivityData(viewYear, viewMonth);

  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1); }
    else setViewMonth((m) => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1); }
    else setViewMonth((m) => m + 1);
  };

  const today = now.getDate();
  const isCurrentMonth = viewMonth === now.getMonth() && viewYear === now.getFullYear();

  const selectedActivity = selectedDay ? activityData[selectedDay] : null;
  const totalMinutes = Object.values(activityData).reduce((a, d) => a + d.minutes, 0);
  const activeDays = Object.keys(activityData).length;
  const totalCards = Object.values(activityData).reduce((a, d) => a + d.cards, 0);

  // Generate heatmap for year view (last 12 weeks)
  const heatmapData = Array.from({ length: 12 * 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (12 * 7 - i));
    const activity = Math.random() > 0.4 ? Math.floor(Math.random() * 120) : 0;
    return { date: d, activity };
  });

  const cardStyle = {
    background: T.cardBg,
    border: `1px solid ${T.cardBorder}`,
    backdropFilter: T.showSpaceBg ? "blur(12px)" : "none",
    boxShadow: T.cardShadow,
  };

  // Intensity colors based on theme primary
  const intensityColors = [
    T.inputBg,
    `${T.primaryColor}25`,
    `${T.primaryColor}45`,
    `${T.primaryColor}70`,
    T.primaryColor,
  ];

  return (
    <div className="p-7 max-w-[1100px]">
      <div className="flex items-start justify-between mb-7">
        <div>
          <h1
            style={{
              fontSize: "1.625rem",
              fontWeight: 800,
              letterSpacing: "-0.5px",
              fontFamily: "'Space Grotesk', sans-serif",
              color: T.textPrimary,
            }}
          >
            Study Calendar 🗓️
          </h1>
          <p className="text-sm mt-1" style={{ color: T.textMuted }}>
            Track your study consistency and plan your sessions.
          </p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm"
          style={{
            background: T.primaryBg,
            color: T.textOnPrimary,
            fontWeight: 600,
            boxShadow: `0 4px 14px ${T.primaryGlow}`,
          }}
        >
          <Plus className="w-4 h-4" />
          Schedule Session
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {[
          { label: "This Month", val: `${totalMinutes}m`, icon: <Clock className="w-5 h-5" style={{ color: T.xpBadgeColor }} />, sub: "total study time", color: T.primaryLight, border: T.primaryBorder },
          { label: "Active Days", val: activeDays, icon: <Target className="w-5 h-5" style={{ color: "#34D399" }} />, sub: `of ${daysInMonth} days`, color: "rgba(52,211,153,0.08)", border: "rgba(52,211,153,0.2)" },
          { label: "Cards Done", val: totalCards, icon: <BookOpen className="w-5 h-5" style={{ color: T.secondaryColor }} />, sub: "this month", color: T.secondaryBg, border: `${T.secondaryColor}30` },
          { label: "Current Streak", val: "14 days 🔥", icon: <Flame className="w-5 h-5" style={{ color: T.streakBadgeColor }} />, sub: "Keep going!", color: `${T.streakBadgeColor}12`, border: `${T.streakBadgeColor}30` },
        ].map((s) => (
          <div key={s.label} className="rounded-3xl p-5" style={{ ...cardStyle, background: s.color, border: `1px solid ${s.border}` }}>
            <div className="flex items-start justify-between mb-3">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center"
                style={{ background: T.cardBg, border: `1px solid ${T.cardBorder}` }}
              >
                {s.icon}
              </div>
            </div>
            <div className="mb-0.5" style={{ fontWeight: 800, fontSize: "1.25rem", color: T.textPrimary }}>{s.val}</div>
            <div className="text-xs" style={{ color: T.textSecondary }}>{s.label}</div>
            <div className="text-xs mt-0.5" style={{ color: T.textMuted }}>{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="col-span-2 rounded-3xl p-6" style={cardStyle}>
          {/* Calendar header */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={prevMonth}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
              style={{ background: T.inputBg, border: `1px solid ${T.inputBorder}`, color: T.textMuted }}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <h2 style={{ fontWeight: 700, fontSize: "1.0625rem", color: T.textPrimary }}>
              {MONTHS[viewMonth]} {viewYear}
            </h2>
            <button
              onClick={nextMonth}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
              style={{ background: T.inputBg, border: `1px solid ${T.inputBorder}`, color: T.textMuted }}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 mb-2">
            {DAYS.map((d) => (
              <div key={d} className="text-center text-xs py-1" style={{ color: T.sectionLabelColor, fontWeight: 600 }}>
                {d}
              </div>
            ))}
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Previous month filler */}
            {Array.from({ length: firstDayOfMonth }, (_, i) => (
              <div key={`prev-${i}`} className="aspect-square rounded-xl flex items-center justify-center">
                <span className="text-xs" style={{ color: T.textMuted, opacity: 0.3 }}>
                  {daysInPrevMonth - firstDayOfMonth + i + 1}
                </span>
              </div>
            ))}

            {/* Current month days */}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1;
              const activity = activityData[day];
              const intensity = activity ? getIntensity(activity.minutes) : 0;
              const isToday = isCurrentMonth && day === today;
              const isSelected = day === selectedDay;
              const isFuture = isCurrentMonth && day > today;

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(isSelected ? null : day)}
                  className="aspect-square rounded-xl flex items-center justify-center relative transition-all"
                  style={{
                    background: isSelected
                      ? T.primaryColor
                      : isToday
                        ? T.navActiveBg
                        : intensityColors[intensity],
                    border: isSelected
                      ? `1px solid ${T.primaryColor}`
                      : isToday
                        ? `1px solid ${T.navActiveBorder}`
                        : `1px solid ${T.dividerColor}`,
                    opacity: isFuture ? 0.35 : 1,
                    cursor: isFuture ? "default" : "pointer",
                    boxShadow: isSelected ? `0 0 10px ${T.primaryGlow}` : "none",
                  }}
                  disabled={isFuture}
                >
                  <span
                    className="text-xs"
                    style={{
                      color: isSelected ? T.textOnPrimary : isToday ? T.navActiveText : T.textSecondary,
                      fontWeight: isToday ? 700 : 400,
                    }}
                  >
                    {day}
                  </span>
                  {isToday && (
                    <div
                      className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                      style={{ background: T.navDot, boxShadow: `0 0 4px ${T.navDot}` }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-2 mt-5 justify-end">
            <span className="text-xs" style={{ color: T.textMuted }}>Less</span>
            {intensityColors.map((c, i) => (
              <div
                key={i}
                className="w-4 h-4 rounded"
                style={{ background: c, border: `1px solid ${T.dividerColor}` }}
              />
            ))}
            <span className="text-xs" style={{ color: T.textMuted }}>More</span>
          </div>
        </div>

        {/* Right panel */}
        <div className="space-y-4">
          {/* Selected day details */}
          {selectedDay && selectedActivity ? (
            <div className="rounded-3xl p-5" style={cardStyle}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-xs mb-0.5" style={{ color: T.sectionLabelColor, fontWeight: 600, textTransform: "uppercase" }}>
                    {MONTHS[viewMonth]} {selectedDay}
                  </div>
                  <h3 style={{ fontWeight: 700, color: T.textPrimary }}>Study Session</h3>
                </div>
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{ background: "rgba(52,211,153,0.15)", color: "#6EE7B7", fontWeight: 600, border: "1px solid rgba(52,211,153,0.25)" }}
                >
                  Completed
                </span>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Study Time", val: `${selectedActivity.minutes}m`, icon: "⏱️" },
                  { label: "Cards Reviewed", val: selectedActivity.cards, icon: "🃏" },
                  { label: "XP Earned", val: `+${selectedActivity.xp}`, icon: "⚡" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="flex items-center justify-between p-3 rounded-2xl"
                    style={{ background: T.inputBg, border: `1px solid ${T.inputBorder}` }}
                  >
                    <div className="flex items-center gap-2.5">
                      <span>{s.icon}</span>
                      <span className="text-sm" style={{ color: T.textSecondary }}>{s.label}</span>
                    </div>
                    <span className="text-sm" style={{ fontWeight: 700, color: T.textPrimary }}>{s.val}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-3xl p-5" style={cardStyle}>
              <h3 className="text-sm mb-3" style={{ fontWeight: 700, color: T.textPrimary }}>
                {selectedDay ? "No Activity" : "Select a Day"}
              </h3>
              <p className="text-sm" style={{ color: T.textMuted }}>
                {selectedDay
                  ? `No study sessions recorded on ${MONTHS[viewMonth]} ${selectedDay}.`
                  : "Click any day to see your study details."}
              </p>
            </div>
          )}

          {/* Upcoming sessions */}
          <div className="rounded-3xl p-5" style={cardStyle}>
            <h3 className="text-sm mb-3" style={{ fontWeight: 700, color: T.textPrimary }}>Scheduled Reviews</h3>
            <div className="space-y-2.5">
              {subjects.slice(0, 4).map((s, i) => {
                const days = [0, 1, 2, 4];
                const dueDate = new Date();
                dueDate.setDate(dueDate.getDate() + days[i]);
                const label = days[i] === 0 ? "Today" : days[i] === 1 ? "Tomorrow" : `In ${days[i]} days`;
                return (
                  <div
                    key={s.id}
                    className="flex items-center gap-3 p-3 rounded-2xl transition-all cursor-pointer hover:translate-y-[-1px]"
                    style={{
                      background: days[i] === 0 ? T.navActiveBg : T.inputBg,
                      border: days[i] === 0 ? `1px solid ${T.navActiveBorder}` : `1px solid ${T.inputBorder}`,
                    }}
                  >
                    <span className="text-base">{s.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs truncate" style={{ color: T.textPrimary, fontWeight: 600 }}>
                        {s.name}
                      </div>
                      <div className="text-xs" style={{ color: T.textMuted }}>
                        {Math.floor(Math.random() * 15 + 3)} cards due
                      </div>
                    </div>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full flex-shrink-0"
                      style={{
                        background: days[i] === 0 ? T.primaryColor : T.inputBg,
                        color: days[i] === 0 ? T.textOnPrimary : T.textMuted,
                        fontWeight: 600,
                        fontSize: "0.625rem",
                        boxShadow: days[i] === 0 ? `0 0 8px ${T.primaryGlow}` : "none",
                      }}
                    >
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Year heatmap */}
          <div className="rounded-3xl p-5" style={cardStyle}>
            <h3 className="text-sm mb-3" style={{ fontWeight: 700, color: T.textPrimary }}>Activity Heatmap</h3>
            <div className="flex flex-wrap gap-0.5">
              {heatmapData.map((d, i) => (
                <div
                  key={i}
                  className="rounded-sm"
                  style={{
                    width: "10px",
                    height: "10px",
                    background: intensityColors[getIntensity(d.activity)],
                    border: `1px solid ${T.dividerColor}`,
                  }}
                  title={`${d.date.toLocaleDateString()}: ${d.activity}m`}
                />
              ))}
            </div>
            <div className="flex items-center gap-1.5 mt-2">
              <span className="text-xs" style={{ color: T.textMuted }}>12 weeks of activity</span>
            </div>
          </div>

          {/* Subject review schedule */}
          <div className="rounded-3xl p-5" style={cardStyle}>
            <h3 className="text-sm mb-3" style={{ fontWeight: 700, color: T.textPrimary }}>Subject Progress</h3>
            <div className="space-y-3">
              {subjects.slice(0, 4).map((s) => (
                <div key={s.id} className="flex items-center gap-2.5">
                  <span className="text-sm">{s.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between mb-1">
                      <span className="text-xs truncate" style={{ color: T.textSecondary, fontWeight: 500 }}>{s.name}</span>
                      <span className="text-xs flex-shrink-0" style={{ color: PLANET_LINE[s.planet], fontWeight: 600 }}>{s.progress}%</span>
                    </div>
                    <div className="w-full rounded-full h-1" style={{ background: T.xpBarBg }}>
                      <div
                        className="h-1 rounded-full transition-all duration-700"
                        style={{ width: s.progress + "%", background: PLANET_LINE[s.planet], boxShadow: `0 0 4px ${PLANET_LINE[s.planet]}80` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
