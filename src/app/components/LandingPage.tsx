import { Link } from "react-router-dom";
import {
  Sparkles, ArrowRight, Brain, Target, BarChart3, Zap, Star, Users,
  BookOpen, Play, ChevronRight, Rocket, Shield, Globe,
} from "lucide-react";
import { SpaceBackground } from "./SpaceBackground";
import logo from "../../assets/app_logo.png";

const FEATURES = [
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "AI Flashcard Generator",
    desc: "Paste any notes or topic — Retentionite generates smart flashcards instantly using AI.",
    color: "#A78BFA",
    glow: "rgba(139,92,246,0.3)",
    emoji: "✨",
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: "Spaced Repetition",
    desc: "Ebbinghaus forgetting curve per subject. Review at exactly the right moment.",
    color: "#60A5FA",
    glow: "rgba(59,130,246,0.3)",
    emoji: "🧠",
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Pomodoro Focus Mode",
    desc: "Deep focus sessions with ambient sounds, task tracking, and streak rewards.",
    color: "#34D399",
    glow: "rgba(52,211,153,0.3)",
    emoji: "🎯",
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Smart Analytics",
    desc: "Per-subject retention curves, XP progress, and personalized study insights.",
    color: "#F472B6",
    glow: "rgba(244,114,182,0.3)",
    emoji: "📊",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Social Study Profile",
    desc: "Instagram-like profile of your subjects. Connect with friends, share decks.",
    color: "#FCD34D",
    glow: "rgba(252,211,77,0.3)",
    emoji: "👥",
  },
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "Chrome-Style Notes",
    desc: "Open unlimited notes per subject in browser-like tabs. Auto-saves everything.",
    color: "#22D3EE",
    glow: "rgba(34,211,238,0.3)",
    emoji: "📝",
  },
];

const STATS = [
  { val: "50K+", label: "Active Explorers", icon: "🚀" },
  { val: "2.4M+", label: "Cards Generated", icon: "✨" },
  { val: "94%", label: "Retention Rate", icon: "🧠" },
  { val: "4.9★", label: "Average Rating", icon: "⭐" },
];

const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    role: "Med Student, Year 3",
    text: "Retentionite's AI flashcards + spaced repetition helped me ace my anatomy exams. The retention curves per subject are insane — I can literally see my brain improving!",
    avatar: "SC",
    gradient: "from-pink-500 to-rose-500",
    xp: "12,400 XP",
  },
  {
    name: "Marcus Williams",
    role: "CS Student, MIT",
    text: "The Chrome-style notes with tabs changed how I study. I have separate tabs for algorithms, data structures, and systems — all linked to my flashcard decks.",
    avatar: "MW",
    gradient: "from-blue-500 to-indigo-500",
    xp: "8,900 XP",
  },
  {
    name: "Priya Sharma",
    role: "Law School, Year 1",
    text: "Sharing study decks with classmates through Retentionite's social feature is brilliant. We compare retention curves and compete on leaderboards. Study has never been this fun.",
    avatar: "PS",
    gradient: "from-emerald-500 to-teal-500",
    xp: "15,200 XP",
  },
];

