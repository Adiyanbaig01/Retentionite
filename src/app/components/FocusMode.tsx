import { useState, useEffect, useRef, ReactElement } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  Volume2,
  VolumeX,
  Coffee,
  Brain,
  Moon,
  Maximize2,
  Music,
  Wind,
  CloudRain,
  Leaf,
  CheckCircle2,
} from "lucide-react";
import { useTheme } from "./ThemeContext";

const SESSIONS = [
  { label: "25 min", seconds: 25 * 60, type: "focus" },
  { label: "50 min", seconds: 50 * 60, type: "focus" },
  { label: "90 min", seconds: 90 * 60, type: "focus" },
];

const BREAK_OPTIONS = [
  { label: "5 min", seconds: 5 * 60 },
  { label: "10 min", seconds: 10 * 60 },
  { label: "15 min", seconds: 15 * 60 },
];

type Sound = "none" | "lofi" | "rain" | "nature" | "whitenoise";

const SOUNDS: { id: Sound; label: string; icon: ReactElement; desc: string }[] = [
  { id: "none", label: "Silence", icon: <VolumeX className="w-5 h-5" />, desc: "Pure quiet focus" },
  { id: "lofi", label: "Lo-Fi Beats", icon: <Music className="w-5 h-5" />, desc: "Chill study music" },
  { id: "rain", label: "Rainfall", icon: <CloudRain className="w-5 h-5" />, desc: "Cozy rain sounds" },
  { id: "nature", label: "Forest", icon: <Leaf className="w-5 h-5" />, desc: "Nature ambience" },
  { id: "whitenoise", label: "White Noise", icon: <Wind className="w-5 h-5" />, desc: "Steady background" },
];

const TASKS = [
  { id: 1, text: "Review Biology Chapter 4", done: true },
  { id: 2, text: "Complete Math flashcards deck", done: false },
  { id: 3, text: "Read History notes", done: false },
  { id: 4, text: "Practice Chemistry equations", done: false },
];

