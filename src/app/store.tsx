import { createContext, useContext, useState, ReactNode, useCallback } from "react";

// ── Types ──────────────────────────────────────────────────

export type PlanetColor = "violet" | "blue" | "pink" | "cyan" | "amber" | "emerald" | "rose";

export interface RetentionPoint {
  day: string;
  rate: number;
  reviews: number;
}

export interface Subject {
  id: string;
  name: string;
  emoji: string;
  planet: PlanetColor;
  progress: number;
  cards: number;
  mastered: number;
  createdAt: string;
  isPublic: boolean;
  description: string;
  retentionData: RetentionPoint[];
}

export interface Note {
  id: string;
  subjectId: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface Friend {
  id: string;
  name: string;
  username: string;
  avatarInitials: string;
  avatarGradient: string;
  xp: number;
  streak: number;
  isOnline: boolean;
  level: number;
  status: "friend" | "pending" | "none";
  sharedDecks: string[];
}

export interface SharedItem {
  id: string;
  fromFriendId: string;
  fromName: string;
  subjectName: string;
  subjectEmoji: string;
  cardCount: number;
  sharedAt: string;
  message: string;
  read: boolean;
}

export interface UserProfile {
  name: string;
  username: string;
  avatarInitials: string;
  avatarGradient: string;
  bio: string;
  xp: number;
  streak: number;
  level: number;
  isPublic: boolean;
  joinedAt: string;
  totalStudyHours: number;
  rank: string;
}

// ── Default Data ───────────────────────────────────────────

const DEFAULT_SUBJECTS: Subject[] = [
  {
    id: "bio",
    name: "Biology",
    emoji: "🌱",
    planet: "emerald",
    progress: 80,
    cards: 120,
    mastered: 96,
    createdAt: "2026-01-15",
    isPublic: true,
    description: "Cell biology, genetics, ecology, and the study of living organisms.",
    retentionData: [
      { day: "Day 1", rate: 98, reviews: 1 },
      { day: "Day 3", rate: 84, reviews: 1 },
      { day: "Day 7", rate: 74, reviews: 2 },
      { day: "Day 14", rate: 80, reviews: 3 },
      { day: "Day 21", rate: 76, reviews: 3 },
      { day: "Day 30", rate: 88, reviews: 4 },
      { day: "Day 60", rate: 91, reviews: 5 },
    ],
  },
  {
    id: "math",
    name: "Mathematics",
    emoji: "🔢",
    planet: "violet",
    progress: 92,
    cards: 200,
    mastered: 184,
    createdAt: "2026-01-10",
    isPublic: true,
    description: "Calculus, algebra, linear algebra, and discrete mathematics.",
    retentionData: [
      { day: "Day 1", rate: 99, reviews: 1 },
      { day: "Day 3", rate: 88, reviews: 1 },
      { day: "Day 7", rate: 80, reviews: 2 },
      { day: "Day 14", rate: 85, reviews: 3 },
      { day: "Day 21", rate: 82, reviews: 3 },
      { day: "Day 30", rate: 92, reviews: 5 },
      { day: "Day 60", rate: 95, reviews: 7 },
    ],
  },
  {
    id: "hist",
    name: "History",
    emoji: "📜",
    planet: "amber",
    progress: 55,
    cards: 85,
    mastered: 47,
    createdAt: "2026-02-01",
    isPublic: false,
    description: "World history, ancient civilizations, modern history, and geopolitics.",
    retentionData: [
      { day: "Day 1", rate: 95, reviews: 1 },
      { day: "Day 3", rate: 76, reviews: 1 },
      { day: "Day 7", rate: 62, reviews: 1 },
      { day: "Day 14", rate: 70, reviews: 2 },
      { day: "Day 21", rate: 65, reviews: 2 },
      { day: "Day 30", rate: 74, reviews: 3 },
      { day: "Day 60", rate: 78, reviews: 4 },
    ],
  },
  {
    id: "chem",
    name: "Chemistry",
    emoji: "⚗️",
    planet: "blue",
    progress: 40,
    cards: 60,
    mastered: 24,
    createdAt: "2026-02-10",
    isPublic: true,
    description: "Organic chemistry, periodic table, chemical reactions, and thermodynamics.",
    retentionData: [
      { day: "Day 1", rate: 97, reviews: 1 },
      { day: "Day 3", rate: 78, reviews: 1 },
      { day: "Day 7", rate: 60, reviews: 1 },
      { day: "Day 14", rate: 66, reviews: 2 },
      { day: "Day 21", rate: 58, reviews: 2 },
      { day: "Day 30", rate: 68, reviews: 3 },
      { day: "Day 60", rate: 72, reviews: 4 },
    ],
  },
  {
    id: "phys",
    name: "Physics",
    emoji: "⚛️",
    planet: "cyan",
    progress: 67,
    cards: 95,
    mastered: 64,
    createdAt: "2026-02-15",
    isPublic: true,
    description: "Mechanics, electromagnetism, quantum physics, and thermodynamics.",
    retentionData: [
      { day: "Day 1", rate: 96, reviews: 1 },
      { day: "Day 3", rate: 80, reviews: 1 },
      { day: "Day 7", rate: 69, reviews: 2 },
      { day: "Day 14", rate: 75, reviews: 2 },
      { day: "Day 21", rate: 71, reviews: 3 },
      { day: "Day 30", rate: 82, reviews: 4 },
      { day: "Day 60", rate: 85, reviews: 5 },
    ],
  },
  {
    id: "lang",
    name: "Languages",
    emoji: "🗣️",
    planet: "pink",
    progress: 30,
    cards: 180,
    mastered: 54,
    createdAt: "2026-03-01",
    isPublic: false,
    description: "Spanish vocabulary, grammar, conversation, and writing.",
    retentionData: [
      { day: "Day 1", rate: 94, reviews: 1 },
      { day: "Day 3", rate: 72, reviews: 1 },
      { day: "Day 7", rate: 55, reviews: 1 },
      { day: "Day 14", rate: 60, reviews: 2 },
      { day: "Day 21", rate: 52, reviews: 2 },
      { day: "Day 30", rate: 63, reviews: 3 },
      { day: "Day 60", rate: 67, reviews: 4 },
    ],
  },
];

const DEFAULT_NOTES: Note[] = [
  {
    id: "note-1",
    subjectId: "bio",
    title: "Cell Structure Overview",
    content: "# Cell Structure\n\nCells are the basic unit of life. There are two types:\n\n## Prokaryotic Cells\n- No nucleus\n- Found in bacteria\n- Simple structure\n\n## Eukaryotic Cells\n- Have a nucleus\n- Found in plants, animals, fungi\n- Complex structure with organelles\n\n### Key Organelles\n- **Mitochondria** - powerhouse of the cell (ATP synthesis)\n- **Nucleus** - contains DNA, control center\n- **Ribosome** - protein synthesis\n- **Endoplasmic Reticulum** - protein/lipid transport",
    createdAt: "2026-01-20T10:00:00",
    updatedAt: "2026-02-01T14:30:00",
  },
  {
    id: "note-2",
    subjectId: "bio",
    title: "Photosynthesis Notes",
    content: "# Photosynthesis\n\n6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂\n\n## Two Stages\n\n### Light-Dependent Reactions\n- Occur in thylakoid membranes\n- Capture light energy\n- Produce ATP and NADPH\n- Split water molecules\n\n### Calvin Cycle (Light-Independent)\n- Occurs in stroma\n- Uses ATP and NADPH\n- Fixes CO₂ into glucose\n- Also called carbon fixation",
    createdAt: "2026-01-25T09:00:00",
    updatedAt: "2026-02-05T11:00:00",
  },
  {
    id: "note-3",
    subjectId: "math",
    title: "Calculus - Derivatives",
    content: "# Derivatives\n\nThe derivative measures the rate of change.\n\n## Power Rule\nd/dx [xⁿ] = n·xⁿ⁻¹\n\n## Common Derivatives\n- d/dx [sin x] = cos x\n- d/dx [cos x] = -sin x\n- d/dx [eˣ] = eˣ\n- d/dx [ln x] = 1/x\n\n## Chain Rule\nd/dx [f(g(x))] = f'(g(x)) · g'(x)\n\n## Product Rule\nd/dx [f·g] = f'g + fg'",
    createdAt: "2026-01-18T15:00:00",
    updatedAt: "2026-01-30T16:00:00",
  },
];

const DEFAULT_FRIENDS: Friend[] = [
  {
    id: "f1",
    name: "Aastha",
    username: "@aastha",
    avatarInitials: "AA",
    avatarGradient: "from-pink-500 to-rose-500",
    xp: 4200,
    streak: 21,
    isOnline: true,
    level: 9,
    status: "friend",
    sharedDecks: ["Organic Chemistry", "Calculus II"],
  },
  {
    id: "f2",
    name: "Parth",
    username: "@parth",
    avatarInitials: "PA",
    avatarGradient: "from-emerald-500 to-teal-500",
    xp: 3890,
    streak: 15,
    isOnline: true,
    level: 8,
    status: "friend",
    sharedDecks: ["World War II", "Renaissance Art"],
  },
  {
    id: "f3",
    name: "Sharvari",
    username: "@sharvari",
    avatarInitials: "SH",
    avatarGradient: "from-blue-500 to-indigo-500",
    xp: 5120,
    streak: 30,
    isOnline: false,
    level: 11,
    status: "friend",
    sharedDecks: ["Quantum Mechanics"],
  },
  {
    id: "f4",
    name: "Khushi",
    username: "@khushi",
    avatarInitials: "KH",
    avatarGradient: "from-violet-500 to-purple-500",
    xp: 2780,
    streak: 9,
    isOnline: true,
    level: 6,
    status: "pending",
    sharedDecks: [],
  },
];

const DEFAULT_SHARED: SharedItem[] = [
  {
    id: "sh1",
    fromFriendId: "f1",
    fromName: "Aastha",
    subjectName: "Organic Chemistry",
    subjectEmoji: "⚗️",
    cardCount: 32,
    sharedAt: "2026-03-01T09:00:00",
    message: "Hey! These chem cards really helped me ace the midterm 🔥",
    read: false,
  },
  {
    id: "sh2",
    fromFriendId: "f3",
    fromName: "Sharvari",
    subjectName: "Quantum Mechanics",
    subjectEmoji: "⚛️",
    cardCount: 45,
    sharedAt: "2026-02-28T14:00:00",
    message: "Compiled all the quantum stuff from lecture, hope it helps!",
    read: true,
  },
  {
    id: "sh3",
    fromFriendId: "f2",
    fromName: "Parth",
    subjectName: "World War II Timeline",
    subjectEmoji: "📜",
    cardCount: 18,
    sharedAt: "2026-02-25T11:00:00",
    message: "Timeline cards for the history exam 📚",
    read: true,
  },
];

const DEFAULT_USER: UserProfile = {
  name: "Adiyan Baig",
  username: "@adiyanbaig",
  avatarInitials: "AB",
  avatarGradient: "from-violet-500 to-indigo-600",
  bio: "🚀 Space explorer & knowledge collector. Physics + Math major. Obsessed with learning things the smart way.",
  xp: 3280,
  streak: 14,
  level: 7,
  isPublic: false,
  joinedAt: "2026-01-01",
  totalStudyHours: 142,
  rank: "Space Explorer",
};

// ── Context ────────────────────────────────────────────────

interface AppStore {
  user: UserProfile;
  subjects: Subject[];
  notes: Note[];
  friends: Friend[];
  sharedItems: SharedItem[];
  // Actions
  updateProfile: (updates: Partial<UserProfile>) => void;
  addSubject: (subject: Omit<Subject, "id" | "createdAt" | "retentionData" | "isPublic">) => void;
  updateSubject: (id: string, updates: Partial<Subject>) => void;
  deleteSubject: (id: string) => void;
  addNote: (note: Omit<Note, "id" | "createdAt" | "updatedAt">) => void;
  updateNote: (id: string, updates: Partial<Pick<Note, "title" | "content">>) => void;
  deleteNote: (id: string) => void;
  acceptFriend: (id: string) => void;
  markSharedRead: (id: string) => void;
}

const AppContext = createContext<AppStore>(null!);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile>(DEFAULT_USER);
  const [subjects, setSubjects] = useState<Subject[]>(DEFAULT_SUBJECTS);
  const [notes, setNotes] = useState<Note[]>(DEFAULT_NOTES);
  const [friends, setFriends] = useState<Friend[]>(DEFAULT_FRIENDS);
  const [sharedItems, setSharedItems] = useState<SharedItem[]>(DEFAULT_SHARED);

  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    setUser((u) => ({ ...u, ...updates }));
  }, []);

  const addSubject = useCallback((sub: Omit<Subject, "id" | "createdAt" | "retentionData" | "isPublic">) => {
    const id = sub.name.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now();
    const newSubject: Subject = {
      ...sub,
      id,
      createdAt: new Date().toISOString().split("T")[0],
      isPublic: false,
      retentionData: [
        { day: "Day 1", rate: 98, reviews: 1 },
        { day: "Day 3", rate: 78, reviews: 1 },
        { day: "Day 7", rate: 62, reviews: 1 },
        { day: "Day 14", rate: 68, reviews: 2 },
        { day: "Day 21", rate: 64, reviews: 2 },
        { day: "Day 30", rate: 74, reviews: 3 },
        { day: "Day 60", rate: 78, reviews: 4 },
      ],
    };
    setSubjects((prev) => [newSubject, ...prev]);
  }, []);

  const updateSubject = useCallback((id: string, updates: Partial<Subject>) => {
    setSubjects((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  }, []);

  const deleteSubject = useCallback((id: string) => {
    setSubjects((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const addNote = useCallback((note: Omit<Note, "id" | "createdAt" | "updatedAt">) => {
    const newNote: Note = {
      ...note,
      id: "note-" + Date.now(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setNotes((prev) => [...prev, newNote]);
  }, []);

  const updateNote = useCallback((id: string, updates: Partial<Pick<Note, "title" | "content">>) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, ...updates, updatedAt: new Date().toISOString() } : n))
    );
  }, []);

  const deleteNote = useCallback((id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const acceptFriend = useCallback((id: string) => {
    setFriends((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status: "friend" as const } : f))
    );
  }, []);

  const markSharedRead = useCallback((id: string) => {
    setSharedItems((prev) => prev.map((s) => (s.id === id ? { ...s, read: true } : s)));
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        subjects,
        notes,
        friends,
        sharedItems,
        updateProfile,
        addSubject,
        updateSubject,
        deleteSubject,
        addNote,
        updateNote,
        deleteNote,
        acceptFriend,
        markSharedRead,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}

// ── Planet helpers ─────────────────────────────────────────

export const PLANET_GRADIENTS: Record<PlanetColor, string> = {
  violet: "from-violet-400 via-purple-400 to-indigo-500",
  blue: "from-blue-400 via-sky-400 to-blue-500",
  pink: "from-pink-400 via-rose-400 to-fuchsia-500",
  cyan: "from-cyan-400 via-teal-400 to-sky-500",
  amber: "from-amber-400 via-yellow-400 to-orange-500",
  emerald: "from-emerald-400 via-teal-400 to-green-500",
  rose: "from-rose-400 via-pink-400 to-red-500",
};

export const PLANET_GLOW: Record<PlanetColor, string> = {
  violet: "rgba(139,92,246,0.5)",
  blue: "rgba(59,130,246,0.5)",
  pink: "rgba(236,72,153,0.5)",
  cyan: "rgba(6,182,212,0.5)",
  amber: "rgba(245,158,11,0.5)",
  emerald: "rgba(52,211,153,0.5)",
  rose: "rgba(244,63,94,0.5)",
};

export const PLANET_LINE: Record<PlanetColor, string> = {
  violet: "#8B5CF6",
  blue: "#3B82F6",
  pink: "#EC4899",
  cyan: "#06B6D4",
  amber: "#F59E0B",
  emerald: "#34D399",
  rose: "#F43F5E",
};
