import { useState } from "react";
import {
  Sparkles, RotateCcw, BookmarkPlus, ChevronLeft, ChevronRight,
  Check, X, Shuffle, Brain, Plus, Download, Folder, Wand2, Loader2,
  Share2,
} from "lucide-react";
import { useApp, PLANET_LINE } from "../store";
import { useTheme } from "./ThemeContext";

const GENERATED_CARDS: { q: string; a: string }[] = [
  {
    q: "What is the powerhouse of the cell?",
    a: "The mitochondria — a double-membrane-bound organelle that generates most of the cell's supply of ATP through cellular respiration.",
  },
  {
    q: "What is the process of photosynthesis?",
    a: "Photosynthesis converts light energy, water (H₂O), and CO₂ into glucose (C₆H₁₂O₆) and oxygen (O₂) using chlorophyll in the chloroplasts.",
  },
  {
    q: "What is the difference between mitosis and meiosis?",
    a: "Mitosis produces 2 identical diploid daughter cells for growth and repair. Meiosis produces 4 genetically diverse haploid cells for sexual reproduction.",
  },
  {
    q: "Define osmosis",
    a: "Osmosis is the passive movement of water molecules across a semipermeable membrane from an area of lower solute concentration to higher solute concentration.",
  },
  {
    q: "What are the four bases of DNA?",
    a: "Adenine (A), Thymine (T), Cytosine (C), and Guanine (G). A pairs with T, and C pairs with G in the double helix structure.",
  },
  {
    q: "What is the function of ribosomes?",
    a: "Ribosomes are cellular organelles that serve as the site of protein synthesis, translating mRNA sequences into polypeptide chains (proteins).",
  },
];

