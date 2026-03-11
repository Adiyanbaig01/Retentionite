// ── Theme Definitions ──────────────────────────────────────

export type AppTheme = "space" | "duolingo" | "light" | "rose" | "ocean" | "marvel" | "stranger-things";

export interface ThemeStyles {
  // Layout
  appBg: string;
  sidebarBg: string;
  sidebarBorder: string;
  headerBg: string;
  headerBorder: string;

  // Cards
  cardBg: string;
  cardBorder: string;
  cardHoverBg: string;
  cardShadow: string;

  // Text
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textOnPrimary: string;

  // Nav
  navActiveBg: string;
  navActiveBorder: string;
  navActiveText: string;
  navActiveIcon: string;
  navInactiveText: string;
  navInactiveIcon: string;
  navDot: string;

  // Primary accent
  primaryColor: string;
  primaryBg: string;
  primaryGlow: string;
  primaryLight: string;
  primaryBorder: string;

  // Secondary accent
  secondaryColor: string;
  secondaryBg: string;

  // Inputs
  inputBg: string;
  inputBorder: string;
  inputText: string;

  // Borders
  dividerColor: string;

  // Badges & pills
  xpBadgeColor: string;
  streakBadgeColor: string;

  // XP bar
  xpBarBg: string;
  xpBarFill: string;

  // Level card in sidebar
  levelCardBg: string;
  levelCardBorder: string;

  // User card in sidebar
  userCardBg: string;
  userCardBorder: string;

  // Notif popup
  popupBg: string;
  popupBorder: string;

  // Scrollbar
  scrollbarThumb: string;

  // Space background visible?
  showSpaceBg: boolean;
  bodyBg: string;

  // Section labels
  sectionLabelColor: string;

  // Danger zone
  dangerText: string;
  dangerBg: string;
  dangerBorder: string;

  // Toggle
  toggleOnBg: string;
  toggleOffBg: string;
  toggleBorder: string;

  // Search bar
  searchBg: string;
  searchBorder: string;
  searchText: string;

  // Success color (e.g. for "ANSWER" labels, completion states)
  successColor: string;
  successBg: string;
  successBorder: string;
}

// ── Space Dark Theme (default) ─────────────────────────────
export const SPACE_THEME: ThemeStyles = {
  appBg: "#050814",
  sidebarBg: "rgba(5,7,25,0.85)",
  sidebarBorder: "rgba(255,255,255,0.07)",
  headerBg: "rgba(5,8,20,0.7)",
  headerBorder: "rgba(255,255,255,0.06)",

  cardBg: "rgba(255,255,255,0.04)",
  cardBorder: "rgba(255,255,255,0.08)",
  cardHoverBg: "rgba(255,255,255,0.07)",
  cardShadow: "none",

  textPrimary: "#FFFFFF",
  textSecondary: "rgba(255,255,255,0.6)",
  textMuted: "rgba(255,255,255,0.35)",
  textOnPrimary: "#FFFFFF",

  navActiveBg: "rgba(139,92,246,0.15)",
  navActiveBorder: "rgba(139,92,246,0.25)",
  navActiveText: "#C4B5FD",
  navActiveIcon: "#A78BFA",
  navInactiveText: "rgba(255,255,255,0.45)",
  navInactiveIcon: "rgba(255,255,255,0.3)",
  navDot: "#8B5CF6",

  primaryColor: "#8B5CF6",
  primaryBg: "linear-gradient(135deg, #7C3AED, #4F46E5)",
  primaryGlow: "rgba(139,92,246,0.4)",
  primaryLight: "rgba(139,92,246,0.15)",
  primaryBorder: "rgba(139,92,246,0.35)",

  secondaryColor: "#60A5FA",
  secondaryBg: "rgba(59,130,246,0.15)",

  inputBg: "rgba(255,255,255,0.05)",
  inputBorder: "rgba(255,255,255,0.1)",
  inputText: "rgba(255,255,255,0.8)",

  dividerColor: "rgba(255,255,255,0.06)",

  xpBadgeColor: "#A78BFA",
  streakBadgeColor: "#FBBF24",

  xpBarBg: "rgba(255,255,255,0.08)",
  xpBarFill: "linear-gradient(90deg, #7C3AED, #6366F1)",

  levelCardBg: "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(79,70,229,0.2))",
  levelCardBorder: "rgba(139,92,246,0.25)",

  userCardBg: "rgba(139,92,246,0.08)",
  userCardBorder: "rgba(139,92,246,0.15)",

  popupBg: "rgba(10,13,35,0.95)",
  popupBorder: "rgba(255,255,255,0.1)",

  scrollbarThumb: "rgba(139,92,246,0.4)",

  showSpaceBg: true,
  bodyBg: "#050814",

  sectionLabelColor: "rgba(255,255,255,0.25)",

  dangerText: "#FDA4AF",
  dangerBg: "rgba(244,63,94,0.06)",
  dangerBorder: "rgba(244,63,94,0.12)",

  toggleOnBg: "linear-gradient(135deg, #7C3AED, #4F46E5)",
  toggleOffBg: "rgba(255,255,255,0.1)",
  toggleBorder: "rgba(255,255,255,0.12)",

  searchBg: "rgba(255,255,255,0.05)",
  searchBorder: "rgba(255,255,255,0.08)",
  searchText: "rgba(255,255,255,0.8)",

  successColor: "#34D399",
  successBg: "rgba(52,211,153,0.12)",
  successBorder: "rgba(52,211,153,0.25)",
};