export function FocusMode() {
  const { T, theme } = useTheme();
  const [totalSeconds, setTotalSeconds] = useState(25 * 60);
  const [remaining, setRemaining] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [phase, setPhase] = useState<"focus" | "break">("focus");
  const [selectedSound, setSelectedSound] = useState<Sound>("lofi");
  const [volume, setVolume] = useState(60);
  const [muted, setMuted] = useState(false);
  const [sessionsCompleted, setSessions] = useState(2);
  const [tasks, setTasks] = useState(TASKS);
  const [zenMode, setZenMode] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (running && remaining > 0) {
      intervalRef.current = setInterval(() => {
        setRemaining((r) => r - 1);
      }, 1000);
    } else if (remaining === 0) {
      setRunning(false);
      if (phase === "focus") setSessions((s) => s + 1);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running, remaining, phase]);

  const toggleTimer = () => setRunning((r) => !r);
  const resetTimer = () => { setRunning(false); setRemaining(totalSeconds); };
  const selectSession = (s: typeof SESSIONS[0]) => { setRunning(false); setTotalSeconds(s.seconds); setRemaining(s.seconds); };
  const switchPhase = (p: "focus" | "break") => {
    setPhase(p);
    setRunning(false);
    const t = p === "focus" ? 25 * 60 : 5 * 60;
    setTotalSeconds(t);
    setRemaining(t);
  };

  const mins = String(Math.floor(remaining / 60)).padStart(2, "0");
  const secs = String(remaining % 60).padStart(2, "0");
  const progress = ((totalSeconds - remaining) / totalSeconds) * 100;
  const circumference = 2 * Math.PI * 110;
  const strokeDash = circumference - (progress / 100) * circumference;

  const ringColor = phase === "focus" ? T.primaryColor : "#34D399";
  const ringGlow = phase === "focus" ? T.primaryGlow : "rgba(52,211,153,0.4)";

  const cardStyle = {
    background: T.cardBg,
    border: `1px solid ${T.cardBorder}`,
    backdropFilter: T.showSpaceBg ? "blur(12px)" : "none",
    boxShadow: T.cardShadow,
  };

  return (
    <div
      className="min-h-full transition-colors duration-700"
      style={{ background: T.showSpaceBg ? "transparent" : T.appBg }}
    >
      {/* Space theme stars */}
      {T.showSpaceBg && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: Math.random() * 2 + 0.5 + "px",
                height: Math.random() * 2 + 0.5 + "px",
                top: Math.random() * 100 + "%",
                left: Math.random() * 100 + "%",
                background: "rgba(255,255,255,0.5)",
                opacity: Math.random() * 0.6 + 0.1,
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 p-8 max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1
              className="mb-1"
              style={{
                fontSize: "1.75rem",
                fontWeight: 800,
                letterSpacing: "-0.5px",
                color: T.textPrimary,
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              Focus Mode {theme === "duolingo" ? "🎯" : theme === "ocean" ? "🌊" : "🌌"}
            </h1>
            <p className="text-sm" style={{ color: T.textMuted }}>
              Distraction-free deep work with Pomodoro timer
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div
              className="flex items-center gap-2 rounded-xl px-3 py-2"
              style={{
                background: T.inputBg,
                border: `1px solid ${T.inputBorder}`,
              }}
            >
              <span style={{ color: T.streakBadgeColor }}>🔥</span>
              <span className="text-sm" style={{ fontWeight: 600, color: T.textPrimary }}>{sessionsCompleted} sessions today</span>
            </div>
            <button
              onClick={() => setZenMode((z) => !z)}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
              style={{
                background: zenMode ? T.navActiveBg : T.inputBg,
                border: zenMode ? `1px solid ${T.navActiveBorder}` : `1px solid ${T.inputBorder}`,
                color: zenMode ? T.navActiveText : T.textMuted,
              }}
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Timer - main */}
          <div className="col-span-2 space-y-5">
            {/* Phase selector */}
            <div
              className="flex gap-2 rounded-2xl p-1.5 w-fit"
              style={{ background: T.inputBg, border: `1px solid ${T.inputBorder}` }}
            >
              {[
                { p: "focus" as const, label: "Focus", icon: <Brain className="w-3.5 h-3.5" /> },
                { p: "break" as const, label: "Break", icon: <Coffee className="w-3.5 h-3.5" /> },
              ].map(({ p, label, icon }) => (
                <button
                  key={p}
                  onClick={() => switchPhase(p)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm transition-all"
                  style={{
                    background: phase === p ? T.primaryBg : "transparent",
                    color: phase === p ? T.textOnPrimary : T.textMuted,
                    fontWeight: phase === p ? 700 : 400,
                    boxShadow: phase === p ? `0 2px 8px ${T.primaryGlow}` : "none",
                  }}
                >
                  {icon}
                  {label}
                </button>
              ))}
            </div>

            {/* Timer display */}
            <div className="rounded-3xl p-10 flex flex-col items-center" style={cardStyle}>
              {/* SVG Ring */}
              <div className="relative mb-8" style={{ width: 260, height: 260 }}>
                <svg width="260" height="260" className="absolute inset-0">
                  <circle
                    cx="130" cy="130" r="110"
                    fill="none"
                    stroke={T.dividerColor}
                    strokeWidth="10"
                  />
                  <circle
                    cx="130" cy="130" r="110"
                    fill="none"
                    stroke={ringColor}
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDash}
                    transform="rotate(-90 130 130)"
                    style={{
                      transition: "stroke-dashoffset 0.5s ease",
                      filter: `drop-shadow(0 0 8px ${ringGlow})`,
                    }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div
                    className="text-xs uppercase tracking-widest mb-2"
                    style={{ fontWeight: 600, color: T.textMuted }}
                  >
                    {phase === "focus" ? "Deep Focus" : "Rest & Recharge"}
                  </div>
                  <div
                    style={{
                      fontSize: "3.75rem",
                      fontWeight: 800,
                      letterSpacing: "-2px",
                      lineHeight: 1,
                      color: T.textPrimary,
                    }}
                  >
                    {mins}:{secs}
                  </div>
                  <div className="text-sm mt-2" style={{ color: T.textMuted }}>{Math.round(progress)}% complete</div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-4 mb-8">
                <button
                  onClick={resetTimer}
                  className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all"
                  style={{ background: T.inputBg, border: `1px solid ${T.inputBorder}`, color: T.textMuted }}
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
                <button
                  onClick={toggleTimer}
                  className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all shadow-2xl"
                  style={{
                    background: running ? T.inputBg : T.primaryBg,
                    border: running ? `1px solid ${T.inputBorder}` : "none",
                    color: running ? T.textMuted : T.textOnPrimary,
                    boxShadow: running ? "none" : `0 4px 20px ${T.primaryGlow}`,
                  }}
                >
                  {running
                    ? <Pause className="w-7 h-7 fill-current" />
                    : <Play className="w-7 h-7 fill-current ml-0.5" />
                  }
                </button>
                <button
                  className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all"
                  style={{ background: T.inputBg, border: `1px solid ${T.inputBorder}`, color: T.textMuted }}
                >
                  <SkipForward className="w-5 h-5" />
                </button>
              </div>

              {/* Session presets */}
              <div className="flex gap-2 mb-5">
                {SESSIONS.map((s) => (
                  <button
                    key={s.label}
                    onClick={() => selectSession(s)}
                    className="px-4 py-1.5 rounded-xl text-sm transition-all"
                    style={{
                      background: totalSeconds === s.seconds ? T.navActiveBg : "transparent",
                      color: totalSeconds === s.seconds ? T.navActiveText : T.textMuted,
                      border: totalSeconds === s.seconds ? `1px solid ${T.navActiveBorder}` : `1px solid ${T.inputBorder}`,
                      fontWeight: totalSeconds === s.seconds ? 600 : 400,
                    }}
                  >
                    {s.label}
                  </button>
                ))}
                <div className="w-px mx-1" style={{ background: T.dividerColor }} />
                {BREAK_OPTIONS.map((b) => (
                  <button
                    key={b.label}
                    onClick={() => { switchPhase("break"); setTotalSeconds(b.seconds); setRemaining(b.seconds); }}
                    className="px-4 py-1.5 rounded-xl text-sm transition-all"
                    style={{
                      color: T.textMuted,
                      border: `1px solid ${T.inputBorder}`,
                    }}
                  >
                    {b.label}
                  </button>
                ))}
              </div>

              {/* Pomodoro dots */}
              <div className="flex items-center gap-2">
                <span className="text-xs" style={{ color: T.textMuted }}>Today's sessions:</span>
                <div className="flex gap-1.5">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="w-3 h-3 rounded-full transition-all"
                      style={{
                        background: i < sessionsCompleted ? T.primaryColor : T.inputBg,
                        border: `1px solid ${i < sessionsCompleted ? T.primaryColor : T.inputBorder}`,
                        boxShadow: i < sessionsCompleted ? `0 0 6px ${T.primaryGlow}` : "none",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Session stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Total Focus", val: "1h 42m", icon: "⏱️", color: T.primaryLight, border: T.primaryBorder },
                { label: "Sessions Done", val: `${sessionsCompleted} / 8`, icon: "🎯", color: T.inputBg, border: T.inputBorder },
                { label: "XP Earned", val: "+120 XP", icon: "⚡", color: `${T.xpBadgeColor}15`, border: `${T.xpBadgeColor}30` },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl p-4 text-center"
                  style={{ background: s.color, border: `1px solid ${s.border}` }}
                >
                  <div className="text-2xl mb-1">{s.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: "1.125rem", color: T.textPrimary }}>{s.val}</div>
                  <div className="text-xs mt-0.5" style={{ color: T.textMuted }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right panel */}
          <div className="space-y-5">
            {/* Sound selector */}
            <div className="rounded-3xl p-5" style={cardStyle}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4" style={{ color: T.textMuted }} />
                  <span className="text-sm" style={{ fontWeight: 600, color: T.textPrimary }}>Focus Sounds</span>
                </div>
                <button
                  onClick={() => setMuted((m) => !m)}
                  style={{ color: T.textMuted }}
                >
                  {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>

              <div className="space-y-2 mb-4">
                {SOUNDS.map((sound) => (
                  <button
                    key={sound.id}
                    onClick={() => setSelectedSound(sound.id)}
                    className="w-full flex items-center gap-3 p-3 rounded-2xl transition-all"
                    style={{
                      background: selectedSound === sound.id ? T.navActiveBg : "transparent",
                      border: selectedSound === sound.id
                        ? `1px solid ${T.navActiveBorder}`
                        : "1px solid transparent",
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: selectedSound === sound.id ? T.primaryLight : T.inputBg,
                        color: selectedSound === sound.id ? T.primaryColor : T.textMuted,
                      }}
                    >
                      {sound.icon}
                    </div>
                    <div className="text-left flex-1">
                      <div className="text-sm" style={{ fontWeight: selectedSound === sound.id ? 600 : 400, color: selectedSound === sound.id ? T.textPrimary : T.textSecondary }}>
                        {sound.label}
                      </div>
                      <div className="text-xs" style={{ color: T.textMuted }}>{sound.desc}</div>
                    </div>
                    {selectedSound === sound.id && (
                      <div className="flex gap-0.5">
                        {[...Array(4)].map((_, i) => (
                          <div
                            key={i}
                            className="rounded-full"
                            style={{
                              width: "2px",
                              background: T.primaryColor,
                              height: running ? (8 + Math.sin(i * 1.5) * 6) + "px" : "4px",
                              transition: "height 0.3s ease",
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Volume */}
              <div className="flex items-center gap-3">
                <VolumeX className="w-3.5 h-3.5" style={{ color: T.textMuted }} />
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={muted ? 0 : volume}
                  onChange={(e) => { setVolume(Number(e.target.value)); setMuted(false); }}
                  className="flex-1"
                  style={{ accentColor: T.primaryColor }}
                />
                <Volume2 className="w-3.5 h-3.5" style={{ color: T.textMuted }} />
              </div>
            </div>

            {/* Task list */}
            <div className="rounded-3xl p-5" style={cardStyle}>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm" style={{ fontWeight: 600, color: T.textPrimary }}>Today's Goals</span>
                <span className="text-xs" style={{ color: T.textMuted }}>
                  {tasks.filter((t) => t.done).length}/{tasks.length}
                </span>
              </div>
              <div className="space-y-2.5">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => setTasks((ts) => ts.map((t) => t.id === task.id ? { ...t, done: !t.done } : t))}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <div
                      className="w-5 h-5 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all"
                      style={{
                        background: task.done ? "#34D399" : "transparent",
                        borderColor: task.done ? "#34D399" : T.inputBorder,
                      }}
                    >
                      {task.done && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                    </div>
                    <span
                      className="text-sm transition-colors"
                      style={{
                        color: task.done ? T.textMuted : T.textSecondary,
                        textDecoration: task.done ? "line-through" : "none",
                      }}
                    >
                      {task.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mode tips */}
            <div className="rounded-3xl p-5" style={cardStyle}>
              <div className="flex items-center gap-2 mb-3">
                <Moon className="w-4 h-4" style={{ color: T.primaryColor }} />
                <span className="text-sm" style={{ fontWeight: 600, color: T.textPrimary }}>Focus Tips</span>
              </div>
              <ul className="space-y-2">
                {[
                  "Close unused browser tabs",
                  "Put your phone face-down",
                  "Drink water before you start",
                  "Take a real break when done",
                ].map((tip) => (
                  <li key={tip} className="flex items-start gap-2 text-xs" style={{ color: T.textMuted }}>
                    <div
                      className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0"
                      style={{ background: T.primaryColor }}
                    />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
