import { useState } from "react";
import { X, Sparkles, Check } from "lucide-react";
import { useApp } from "../store";
import { useTheme } from "./ThemeContext";
import type { PlanetColor } from "../store";

interface AddSubjectModalProps {
  onClose: () => void;
}

const PLANET_OPTIONS: { color: PlanetColor; label: string; c1: string; c2: string; glow: string }[] = [
  { color: "violet", label: "Violet", c1: "#A78BFA", c2: "#6366F1", glow: "rgba(139,92,246,0.5)" },
  { color: "blue", label: "Blue", c1: "#60A5FA", c2: "#3B82F6", glow: "rgba(59,130,246,0.5)" },
  { color: "pink", label: "Pink", c1: "#F472B6", c2: "#D946EF", glow: "rgba(236,72,153,0.5)" },
  { color: "cyan", label: "Cyan", c1: "#22D3EE", c2: "#0EA5E9", glow: "rgba(6,182,212,0.5)" },
  { color: "amber", label: "Amber", c1: "#FBBF24", c2: "#F97316", glow: "rgba(251,191,36,0.5)" },
  { color: "emerald", label: "Emerald", c1: "#34D399", c2: "#22C55E", glow: "rgba(52,211,153,0.5)" },
  { color: "rose", label: "Rose", c1: "#FB7185", c2: "#F43F5E", glow: "rgba(244,63,94,0.5)" },
];

const POPULAR_EMOJIS = [
  "📚", "🔬", "🔢", "📜", "⚗️", "⚛️", "🗣️", "🎨",
  "💻", "🌍", "🎵", "🏋️", "🧬", "🏛️", "📐", "🌱",
  "🔭", "🧪", "📊", "🎯", "🌊", "🦋", "🧠", "✨",
];