// ── Duolingo Playful Theme ─────────────────────────────────
export const DUOLINGO_THEME: ThemeStyles = {
  appBg: "#F7F9F2",
  sidebarBg: "#FFFFFF",
  sidebarBorder: "#E2EAD8",
  headerBg: "rgba(255,255,255,0.97)",
  headerBorder: "#E2EAD8",

  cardBg: "#FFFFFF",
  cardBorder: "#E2EAD8",
  cardHoverBg: "#F4FAF0",
  cardShadow: "0 2px 16px rgba(88,204,2,0.08), 0 1px 4px rgba(0,0,0,0.06)",

  textPrimary: "#1A2B0E",
  textSecondary: "#3D5C1A",
  textMuted: "#89A66B",
  textOnPrimary: "#FFFFFF",

  navActiveBg: "#EBF9D6",
  navActiveBorder: "#9ED847",
  navActiveText: "#2F7000",
  navActiveIcon: "#58CC02",
  navInactiveText: "#3D5C1A",
  navInactiveIcon: "#89A66B",
  navDot: "#58CC02",

  primaryColor: "#58CC02",
  primaryBg: "linear-gradient(135deg, #58CC02, #46A302)",
  primaryGlow: "rgba(88,204,2,0.35)",
  primaryLight: "#EBF9D6",
  primaryBorder: "#9ED847",

  secondaryColor: "#1CB0F6",
  secondaryBg: "#E3F5FD",

  inputBg: "#F4FAF0",
  inputBorder: "#C8E49A",
  inputText: "#1A2B0E",

  dividerColor: "#E2EAD8",

  xpBadgeColor: "#58CC02",
  streakBadgeColor: "#FF9600",

  xpBarBg: "#E2EAD8",
  xpBarFill: "linear-gradient(90deg, #58CC02, #9ED847)",

  levelCardBg: "linear-gradient(135deg, rgba(88,204,2,0.14), rgba(28,176,246,0.08))",
  levelCardBorder: "#9ED847",

  userCardBg: "#EBF9D6",
  userCardBorder: "#B5E48C",

  popupBg: "#FFFFFF",
  popupBorder: "#E2EAD8",

  scrollbarThumb: "rgba(88,204,2,0.4)",

  showSpaceBg: false,
  bodyBg: "#F7F9F2",

  sectionLabelColor: "#89A66B",

  dangerText: "#E5341A",
  dangerBg: "rgba(229,52,26,0.06)",
  dangerBorder: "rgba(229,52,26,0.2)",

  toggleOnBg: "linear-gradient(135deg, #58CC02, #46A302)",
  toggleOffBg: "#D6E8BF",
  toggleBorder: "#B5D68F",

  searchBg: "#F4FAF0",
  searchBorder: "#C8E49A",
  searchText: "#1A2B0E",

  successColor: "#46A302",
  successBg: "rgba(88,204,2,0.12)",
  successBorder: "#9ED847",
};