export function FlashcardGenerator() {
  const { subjects } = useApp();
  const { T } = useTheme();
  const [topic, setTopic] = useState("Cell Biology");
  const [cardCount, setCardCount] = useState(6);
  const [generated, setGenerated] = useState(true);
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState(GENERATED_CARDS);
  const [activeCard, setActiveCard] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [savedCards, setSavedCards] = useState<number[]>([]);
  const [view, setView] = useState<"grid" | "study" | "complete">("grid");
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("medium");
  const [selectedSubjectId, setSelectedSubjectId] = useState(subjects[0]?.id || "");

  const selectedSubject = subjects.find((s) => s.id === selectedSubjectId);
  const color = selectedSubject ? PLANET_LINE[selectedSubject.planet] : "#8B5CF6";

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setGenerated(true);
      setCards(GENERATED_CARDS);
      setFlipped(false);
      setActiveCard(0);
    }, 1800);
  };

  const toggleSave = (i: number) => {
    setSavedCards((prev) => prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]);
  };

  const nextCard = () => {
    setFlipped(false);
    setTimeout(() => {
      const next = (activeCard + 1) % cards.length;
      if (activeCard === cards.length - 1) {
        setView("complete");
      } else {
        setActiveCard(next);
      }
    }, 150);
  };

  const prevCard = () => {
    setFlipped(false);
    setTimeout(() => setActiveCard((p) => (p - 1 + cards.length) % cards.length), 150);
  };

  const cardStyle = {
    background: T.cardBg,
    border: `1px solid ${T.cardBorder}`,
    backdropFilter: T.showSpaceBg ? "blur(12px)" : "none",
    boxShadow: T.cardShadow,
  };

  return (
    <div className="p-7 max-w-[1240px]">
      {/* Header */}
      <div className="flex items-start justify-between mb-7">
        <div>
          <h1 className="mb-1" style={{ fontSize: "1.625rem", fontWeight: 800, letterSpacing: "-0.5px", fontFamily: "'Space Grotesk', sans-serif", color: T.textPrimary }}>
            AI Flashcard Generator ✨
          </h1>
          <p className="text-sm" style={{ color: T.textMuted }}>
            Generate smart flashcards from any topic instantly.
          </p>
        </div>
        <div className="flex gap-2">
          {(["grid", "study"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className="text-sm px-4 py-2 rounded-xl transition-colors capitalize"
              style={{
                background: view === v ? T.navActiveBg : T.inputBg,
                border: view === v ? `1px solid ${T.navActiveBorder}` : `1px solid ${T.inputBorder}`,
                color: view === v ? T.navActiveText : T.textMuted,
                fontWeight: view === v ? 600 : 400,
              }}
            >
              {v === "grid" ? "📋 Grid View" : "🃏 Study Mode"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left: Generator Panel */}
        <div className="space-y-5">
          {/* Subject selector */}
          <div className="rounded-3xl p-5" style={cardStyle}>
            <div className="flex items-center gap-2 mb-4">
              <Folder className="w-4 h-4" style={{ color: T.textMuted }} />
              <span className="text-sm" style={{ fontWeight: 700, color: T.textPrimary }}>Subject</span>
            </div>
            <div className="space-y-1.5 max-h-40 overflow-y-auto space-scroll">
              {subjects.map((s) => {
                const c = PLANET_LINE[s.planet];
                const isSelected = s.id === selectedSubjectId;
                return (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSubjectId(s.id)}
                    className="w-full flex items-center gap-2.5 p-2.5 rounded-xl transition-all text-left"
                    style={{
                      background: isSelected ? `${c}20` : T.inputBg,
                      border: isSelected ? `1px solid ${c}40` : `1px solid ${T.inputBorder}`,
                    }}
                  >
                    <span>{s.emoji}</span>
                    <span className="text-sm flex-1 truncate" style={{ color: isSelected ? T.textPrimary : T.textSecondary, fontWeight: isSelected ? 600 : 400 }}>
                      {s.name}
                    </span>
                    <span className="text-xs" style={{ color: T.textMuted }}>{s.mastered}/{s.cards}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Generator */}
          <div className="rounded-3xl p-5" style={cardStyle}>
            <div className="flex items-center gap-2 mb-5">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: T.primaryLight, border: `1px solid ${T.primaryBorder}` }}
              >
                <Wand2 className="w-4 h-4" style={{ color: T.primaryColor }} />
              </div>
              <span className="text-sm" style={{ fontWeight: 700, color: T.textPrimary }}>Generate Cards</span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs mb-1.5" style={{ color: T.textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Topic or Paste Notes
                </label>
                <textarea
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. Photosynthesis, or paste your notes here..."
                  className="w-full h-24 px-4 py-3 rounded-2xl text-sm outline-none resize-none"
                  style={{
                    background: T.inputBg,
                    border: `1px solid ${T.inputBorder}`,
                    color: T.inputText,
                    fontFamily: "'Space Grotesk', sans-serif",
                    caretColor: T.primaryColor,
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = T.primaryColor; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = T.inputBorder; }}
                />
              </div>

              <div>
                <label className="block text-xs mb-1.5" style={{ color: T.textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Number of Cards: {cardCount}
                </label>
                <input
                  type="range" min={3} max={20} value={cardCount}
                  onChange={(e) => setCardCount(Number(e.target.value))}
                  className="w-full"
                  style={{ accentColor: T.primaryColor }}
                />
                <div className="flex justify-between text-xs mt-0.5" style={{ color: T.textMuted }}>
                  <span>3</span><span>20</span>
                </div>
              </div>

              <div>
                <label className="block text-xs mb-1.5" style={{ color: T.textMuted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Difficulty
                </label>
                <div className="flex gap-2">
                  {(["easy", "medium", "hard"] as const).map((d) => {
                    const styles: Record<string, { bg: string; text: string; border: string }> = {
                      easy: { bg: "rgba(52,211,153,0.12)", text: "#34D399", border: "rgba(52,211,153,0.3)" },
                      medium: { bg: "rgba(251,191,36,0.12)", text: "#F59E0B", border: "rgba(251,191,36,0.3)" },
                      hard: { bg: "rgba(244,63,94,0.12)", text: "#F87171", border: "rgba(244,63,94,0.3)" },
                    };
                    const s = styles[d];
                    return (
                      <button
                        key={d}
                        onClick={() => setDifficulty(d)}
                        className="flex-1 text-xs py-1.5 rounded-xl border transition-all capitalize"
                        style={{
                          background: difficulty === d ? s.bg : T.inputBg,
                          border: difficulty === d ? `1px solid ${s.border}` : `1px solid ${T.inputBorder}`,
                          color: difficulty === d ? s.text : T.textMuted,
                          fontWeight: difficulty === d ? 600 : 400,
                        }}
                      >
                        {d}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl transition-all disabled:opacity-60"
                style={{ background: T.primaryBg, color: T.textOnPrimary, fontWeight: 600, boxShadow: `0 4px 14px ${T.primaryGlow}` }}
              >
                {loading ? (
                  <><Loader2 className="w-4 h-4 animate-spin" />Generating...</>
                ) : (
                  <><Sparkles className="w-4 h-4" />Generate Flashcards</>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right: Cards */}
        <div className="col-span-2">
          {!generated ? (
            <div className="rounded-3xl p-16 text-center h-full flex flex-col items-center justify-center" style={cardStyle}>
              <div
                className="w-16 h-16 rounded-3xl flex items-center justify-center mb-4 mx-auto"
                style={{ background: T.primaryLight, border: `1px solid ${T.primaryBorder}` }}
              >
                <Brain className="w-8 h-8" style={{ color: T.primaryColor }} />
              </div>
              <h3 className="mb-2" style={{ fontWeight: 700, color: T.textPrimary }}>Ready to Generate</h3>
              <p className="text-sm max-w-xs" style={{ color: T.textMuted }}>
                Enter a topic or paste your notes, then click Generate Flashcards.
              </p>
            </div>
          ) : view === "grid" ? (
            <>
              {/* Actions */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm" style={{ color: T.textMuted }}>{cards.length} cards generated</span>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{ background: "rgba(52,211,153,0.15)", color: "#34D399", fontWeight: 600, border: "1px solid rgba(52,211,153,0.25)" }}
                  >
                    {savedCards.length} saved
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl transition-all"
                    style={{ background: T.inputBg, border: `1px solid ${T.inputBorder}`, color: T.textMuted }}
                  >
                    <Shuffle className="w-3.5 h-3.5" />Shuffle
                  </button>
                  <button
                    onClick={() => setSavedCards(cards.map((_, i) => i))}
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl transition-all"
                    style={{ background: T.primaryLight, border: `1px solid ${T.primaryBorder}`, color: T.primaryColor, fontWeight: 600 }}
                  >
                    <BookmarkPlus className="w-3.5 h-3.5" />Save All
                  </button>
                  <button
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl transition-all"
                    style={{ background: T.secondaryBg, border: `1px solid ${T.secondaryColor}30`, color: T.secondaryColor }}
                  >
                    <Share2 className="w-3.5 h-3.5" />Share
                  </button>
                  <button
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl transition-all"
                    style={{ background: T.inputBg, border: `1px solid ${T.inputBorder}`, color: T.textMuted }}
                  >
                    <Download className="w-3.5 h-3.5" />Export
                  </button>
                </div>
              </div>

              {/* Cards grid */}
              <div className="grid grid-cols-2 gap-4">
                {cards.map((card, i) => (
                  <div
                    key={i}
                    className="rounded-3xl overflow-hidden cursor-pointer group transition-all hover:translate-y-[-2px]"
                    style={cardStyle}
                    onClick={() => { setActiveCard(i); setView("study"); setFlipped(false); }}
                  >
                    <div
                      className="p-4"
                      style={{
                        background: T.primaryLight,
                        borderBottom: `1px solid ${T.primaryBorder}`,
                      }}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="text-xs mb-1" style={{ color: T.primaryColor, fontWeight: 600, letterSpacing: "0.05em" }}>
                            QUESTION {i + 1}
                          </div>
                          <p className="text-sm leading-relaxed" style={{ fontWeight: 600, color: T.textPrimary }}>{card.q}</p>
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleSave(i); }}
                          className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all"
                          style={{
                            background: savedCards.includes(i) ? T.primaryColor : T.inputBg,
                            color: savedCards.includes(i) ? "white" : T.textMuted,
                            border: `1px solid ${T.inputBorder}`,
                          }}
                        >
                          {savedCards.includes(i) ? <Check className="w-3.5 h-3.5" /> : <BookmarkPlus className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="text-xs mb-1.5" style={{ color: T.successColor, fontWeight: 600, letterSpacing: "0.05em" }}>ANSWER</div>
                      <p className="text-xs leading-relaxed line-clamp-3" style={{ color: T.textSecondary }}>{card.a}</p>
                      <div className="mt-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="text-xs transition-colors flex items-center gap-1" style={{ color: T.textMuted }}>
                          <RotateCcw className="w-3 h-3" /> Edit
                        </button>
                        <button className="text-xs transition-colors flex items-center gap-1" style={{ color: T.dangerText }}>
                          <X className="w-3 h-3" /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add card */}
                <div
                  className="rounded-3xl flex flex-col items-center justify-center gap-3 cursor-pointer transition-all group"
                  style={{
                    minHeight: 160,
                    background: T.inputBg,
                    border: `2px dashed ${T.inputBorder}`,
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center transition-all"
                    style={{ background: T.primaryLight, border: `1px solid ${T.primaryBorder}` }}
                  >
                    <Plus className="w-5 h-5" style={{ color: T.primaryColor }} />
                  </div>
                  <span className="text-sm" style={{ color: T.textMuted, fontWeight: 500 }}>
                    Add Custom Card
                  </span>
                </div>
              </div>
            </>
          ) : view === "complete" ? (
            /* Session Complete Screen */
            <div className="rounded-3xl p-12 flex flex-col items-center justify-center text-center" style={cardStyle}>
              {/* Celebration particles */}
              <div className="relative mb-6">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                      width: 8 + (i % 3) * 4 + "px",
                      height: 8 + (i % 3) * 4 + "px",
                      background: [T.primaryColor, T.secondaryColor, T.streakBadgeColor, T.successColor][i % 4],
                      top: Math.sin(i * 30 * Math.PI / 180) * 60 - 6 + "px",
                      left: Math.cos(i * 30 * Math.PI / 180) * 60 - 6 + "px",
                      opacity: 0.7,
                      animation: `float-planet ${2 + (i % 3)}s ease-in-out infinite`,
                      animationDelay: `${i * 0.2}s`,
                    }}
                  />
                ))}
                <div
                  className="w-24 h-24 rounded-3xl flex items-center justify-center"
                  style={{ background: T.primaryBg, boxShadow: `0 12px 40px ${T.primaryGlow}` }}
                >
                  <span style={{ fontSize: "2.5rem" }}>🎉</span>
                </div>
              </div>
              <h2 className="mb-2" style={{ fontSize: "1.75rem", fontWeight: 800, letterSpacing: "-0.5px", color: T.textPrimary }}>
                Session Complete!
              </h2>
              <p className="mb-6 max-w-xs" style={{ color: T.textMuted }}>
                You reviewed all {cards.length} cards. Your memory is getting stronger!
              </p>
              {/* XP gain */}
              <div
                className="flex items-center gap-3 px-6 py-3 rounded-2xl mb-6"
                style={{ background: T.primaryLight, border: `1px solid ${T.primaryBorder}` }}
              >
                <span style={{ fontSize: "1.5rem" }}>⚡</span>
                <div className="text-left">
                  <div style={{ fontWeight: 800, fontSize: "1.25rem", color: T.primaryColor }}>+{cards.length * 10} XP</div>
                  <div className="text-xs" style={{ color: T.textMuted }}>earned this session</div>
                </div>
              </div>
              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4 w-full max-w-sm mb-8">
                {[
                  { label: "Cards Studied", val: cards.length, icon: "🃏" },
                  { label: "Saved Cards", val: savedCards.length, icon: "🔖" },
                  { label: "Streak", val: "🔥 +1", icon: "" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl p-3 text-center"
                    style={{ background: T.inputBg, border: `1px solid ${T.inputBorder}` }}
                  >
                    <div style={{ fontSize: "1.25rem" }}>{s.icon}</div>
                    <div className="mt-1" style={{ fontWeight: 700, color: T.textPrimary }}>{s.val}</div>
                    <div className="text-xs" style={{ color: T.textMuted }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => { setActiveCard(0); setFlipped(false); setView("study"); }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm"
                  style={{ background: T.primaryBg, color: T.textOnPrimary, fontWeight: 600, boxShadow: `0 4px 14px ${T.primaryGlow}` }}
                >
                  <RotateCcw className="w-4 h-4" />
                  Study Again
                </button>
                <button
                  onClick={() => { setActiveCard(0); setFlipped(false); setView("grid"); }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm"
                  style={{ background: T.inputBg, border: `1px solid ${T.inputBorder}`, color: T.textSecondary, fontWeight: 500 }}
                >
                  Back to Grid
                </button>
              </div>
            </div>
          ) : (
            /* Study Mode */
            <div className="flex flex-col items-center">
              {/* Progress */}
              <div className="w-full flex items-center gap-3 mb-6">
                <span className="text-sm" style={{ color: T.textMuted }}>
                  {activeCard + 1} / {cards.length}
                </span>
                <div className="flex-1 rounded-full h-2" style={{ background: T.xpBarBg }}>
                  <div
                    className="h-2 rounded-full transition-all duration-500"
                    style={{
                      width: ((activeCard + 1) / cards.length * 100) + "%",
                      background: T.xpBarFill,
                      boxShadow: `0 0 8px ${T.primaryGlow}`,
                    }}
                  />
                </div>
                <button
                  onClick={() => setView("grid")}
                  className="text-xs transition-colors"
                  style={{ color: T.textMuted }}
                >
                  ← Back to Grid
                </button>
              </div>

              {/* Flashcard */}
              <div
                className="w-full max-w-2xl cursor-pointer mb-6"
                onClick={() => setFlipped((f) => !f)}
                style={{ perspective: "1000px" }}
              >
                <div
                  className="relative w-full"
                  style={{
                    transformStyle: "preserve-3d",
                    transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)",
                    transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
                    minHeight: "280px",
                  }}
                >
                  {/* Front */}
                  <div
                    className="absolute inset-0 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-2xl"
                    style={{
                      backfaceVisibility: "hidden",
                      background: T.primaryBg,
                      border: `1px solid ${T.primaryBorder}`,
                      boxShadow: `0 20px 60px ${T.primaryGlow}`,
                    }}
                  >
                    <div className="text-xs mb-4 uppercase tracking-widest" style={{ fontWeight: 600, color: "rgba(255,255,255,0.5)" }}>
                      Question {activeCard + 1}
                    </div>
                    <p className="mb-4 leading-relaxed" style={{ fontSize: "1.25rem", fontWeight: 700, color: "#fff" }}>
                      {cards[activeCard].q}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs mt-4" style={{ color: "rgba(255,255,255,0.4)" }}>
                      <RotateCcw className="w-3.5 h-3.5" />
                      Click to reveal answer
                    </div>
                  </div>

                  {/* Back */}
                  <div
                    className="absolute inset-0 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-2xl"
                    style={{
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      background: `linear-gradient(135deg, ${color}30, ${color}18)`,
                      border: `1px solid ${color}50`,
                      boxShadow: `0 20px 60px ${color}25`,
                      backdropFilter: T.showSpaceBg ? "blur(12px)" : "none",
                    }}
                  >
                    <div className="text-xs mb-4 uppercase tracking-widest" style={{ fontWeight: 600, color: T.textMuted }}>
                      Answer
                    </div>
                    <p className="leading-relaxed" style={{ fontSize: "1.0625rem", fontWeight: 600, color: T.textPrimary }}>
                      {cards[activeCard].a}
                    </p>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-4 mb-5">
                <button
                  onClick={prevCard}
                  className="w-11 h-11 rounded-2xl flex items-center justify-center transition-all"
                  style={{ background: T.inputBg, border: `1px solid ${T.inputBorder}`, color: T.textSecondary }}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {flipped ? (
                  <div className="flex gap-3">
                    {[
                      { label: "Again", icon: <X className="w-4 h-4" />, bg: "rgba(244,63,94,0.12)", border: "rgba(244,63,94,0.25)", color: "#F87171" },
                      { label: "Hard", icon: null, bg: "rgba(251,191,36,0.12)", border: "rgba(251,191,36,0.25)", color: "#F59E0B" },
                      { label: "Got it!", icon: <Check className="w-4 h-4" />, bg: "rgba(52,211,153,0.12)", border: "rgba(52,211,153,0.25)", color: "#34D399" },
                    ].map((btn) => (
                      <button
                        key={btn.label}
                        onClick={nextCard}
                        className="flex items-center gap-1.5 text-sm px-4 py-2.5 rounded-2xl transition-all"
                        style={{ background: btn.bg, border: `1px solid ${btn.border}`, color: btn.color, fontWeight: 600 }}
                      >
                        {btn.icon}
                        {btn.label}
                      </button>
                    ))}
                  </div>
                ) : (
                  <button
                    onClick={() => setFlipped(true)}
                    className="flex items-center gap-2 text-sm px-6 py-2.5 rounded-2xl transition-all"
                    style={{ background: T.primaryBg, color: T.textOnPrimary, fontWeight: 600, boxShadow: `0 4px 14px ${T.primaryGlow}` }}
                  >
                    <RotateCcw className="w-4 h-4" />
                    Show Answer
                  </button>
                )}

                <button
                  onClick={nextCard}
                  className="w-11 h-11 rounded-2xl flex items-center justify-center transition-all"
                  style={{ background: T.inputBg, border: `1px solid ${T.inputBorder}`, color: T.textSecondary }}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Card indicators */}
              <div className="flex gap-1.5">
                {cards.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setActiveCard(i); setFlipped(false); }}
                    className="rounded-full transition-all"
                    style={{
                      width: i === activeCard ? "24px" : "8px",
                      height: "8px",
                      background: i === activeCard ? T.primaryColor : T.xpBarBg,
                      boxShadow: i === activeCard ? `0 0 8px ${T.primaryGlow}` : "none",
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
