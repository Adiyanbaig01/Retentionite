import { useMemo } from "react";
import { useTheme } from "./ThemeContext";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
}

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: (((i * 7919) % 997) / 997) * 100,
    y: (((i * 6271) % 983) / 983) * 100,
    size: (((i * 3571) % 10) / 10) * 2.5 + 0.5,
    opacity: (((i * 2311) % 10) / 10) * 0.6 + 0.15,
    duration: (((i * 1733) % 10) / 10) * 4 + 2,
    delay: (((i * 1237) % 10) / 10) * 5,
  }));
}

// ── Background Components ──

function SpaceStars() {
  const stars = useMemo(() => generateParticles(180), []);
  return (
    <>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 20% 20%, rgba(91,33,182,0.25) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(29,78,216,0.2) 0%, transparent 50%), radial-gradient(ellipse at 50% 10%, rgba(157,23,77,0.12) 0%, transparent 40%), linear-gradient(180deg, #050814 0%, #07091E 50%, #050814 100%)",
        }}
      />
      {/* Nebula clouds */}
      <div
        className="absolute"
        style={{
          top: "5%", left: "60%", width: "500px", height: "500px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)",
          animation: "nebula-drift 20s ease-in-out infinite",
        }}
      />
      <div
        className="absolute"
        style={{
          top: "50%", left: "10%", width: "400px", height: "400px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)",
          animation: "nebula-drift 25s ease-in-out infinite reverse",
        }}
      />
      <div
        className="absolute"
        style={{
          bottom: "10%", right: "20%", width: "350px", height: "350px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(236,72,153,0.06) 0%, transparent 70%)",
          animation: "nebula-drift 18s ease-in-out infinite", animationDelay: "-10s",
        }}
      />

      {/* Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: star.x + "%", top: star.y + "%",
            width: star.size + "px", height: star.size + "px",
            opacity: star.opacity,
            animation: `twinkle ${star.duration}s ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </>
  );
}

function RoseFlowers() {
  const petals = useMemo(() => generateParticles(35), []);
  // A simple SVG rose petal shape
  const petalDataUrl = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23F472B6' opacity='0.8'><path d='M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 19.93C7.06 19.43 4 16.05 4 12C4 7.95 7.06 4.57 11 4.07V19.93ZM13 4.07C16.94 4.57 20 7.95 20 12C20 16.05 16.94 19.43 13 19.93V4.07Z'/></svg>";
  
  return (
    <>
      <div className="absolute inset-0" style={{
        background: "linear-gradient(135deg, rgba(253,242,248,0.3) 0%, rgba(251,207,232,0.1) 100%)"
      }} />
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: p.x + "%",
            top: "-10%",
            width: (p.size * 5) + 8 + "px",
            height: (p.size * 5) + 8 + "px",
            backgroundImage: `url("${petalDataUrl}")`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            animation: `petal-drift ${p.duration * 3}s linear infinite`,
            animationDelay: `${p.delay * 2}s`
          }}
        />
      ))}
    </>
  );
}

function StrangerThingsSpores() {
  const spores = useMemo(() => generateParticles(60), []);
  return (
    <>
      {/* Eerie dark red/navy gradient */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(circle at 50% 100%, rgba(139,0,0,0.15) 0%, transparent 60%)"
      }} />
      {/* Creepy vines overlay conceptually (just shadow gradients) */}
      <div className="absolute top-0 left-0 right-0 h-32" style={{
        background: "linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)"
      }} />
      
      {spores.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full"
          style={{
            left: s.x + "%",
            top: s.y + "%",
            width: s.size * 2 + "px",
            height: s.size * 2 + "px",
            background: "rgba(180, 20, 20, 0.4)",
            boxShadow: "0 0 10px rgba(220, 20, 60, 0.6)",
            filter: "blur(0.5px)",
            animation: `spore-float ${s.duration * 2}s ease-in-out infinite alternate`,
            animationDelay: `${s.delay}s`
          }}
        />
      ))}
    </>
  );
}

function MarvelSweep() {
  const lines = useMemo(() => generateParticles(12), []);
  return (
    <>
      {/* Halftone / Comic dots pattern overlay concept using repeating gradients */}
      <div className="absolute inset-0" style={{
        backgroundImage: "radial-gradient(rgba(226, 54, 54, 0.05) 2px, transparent 2px)",
        backgroundSize: "20px 20px"
      }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(26,26,26,0.3) 0%, rgba(153,0,0,0.1) 100%)" }} />
      
      {/* Pulses */}
      <div className="absolute rounded-full" style={{
        width: "60vh", height: "60vh", top: "20%", left: "10%",
        background: "radial-gradient(circle, rgba(245,176,65,0.2) 0%, transparent 70%)",
        animation: "marvel-pulse 6s infinite"
      }} />

      {/* Sweeping speed lines */}
      {lines.map((l) => (
        <div
          key={l.id}
          className="absolute"
          style={{
            top: (l.y) + "%",
            height: (l.size * 30 + 10) + "px",
            width: "300vw",
            background: `linear-gradient(90deg, transparent 0%, rgba(226,54,54,${l.opacity}) 50%, transparent 100%)`,
            animation: `marvel-sweep ${l.duration * 1.5}s ease-in-out infinite`,
            animationDelay: `${l.delay}s`
          }}
        />
      ))}
    </>
  );
}

export function SpaceBackground() {
  const { theme, T } = useTheme();

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {theme === "space" && <SpaceStars />}
      {theme === "rose" && <RoseFlowers />}
      {theme === "marvel" && <MarvelSweep />}
      {theme === "stranger-things" && <StrangerThingsSpores />}
    </div>
  );
}