// ── Light Clean Theme ──────────────────────────────────────
export const LIGHT_THEME: ThemeStyles = {
  appBg: "#F8F9FC",
  sidebarBg: "#FFFFFF",
  sidebarBorder: "#EAEDF2",
  headerBg: "rgba(255,255,255,0.92)",
  headerBorder: "#EAEDF2",

  cardBg: "#FFFFFF",
  cardBorder: "#EAEDF2",
  cardHoverBg: "#F5F7FB",
  cardShadow: "0 1px 8px rgba(0,0,0,0.05)",

  textPrimary: "#0F172A",
  textSecondary: "#475569",
  textMuted: "#94A3B8",
  textOnPrimary: "#FFFFFF",

  navActiveBg: "rgba(99,102,241,0.1)",
  navActiveBorder: "rgba(99,102,241,0.25)",
  navActiveText: "#4F46E5",
  navActiveIcon: "#6366F1",
  navInactiveText: "#64748B",
  navInactiveIcon: "#94A3B8",
  navDot: "#6366F1",

  primaryColor: "#6366F1",
  primaryBg: "linear-gradient(135deg, #6366F1, #4F46E5)",
  primaryGlow: "rgba(99,102,241,0.3)",
  primaryLight: "rgba(99,102,241,0.08)",
  primaryBorder: "rgba(99,102,241,0.3)",

  secondaryColor: "#06B6D4",
  secondaryBg: "rgba(6,182,212,0.08)",

  inputBg: "#F8F9FC",
  inputBorder: "#DBEAFE",
  inputText: "#0F172A",

  dividerColor: "#EAEDF2",

  xpBadgeColor: "#6366F1",
  streakBadgeColor: "#F59E0B",

  xpBarBg: "#EAEDF2",
  xpBarFill: "linear-gradient(90deg, #6366F1, #818CF8)",

  levelCardBg: "linear-gradient(135deg, rgba(99,102,241,0.1), rgba(6,182,212,0.05))",
  levelCardBorder: "rgba(99,102,241,0.2)",

  userCardBg: "rgba(99,102,241,0.06)",
  userCardBorder: "rgba(99,102,241,0.15)",

  popupBg: "#FFFFFF",
  popupBorder: "#EAEDF2",

  scrollbarThumb: "rgba(99,102,241,0.3)",

  showSpaceBg: false,
  bodyBg: "#F8F9FC",

  sectionLabelColor: "#94A3B8",

  dangerText: "#EF4444",
  dangerBg: "rgba(239,68,68,0.05)",
  dangerBorder: "rgba(239,68,68,0.15)",

  toggleOnBg: "linear-gradient(135deg, #6366F1, #4F46E5)",
  toggleOffBg: "#E2E8F0",
  toggleBorder: "#CBD5E1",

  searchBg: "#FFFFFF",
  searchBorder: "#E2E8F0",
  searchText: "#0F172A",

  successColor: "#10B981",
  successBg: "rgba(16,185,129,0.08)",
  successBorder: "rgba(16,185,129,0.2)",
};

