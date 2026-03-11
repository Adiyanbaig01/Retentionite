import { useState, useCallback, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Plus, X, BookOpen, ChevronLeft, Save, Trash2, MoreHorizontal,
  FileText, Clock, Search, Bold, Italic, List, Hash, Code,
  AlignLeft, ChevronRight, Eye, EyeOff,
} from "lucide-react";
import { useApp, PLANET_LINE, type Subject, type Note } from "../store";
import { useTheme } from "./ThemeContext";

interface OpenTab {
  noteId: string | null; // null = "new" unsaved tab
  tempTitle?: string;
  tempContent?: string;
  isDirty: boolean;
}

function formatRelativeTime(iso: string) {
  const now = new Date();
  const date = new Date(iso);
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

// Simple inline markdown: **bold**, *italic*, `code`
function renderInline(text: string, T: any): React.ReactNode[] {
  const segments: React.ReactNode[] = [];
  const regex = /(\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) segments.push(<span key={key++}>{text.slice(last, match.index)}</span>);
    if (match[2]) segments.push(<strong key={key++} style={{ color: T.textPrimary, fontWeight: 700 }}>{match[2]}</strong>);
    else if (match[3]) segments.push(<em key={key++} style={{ color: T.textSecondary }}>{match[3]}</em>);
    else if (match[4]) segments.push(
      <code key={key++} style={{ background: T.inputBg, color: T.primaryColor, padding: "1px 6px", borderRadius: 4, fontSize: "0.875em", fontFamily: "monospace" }}>
        {match[4]}
      </code>
    );
    last = match.index + match[0].length;
  }
  if (last < text.length) segments.push(<span key={key++}>{text.slice(last)}</span>);
  return segments;
}

