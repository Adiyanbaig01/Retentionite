import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Lock, Globe, Users, BookOpen, Star, Plus, Check, X, Send,
  MessageCircle, Share2, BookmarkPlus, UserPlus, Eye, EyeOff,
  Zap, Flame, Trophy, ChevronRight, Gift, ExternalLink, Search,
} from "lucide-react";
import { useApp, PLANET_GRADIENTS, PLANET_GLOW, PLANET_LINE, type Subject, type Friend } from "../store";
import profilePhoto from "../../assets/adiyan_profile.png";
import { useTheme } from "./ThemeContext";
import { AddSubjectModal } from "./AddSubjectModal";

function PlanetIcon({ subject, size = 48 }: { subject: Subject; size?: number }) {
  const colors: Record<string, [string, string]> = {
    violet: ["#A78BFA", "#6366F1"],
    blue: ["#60A5FA", "#3B82F6"],
    pink: ["#F472B6", "#D946EF"],
    cyan: ["#22D3EE", "#0EA5E9"],
    amber: ["#FBBF24", "#F97316"],
    emerald: ["#34D399", "#22C55E"],
    rose: ["#FB7185", "#F43F5E"],
  };
  const [c1, c2] = colors[subject.planet];
  const glow = PLANET_GLOW[subject.planet];
  return (
    <div
      className="rounded-full flex items-center justify-center flex-shrink-0 relative"
      style={{
        width: size,
        height: size,
        backgroundImage: `linear-gradient(135deg, ${c1}, ${c2})`,
        boxShadow: `0 4px 20px ${glow}`,
      }}
    >
      <span style={{ fontSize: size / 2.8 + "px" }}>{subject.emoji}</span>
    </div>
  );
}