// ── Rose Garden Theme ──────────────────────────────────────
export const ROSE_THEME: ThemeStyles = {
  appBg: "#FDF2F8",
  sidebarBg: "#FFFFFF",
  sidebarBorder: "#FBCFE8",
  headerBg: "rgba(255,255,255,0.97)",
  headerBorder: "#FBCFE8",

  cardBg: "#FFFFFF",
  cardBorder: "#FBCFE8",
  cardHoverBg: "#FEF3F9",
  cardShadow: "0 2px 16px rgba(225,29,122,0.07), 0 1px 4px rgba(0,0,0,0.05)",

  textPrimary: "#1E0A16",
  textSecondary: "#6B2D4F",
  textMuted: "#B27A9A",
  textOnPrimary: "#FFFFFF",

  navActiveBg: "rgba(225,29,122,0.08)",
  navActiveBorder: "rgba(225,29,122,0.3)",
  navActiveText: "#9D1B60",
  navActiveIcon: "#E11D7A",
  navInactiveText: "#6B2D4F",
  navInactiveIcon: "#B27A9A",
  navDot: "#E11D7A",

  primaryColor: "#E11D7A",
  primaryBg: "linear-gradient(135deg, #E11D7A, #9333EA)",
  primaryGlow: "rgba(225,29,122,0.35)",
  primaryLight: "rgba(225,29,122,0.08)",
  primaryBorder: "rgba(225,29,122,0.3)",

  secondaryColor: "#9333EA",
  secondaryBg: "rgba(147,51,234,0.08)",

  inputBg: "#FDF2F8",
  inputBorder: "#FBCFE8",
  inputText: "#1E0A16",

  dividerColor: "#FBCFE8",

  xpBadgeColor: "#E11D7A",
  streakBadgeColor: "#F59E0B",

  xpBarBg: "#FBCFE8",
  xpBarFill: "linear-gradient(90deg, #E11D7A, #9333EA)",

  levelCardBg: "linear-gradient(135deg, rgba(225,29,122,0.1), rgba(147,51,234,0.07))",
  levelCardBorder: "rgba(225,29,122,0.25)",

  userCardBg: "rgba(225,29,122,0.06)",
  userCardBorder: "rgba(225,29,122,0.18)",

  popupBg: "#FFFFFF",
  popupBorder: "#FBCFE8",

  scrollbarThumb: "rgba(225,29,122,0.35)",

  showSpaceBg: false,
  bodyBg: "#FDF2F8",

  sectionLabelColor: "#B27A9A",

  dangerText: "#DC2626",
  dangerBg: "rgba(220,38,38,0.05)",
  dangerBorder: "rgba(220,38,38,0.15)",

  toggleOnBg: "linear-gradient(135deg, #E11D7A, #9333EA)",
  toggleOffBg: "#FBCFE8",
  toggleBorder: "#F9A8D4",

  searchBg: "#FDF2F8",
  searchBorder: "#FBCFE8",
  searchText: "#1E0A16",

  successColor: "#BE185D",
  successBg: "rgba(190,24,93,0.08)",
  successBorder: "rgba(190,24,93,0.2)",
};

// ── Ocean Breeze Theme ─���───────────────────────────────────
export const OCEAN_THEME: ThemeStyles = {
  appBg: "#F0F9FF",
  sidebarBg: "#FFFFFF",
  sidebarBorder: "#BAE6FD",
  headerBg: "rgba(255,255,255,0.97)",
  headerBorder: "#BAE6FD",

  cardBg: "#FFFFFF",
  cardBorder: "#BAE6FD",
  cardHoverBg: "#E0F2FE",
  cardShadow: "0 2px 16px rgba(14,165,233,0.08), 0 1px 4px rgba(0,0,0,0.05)",

  textPrimary: "#0C1A2E",
  textSecondary: "#1E6FA8",
  textMuted: "#64A8C8",
  textOnPrimary: "#FFFFFF",

  navActiveBg: "rgba(14,165,233,0.1)",
  navActiveBorder: "rgba(14,165,233,0.3)",
  navActiveText: "#0369A1",
  navActiveIcon: "#0EA5E9",
  navInactiveText: "#1E6FA8",
  navInactiveIcon: "#64A8C8",
  navDot: "#0EA5E9",

  primaryColor: "#0EA5E9",
  primaryBg: "linear-gradient(135deg, #0EA5E9, #0369A1)",
  primaryGlow: "rgba(14,165,233,0.35)",
  primaryLight: "rgba(14,165,233,0.08)",
  primaryBorder: "rgba(14,165,233,0.3)",

  secondaryColor: "#06B6D4",
  secondaryBg: "rgba(6,182,212,0.1)",

  inputBg: "#F0F9FF",
  inputBorder: "#BAE6FD",
  inputText: "#0C1A2E",

  dividerColor: "#BAE6FD",

  xpBadgeColor: "#0EA5E9",
  streakBadgeColor: "#F59E0B",

  xpBarBg: "#BAE6FD",
  xpBarFill: "linear-gradient(90deg, #0EA5E9, #38BDF8)",

  levelCardBg: "linear-gradient(135deg, rgba(14,165,233,0.12), rgba(6,182,212,0.07))",
  levelCardBorder: "rgba(14,165,233,0.25)",

  userCardBg: "rgba(14,165,233,0.06)",
  userCardBorder: "rgba(14,165,233,0.18)",

  popupBg: "#FFFFFF",
  popupBorder: "#BAE6FD",

  scrollbarThumb: "rgba(14,165,233,0.35)",

  showSpaceBg: false,
  bodyBg: "#F0F9FF",

  sectionLabelColor: "#64A8C8",

  dangerText: "#EF4444",
  dangerBg: "rgba(239,68,68,0.05)",
  dangerBorder: "rgba(239,68,68,0.15)",

  toggleOnBg: "linear-gradient(135deg, #0EA5E9, #0369A1)",
  toggleOffBg: "#BAE6FD",
  toggleBorder: "#7DD3FC",

  searchBg: "#FFFFFF",
  searchBorder: "#BAE6FD",
  searchText: "#0C1A2E",

  successColor: "#0284C7",
  successBg: "rgba(2,132,199,0.08)",
  successBorder: "rgba(2,132,199,0.2)",
};

