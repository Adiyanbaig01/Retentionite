import { useState } from "react";
import {
  User,
  Bell,
  Palette,
  Zap,
  Shield,
  Download,
  Upload,
  Moon,
  Sun,
  ChevronRight,
  Trash2,
  Check,
  Sparkles,
} from "lucide-react";
import { useApp } from "../store";
import { useTheme } from "./ThemeContext";
import { THEME_META, AppTheme } from "./themes";
import profilePhoto from "../../assets/adiyan_profile.png";

export function Settings() {
  const { user, updateProfile } = useApp();
  const { theme, T, setTheme } = useTheme();
  const [activeSection, setActiveSection] = useState("profile");

  // Notification settings
  const [notifs, setNotifs] = useState({
    reviewReminders: true,
    streakAlerts: true,
    friendActivity: true,
    sharedDecks: true,
    weeklyReport: false,
  });

  // Study preferences
  const [dailyGoal, setDailyGoal] = useState(30);
  const [reviewOrder, setReviewOrder] = useState<"spaced" | "random" | "newest">("spaced");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [autoFlip, setAutoFlip] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [compactMode, setCompactMode] = useState(false);

  const sections = [
    { id: "profile", label: "Profile", icon: <User className="w-4 h-4" /> },
    { id: "notifications", label: "Notifications", icon: <Bell className="w-4 h-4" /> },
    { id: "appearance", label: "Appearance", icon: <Palette className="w-4 h-4" /> },
    { id: "study", label: "Study Preferences", icon: <Zap className="w-4 h-4" /> },
    { id: "privacy", label: "Privacy & Security", icon: <Shield className="w-4 h-4" /> },
    { id: "data", label: "Data & Export", icon: <Download className="w-4 h-4" /> },
  ];

  const cardStyle = {
    background: T.cardBg,
    border: `1px solid ${T.cardBorder}`,
    backdropFilter: T.showSpaceBg ? "blur(12px)" : "none",
    boxShadow: T.cardShadow,
  };

  function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
    return (
      <button
        onClick={() => onChange(!on)}
        className="relative flex-shrink-0 transition-all"
        style={{
          width: 40,
          height: 22,
          borderRadius: 999,
          background: on ? T.toggleOnBg : T.toggleOffBg,
          border: `1px solid ${on ? T.primaryBorder : T.toggleBorder}`,
          boxShadow: on ? `0 0 10px ${T.primaryGlow}` : "none",
        }}
      >
        <div
          className="absolute top-0.5 rounded-full bg-white transition-all"
          style={{
            width: 18,
            height: 18,
            left: on ? "calc(100% - 20px)" : "2px",
          }}
        />
      </button>
    );
  }

  return (
    <div className="p-7 max-w-[1100px]" style={{ transition: "all 0.3s ease" }}>
      <div className="mb-7">
        <h1
          style={{
            fontSize: "1.625rem",
            fontWeight: 800,
            letterSpacing: "-0.5px",
            fontFamily: "'Space Grotesk', sans-serif",
            color: T.textPrimary,
          }}
        >
          Settings ⚙️
        </h1>
        <p className="text-sm mt-1" style={{ color: T.textMuted }}>
          Customize your Retentionite experience.
        </p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-52 flex-shrink-0 space-y-0.5">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm text-left"
              style={{
                background: activeSection === s.id ? T.navActiveBg : "transparent",
                border:
                  activeSection === s.id
                    ? `1px solid ${T.navActiveBorder}`
                    : "1px solid transparent",
                color: activeSection === s.id ? T.navActiveText : T.navInactiveText,
                fontWeight: activeSection === s.id ? 600 : 400,
              }}
            >
              <span
                style={{
                  color: activeSection === s.id ? T.navActiveIcon : T.navInactiveIcon,
                }}
              >
                {s.icon}
              </span>
              {s.label}
              {activeSection === s.id && (
                <div
                  className="ml-auto w-1.5 h-1.5 rounded-full"
                  style={{ background: T.navDot, boxShadow: `0 0 6px ${T.navDot}` }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 space-y-5">
          {/* ── Profile ── */}
          {activeSection === "profile" && (
            <>
              <div className="rounded-3xl p-6" style={cardStyle}>
                <h2
                  className="text-sm mb-5"
                  style={{ fontWeight: 700, color: T.textPrimary }}
                >
                  Profile Information
                </h2>
                <div className="flex items-start gap-5 mb-5">
                  <div
                    className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0"
                    style={{
                      border: `2px solid ${T.primaryBorder}`,
                      boxShadow: `0 0 20px ${T.primaryGlow}`,
                    }}
                  >
                    <img
                      src={profilePhoto}
                      alt="Adiyan Baig"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label
                          className="block text-xs mb-1.5"
                          style={{ color: T.textMuted, fontWeight: 600 }}
                        >
                          Display Name
                        </label>
                        <input
                          defaultValue={user.name}
                          className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
                          style={{
                            background: T.inputBg,
                            border: `1px solid ${T.inputBorder}`,
                            color: T.inputText,
                            fontFamily: "'Space Grotesk', sans-serif",
                          }}
                        />
                      </div>
                      <div>
                        <label
                          className="block text-xs mb-1.5"
                          style={{ color: T.textMuted, fontWeight: 600 }}
                        >
                          Username
                        </label>
                        <input
                          defaultValue={user.username}
                          className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
                          style={{
                            background: T.inputBg,
                            border: `1px solid ${T.inputBorder}`,
                            color: T.inputText,
                            fontFamily: "'Space Grotesk', sans-serif",
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        className="block text-xs mb-1.5"
                        style={{ color: T.textMuted, fontWeight: 600 }}
                      >
                        Bio
                      </label>
                      <textarea
                        defaultValue={user.bio}
                        rows={2}
                        className="w-full px-3 py-2.5 rounded-xl text-sm outline-none resize-none"
                        style={{
                          background: T.inputBg,
                          border: `1px solid ${T.inputBorder}`,
                          color: T.inputText,
                          fontFamily: "'Space Grotesk', sans-serif",
                        }}
                      />
                    </div>
                  </div>
                </div>
                <button
                  className="px-5 py-2.5 rounded-xl text-sm"
                  style={{
                    background: T.primaryBg,
                    color: T.textOnPrimary,
                    fontWeight: 600,
                    boxShadow: `0 4px 14px ${T.primaryGlow}`,
                  }}
                >
                  Save Changes
                </button>
              </div>

              <div className="rounded-3xl p-6" style={cardStyle}>
                <h2
                  className="text-sm mb-4"
                  style={{ fontWeight: 700, color: T.textPrimary }}
                >
                  Account Stats
                </h2>
                <div className="grid grid-cols-4 gap-4">
                  {[
                    { label: "Total XP", val: user.xp.toLocaleString(), icon: "⚡" },
                    { label: "Day Streak", val: user.streak, icon: "🔥" },
                    { label: "Level", val: `Lv.${user.level}`, icon: "🚀" },
                    { label: "Study Hours", val: `${user.totalStudyHours}h`, icon: "⏱️" },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="text-center p-4 rounded-2xl"
                      style={{
                        background: T.primaryLight,
                        border: `1px solid ${T.primaryBorder}`,
                      }}
                    >
                      <div className="text-2xl mb-1">{s.icon}</div>
                      <div className="text-sm" style={{ fontWeight: 700, color: T.textPrimary }}>
                        {s.val}
                      </div>
                      <div className="text-xs" style={{ color: T.textMuted }}>
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* ── Notifications ── */}
          {activeSection === "notifications" && (
            <div className="rounded-3xl p-6" style={cardStyle}>
              <h2 className="text-sm mb-5" style={{ fontWeight: 700, color: T.textPrimary }}>
                Notification Preferences
              </h2>
              <div className="space-y-4">
                {Object.entries(notifs).map(([key, val]) => {
                  const labels: Record<string, { label: string; desc: string }> = {
                    reviewReminders: {
                      label: "Review Reminders",
                      desc: "Get notified when cards are due for review",
                    },
                    streakAlerts: {
                      label: "Streak Alerts",
                      desc: "Daily reminder to maintain your study streak",
                    },
                    friendActivity: {
                      label: "Friend Activity",
                      desc: "When friends reach milestones or new streaks",
                    },
                    sharedDecks: {
                      label: "Shared Decks",
                      desc: "When friends share flashcard decks with you",
                    },
                    weeklyReport: {
                      label: "Weekly Report",
                      desc: "Summary of your weekly study performance",
                    },
                  };
                  return (
                    <div
                      key={key}
                      className="flex items-center justify-between py-2.5"
                      style={{ borderBottom: `1px solid ${T.dividerColor}` }}
                    >
                      <div>
                        <div className="text-sm" style={{ fontWeight: 500, color: T.textPrimary }}>
                          {labels[key].label}
                        </div>
                        <div className="text-xs mt-0.5" style={{ color: T.textMuted }}>
                          {labels[key].desc}
                        </div>
                      </div>
                      <Toggle
                        on={val}
                        onChange={(v) => setNotifs((prev) => ({ ...prev, [key]: v }))}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ── Appearance ── */}
          {activeSection === "appearance" && (
            <>
              {/* Theme picker */}
              <div className="rounded-3xl p-6" style={cardStyle}>
                <div className="flex items-center gap-2 mb-5">
                  <Sparkles className="w-4 h-4" style={{ color: T.primaryColor }} />
                  <h2 className="text-sm" style={{ fontWeight: 700, color: T.textPrimary }}>
                    Choose Your Theme
                  </h2>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  {(["space", "duolingo", "light", "rose", "ocean"] as AppTheme[]).map((themeId) => {
                    const meta = THEME_META[themeId];
                    const isActive = theme === themeId;
                    // Background preview for each theme
                    const previewBg: Record<AppTheme, string> = {
                      space: "linear-gradient(135deg, #050814, #1a0533)",
                      duolingo: "linear-gradient(135deg, #EEF9E6, #E8F6FE)",
                      rose: "linear-gradient(135deg, #FDF2F8, #F5E6FF)",
                      light: "linear-gradient(135deg, #F8F9FC, #EEF0F7)",
                      ocean: "linear-gradient(135deg, #E0F2FE, #F0F9FF)",
                    };
                    return (
                      <button
                        key={themeId}
                        onClick={() => setTheme(themeId)}
                        className="relative p-4 rounded-2xl text-left transition-all hover:scale-[1.02]"
                        style={{
                          background: isActive ? T.navActiveBg : T.inputBg,
                          border: isActive
                            ? `2px solid ${T.primaryColor}`
                            : `2px solid ${T.cardBorder}`,
                          boxShadow: isActive ? `0 0 20px ${T.primaryGlow}` : T.cardShadow,
                          transform: isActive ? "scale(1.02)" : "scale(1)",
                        }}
                      >
                        {/* Active check */}
                        {isActive && (
                          <div
                            className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
                            style={{ background: T.primaryColor }}
                          >
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}

                        {/* Color swatches preview */}
                        <div className="flex gap-1.5 mb-3">
                          {meta.preview.map((color, i) => (
                            <div
                              key={i}
                              className="rounded-full"
                              style={{
                                width: i === 0 ? 28 : 18,
                                height: 18,
                                background: color,
                                border: "2px solid rgba(255,255,255,0.3)",
                                boxShadow: `0 2px 6px ${color}60`,
                              }}
                            />
                          ))}
                        </div>

                        {/* Theme preview mini-card */}
                        <div
                          className="w-full h-14 rounded-xl mb-3 overflow-hidden relative"
                          style={{ background: previewBg[themeId] }}
                        >
                          {/* Mini sidebar */}
                          <div
                            className="absolute left-0 top-0 bottom-0 w-8"
                            style={{
                              background:
                                themeId === "space"
                                  ? "rgba(255,255,255,0.06)"
                                  : "#FFFFFF",
                              borderRight:
                                themeId === "space"
                                  ? "1px solid rgba(255,255,255,0.08)"
                                  : "1px solid #E8ECF0",
                            }}
                          />
                          {/* Mini nav dots */}
                          {[0, 1, 2].map((i) => (
                            <div
                              key={i}
                              className="absolute rounded"
                              style={{
                                left: 10,
                                top: 8 + i * 14,
                                width: 12,
                                height: 3,
                                background:
                                  i === 0
                                    ? meta.preview[2]
                                    : themeId === "space"
                                    ? "rgba(255,255,255,0.15)"
                                    : "#D1D9E0",
                              }}
                            />
                          ))}
                          {/* Mini content card */}
                          <div
                            className="absolute rounded-lg"
                            style={{
                              right: 6,
                              top: 6,
                              width: 28,
                              height: 12,
                              background:
                                themeId === "space"
                                  ? "rgba(139,92,246,0.3)"
                                  : `${meta.preview[1]}25`,
                            }}
                          />
                          <div
                            className="absolute rounded"
                            style={{
                              right: 6,
                              top: 22,
                              width: 20,
                              height: 8,
                              background: `${meta.preview[2]}20`,
                            }}
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          <span style={{ fontSize: "1.1rem" }}>{meta.emoji}</span>
                          <div>
                            <div
                              className="text-sm"
                              style={{
                                fontWeight: isActive ? 700 : 600,
                                color: isActive ? T.navActiveText : T.textPrimary,
                              }}
                            >
                              {meta.label}
                            </div>
                            <div className="text-xs" style={{ color: T.textMuted }}>
                              {meta.desc}
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Currently active indicator */}
                <div
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl"
                  style={{
                    background: T.primaryLight,
                    border: `1px solid ${T.primaryBorder}`,
                  }}
                >
                  <span style={{ fontSize: "1.25rem" }}>{THEME_META[theme].emoji}</span>
                  <div>
                    <div className="text-sm" style={{ fontWeight: 600, color: T.primaryColor }}>
                      Active: {THEME_META[theme].label}
                    </div>
                    <div className="text-xs" style={{ color: T.textMuted }}>
                      {THEME_META[theme].desc} — changes apply instantly across the app
                    </div>
                  </div>
                </div>
              </div>

              {/* Display settings */}
              <div className="rounded-3xl p-6" style={cardStyle}>
                <h2 className="text-sm mb-5" style={{ fontWeight: 700, color: T.textPrimary }}>
                  Display Options
                </h2>
                <div className="space-y-4">
                  <div
                    className="flex items-center justify-between py-2.5"
                    style={{ borderBottom: `1px solid ${T.dividerColor}` }}
                  >
                    <div>
                      <div className="text-sm" style={{ fontWeight: 500, color: T.textPrimary }}>
                        Animations
                      </div>
                      <div className="text-xs mt-0.5" style={{ color: T.textMuted }}>
                        Planet floats, transitions, and micro-interactions
                      </div>
                    </div>
                    <Toggle on={animationsEnabled} onChange={setAnimationsEnabled} />
                  </div>
                  <div className="flex items-center justify-between py-2.5">
                    <div>
                      <div className="text-sm" style={{ fontWeight: 500, color: T.textPrimary }}>
                        Compact Mode
                      </div>
                      <div className="text-xs mt-0.5" style={{ color: T.textMuted }}>
                        Reduce spacing for more content visibility
                      </div>
                    </div>
                    <Toggle on={compactMode} onChange={setCompactMode} />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ── Study Preferences ── */}
          {activeSection === "study" && (
            <div className="rounded-3xl p-6" style={cardStyle}>
              <h2 className="text-sm mb-5" style={{ fontWeight: 700, color: T.textPrimary }}>
                Study Preferences
              </h2>
              <div className="space-y-5">
                <div>
                  <label
                    className="block text-sm mb-2"
                    style={{ color: T.textSecondary, fontWeight: 600 }}
                  >
                    Daily Study Goal:{" "}
                    <span style={{ color: T.primaryColor }}>{dailyGoal} minutes</span>
                  </label>
                  <input
                    type="range"
                    min={10}
                    max={120}
                    step={10}
                    value={dailyGoal}
                    onChange={(e) => setDailyGoal(Number(e.target.value))}
                    className="w-full"
                    style={{ accentColor: T.primaryColor }}
                  />
                  <div
                    className="flex justify-between text-xs mt-0.5"
                    style={{ color: T.textMuted }}
                  >
                    <span>10 min</span>
                    <span>2 hours</span>
                  </div>
                </div>

                <div>
                  <label
                    className="block text-sm mb-3"
                    style={{ color: T.textSecondary, fontWeight: 600 }}
                  >
                    Review Order
                  </label>
                  <div className="flex gap-2">
                    {[
                      { id: "spaced", label: "Spaced Repetition", desc: "Optimal for memory" },
                      { id: "random", label: "Random", desc: "Shuffle cards" },
                      { id: "newest", label: "Newest First", desc: "Recently added" },
                    ].map((o) => (
                      <button
                        key={o.id}
                        onClick={() => setReviewOrder(o.id as any)}
                        className="flex-1 p-3 rounded-xl text-left transition-all"
                        style={{
                          background: reviewOrder === o.id ? T.navActiveBg : T.inputBg,
                          border:
                            reviewOrder === o.id
                              ? `1px solid ${T.navActiveBorder}`
                              : `1px solid ${T.inputBorder}`,
                        }}
                      >
                        <div
                          className="text-sm"
                          style={{
                            color: reviewOrder === o.id ? T.navActiveText : T.textSecondary,
                            fontWeight: reviewOrder === o.id ? 600 : 400,
                          }}
                        >
                          {o.label}
                        </div>
                        <div className="text-xs mt-0.5" style={{ color: T.textMuted }}>
                          {o.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div
                    className="flex items-center justify-between py-2.5"
                    style={{ borderBottom: `1px solid ${T.dividerColor}` }}
                  >
                    <div>
                      <div className="text-sm" style={{ fontWeight: 500, color: T.textPrimary }}>
                        Sound Effects
                      </div>
                      <div className="text-xs mt-0.5" style={{ color: T.textMuted }}>
                        Card flip sounds and completion chimes
                      </div>
                    </div>
                    <Toggle on={soundEnabled} onChange={setSoundEnabled} />
                  </div>
                  <div className="flex items-center justify-between py-2.5">
                    <div>
                      <div className="text-sm" style={{ fontWeight: 500, color: T.textPrimary }}>
                        Auto-flip Cards
                      </div>
                      <div className="text-xs mt-0.5" style={{ color: T.textMuted }}>
                        Automatically show answer after 5 seconds
                      </div>
                    </div>
                    <Toggle on={autoFlip} onChange={setAutoFlip} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Privacy ── */}
          {activeSection === "privacy" && (
            <div className="space-y-5">
              <div className="rounded-3xl p-6" style={cardStyle}>
                <h2 className="text-sm mb-5" style={{ fontWeight: 700, color: T.textPrimary }}>
                  Profile Privacy
                </h2>
                <div className="space-y-4">
                  <div
                    className="flex items-center justify-between py-2.5"
                    style={{ borderBottom: `1px solid ${T.dividerColor}` }}
                  >
                    <div>
                      <div className="text-sm" style={{ fontWeight: 500, color: T.textPrimary }}>
                        Public Profile
                      </div>
                      <div className="text-xs mt-0.5" style={{ color: T.textMuted }}>
                        Allow others to find and view your profile
                      </div>
                    </div>
                    <Toggle on={user.isPublic} onChange={(v) => updateProfile({ isPublic: v })} />
                  </div>
                  <div className="flex items-center justify-between py-2.5">
                    <div>
                      <div className="text-sm" style={{ fontWeight: 500, color: T.textPrimary }}>
                        Show XP & Streak
                      </div>
                      <div className="text-xs mt-0.5" style={{ color: T.textMuted }}>
                        Display your XP and streak on your profile
                      </div>
                    </div>
                    <Toggle on={true} onChange={() => {}} />
                  </div>
                </div>
              </div>

              <div
                className="rounded-3xl p-6"
                style={{
                  ...cardStyle,
                  borderColor: T.dangerBorder,
                }}
              >
                <h2 className="text-sm mb-4" style={{ fontWeight: 700, color: T.dangerText }}>
                  Danger Zone
                </h2>
                <div className="space-y-3">
                  <button
                    className="w-full flex items-center justify-between p-3.5 rounded-2xl transition-all text-left"
                    style={{ background: T.dangerBg, border: `1px solid ${T.dangerBorder}` }}
                  >
                    <div>
                      <div className="text-sm" style={{ color: T.dangerText, fontWeight: 600 }}>
                        Reset All Progress
                      </div>
                      <div className="text-xs" style={{ color: T.textMuted }}>
                        Clear all XP, streaks, and mastered cards
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4" style={{ color: T.dangerText + "80" }} />
                  </button>
                  <button
                    className="w-full flex items-center justify-between p-3.5 rounded-2xl transition-all text-left"
                    style={{ background: T.dangerBg, border: `1px solid ${T.dangerBorder}` }}
                  >
                    <div>
                      <div
                        className="text-sm flex items-center gap-2"
                        style={{ color: T.dangerText, fontWeight: 600 }}
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete Account
                      </div>
                      <div className="text-xs" style={{ color: T.textMuted }}>
                        Permanently remove your account and all data
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4" style={{ color: T.dangerText + "80" }} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── Data & Export ── */}
          {activeSection === "data" && (
            <div className="rounded-3xl p-6" style={cardStyle}>
              <h2 className="text-sm mb-5" style={{ fontWeight: 700, color: T.textPrimary }}>
                Data & Export
              </h2>
              <div className="space-y-3">
                {[
                  {
                    label: "Export All Flashcards",
                    desc: "Download all your decks as CSV or Anki format",
                    icon: <Download className="w-4 h-4" />,
                    color: T.xpBadgeColor,
                  },
                  {
                    label: "Export Study Notes",
                    desc: "Download all notes as Markdown or PDF",
                    icon: <Download className="w-4 h-4" />,
                    color: T.secondaryColor,
                  },
                  {
                    label: "Export Analytics",
                    desc: "Download your retention and XP data",
                    icon: <Download className="w-4 h-4" />,
                    color: "#34D399",
                  },
                  {
                    label: "Import from Anki",
                    desc: "Import existing Anki decks into Retentionite",
                    icon: <Upload className="w-4 h-4" />,
                    color: T.streakBadgeColor,
                  },
                ].map((item) => (
                  <button
                    key={item.label}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl transition-all text-left hover:translate-y-[-1px]"
                    style={{
                      background: T.inputBg,
                      border: `1px solid ${T.inputBorder}`,
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: `${item.color}18`,
                        border: `1px solid ${item.color}30`,
                        color: item.color,
                      }}
                    >
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm" style={{ fontWeight: 600, color: T.textPrimary }}>
                        {item.label}
                      </div>
                      <div className="text-xs mt-0.5" style={{ color: T.textMuted }}>
                        {item.desc}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: T.textMuted }} />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