export function LandingPage() {
  return (
    <div className="min-h-screen" style={{ background: "#050814" }}>
      <SpaceBackground />

      {/* Nav */}
      <nav className="relative z-20 flex items-center justify-between px-8 py-5 max-w-[1400px] mx-auto">
        <div className="flex items-center gap-2.5">
          <img
            src={logo}
            alt="Retentionite"
            className="w-9 h-9"
            style={{ objectFit: "contain" }}
          />
          <span className="text-white" style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1.125rem" }}>
            Retentionite
          </span>
        </div>

        <div className="hidden md:flex items-center gap-6">
          {["Features", "Analytics", "Community", "Pricing"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm transition-colors"
              style={{ color: "rgba(255,255,255,0.5)", fontWeight: 400 }}
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/dashboard"
            className="text-sm px-4 py-2 rounded-xl transition-all"
            style={{ color: "rgba(255,255,255,0.6)", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            Sign In
          </Link>
          <Link
            to="/dashboard"
            className="text-sm px-5 py-2 rounded-xl transition-all text-white glow-violet"
            style={{ background: "linear-gradient(135deg, #7C3AED, #4F46E5)", fontWeight: 600 }}
          >
            Start for Free
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 text-center px-6 pt-20 pb-24 max-w-[900px] mx-auto">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
          style={{
            background: "rgba(139,92,246,0.12)",
            border: "1px solid rgba(139,92,246,0.25)",
            backdropFilter: "blur(8px)",
          }}
        >
          <Rocket className="w-4 h-4" style={{ color: "#A78BFA" }} />
          <span className="text-sm" style={{ color: "#C4B5FD", fontWeight: 600 }}>
            Gamified AI Study Platform
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs" style={{ color: "#86EFAC", fontWeight: 500 }}>50K+ explorers</span>
        </div>

        {/* Headline */}
        <h1
          className="text-white mb-6"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
            fontWeight: 900,
            letterSpacing: "-2px",
            lineHeight: 1.1,
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          Learn Faster with{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #A78BFA 0%, #60A5FA 50%, #34D399 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Space-Powered
          </span>
          <br />
          AI Flashcards
        </h1>

        <p
          className="text-lg mb-10 max-w-2xl mx-auto"
          style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}
        >
          Retentionite combines AI flashcard generation, Ebbinghaus spaced repetition, and social studying
          into one beautiful space-themed platform. Watch your knowledge galaxy grow.
        </p>

        {/* CTA buttons */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 px-8 py-4 rounded-2xl text-white glow-violet transition-all hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #7C3AED, #4F46E5)",
              fontWeight: 700,
              fontSize: "1rem",
            }}
          >
            <Rocket className="w-5 h-5" />
            Launch Your Galaxy
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            to="/dashboard"
            className="flex items-center gap-2 px-6 py-4 rounded-2xl transition-all"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.7)",
              fontWeight: 600,
              fontSize: "0.9375rem",
            }}
          >
            <Play className="w-4 h-4 fill-current" />
            See Demo
          </Link>
        </div>

        {/* Hero visual - animated planets */}
        <div className="relative mx-auto" style={{ maxWidth: 720, height: 300 }}>
          {/* Central glow */}
          <div
            className="absolute"
            style={{
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 200,
              height: 200,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)",
            }}
          />

          {/* Planet 1 - large violet */}
          <div
            className="absolute rounded-full flex items-center justify-center planet-float"
            style={{
              width: 100, height: 100,
              top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundImage: "linear-gradient(135deg, #A78BFA, #6366F1)",
              boxShadow: "0 0 40px rgba(139,92,246,0.5), 0 0 80px rgba(139,92,246,0.2)",
            }}
          >
            <span style={{ fontSize: "2.5rem" }}>🔢</span>
          </div>

          {/* Planet 2 - emerald */}
          <div
            className="absolute rounded-full flex items-center justify-center planet-float"
            style={{
              width: 72, height: 72,
              top: "20%", left: "15%",
              backgroundImage: "linear-gradient(135deg, #34D399, #059669)",
              boxShadow: "0 0 30px rgba(52,211,153,0.4)",
              animationDelay: "1s",
            }}
          >
            <span style={{ fontSize: "1.75rem" }}>🌱</span>
          </div>

          {/* Planet 3 - blue */}
          <div
            className="absolute rounded-full flex items-center justify-center planet-float"
            style={{
              width: 62, height: 62,
              top: "55%", left: "8%",
              backgroundImage: "linear-gradient(135deg, #60A5FA, #2563EB)",
              boxShadow: "0 0 25px rgba(96,165,250,0.4)",
              animationDelay: "2s",
            }}
          >
            <span style={{ fontSize: "1.5rem" }}>⚗️</span>
          </div>

          {/* Planet 4 - pink */}
          <div
            className="absolute rounded-full flex items-center justify-center planet-float"
            style={{
              width: 80, height: 80,
              top: "15%", right: "12%",
              backgroundImage: "linear-gradient(135deg, #F472B6, #D946EF)",
              boxShadow: "0 0 30px rgba(244,114,182,0.4)",
              animationDelay: "0.5s",
            }}
          >
            <span style={{ fontSize: "2rem" }}>📜</span>
          </div>

          {/* Planet 5 - amber small */}
          <div
            className="absolute rounded-full flex items-center justify-center planet-float"
            style={{
              width: 52, height: 52,
              top: "60%", right: "18%",
              backgroundImage: "linear-gradient(135deg, #FBBF24, #F97316)",
              boxShadow: "0 0 20px rgba(251,191,36,0.4)",
              animationDelay: "1.5s",
            }}
          >
            <span style={{ fontSize: "1.25rem" }}>⚛️</span>
          </div>

          {/* Planet 6 - cyan */}
          <div
            className="absolute rounded-full flex items-center justify-center planet-float"
            style={{
              width: 44, height: 44,
              top: "30%", right: "5%",
              backgroundImage: "linear-gradient(135deg, #22D3EE, #0EA5E9)",
              boxShadow: "0 0 18px rgba(34,211,238,0.4)",
              animationDelay: "3s",
            }}
          >
            <span style={{ fontSize: "1rem" }}>🗣️</span>
          </div>

          {/* Orbit rings */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 220, height: 220,
              top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              border: "1px solid rgba(255,255,255,0.05)",
            }}
          />
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              width: 340, height: 340,
              top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              border: "1px dashed rgba(255,255,255,0.04)",
            }}
          />

          {/* Floating labels */}
          {[
            { text: "+280 XP", x: "72%", y: "75%", color: "#A78BFA" },
            { text: "🔥 14 streak", x: "5%", y: "30%", color: "#FCD34D" },
            { text: "89% retention", x: "72%", y: "25%", color: "#34D399" },
          ].map((l) => (
            <div
              key={l.text}
              className="absolute px-2.5 py-1 rounded-full text-xs"
              style={{
                left: l.x, top: l.y,
                background: "rgba(5,8,20,0.8)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: l.color,
                fontWeight: 600,
                backdropFilter: "blur(8px)",
                whiteSpace: "nowrap",
              }}
            >
              {l.text}
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 px-6 pb-20 max-w-[1100px] mx-auto">
        <div className="grid grid-cols-4 gap-5">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="text-center p-6 rounded-3xl"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div className="text-3xl mb-2">{s.icon}</div>
              <div
                className="text-white mb-1"
                style={{ fontSize: "1.875rem", fontWeight: 800, letterSpacing: "-0.5px", fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {s.val}
              </div>
              <div className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 px-6 pb-24 max-w-[1100px] mx-auto">
        <div className="text-center mb-14">
          <h2
            className="text-white mb-4"
            style={{ fontSize: "2.25rem", fontWeight: 800, letterSpacing: "-1px", fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Everything you need to{" "}
            <span style={{ color: "#A78BFA" }}>master anything</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "1rem" }}>
            Built by students, for students — every feature designed for maximum retention.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className="p-6 rounded-3xl transition-all hover:translate-y-[-4px] group"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                backdropFilter: "blur(12px)",
                boxShadow: `0 4px 30px ${f.glow.replace("0.3", "0.05")}`,
              }}
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-all group-hover:scale-110"
                style={{
                  background: `${f.color}18`,
                  border: `1px solid ${f.color}30`,
                  color: f.color,
                  boxShadow: `0 0 20px ${f.glow}`,
                }}
              >
                {f.icon}
              </div>
              <h3 className="text-white mb-2" style={{ fontWeight: 700, fontSize: "1rem" }}>
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 px-6 pb-24 max-w-[1100px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-white mb-3" style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.5px", fontFamily: "'Space Grotesk', sans-serif" }}>
            Loved by learners worldwide
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-5">
          {TESTIMONIALS.map((t) => {
            const gradMap: Record<string, [string, string]> = {
              "from-pink-500 to-rose-500": ["#EC4899", "#F43F5E"],
              "from-blue-500 to-indigo-500": ["#3B82F6", "#6366F1"],
              "from-emerald-500 to-teal-500": ["#10B981", "#14B8A6"],
            };
            const [c1, c2] = gradMap[t.gradient] || ["#8B5CF6", "#6366F1"];
            return (
              <div
                key={t.name}
                className="p-6 rounded-3xl"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(12px)" }}
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" style={{ color: "#FCD34D" }} />
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.6)" }}>
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm flex-shrink-0"
                    style={{ backgroundImage: `linear-gradient(135deg, ${c1}, ${c2})`, fontWeight: 700 }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-white text-sm" style={{ fontWeight: 600 }}>{t.name}</div>
                    <div className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>{t.role}</div>
                  </div>
                  <div className="ml-auto text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(139,92,246,0.15)", color: "#A78BFA", fontWeight: 600 }}>
                    {t.xp}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 pb-24 max-w-[800px] mx-auto text-center">
        <div
          className="p-12 rounded-3xl relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(79,70,229,0.15))",
            border: "1px solid rgba(139,92,246,0.25)",
            backdropFilter: "blur(20px)",
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at 50% 50%, rgba(139,92,246,0.15) 0%, transparent 70%)",
            }}
          />
          <div className="relative z-10">
            <div className="text-5xl mb-4">🚀</div>
            <h2
              className="text-white mb-4"
              style={{ fontSize: "2rem", fontWeight: 900, letterSpacing: "-0.5px", fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Ready to explore your knowledge cosmos?
            </h2>
            <p className="mb-8" style={{ color: "rgba(255,255,255,0.5)", fontSize: "1rem" }}>
              Join 50,000+ students building their personal galaxies of knowledge. Free forever.
            </p>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-white transition-all hover:scale-105 glow-violet"
              style={{
                background: "linear-gradient(135deg, #7C3AED, #4F46E5)",
                fontWeight: 700,
                fontSize: "1rem",
                boxShadow: "0 0 30px rgba(139,92,246,0.4)",
              }}
            >
              <Rocket className="w-5 h-5" />
              Launch Retentionite Free
              <ArrowRight className="w-5 h-5" />
            </Link>
            <div className="flex items-center justify-center gap-6 mt-6">
              {["No credit card", "Free forever", "Setup in 60 sec"].map((f) => (
                <div key={f} className="flex items-center gap-1.5 text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                  <Shield className="w-3 h-3" style={{ color: "#34D399" }} />
                  {f}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-8 py-8 max-w-[1400px] mx-auto" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt="Retentionite"
              className="w-7 h-7"
              style={{ objectFit: "contain" }}
            />
            <span className="text-white text-sm" style={{ fontWeight: 700 }}>Retentionite</span>
            <span className="text-xs" style={{ color: "rgba(255,255,255,0.25)" }}>· Space Explorer Edition</span>
          </div>
          <div className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
            © 2026 Retentionite. Built for curious minds 🌌
          </div>
        </div>
      </footer>
    </div>
  );
}