// ── Marvel Hero Theme ──────────────────────────────────────
export const MARVEL_THEME: ThemeStyles = {
  appBg: "#111111",
  sidebarBg: "#1A1A1A",
  sidebarBorder: "#333333",
  headerBg: "rgba(26,26,26,0.97)",
  headerBorder: "#333333",

  cardBg: "#1A1A1A",
  cardBorder: "#333333",
  cardHoverBg: "#222222",
  cardShadow: "0 4px 20px rgba(0,0,0,0.5)",

  textPrimary: "#FFFFFF",
  textSecondary: "#CCCCCC",
  textMuted: "#888888",
  textOnPrimary: "#FFFFFF",

  navActiveBg: "rgba(226,54,54,0.15)",
  navActiveBorder: "rgba(226,54,54,0.4)",
  navActiveText: "#FF4D4D",
  navActiveIcon: "#E23636",
  navInactiveText: "#CCCCCC",
  navInactiveIcon: "#888888",
  navDot: "#E23636",

  primaryColor: "#E23636",
  primaryBg: "linear-gradient(135deg, #E23636, #990000)",
  primaryGlow: "rgba(226,54,54,0.4)",
  primaryLight: "rgba(226,54,54,0.15)",
  primaryBorder: "rgba(226,54,54,0.4)",

  secondaryColor: "#F5B041",
  secondaryBg: "rgba(245,176,65,0.15)",

  inputBg: "#111111",
  inputBorder: "#333333",
  inputText: "#FFFFFF",

  dividerColor: "#333333",

  xpBadgeColor: "#E23636",
  streakBadgeColor: "#F5B041",

  xpBarBg: "#333333",
  xpBarFill: "linear-gradient(90deg, #E23636, #F5B041)",

  levelCardBg: "linear-gradient(135deg, rgba(226,54,54,0.15), rgba(245,176,65,0.1))",
  levelCardBorder: "rgba(226,54,54,0.3)",

  userCardBg: "rgba(226,54,54,0.08)",
  userCardBorder: "rgba(226,54,54,0.2)",

  popupBg: "#1A1A1A",
  popupBorder: "#333333",

  scrollbarThumb: "rgba(226,54,54,0.4)",

  showSpaceBg: false,
  bodyBg: "#111111",

  sectionLabelColor: "#888888",

  dangerText: "#FF4D4D",
  dangerBg: "rgba(255,77,77,0.1)",
  dangerBorder: "rgba(255,77,77,0.3)",

  toggleOnBg: "linear-gradient(135deg, #E23636, #990000)",
  toggleOffBg: "#333333",
  toggleBorder: "#555555",

  searchBg: "#111111",
  searchBorder: "#333333",
  searchText: "#FFFFFF",

  successColor: "#2ECC71",
  successBg: "rgba(46,204,113,0.15)",
  successBorder: "rgba(46,204,113,0.3)",
};