export function AddSubjectModal({ onClose }: AddSubjectModalProps) {
  const { addSubject } = useApp();
  const { T } = useTheme();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [emoji, setEmoji] = useState("📚");
  const [planet, setPlanet] = useState<PlanetColor>("violet");
  const [cardCount, setCardCount] = useState(20);
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

  const selectedPlanet = PLANET_OPTIONS.find((p) => p.color === planet)!;

  const handleCreate = () => {
    if (!name.trim()) return;
    addSubject({
      name: name.trim(),
      emoji,
      planet,
      progress: 0,
      cards: cardCount,
      mastered: 0,
      description: description.trim() || `${name.trim()} — study subject`,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="relative rounded-3xl p-7 w-[520px] max-h-[90vh] overflow-y-auto"
        style={{
          background: T.cardBg === "rgba(255,255,255,0.04)" ? "rgba(10,13,35,0.97)" : T.cardBg,
          border: `1px solid ${T.cardBorder}`,
          backdropFilter: "blur(20px)",
          boxShadow: `0 32px 64px rgba(0,0,0,0.3), 0 0 0 1px ${T.primaryBorder}`,
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-xl flex items-center justify-center transition-all"
          style={{ background: T.inputBg, color: T.textMuted }}
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center"
            style={{ background: T.primaryLight, border: `1px solid ${T.primaryBorder}` }}
          >
            <Sparkles className="w-5 h-5" style={{ color: T.primaryColor }} />
          </div>
          <div>
            <h2 style={{ fontWeight: 800, fontSize: "1.125rem", color: T.textPrimary }}>
              Create New Subject
            </h2>
            <p className="text-xs" style={{ color: T.textMuted }}>
              Add a new subject to your knowledge galaxy
            </p>
          </div>
        </div>

        {/* Preview planet */}
        <div className="flex items-center gap-4 mb-6 p-4 rounded-2xl" style={{ background: T.inputBg, border: `1px solid ${T.inputBorder}` }}>
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 planet-float"
            style={{
              backgroundImage: `linear-gradient(135deg, ${selectedPlanet.c1}, ${selectedPlanet.c2})`,
              boxShadow: `0 8px 24px ${selectedPlanet.glow}`,
            }}
          >
            <span style={{ fontSize: "1.75rem" }}>{emoji}</span>
          </div>
          <div>
            <div style={{ fontWeight: 700, color: T.textPrimary, fontSize: "1.125rem" }}>
              {name || "Your Subject Name"}
            </div>
            <div className="text-xs mt-0.5" style={{ color: T.textMuted }}>
              {description || "Add a description below..."} · {cardCount} cards
            </div>
            <div
              className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-full text-xs"
              style={{ background: `${selectedPlanet.c1}20`, color: selectedPlanet.c1, border: `1px solid ${selectedPlanet.c1}30`, fontWeight: 600 }}
            >
              🔒 Private
            </div>
          </div>
        </div>

        <div className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-xs mb-1.5" style={{ color: T.textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Subject Name *
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Organic Chemistry, Linear Algebra..."
              className="w-full px-4 py-3 rounded-2xl text-sm outline-none"
              style={{
                background: T.inputBg,
                border: `1px solid ${name ? T.primaryColor : T.inputBorder}`,
                color: T.inputText,
                fontFamily: "'Space Grotesk', sans-serif",
                boxShadow: name ? `0 0 0 3px ${T.primaryGlow}` : "none",
                transition: "all 0.2s ease",
              }}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs mb-1.5" style={{ color: T.textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What topics will you study?"
              rows={2}
              className="w-full px-4 py-3 rounded-2xl text-sm outline-none resize-none"
              style={{
                background: T.inputBg,
                border: `1px solid ${T.inputBorder}`,
                color: T.inputText,
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            />
          </div>

          {/* Emoji selector */}
          <div>
            <label className="block text-xs mb-1.5" style={{ color: T.textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Subject Emoji
            </label>
            <div className="relative">
              <button
                onClick={() => setEmojiPickerOpen((v) => !v)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-2xl transition-all"
                style={{
                  background: T.inputBg,
                  border: `1px solid ${emojiPickerOpen ? T.primaryColor : T.inputBorder}`,
                  color: T.textPrimary,
                  boxShadow: emojiPickerOpen ? `0 0 0 3px ${T.primaryGlow}` : "none",
                }}
              >
                <span style={{ fontSize: "1.5rem" }}>{emoji}</span>
                <span className="text-sm" style={{ color: T.textSecondary }}>Click to change emoji</span>
              </button>
              {emojiPickerOpen && (
                <div
                  className="absolute top-full mt-2 left-0 p-3 rounded-2xl z-10"
                  style={{ background: T.popupBg, border: `1px solid ${T.popupBorder}`, boxShadow: "0 16px 32px rgba(0,0,0,0.2)", width: "280px" }}
                >
                  <div className="grid grid-cols-8 gap-1">
                    {POPULAR_EMOJIS.map((e) => (
                      <button
                        key={e}
                        onClick={() => { setEmoji(e); setEmojiPickerOpen(false); }}
                        className="w-8 h-8 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                        style={{
                          background: emoji === e ? T.primaryLight : "transparent",
                          border: emoji === e ? `1px solid ${T.primaryBorder}` : "1px solid transparent",
                          fontSize: "1.125rem",
                        }}
                      >
                        {e}
                      </button>
                    ))}
                  </div>
                  <div className="mt-2 pt-2" style={{ borderTop: `1px solid ${T.dividerColor}` }}>
                    <input
                      placeholder="Type any emoji..."
                      className="w-full px-3 py-1.5 rounded-xl text-sm outline-none"
                      style={{ background: T.inputBg, border: `1px solid ${T.inputBorder}`, color: T.inputText, fontFamily: "'Space Grotesk', sans-serif" }}
                      onChange={(e) => {
                        const val = [...e.target.value].find((c) => /\p{Emoji}/u.test(c));
                        if (val) { setEmoji(val); setEmojiPickerOpen(false); }
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Planet color */}
          <div>
            <label className="block text-xs mb-2" style={{ color: T.textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Planet Color
            </label>
            <div className="flex gap-2 flex-wrap">
              {PLANET_OPTIONS.map((p) => (
                <button
                  key={p.color}
                  onClick={() => setPlanet(p.color)}
                  className="relative w-9 h-9 rounded-xl transition-all hover:scale-110"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${p.c1}, ${p.c2})`,
                    boxShadow: planet === p.color ? `0 4px 12px ${p.glow}` : "none",
                    transform: planet === p.color ? "scale(1.15)" : "scale(1)",
                    border: planet === p.color ? `2px solid white` : "2px solid transparent",
                  }}
                  title={p.label}
                >
                  {planet === p.color && (
                    <Check className="w-3.5 h-3.5 text-white absolute inset-0 m-auto" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Card count */}
          <div>
            <label className="block text-xs mb-1.5" style={{ color: T.textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Initial Card Goal: <span style={{ color: T.primaryColor }}>{cardCount} cards</span>
            </label>
            <input
              type="range" min={5} max={200} step={5}
              value={cardCount}
              onChange={(e) => setCardCount(Number(e.target.value))}
              className="w-full"
              style={{ accentColor: T.primaryColor }}
            />
            <div className="flex justify-between text-xs mt-0.5" style={{ color: T.textMuted }}>
              <span>5 cards</span><span>200 cards</span>
            </div>
          </div>

          {/* Create button */}
          <button
            onClick={handleCreate}
            disabled={!name.trim()}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              background: T.primaryBg,
              color: T.textOnPrimary,
              fontWeight: 700,
              fontSize: "0.9375rem",
              boxShadow: name ? `0 8px 24px ${T.primaryGlow}` : "none",
            }}
          >
            <Sparkles className="w-5 h-5" />
            Create Subject
          </button>

          <p className="text-center text-xs" style={{ color: T.textMuted }}>
            🔒 New subjects are private by default. Change visibility in your profile.
          </p>
        </div>
      </div>
    </div>
  );
}