export function Notes() {
  const { subjectId } = useParams<{ subjectId?: string }>();
  const { subjects, notes, addNote, updateNote, deleteNote } = useApp();
  const { T } = useTheme();

  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(
    subjectId || subjects[0]?.id || ""
  );
  const [openTabs, setOpenTabs] = useState<OpenTab[]>([]);
  const [activeTabIdx, setActiveTabIdx] = useState<number>(-1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const selectedSubject = subjects.find((s) => s.id === selectedSubjectId);
  const subjectNotes = notes.filter((n) => n.subjectId === selectedSubjectId);
  const filteredNotes = subjectNotes.filter(
    (n) =>
      searchQuery === "" ||
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Open a note in a new tab
  const openNote = useCallback((note: Note) => {
    const existingIdx = openTabs.findIndex((t) => t.noteId === note.id);
    if (existingIdx !== -1) {
      setActiveTabIdx(existingIdx);
      return;
    }
    const newTab: OpenTab = { noteId: note.id, isDirty: false };
    setOpenTabs((prev) => [...prev, newTab]);
    setActiveTabIdx(openTabs.length);
  }, [openTabs]);

  // Open a new blank tab
  const openNewTab = useCallback(() => {
    const newTab: OpenTab = {
      noteId: null,
      tempTitle: "Untitled Note",
      tempContent: "",
      isDirty: true,
    };
    setOpenTabs((prev) => [...prev, newTab]);
    setActiveTabIdx(openTabs.length);
  }, [openTabs.length]);

  // Close a tab
  const closeTab = useCallback((idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenTabs((prev) => {
      const next = prev.filter((_, i) => i !== idx);
      return next;
    });
    setActiveTabIdx((prev) => {
      if (prev === idx) return Math.max(0, idx - 1);
      if (prev > idx) return prev - 1;
      return prev;
    });
  }, []);

  // Get current note data for active tab
  const activeTab = openTabs[activeTabIdx];
  const activeNote = activeTab?.noteId ? notes.find((n) => n.id === activeTab.noteId) : null;
  const currentTitle = activeTab?.noteId ? (activeNote?.title || "") : (activeTab?.tempTitle || "");
  const currentContent = activeTab?.noteId ? (activeNote?.content || "") : (activeTab?.tempContent || "");

  // Update title in tab
  const updateTitle = (value: string) => {
    if (!activeTab) return;
    if (activeTab.noteId) {
      updateNote(activeTab.noteId, { title: value });
    } else {
      setOpenTabs((prev) =>
        prev.map((t, i) => (i === activeTabIdx ? { ...t, tempTitle: value, isDirty: true } : t))
      );
    }
  };

  // Update content with auto-save
  const updateContent = (value: string) => {
    if (!activeTab) return;
    if (activeTab.noteId) {
      setOpenTabs((prev) =>
        prev.map((t, i) => (i === activeTabIdx ? { ...t, isDirty: true } : t))
      );
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
      saveTimeoutRef.current = setTimeout(() => {
        updateNote(activeTab.noteId!, { content: value });
        setOpenTabs((prev) =>
          prev.map((t, i) => (i === activeTabIdx ? { ...t, isDirty: false } : t))
        );
      }, 800);
    } else {
      setOpenTabs((prev) =>
        prev.map((t, i) => (i === activeTabIdx ? { ...t, tempContent: value, isDirty: true } : t))
      );
    }
  };

  // Save new note
  const saveNewNote = () => {
    if (!activeTab || activeTab.noteId) return;
    const title = activeTab.tempTitle || "Untitled Note";
    const content = activeTab.tempContent || "";
    addNote({ subjectId: selectedSubjectId, title, content });
    setOpenTabs((prev) => prev.filter((_, i) => i !== activeTabIdx));
    setActiveTabIdx(Math.max(0, activeTabIdx - 1));
  };

  // Delete note
  const handleDeleteNote = (noteId: string) => {
    deleteNote(noteId);
    const tabIdx = openTabs.findIndex((t) => t.noteId === noteId);
    if (tabIdx !== -1) {
      closeTab(tabIdx, { stopPropagation: () => {} } as any);
    }
  };

  // Insert markdown formatting
  const insertFormatting = (before: string, after: string = "") => {
    if (!contentRef.current) return;
    const el = contentRef.current;
    const start = el.selectionStart;
    const end = el.selectionEnd;
    const selected = el.value.substring(start, end);
    const newText = el.value.substring(0, start) + before + selected + after + el.value.substring(end);
    updateContent(newText);
    setTimeout(() => {
      el.focus();
      el.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  // Change subject and reset tabs
  const changeSubject = (id: string) => {
    setSelectedSubjectId(id);
    setOpenTabs([]);
    setActiveTabIdx(-1);
  };

  const wordCount = currentContent.trim() ? currentContent.trim().split(/\s+/).length : 0;
  const lineCount = currentContent ? currentContent.split("\n").length : 0;

  return (
    <div className="flex h-full">
      {/* Left Sidebar */}
      <div
        className="flex-shrink-0 flex flex-col"
        style={{
          width: sidebarCollapsed ? 48 : 260,
          background: T.sidebarBg,
          borderRight: `1px solid ${T.sidebarBorder}`,
          backdropFilter: T.showSpaceBg ? "blur(20px)" : "none",
          transition: "width 0.2s ease",
          overflow: "hidden",
        }}
      >
        {sidebarCollapsed ? (
          <div className="flex flex-col items-center pt-4 gap-3">
            <button
              onClick={() => setSidebarCollapsed(false)}
              className="w-8 h-8 rounded-xl flex items-center justify-center transition-all"
              style={{ background: T.inputBg, color: T.textMuted }}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <>
            {/* Sidebar Header */}
            <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: `1px solid ${T.dividerColor}` }}>
              <span className="text-sm" style={{ fontWeight: 700, color: T.textPrimary }}>
                📝 Notes
              </span>
              <button
                onClick={() => setSidebarCollapsed(true)}
                className="w-6 h-6 rounded-lg flex items-center justify-center"
                style={{ color: T.textMuted }}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>

            {/* Subject selector */}
            <div className="px-3 py-3" style={{ borderBottom: `1px solid ${T.dividerColor}` }}>
              <div className="text-xs mb-2 px-1" style={{ color: T.sectionLabelColor, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                Subject
              </div>
              <div className="space-y-0.5 max-h-48 overflow-y-auto space-scroll">
                {subjects.map((s) => {
                  const isSelected = s.id === selectedSubjectId;
                  const colors: Record<string, [string, string]> = {
                    violet: ["#A78BFA", "#6366F1"], blue: ["#60A5FA", "#3B82F6"],
                    pink: ["#F472B6", "#D946EF"], cyan: ["#22D3EE", "#0EA5E9"],
                    amber: ["#FBBF24", "#F97316"], emerald: ["#34D399", "#22C55E"],
                    rose: ["#FB7185", "#F43F5E"],
                  };
                  const [c1] = colors[s.planet] || ["#8B5CF6", "#6366F1"];
                  return (
                    <button
                      key={s.id}
                      onClick={() => changeSubject(s.id)}
                      className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl transition-all text-left"
                      style={{
                        background: isSelected ? T.navActiveBg : "transparent",
                        border: isSelected ? `1px solid ${T.navActiveBorder}` : "1px solid transparent",
                      }}
                    >
                      <div
                        className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0"
                        style={{ background: `${c1}25`, border: `1px solid ${c1}40` }}
                      >
                        <span style={{ fontSize: "0.7rem" }}>{s.emoji}</span>
                      </div>
                      <span
                        className="text-sm truncate flex-1"
                        style={{ color: isSelected ? T.navActiveText : T.navInactiveText, fontWeight: isSelected ? 600 : 400 }}
                      >
                        {s.name}
                      </span>
                      <span className="text-xs" style={{ color: T.textMuted, flexShrink: 0 }}>
                        {notes.filter((n) => n.subjectId === s.id).length}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Notes search + list */}
            <div className="flex-1 flex flex-col overflow-hidden px-3 py-3">
              <div className="relative mb-3">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: T.textMuted }} />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search notes..."
                  className="w-full pl-8 pr-3 py-2 rounded-xl text-xs outline-none"
                  style={{ background: T.inputBg, border: `1px solid ${T.inputBorder}`, color: T.inputText, fontFamily: "'Space Grotesk', sans-serif" }}
                />
              </div>

              <button
                onClick={openNewTab}
                className="w-full flex items-center gap-2 py-2 px-3 rounded-xl mb-3 text-sm transition-all"
                style={{
                  background: T.primaryLight,
                  border: `1px solid ${T.primaryBorder}`,
                  color: T.primaryColor,
                  fontWeight: 600,
                }}
              >
                <Plus className="w-4 h-4" />
                New Note
              </button>

              <div className="flex-1 overflow-y-auto space-scroll space-y-1">
                {filteredNotes.length === 0 && (
                  <div className="text-center py-8">
                    <FileText className="w-8 h-8 mx-auto mb-2" style={{ color: T.textMuted }} />
                    <p className="text-xs" style={{ color: T.textMuted }}>
                      No notes yet. Create your first note!
                    </p>
                  </div>
                )}
                {filteredNotes.map((note) => {
                  const isOpen = openTabs.some((t) => t.noteId === note.id);
                  const isActive = openTabs[activeTabIdx]?.noteId === note.id;
                  const preview = note.content.replace(/[#*`\n]/g, " ").substring(0, 60);
                  return (
                    <button
                      key={note.id}
                      onClick={() => openNote(note)}
                      className="w-full text-left p-2.5 rounded-xl transition-all group"
                      style={{
                        background: isActive ? T.navActiveBg : isOpen ? T.inputBg : "transparent",
                        border: isActive ? `1px solid ${T.navActiveBorder}` : "1px solid transparent",
                      }}
                    >
                      <div className="flex items-start justify-between gap-1 mb-0.5">
                        <span
                          className="text-sm truncate flex-1"
                          style={{ color: isActive ? T.navActiveText : T.textPrimary, fontWeight: isActive ? 600 : 400 }}
                        >
                          {note.title}
                        </span>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleDeleteNote(note.id); }}
                          className="opacity-0 group-hover:opacity-100 w-5 h-5 rounded flex items-center justify-center transition-all flex-shrink-0"
                          style={{ color: T.textMuted }}
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="text-xs truncate" style={{ color: T.textMuted }}>
                        {preview || "Empty note"}
                      </p>
                      <span className="text-xs mt-1 block" style={{ color: T.textMuted, opacity: 0.6 }}>
                        {formatRelativeTime(note.updatedAt)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Chrome-style Tab Bar */}
        <div
          className="flex-shrink-0 flex items-end gap-0"
          style={{
            background: T.headerBg,
            borderBottom: `1px solid ${T.headerBorder}`,
            paddingLeft: "8px",
            paddingRight: "8px",
            paddingTop: "8px",
            minHeight: "44px",
          }}
        >
          <div className="flex items-end gap-0.5 flex-1 overflow-x-auto tabs-scroll">
            {openTabs.length === 0 && (
              <div className="flex items-center px-4 py-2 text-xs" style={{ color: T.textMuted }}>
                Open a note or create a new one →
              </div>
            )}
            {openTabs.map((tab, idx) => {
              const note = tab.noteId ? notes.find((n) => n.id === tab.noteId) : null;
              const title = note?.title || tab.tempTitle || "Untitled";
              const isActive = idx === activeTabIdx;
              const isDirty = tab.isDirty;

              return (
                <div
                  key={idx}
                  onClick={() => setActiveTabIdx(idx)}
                  className="flex items-center gap-2 cursor-pointer flex-shrink-0 relative"
                  style={{
                    background: isActive ? T.cardBg : "transparent",
                    borderTopLeftRadius: "8px",
                    borderTopRightRadius: "8px",
                    borderTop: isActive ? `1px solid ${T.cardBorder}` : "1px solid transparent",
                    borderLeft: isActive ? `1px solid ${T.cardBorder}` : "1px solid transparent",
                    borderRight: isActive ? `1px solid ${T.cardBorder}` : "1px solid transparent",
                    borderBottom: isActive ? `1px solid ${T.cardBg}` : "1px solid transparent",
                    marginBottom: isActive ? "-1px" : "0",
                    padding: "6px 12px",
                    maxWidth: 180,
                    minWidth: 80,
                  }}
                >
                  <FileText className="w-3.5 h-3.5 flex-shrink-0" style={{ color: isActive ? T.primaryColor : T.textMuted }} />
                  <span
                    className="text-xs truncate flex-1"
                    style={{ color: isActive ? T.textPrimary : T.textMuted, fontWeight: isActive ? 500 : 400 }}
                  >
                    {title}
                  </span>
                  {isDirty && (
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: T.primaryColor }} />
                  )}
                  <button
                    onClick={(e) => closeTab(idx, e)}
                    className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 transition-all opacity-40 hover:opacity-100"
                    style={{ color: T.textMuted }}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              );
            })}
          </div>

          <button
            onClick={openNewTab}
            className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mb-1 ml-1 transition-all"
            style={{ background: T.inputBg, border: `1px solid ${T.inputBorder}`, color: T.textMuted }}
            title="New Note (Ctrl+T)"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Toolbar */}
        {activeTabIdx >= 0 && openTabs[activeTabIdx] && (
          <div
            className="flex-shrink-0 flex items-center gap-1 px-4 py-2"
            style={{ background: T.headerBg, borderBottom: `1px solid ${T.dividerColor}` }}
          >
            {[
              { icon: <Bold className="w-3.5 h-3.5" />, label: "Bold", action: () => insertFormatting("**", "**") },
              { icon: <Italic className="w-3.5 h-3.5" />, label: "Italic", action: () => insertFormatting("*", "*") },
              { icon: <Hash className="w-3.5 h-3.5" />, label: "Heading", action: () => insertFormatting("# ") },
              { icon: <List className="w-3.5 h-3.5" />, label: "List", action: () => insertFormatting("- ") },
              { icon: <Code className="w-3.5 h-3.5" />, label: "Code", action: () => insertFormatting("`", "`") },
              { icon: <AlignLeft className="w-3.5 h-3.5" />, label: "Quote", action: () => insertFormatting("> ") },
            ].map((tool) => (
              <button
                key={tool.label}
                onClick={tool.action}
                className="w-7 h-7 rounded-lg flex items-center justify-center transition-all"
                style={{ color: T.textMuted, background: T.inputBg }}
                title={tool.label}
              >
                {tool.icon}
              </button>
            ))}

            <div className="mx-2 h-4 w-px" style={{ background: T.dividerColor }} />

            {/* Preview Toggle */}
            <button
              onClick={() => setPreviewMode((v) => !v)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all"
              style={{
                background: previewMode ? T.navActiveBg : T.inputBg,
                border: previewMode ? `1px solid ${T.navActiveBorder}` : `1px solid ${T.inputBorder}`,
                color: previewMode ? T.navActiveText : T.textMuted,
                fontWeight: previewMode ? 600 : 400,
              }}
              title="Toggle markdown preview"
            >
              {previewMode ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              {previewMode ? "Edit" : "Preview"}
            </button>

            <div className="mx-2 h-4 w-px" style={{ background: T.dividerColor }} />

            {/* Subject info */}
            {selectedSubject && (
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-xs" style={{ color: T.textMuted }}>
                  {selectedSubject.emoji} {selectedSubject.name}
                </span>
                <div className="h-3 w-px" style={{ background: T.dividerColor }} />
                <span className="text-xs" style={{ color: T.textMuted }}>
                  {wordCount} words · {lineCount} lines
                </span>

                {openTabs[activeTabIdx]?.noteId === null && (
                  <button
                    onClick={saveNewNote}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs ml-2 transition-all"
                    style={{
                      background: T.primaryLight,
                      border: `1px solid ${T.primaryBorder}`,
                      color: T.primaryColor,
                      fontWeight: 600,
                    }}
                  >
                    <Save className="w-3 h-3" />
                    Save Note
                  </button>
                )}

                {openTabs[activeTabIdx]?.isDirty && openTabs[activeTabIdx]?.noteId && (
                  <span className="text-xs" style={{ color: T.textMuted }}>
                    <Clock className="w-3 h-3 inline mr-1" />
                    Auto-saving...
                  </span>
                )}
              </div>
            )}
          </div>
        )}

        {/* Editor / Empty state */}
        {openTabs.length === 0 || activeTabIdx < 0 ? (
          <div className="flex-1 flex items-center justify-center" style={{ background: T.showSpaceBg ? "transparent" : T.appBg }}>
            <div className="text-center max-w-sm">
              <div
                className="w-20 h-20 rounded-2xl mx-auto mb-5 flex items-center justify-center"
                style={{ background: T.primaryLight, border: `1px solid ${T.primaryBorder}`, boxShadow: `0 0 30px ${T.primaryGlow}` }}
              >
                <BookOpen className="w-9 h-9" style={{ color: T.primaryColor }} />
              </div>
              <h3 className="mb-2" style={{ fontWeight: 700, fontSize: "1.125rem", color: T.textPrimary }}>
                Your study notes live here
              </h3>
              <p className="text-sm mb-5" style={{ color: T.textMuted }}>
                Select a note from the sidebar or create a new one. Each tab is a separate note — just like browser tabs.
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={openNewTab}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm"
                  style={{ background: T.primaryBg, color: T.textOnPrimary, fontWeight: 600, boxShadow: `0 4px 14px ${T.primaryGlow}` }}
                >
                  <Plus className="w-4 h-4" />
                  New Note
                </button>
                {subjectNotes.length > 0 && (
                  <button
                    onClick={() => openNote(subjectNotes[0])}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm"
                    style={{ background: T.inputBg, border: `1px solid ${T.inputBorder}`, color: T.textSecondary }}
                  >
                    Open Recent
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col overflow-hidden" style={{ background: T.showSpaceBg ? "transparent" : T.appBg }}>
            {/* Title input */}
            <div className="px-8 pt-6 pb-2">
              <input
                value={currentTitle}
                onChange={(e) => updateTitle(e.target.value)}
                placeholder="Note title..."
                className="w-full outline-none bg-transparent"
                style={{
                  fontSize: "1.625rem",
                  fontWeight: 800,
                  letterSpacing: "-0.5px",
                  fontFamily: "'Space Grotesk', sans-serif",
                  caretColor: T.primaryColor,
                  color: T.textPrimary,
                }}
              />
              {activeNote && (
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs" style={{ color: T.textMuted }}>
                    Last edited {formatRelativeTime(activeNote.updatedAt)}
                  </span>
                  {selectedSubject && (
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        background: `${PLANET_LINE[selectedSubject.planet]}20`,
                        color: PLANET_LINE[selectedSubject.planet],
                        border: `1px solid ${PLANET_LINE[selectedSubject.planet]}30`,
                        fontWeight: 500,
                      }}
                    >
                      {selectedSubject.emoji} {selectedSubject.name}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Divider */}
            <div className="mx-8 my-2" style={{ height: "1px", background: T.dividerColor }} />

            {/* Content */}
            <div className="flex-1 overflow-y-auto space-scroll px-8 pb-8">
              {previewMode ? (
                /* Markdown Preview */
                <div
                  style={{
                    color: T.textSecondary,
                    fontSize: "0.9375rem",
                    lineHeight: 1.8,
                    fontFamily: "'Space Grotesk', sans-serif",
                    minHeight: "400px",
                  }}
                >
                  {currentContent ? (
                    <div>
                      {currentContent.split("\n").map((line, i) => {
                        if (line.startsWith("### ")) return (
                          <h3 key={i} style={{ color: T.textPrimary, fontWeight: 700, fontSize: "1rem", marginTop: "1.25rem", marginBottom: "0.5rem" }}>
                            {line.replace("### ", "")}
                          </h3>
                        );
                        if (line.startsWith("## ")) return (
                          <h2 key={i} style={{ color: T.textPrimary, fontWeight: 700, fontSize: "1.125rem", marginTop: "1.5rem", marginBottom: "0.5rem" }}>
                            {line.replace("## ", "")}
                          </h2>
                        );
                        if (line.startsWith("# ")) return (
                          <h1 key={i} style={{ color: T.textPrimary, fontWeight: 800, fontSize: "1.375rem", marginTop: "1.75rem", marginBottom: "0.75rem", letterSpacing: "-0.3px" }}>
                            {line.replace("# ", "")}
                          </h1>
                        );
                        if (line.startsWith("- ")) return (
                          <div key={i} className="flex gap-2 my-0.5">
                            <span style={{ color: T.primaryColor, flexShrink: 0 }}>•</span>
                            <span>{renderInline(line.slice(2), T)}</span>
                          </div>
                        );
                        if (line.startsWith("> ")) return (
                          <div
                            key={i}
                            className="my-1 px-3 py-1 rounded-lg"
                            style={{ borderLeft: `3px solid ${T.primaryColor}`, background: T.primaryLight, color: T.textSecondary, fontStyle: "italic" }}
                          >
                            {line.slice(2)}
                          </div>
                        );
                        if (line.startsWith("---")) return (
                          <hr key={i} style={{ border: "none", borderTop: `1px solid ${T.dividerColor}`, margin: "1rem 0" }} />
                        );
                        if (line.trim() === "") return <div key={i} style={{ height: "0.5rem" }} />;
                        return <p key={i} className="my-0.5">{renderInline(line, T)}</p>;
                      })}
                    </div>
                  ) : (
                    <p style={{ color: T.textMuted, fontStyle: "italic" }}>Nothing to preview yet. Start writing in edit mode!</p>
                  )}
                </div>
              ) : (
                <textarea
                  ref={contentRef}
                  value={currentContent}
                  onChange={(e) => updateContent(e.target.value)}
                  placeholder={`Start writing your ${selectedSubject?.name || ""} notes here...\n\nTips:\n# Heading 1\n## Heading 2\n**bold** *italic*\n- bullet point\n> blockquote\n\`inline code\``}
                  className="w-full h-full outline-none bg-transparent resize-none note-editor"
                  style={{
                    color: T.textSecondary,
                    fontSize: "0.9375rem",
                    lineHeight: 1.8,
                    fontFamily: "'Space Grotesk', sans-serif",
                    minHeight: "400px",
                    caretColor: T.primaryColor,
                  }}
                />
              )}
            </div>
          </div>
        )}
      </div>

      {/* Right panel */}
      {selectedSubject && (
        <div
          className="flex-shrink-0 w-56"
          style={{
            background: T.sidebarBg,
            borderLeft: `1px solid ${T.sidebarBorder}`,
            backdropFilter: T.showSpaceBg ? "blur(16px)" : "none",
          }}
        >
          <div className="p-4">
            <h3 className="text-sm mb-3" style={{ fontWeight: 700, color: T.textPrimary }}>
              {selectedSubject.emoji} {selectedSubject.name}
            </h3>

            <div className="space-y-2 mb-4">
              {[
                { label: "Total Notes", val: subjectNotes.length },
                { label: "Open Tabs", val: openTabs.length },
                { label: "Cards", val: selectedSubject.cards },
                { label: "Mastered", val: selectedSubject.mastered },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: T.textMuted }}>{s.label}</span>
                  <span className="text-xs" style={{ fontWeight: 600, color: T.textPrimary }}>{s.val}</span>
                </div>
              ))}
            </div>

            {/* Progress */}
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="text-xs" style={{ color: T.textMuted }}>Mastery</span>
                <span className="text-xs" style={{ color: PLANET_LINE[selectedSubject.planet], fontWeight: 600 }}>{selectedSubject.progress}%</span>
              </div>
              <div className="w-full rounded-full h-1.5" style={{ background: T.xpBarBg }}>
                <div
                  className="h-1.5 rounded-full transition-all"
                  style={{ width: `${selectedSubject.progress}%`, background: PLANET_LINE[selectedSubject.planet] }}
                />
              </div>
            </div>

            {/* Recent notes */}
            <div>
              <div className="text-xs mb-2" style={{ color: T.sectionLabelColor, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                Recent
              </div>
              <div className="space-y-1.5">
                {subjectNotes.slice(0, 5).map((n) => (
                  <button
                    key={n.id}
                    onClick={() => openNote(n)}
                    className="w-full text-left px-2.5 py-2 rounded-xl transition-all group"
                    style={{ background: T.inputBg, border: `1px solid ${T.inputBorder}` }}
                  >
                    <div className="text-xs truncate" style={{ color: T.textPrimary, fontWeight: 500 }}>
                      {n.title}
                    </div>
                    <div className="text-xs mt-0.5" style={{ color: T.textMuted }}>
                      {formatRelativeTime(n.updatedAt)}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 space-y-2">
              <Link
                to="/flashcards"
                className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs transition-all"
                style={{
                  background: T.primaryLight,
                  border: `1px solid ${T.primaryBorder}`,
                  color: T.primaryColor,
                  fontWeight: 600,
                }}
              >
                <ChevronRight className="w-3.5 h-3.5" />
                Study Flashcards
              </Link>
              <Link
                to="/analytics"
                className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs transition-all"
                style={{
                  background: T.inputBg,
                  border: `1px solid ${T.inputBorder}`,
                  color: T.textSecondary,
                }}
              >
                <MoreHorizontal className="w-3.5 h-3.5" />
                View Analytics
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