// ── Stranger Things Theme ───────────────────────────────────
export const STRANGER_THINGS_THEME: ThemeStyles = {
  appBg: "#0B0C10",
  sidebarBg: "#111217",
  sidebarBorder: "#1F2833",
  headerBg: "rgba(17,18,23,0.9)",
  headerBorder: "#1F2833",

  cardBg: "#111217",
  cardBorder: "#1F2833",
  cardHoverBg: "#15161C",
  cardShadow: "0 4px 15px rgba(200,30,30,0.1)",

  textPrimary: "#C5C6C7",
  textSecondary: "#8B9298",
  textMuted: "#5F646A",
  textOnPrimary: "#0B0C10",

  navActiveBg: "rgba(220,20,60,0.1)",
  navActiveBorder: "rgba(220,20,60,0.3)",
  navActiveText: "#FF3366",
  navActiveIcon: "#DC143C",
  navInactiveText: "#8B9298",
  navInactiveIcon: "#5F646A",
  navDot: "#DC143C",

  primaryColor: "#DC143C",
  primaryBg: "linear-gradient(135deg, #DC143C, #8B0000)",
  primaryGlow: "rgba(220,20,60,0.5)",
  primaryLight: "rgba(220,20,60,0.1)",
  primaryBorder: "rgba(220,20,60,0.3)",

  secondaryColor: "#45A29E",
  secondaryBg: "rgba(69,162,158,0.1)",

  inputBg: "#0B0C10",
  inputBorder: "#1F2833",
  inputText: "#C5C6C7",

  dividerColor: "#1F2833",

  xpBadgeColor: "#DC143C",
  streakBadgeColor: "#FF8C00",

  xpBarBg: "#1F2833",
  xpBarFill: "linear-gradient(90deg, #8B0000, #DC143C)",

  levelCardBg: "linear-gradient(135deg, rgba(220,20,60,0.1), rgba(69,162,158,0.05))",
  levelCardBorder: "rgba(220,20,60,0.2)",

  userCardBg: "rgba(220,20,60,0.05)",
  userCardBorder: "rgba(220,20,60,0.15)",

  popupBg: "#111217",
  popupBorder: "#1F2833",

  scrollbarThumb: "rgba(220,20,60,0.3)",

  showSpaceBg: false,
  bodyBg: "#0B0C10",

  sectionLabelColor: "#5F646A",

  dangerText: "#FF3366",
  dangerBg: "rgba(255,51,102,0.1)",
  dangerBorder: "rgba(255,51,102,0.2)",

  toggleOnBg: "linear-gradient(135deg, #DC143C, #8B0000)",
  toggleOffBg: "#1F2833",
  toggleBorder: "#3A4350",

  searchBg: "#0B0C10",
  searchBorder: "#1F2833",
  searchText: "#C5C6C7",

  successColor: "#45A29E",
  successBg: "rgba(69,162,158,0.1)",
  successBorder: "rgba(69,162,158,0.3)",
};

export const THEMES: Record<AppTheme, ThemeStyles> = {
  space: SPACE_THEME,
  duolingo: DUOLINGO_THEME,
  light: LIGHT_THEME,
  rose: ROSE_THEME,
  ocean: OCEAN_THEME,
  marvel: MARVEL_THEME,
  "stranger-things": STRANGER_THINGS_THEME,
};

export const THEME_META: Record<AppTheme, { label: string; desc: string; emoji: string; preview: string[] }> = {
  space: {
    label: "Space Dark",
    desc: "Deep space with stars & nebulae",
    emoji: "🌌",
    preview: ["#050814", "#1a0533", "#8B5CF6"],
  },
  duolingo: {
    label: "Duolingo Playful",
    desc: "Bright, fun & gamified",
    emoji: "🦉",
    preview: ["#58CC02", "#FFC800", "#1CB0F6"],
  },
  light: {
    label: "Light Clean",
    desc: "Minimal & distraction-free",
    emoji: "☀️",
    preview: ["#F8F9FC", "#6366F1", "#06B6D4"],
  },
  rose: {
    label: "Rose Garden",
    desc: "Warm pastel pinks & purples",
    emoji: "🌸",
    preview: ["#FFF5F7", "#E11D7A", "#9333EA"],
  },
  ocean: {
    label: "Ocean Breeze",
    desc: "Calm teal blues & aqua tones",
    emoji: "🌊",
    preview: ["#F0F9FF", "#0EA5E9", "#06B6D4"],
  },
  marvel: {
    label: "Marvel Universe",
    desc: "High-contrast comic hero vibes",
    emoji: "🦸‍♂️",
    preview: ["#111111", "#E23636", "#F5B041"],
  },
  "stranger-things": {
    label: "The Upside Down",
    desc: "Eerie, glowing synths & shadows",
    emoji: "🚲",
    preview: ["#0B0C10", "#DC143C", "#45A29E"],
  },
};