function FriendCard({ friend, onAccept }: { friend: Friend; onAccept?: (id: string) => void }) {
  const { T } = useTheme();
  const colors: Record<string, [string, string]> = {
    "from-pink-500 to-rose-500": ["#EC4899", "#F43F5E"],
    "from-emerald-500 to-teal-500": ["#10B981", "#14B8A6"],
    "from-blue-500 to-indigo-500": ["#3B82F6", "#6366F1"],
    "from-violet-500 to-purple-500": ["#8B5CF6", "#A855F7"],
    "from-amber-500 to-orange-500": ["#F59E0B", "#F97316"],
  };
  const [c1, c2] = colors[friend.avatarGradient] || ["#8B5CF6", "#6366F1"];

  return (
    <div
      className="flex items-center gap-3 p-3 rounded-2xl transition-all hover:translate-y-[-1px]"
      style={{
        background: T.cardBg,
        border: `1px solid ${T.cardBorder}`,
        backdropFilter: T.showSpaceBg ? "blur(12px)" : "none",
        boxShadow: T.cardShadow,
        cursor: "pointer",
      }}
    >
      <div className="relative flex-shrink-0">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center text-white text-sm"
          style={{ backgroundImage: `linear-gradient(135deg, ${c1}, ${c2})`, fontWeight: 700 }}
        >
          {friend.avatarInitials}
        </div>
        {friend.isOnline && (
          <div
            className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2"
            style={{ background: "#10B981", borderColor: T.cardBg }}
          />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm truncate" style={{ color: T.textPrimary, fontWeight: 600 }}>
          {friend.name}
        </div>
        <div className="text-xs" style={{ color: T.textMuted }}>
          {friend.username} · Lv.{friend.level}
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-xs" style={{ color: T.xpBadgeColor }}>⚡ {friend.xp.toLocaleString()} XP</span>
          <span className="text-xs" style={{ color: T.streakBadgeColor }}>🔥 {friend.streak}</span>
        </div>
      </div>
      {friend.status === "pending" && onAccept && (
        <div className="flex gap-1.5 flex-shrink-0">
          <button
            onClick={() => onAccept(friend.id)}
            className="w-8 h-8 rounded-xl flex items-center justify-center transition-all"
            style={{ background: "rgba(52,211,153,0.15)", border: "1px solid rgba(52,211,153,0.3)", color: "#6EE7B7" }}
          >
            <Check className="w-3.5 h-3.5" />
          </button>
          <button
            className="w-8 h-8 rounded-xl flex items-center justify-center transition-all"
            style={{ background: "rgba(244,63,94,0.12)", border: "1px solid rgba(244,63,94,0.2)", color: "#FDA4AF" }}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
      {friend.status === "friend" && (
        <div className="flex gap-1.5 flex-shrink-0">
          <button
            className="w-8 h-8 rounded-xl flex items-center justify-center transition-all"
            style={{ background: T.primaryLight, border: `1px solid ${T.primaryBorder}`, color: T.primaryColor }}
            title="Send message"
          >
            <MessageCircle className="w-3.5 h-3.5" />
          </button>
          <button
            className="w-8 h-8 rounded-xl flex items-center justify-center transition-all"
            style={{ background: T.secondaryBg, border: `1px solid ${T.primaryBorder}`, color: T.secondaryColor }}
            title="Share deck"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}

function SubjectPost({ subject, onClick }: { subject: Subject; onClick: () => void }) {
  const { T } = useTheme();
  const colors: Record<string, [string, string]> = {
    violet: ["#A78BFA", "#6366F1"],
    blue: ["#60A5FA", "#3B82F6"],
    pink: ["#F472B6", "#D946EF"],
    cyan: ["#22D3EE", "#0EA5E9"],
    amber: ["#FBBF24", "#F97316"],
    emerald: ["#34D399", "#22C55E"],
    rose: ["#FB7185", "#F43F5E"],
  };
  const [c1, c2] = colors[subject.planet];

  return (
    <div
      className="subject-post rounded-2xl overflow-hidden cursor-pointer transition-all hover:translate-y-[-3px] hover:scale-[1.01]"
      style={{
        background: T.cardBg,
        border: `1px solid ${T.cardBorder}`,
        boxShadow: T.cardShadow || `0 4px 20px rgba(0,0,0,0.15)`,
      }}
      onClick={onClick}
    >
      {/* Top: Planet visual */}
      <div
        className="relative flex items-center justify-center"
        style={{
          height: 140,
          backgroundImage: `radial-gradient(ellipse at center, ${c1}15 0%, transparent 70%)`,
          background: T.showSpaceBg
            ? `radial-gradient(ellipse at center, ${c1}15 0%, transparent 70%)`
            : `linear-gradient(135deg, ${c1}08, ${c2}05)`,
        }}
      >
        {/* Stars in background — only for space theme */}
        {T.showSpaceBg && [...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: (i % 3) + 1 + "px",
              height: (i % 3) + 1 + "px",
              left: ((i * 47) % 85) + 5 + "%",
              top: ((i * 31) % 75) + 5 + "%",
              opacity: 0.2 + (i % 4) * 0.12,
            }}
          />
        ))}
        <div
          className="rounded-full flex items-center justify-center relative z-10 planet-float"
          style={{
            width: 72,
            height: 72,
            backgroundImage: `linear-gradient(135deg, ${c1}, ${c2})`,
            boxShadow: `0 8px 30px ${PLANET_GLOW[subject.planet]}, 0 0 0 2px rgba(255,255,255,0.08)`,
          }}
        >
          <span style={{ fontSize: "1.75rem" }}>{subject.emoji}</span>
        </div>

        {/* Privacy badge */}
        <div
          className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full"
          style={{
            background: T.showSpaceBg ? "rgba(5,8,20,0.7)" : T.inputBg,
            border: `1px solid ${T.cardBorder}`,
            backdropFilter: "blur(8px)",
          }}
        >
          {subject.isPublic ? (
            <Globe className="w-2.5 h-2.5" style={{ color: "#34D399" }} />
          ) : (
            <Lock className="w-2.5 h-2.5" style={{ color: "#F9A8D4" }} />
          )}
          <span style={{ fontSize: "0.5625rem", fontWeight: 600, color: T.textSecondary }}>
            {subject.isPublic ? "Public" : "Private"}
          </span>
        </div>

        {/* Hover overlay */}
        <div
          className="subject-overlay absolute inset-0 flex items-center justify-center gap-3"
          style={{
            background: T.showSpaceBg ? "rgba(5,8,20,0.6)" : "rgba(0,0,0,0.45)",
            backdropFilter: "blur(4px)",
          }}
        >
          <div className="flex items-center gap-1.5 text-white text-xs" style={{ fontWeight: 600 }}>
            <BookOpen className="w-4 h-4" />
            {subject.cards} cards
          </div>
          <div className="flex items-center gap-1.5 text-white text-xs" style={{ fontWeight: 600 }}>
            <Star className="w-4 h-4" />
            {subject.mastered} done
          </div>
        </div>
      </div>

      {/* Bottom: Info */}
      <div className="p-3.5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <div className="text-sm" style={{ fontWeight: 700, color: T.textPrimary }}>
              {subject.name}
            </div>
            <div className="text-xs mt-0.5 line-clamp-1" style={{ color: T.textMuted }}>
              {subject.description.split(",")[0]}
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full rounded-full h-1 mb-2" style={{ background: T.xpBarBg }}>
          <div
            className="h-1 rounded-full transition-all"
            style={{
              width: subject.progress + "%",
              backgroundImage: `linear-gradient(90deg, ${c1}, ${c2})`,
              boxShadow: `0 0 6px ${PLANET_GLOW[subject.planet]}`,
            }}
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs" style={{ color: T.textMuted }}>
            {subject.mastered}/{subject.cards} cards
          </span>
          <span
            className="text-xs px-2 py-0.5 rounded-full"
            style={{
              backgroundImage: `linear-gradient(135deg, ${c1}25, ${c2}15)`,
              color: PLANET_LINE[subject.planet],
              fontWeight: 600,
              border: `1px solid ${PLANET_LINE[subject.planet]}30`,
            }}
          >
            {subject.progress}% mastered
          </span>
        </div>

        <div className="text-xs mt-2" style={{ color: T.textMuted, opacity: 0.7 }}>
          Added {new Date(subject.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </div>
      </div>
    </div>
  );
}

export function Profile() {
  const { user, subjects, friends, sharedItems, updateProfile, acceptFriend, markSharedRead, updateSubject } = useApp();
  const { T, theme } = useTheme();
  const [activeTab, setActiveTab] = useState<"posts" | "friends" | "shared">("posts");
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [shareModal, setShareModal] = useState(false);
  const [shareSubject, setShareSubject] = useState<Subject | null>(null);
  const [friendSearch, setFriendSearch] = useState("");
  const [newSubjectModal, setNewSubjectModal] = useState(false);
  const [editBio, setEditBio] = useState(false);
  const [bioInput, setBioInput] = useState(user.bio);

  const myFriends = friends.filter((f) => f.status === "friend");
  const pendingFriends = friends.filter((f) => f.status === "pending");
  const filteredFriends = myFriends.filter(
    (f) =>
      friendSearch === "" ||
      f.name.toLowerCase().includes(friendSearch.toLowerCase()) ||
      f.username.toLowerCase().includes(friendSearch.toLowerCase())
  );

  const cardStyle = {
    background: T.cardBg,
    border: `1px solid ${T.cardBorder}`,
    backdropFilter: T.showSpaceBg ? "blur(12px)" : "none",
    boxShadow: T.cardShadow,
  };

  const modalBg = {
    background: T.popupBg,
    border: `1px solid ${T.popupBorder}`,
    backdropFilter: "blur(20px)",
  };

  return (
    <div className="p-7 max-w-[1240px]">
      {/* Profile Header */}
      <div
        className="rounded-3xl p-6 mb-6 relative overflow-hidden"
        style={cardStyle}
      >
        {/* Background decoration */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: T.showSpaceBg
              ? "radial-gradient(ellipse at 80% 50%, rgba(139,92,246,0.12) 0%, transparent 60%), radial-gradient(ellipse at 20% 50%, rgba(59,130,246,0.08) 0%, transparent 60%)"
              : `radial-gradient(ellipse at 80% 50%, ${T.primaryColor}08 0%, transparent 60%)`,
          }}
        />

        <div className="relative z-10 flex items-start gap-6">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div
              className="w-24 h-24 rounded-2xl overflow-hidden"
              style={{
                boxShadow: `0 0 30px ${T.primaryGlow}`,
                border: `2px solid ${T.primaryBorder}`,
              }}
            >
              <img
                src={profilePhoto}
                alt="Adiyan Baig"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Level badge */}
            <div
              className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full text-white text-xs"
              style={{
                background: T.primaryBg,
                fontWeight: 700,
                boxShadow: `0 2px 8px ${T.primaryGlow}`,
              }}
            >
              Lv.{user.level}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="mb-0.5" style={{ fontSize: "1.5rem", fontWeight: 800, letterSpacing: "-0.3px", color: T.textPrimary }}>
                  {user.name}
                </h1>
                <div className="text-sm mb-2" style={{ color: T.textMuted }}>
                  {user.username}
                </div>
                {!editBio ? (
                  <p
                    className="text-sm mb-3 max-w-lg cursor-pointer transition-colors"
                    style={{ color: T.textSecondary }}
                    onClick={() => setEditBio(true)}
                  >
                    {user.bio}
                    <span className="ml-2 text-xs opacity-50">(click to edit)</span>
                  </p>
                ) : (
                  <div className="flex gap-2 mb-3 max-w-lg">
                    <textarea
                      value={bioInput}
                      onChange={(e) => setBioInput(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-xl text-sm resize-none outline-none"
                      style={{
                        background: T.inputBg,
                        border: `1px solid ${T.primaryBorder}`,
                        color: T.inputText,
                        fontFamily: "'Space Grotesk', sans-serif",
                      }}
                      rows={2}
                    />
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => { updateProfile({ bio: bioInput }); setEditBio(false); }}
                        className="px-3 py-1 rounded-lg text-xs"
                        style={{ background: "rgba(52,211,153,0.2)", color: "#6EE7B7", fontWeight: 600 }}
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditBio(false)}
                        className="px-3 py-1 rounded-lg text-xs"
                        style={{ background: T.inputBg, color: T.textMuted }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Stats row */}
                <div className="flex items-center gap-5 flex-wrap">
                  {[
                    { icon: <Zap className="w-4 h-4" style={{ color: T.xpBadgeColor }} />, val: user.xp.toLocaleString(), label: "XP" },
                    { icon: <Flame className="w-4 h-4" style={{ color: T.streakBadgeColor }} />, val: user.streak, label: "day streak" },
                    { icon: <BookOpen className="w-4 h-4" style={{ color: T.secondaryColor }} />, val: subjects.length, label: "subjects" },
                    { icon: <Users className="w-4 h-4" style={{ color: "#34D399" }} />, val: myFriends.length, label: "friends" },
                    { icon: <Trophy className="w-4 h-4" style={{ color: T.streakBadgeColor }} />, val: `${user.totalStudyHours}h`, label: "studied" },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      {s.icon}
                      <span className="text-sm" style={{ fontWeight: 700, color: T.textPrimary }}>{s.val}</span>
                      <span className="text-xs" style={{ color: T.textMuted }}>{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Privacy toggle + Actions */}
              <div className="flex flex-col gap-2 flex-shrink-0">
                <button
                  onClick={() => updateProfile({ isPublic: !user.isPublic })}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all"
                  style={{
                    background: user.isPublic ? "rgba(52,211,153,0.12)" : T.dangerBg,
                    border: user.isPublic ? "1px solid rgba(52,211,153,0.25)" : `1px solid ${T.dangerBorder}`,
                    color: user.isPublic ? "#6EE7B7" : T.dangerText,
                    fontWeight: 600,
                  }}
                >
                  {user.isPublic ? (
                    <><Globe className="w-4 h-4" /> Public Profile</>
                  ) : (
                    <><Lock className="w-4 h-4" /> Private Profile</>
                  )}
                </button>
                <div className="text-xs text-center" style={{ color: T.textMuted }}>
                  {user.isPublic ? "Friends can see your posts" : "Only you can see your posts"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rank badge area */}
        <div
          className="mt-4 flex items-center gap-3 pt-4"
          style={{ borderTop: `1px solid ${T.dividerColor}` }}
        >
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{ background: T.levelCardBg, border: `1px solid ${T.levelCardBorder}` }}
          >
            <span>{theme === "duolingo" ? "🦉" : "🚀"}</span>
            <span className="text-xs" style={{ fontWeight: 700, color: T.textPrimary }}>{user.rank}</span>
          </div>
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{ background: T.primaryLight, border: `1px solid ${T.primaryBorder}` }}
          >
            <Zap className="w-3 h-3" style={{ color: T.primaryColor }} />
            <span className="text-xs" style={{ fontWeight: 600, color: T.primaryColor }}>
              {user.xp % 1000}/1000 to next level
            </span>
          </div>
          <div className="ml-auto text-xs" style={{ color: T.textMuted }}>
            Member since {new Date(user.joinedAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-6" style={{ borderBottom: `1px solid ${T.dividerColor}`, paddingBottom: "0" }}>
        {[
          { id: "posts" as const, label: "Study Posts", icon: <BookOpen className="w-4 h-4" />, count: subjects.length },
          { id: "friends" as const, label: "Friends", icon: <Users className="w-4 h-4" />, count: myFriends.length },
          { id: "shared" as const, label: "Shared Decks", icon: <Gift className="w-4 h-4" />, count: sharedItems.filter((s) => !s.read).length },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="flex items-center gap-2 px-5 py-3 text-sm transition-all relative"
            style={{
              color: activeTab === tab.id ? T.navActiveText : T.navInactiveText,
              fontWeight: activeTab === tab.id ? 600 : 400,
              borderBottom: activeTab === tab.id ? `2px solid ${T.primaryColor}` : "2px solid transparent",
              marginBottom: "-1px",
            }}
          >
            {tab.icon}
            {tab.label}
            {tab.count > 0 && (
              <span
                className="text-xs px-1.5 py-0.5 rounded-full"
                style={{
                  background: activeTab === tab.id ? T.navActiveBg : T.inputBg,
                  color: activeTab === tab.id ? T.navActiveText : T.textMuted,
                  fontWeight: 600,
                  fontSize: "0.625rem",
                }}
              >
                {tab.count}
              </span>
            )}
          </button>
        ))}

        <div className="ml-auto flex items-center gap-2 pb-2">
          {activeTab === "posts" && (
            <button
              onClick={() => setNewSubjectModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all"
              style={{
                background: T.primaryBg,
                color: T.textOnPrimary,
                fontWeight: 600,
                boxShadow: `0 4px 14px ${T.primaryGlow}`,
              }}
            >
              <Plus className="w-4 h-4" />
              New Subject
            </button>
          )}
        </div>
      </div>

      {/* ── POSTS TAB ── */}
      {activeTab === "posts" && (
        <div>
          {subjects.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">{theme === "duolingo" ? "🌿" : "🌌"}</div>
              <h3 className="mb-2" style={{ fontWeight: 700, color: T.textPrimary }}>
                {theme === "duolingo"
                  ? "Your garden is empty"
                  : theme === "rose"
                  ? "Your garden is empty"
                  : "Your galaxy is empty"}
              </h3>
              <p className="text-sm mb-4" style={{ color: T.textMuted }}>
                {theme === "duolingo"
                  ? "Add your first subject to start growing your knowledge!"
                  : theme === "rose"
                  ? "Add your first subject to start blooming your knowledge!"
                  : "Add your first subject to start building your knowledge cosmos!"}
              </p>
              <button
                onClick={() => setNewSubjectModal(true)}
                className="px-5 py-2.5 rounded-xl text-sm"
                style={{ background: T.primaryBg, color: T.textOnPrimary, fontWeight: 600, boxShadow: `0 4px 14px ${T.primaryGlow}` }}
              >
                Add First Subject
              </button>
            </div>
          ) : (
            <>
              {/* Privacy filter info */}
              <div className="flex items-center gap-3 mb-5">
                <div className="text-sm" style={{ color: T.textMuted }}>
                  {subjects.filter((s) => s.isPublic).length} public ·{" "}
                  {subjects.filter((s) => !s.isPublic).length} private posts
                </div>
                <div className="flex items-center gap-1.5">
                  <button className="text-xs px-3 py-1.5 rounded-xl" style={{ background: T.inputBg, border: `1px solid ${T.inputBorder}`, color: T.textMuted }}>
                    All ({subjects.length})
                  </button>
                  <button className="text-xs px-3 py-1.5 rounded-xl flex items-center gap-1" style={{ background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.15)", color: "#6EE7B7" }}>
                    <Globe className="w-3 h-3" /> Public
                  </button>
                  <button className="text-xs px-3 py-1.5 rounded-xl flex items-center gap-1" style={{ background: T.dangerBg, border: `1px solid ${T.dangerBorder}`, color: T.dangerText }}>
                    <Lock className="w-3 h-3" /> Private
                  </button>
                </div>
              </div>

              {/* Instagram-like grid */}
              <div className="grid grid-cols-3 gap-4">
                {subjects.map((s) => (
                  <SubjectPost
                    key={s.id}
                    subject={s}
                    onClick={() => setSelectedSubject(s)}
                  />
                ))}

                {/* Add new post */}
                <div
                  className="rounded-2xl flex flex-col items-center justify-center gap-3 cursor-pointer transition-all"
                  style={{
                    minHeight: 240,
                    background: T.inputBg,
                    border: `2px dashed ${T.inputBorder}`,
                  }}
                  onClick={() => setNewSubjectModal(true)}
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{ background: T.primaryLight, border: `1px solid ${T.primaryBorder}` }}
                  >
                    <Plus className="w-6 h-6" style={{ color: T.primaryColor }} />
                  </div>
                  <span className="text-sm" style={{ color: T.textMuted, fontWeight: 500 }}>
                    Add Subject
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* ── FRIENDS TAB ── */}
      {activeTab === "friends" && (
        <div className="grid grid-cols-3 gap-6">
          {/* Friends list */}
          <div className="col-span-2 space-y-4">
            {/* Pending requests */}
            {pendingFriends.length > 0 && (
              <div>
                <h3 className="text-sm mb-3" style={{ fontWeight: 700, color: T.textPrimary }}>
                  Friend Requests ({pendingFriends.length})
                </h3>
                <div className="space-y-2">
                  {pendingFriends.map((f) => (
                    <FriendCard key={f.id} friend={f} onAccept={acceptFriend} />
                  ))}
                </div>
              </div>
            )}

            {/* All friends */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm" style={{ fontWeight: 700, color: T.textPrimary }}>
                  Friends ({myFriends.length})
                </h3>
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: T.textMuted }} />
                  <input
                    value={friendSearch}
                    onChange={(e) => setFriendSearch(e.target.value)}
                    placeholder="Search friends..."
                    className="pl-8 pr-3 py-1.5 rounded-xl text-sm outline-none"
                    style={{
                      background: T.inputBg,
                      border: `1px solid ${T.inputBorder}`,
                      color: T.inputText,
                      width: 180,
                      fontFamily: "'Space Grotesk', sans-serif",
                    }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                {filteredFriends.map((f) => (
                  <FriendCard key={f.id} friend={f} />
                ))}
              </div>
            </div>
          </div>

          {/* Right panel */}
          <div className="space-y-4">
            {/* Add friend */}
            <div className="rounded-2xl p-5" style={cardStyle}>
              <h3 className="text-sm mb-3" style={{ fontWeight: 700, color: T.textPrimary }}>
                <UserPlus className="w-4 h-4 inline mr-2" style={{ color: T.primaryColor }} />
                Invite a Friend
              </h3>
              <input
                placeholder="Enter username or email..."
                className="w-full px-3 py-2.5 rounded-xl text-sm outline-none mb-3"
                style={{
                  background: T.inputBg,
                  border: `1px solid ${T.inputBorder}`,
                  color: T.inputText,
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              />
              <button
                className="w-full py-2.5 rounded-xl text-sm"
                style={{
                  background: T.primaryBg,
                  color: T.textOnPrimary,
                  fontWeight: 600,
                  boxShadow: `0 4px 14px ${T.primaryGlow}`,
                }}
              >
                Send Invite
              </button>
            </div>

            {/* Leaderboard */}
            <div className="rounded-2xl p-5" style={cardStyle}>
              <h3 className="text-sm mb-3" style={{ fontWeight: 700, color: T.textPrimary }}>
                <Trophy className="w-4 h-4 inline mr-2" style={{ color: T.streakBadgeColor }} />
                Friends Leaderboard
              </h3>
              <div className="space-y-2">
                {[...myFriends]
                  .sort((a, b) => b.xp - a.xp)
                  .slice(0, 5)
                  .map((f, i) => {
                    const colors_map: Record<string, [string, string]> = {
                      "from-pink-500 to-rose-500": ["#EC4899", "#F43F5E"],
                      "from-emerald-500 to-teal-500": ["#10B981", "#14B8A6"],
                      "from-blue-500 to-indigo-500": ["#3B82F6", "#6366F1"],
                      "from-violet-500 to-purple-500": ["#8B5CF6", "#A855F7"],
                      "from-amber-500 to-orange-500": ["#F59E0B", "#F97316"],
                    };
                    const [c1, c2] = colors_map[f.avatarGradient] || ["#8B5CF6", "#6366F1"];
                    const medals = ["🥇", "🥈", "🥉"];
                    return (
                      <div key={f.id} className="flex items-center gap-2.5">
                        <span className="text-sm w-6">{medals[i] || `${i + 1}.`}</span>
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs flex-shrink-0"
                          style={{ backgroundImage: `linear-gradient(135deg, ${c1}, ${c2})`, fontWeight: 700 }}
                        >
                          {f.avatarInitials}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs truncate" style={{ fontWeight: 600, color: T.textPrimary }}>{f.name}</div>
                        </div>
                        <span className="text-xs" style={{ color: T.xpBadgeColor, fontWeight: 600 }}>
                          {f.xp.toLocaleString()}
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── SHARED DECKS TAB ── */}
      {activeTab === "shared" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm" style={{ fontWeight: 700, color: T.textPrimary }}>
              Decks shared with you
            </h3>
            <span className="text-xs" style={{ color: T.textMuted }}>
              {sharedItems.filter((s) => !s.read).length} unread
            </span>
          </div>
          {sharedItems.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-3">📬</div>
              <p className="text-sm" style={{ color: T.textMuted }}>
                No shared decks yet. Ask friends to share their study materials!
              </p>
            </div>
          ) : (
            sharedItems.map((item) => {
              const sender = friends.find((f) => f.id === item.fromFriendId);
              const senderColors: Record<string, [string, string]> = {
                "from-pink-500 to-rose-500": ["#EC4899", "#F43F5E"],
                "from-emerald-500 to-teal-500": ["#10B981", "#14B8A6"],
                "from-blue-500 to-indigo-500": ["#3B82F6", "#6366F1"],
                "from-violet-500 to-purple-500": ["#8B5CF6", "#A855F7"],
                "from-amber-500 to-orange-500": ["#F59E0B", "#F97316"],
              };
              const [c1, c2] = (sender && senderColors[sender.avatarGradient]) || ["#8B5CF6", "#6366F1"];
              return (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl transition-all cursor-pointer"
                  style={{
                    background: item.read ? T.cardBg : T.primaryLight,
                    border: item.read ? `1px solid ${T.cardBorder}` : `1px solid ${T.primaryBorder}`,
                  }}
                  onClick={() => markSharedRead(item.id)}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-3xl flex-shrink-0">{item.subjectEmoji}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div>
                          <div className="text-sm" style={{ fontWeight: 700, color: T.textPrimary }}>
                            {item.subjectName}
                          </div>
                          <div className="text-xs mt-0.5" style={{ color: T.textMuted }}>
                            {item.cardCount} cards · Shared by {item.fromName}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {!item.read && (
                            <span
                              className="text-xs px-2 py-0.5 rounded-full"
                              style={{ background: T.navActiveBg, color: T.navActiveText, fontWeight: 600 }}
                            >
                              New
                            </span>
                          )}
                          <span className="text-xs" style={{ color: T.textMuted }}>
                            {new Date(item.sharedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                          </span>
                        </div>
                      </div>

                      {/* Message */}
                      <div
                        className="text-sm italic p-3 rounded-xl mb-3"
                        style={{
                          background: T.inputBg,
                          color: T.textSecondary,
                          borderLeft: `2px solid ${T.primaryBorder}`,
                        }}
                      >
                        "{item.message}"
                      </div>

                      {/* Sender */}
                      {sender && (
                        <div className="flex items-center gap-2">
                          <div
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs"
                            style={{ backgroundImage: `linear-gradient(135deg, ${c1}, ${c2})`, fontWeight: 700 }}
                          >
                            {sender.avatarInitials}
                          </div>
                          <span className="text-xs" style={{ color: T.textMuted }}>
                            {sender.name} {sender.username} · Lv.{sender.level}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col gap-2 flex-shrink-0">
                      <button
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs transition-all"
                        style={{
                          background: T.primaryLight,
                          border: `1px solid ${T.primaryBorder}`,
                          color: T.primaryColor,
                          fontWeight: 600,
                        }}
                      >
                        <BookmarkPlus className="w-3.5 h-3.5" />
                        Save Deck
                      </button>
                      <button
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs transition-all"
                        style={{
                          background: T.inputBg,
                          border: `1px solid ${T.inputBorder}`,
                          color: T.textMuted,
                        }}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Preview
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* ── Subject Detail Modal ── */}
      {selectedSubject && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 p-6"
          style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}
          onClick={() => setSelectedSubject(null)}
        >
          <div
            className="rounded-3xl p-6 w-full max-w-lg"
            style={{ ...modalBg, maxHeight: "80vh", overflow: "auto" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-3">
                <PlanetIcon subject={selectedSubject} size={56} />
                <div>
                  <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: T.textPrimary }}>
                    {selectedSubject.name}
                  </h2>
                  <p className="text-sm mt-0.5" style={{ color: T.textMuted }}>
                    {selectedSubject.description}
                  </p>
                </div>
              </div>
              <button onClick={() => setSelectedSubject(null)}>
                <X className="w-5 h-5" style={{ color: T.textMuted }} />
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              {[
                { label: "Progress", val: selectedSubject.progress + "%", icon: "📈" },
                { label: "Mastered", val: selectedSubject.mastered + "", icon: "✅" },
                { label: "Total Cards", val: selectedSubject.cards + "", icon: "🃏" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl p-3 text-center"
                  style={{ background: T.inputBg, border: `1px solid ${T.inputBorder}` }}
                >
                  <div className="text-xl mb-1">{s.icon}</div>
                  <div className="text-sm" style={{ fontWeight: 700, color: T.textPrimary }}>{s.val}</div>
                  <div className="text-xs" style={{ color: T.textMuted }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <Link
                to={`/notes/${selectedSubject.id}`}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm transition-all"
                style={{
                  background: T.primaryLight,
                  border: `1px solid ${T.primaryBorder}`,
                  color: T.primaryColor,
                  fontWeight: 600,
                }}
                onClick={() => setSelectedSubject(null)}
              >
                <BookOpen className="w-4 h-4" />
                Open Notes
              </Link>
              <button
                onClick={() => { setShareSubject(selectedSubject); setShareModal(true); setSelectedSubject(null); }}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm transition-all"
                style={{
                  background: T.secondaryBg,
                  border: `1px solid ${T.primaryBorder}`,
                  color: T.secondaryColor,
                  fontWeight: 600,
                }}
              >
                <Share2 className="w-4 h-4" />
                Share with Friends
              </button>
            </div>

            {/* Privacy toggle */}
            <button
              onClick={() => updateSubject(selectedSubject.id, { isPublic: !selectedSubject.isPublic })}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm transition-all"
              style={{
                background: selectedSubject.isPublic ? "rgba(52,211,153,0.08)" : T.dangerBg,
                border: selectedSubject.isPublic ? "1px solid rgba(52,211,153,0.2)" : `1px solid ${T.dangerBorder}`,
                color: selectedSubject.isPublic ? "#6EE7B7" : T.dangerText,
                fontWeight: 600,
              }}
            >
              {selectedSubject.isPublic ? <><EyeOff className="w-4 h-4" /> Make Private</> : <><Eye className="w-4 h-4" /> Make Public</>}
            </button>
          </div>
        </div>
      )}

      {/* ── Share Modal ── */}
      {shareModal && shareSubject && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 p-6"
          style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)" }}
          onClick={() => setShareModal(false)}
        >
          <div
            className="rounded-3xl p-6 w-full max-w-md"
            style={modalBg}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h2 style={{ fontWeight: 700, color: T.textPrimary }}>Share Deck</h2>
              <button onClick={() => setShareModal(false)}>
                <X className="w-5 h-5" style={{ color: T.textMuted }} />
              </button>
            </div>

            <div
              className="flex items-center gap-3 p-3 rounded-2xl mb-4"
              style={{ background: T.inputBg, border: `1px solid ${T.inputBorder}` }}
            >
              <PlanetIcon subject={shareSubject} size={40} />
              <div>
                <div className="text-sm" style={{ fontWeight: 600, color: T.textPrimary }}>{shareSubject.name}</div>
                <div className="text-xs" style={{ color: T.textMuted }}>{shareSubject.cards} cards</div>
              </div>
            </div>

            <p className="text-sm mb-3" style={{ color: T.textSecondary }}>Select friends to share with:</p>
            <div className="space-y-2 max-h-48 overflow-y-auto space-scroll mb-4">
              {myFriends.map((f) => {
                const cmap: Record<string, [string, string]> = {
                  "from-pink-500 to-rose-500": ["#EC4899", "#F43F5E"],
                  "from-emerald-500 to-teal-500": ["#10B981", "#14B8A6"],
                  "from-blue-500 to-indigo-500": ["#3B82F6", "#6366F1"],
                  "from-violet-500 to-purple-500": ["#8B5CF6", "#A855F7"],
                  "from-amber-500 to-orange-500": ["#F59E0B", "#F97316"],
                };
                const [c1, c2] = cmap[f.avatarGradient] || ["#8B5CF6", "#6366F1"];
                return (
                  <label key={f.id} className="flex items-center gap-3 cursor-pointer p-2 rounded-xl transition-all"
                    style={{ background: "transparent" }}
                    onMouseEnter={(e) => e.currentTarget.style.background = T.inputBg}
                    onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs flex-shrink-0"
                      style={{ backgroundImage: `linear-gradient(135deg, ${c1}, ${c2})`, fontWeight: 700 }}
                    >
                      {f.avatarInitials}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm" style={{ fontWeight: 500, color: T.textPrimary }}>{f.name}</div>
                      <div className="text-xs" style={{ color: T.textMuted }}>{f.username}</div>
                    </div>
                    <input type="checkbox" className="w-4 h-4" style={{ accentColor: T.primaryColor }} />
                  </label>
                );
              })}
            </div>

            <textarea
              placeholder="Add a message... (optional)"
              className="w-full px-3 py-2.5 rounded-xl text-sm resize-none outline-none mb-3"
              rows={2}
              style={{
                background: T.inputBg,
                border: `1px solid ${T.inputBorder}`,
                color: T.inputText,
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            />

            <button
              onClick={() => setShareModal(false)}
              className="w-full py-3 rounded-xl text-sm flex items-center justify-center gap-2"
              style={{ background: T.primaryBg, color: T.textOnPrimary, fontWeight: 600, boxShadow: `0 4px 14px ${T.primaryGlow}` }}
            >
              <Send className="w-4 h-4" />
              Send Deck
            </button>
          </div>
        </div>
      )}

      {/* ── New Subject Modal ── */}
      {newSubjectModal && (
        <AddSubjectModal onClose={() => setNewSubjectModal(false)} />
      )}
    </div>
  );
}
