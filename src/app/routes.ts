import { createBrowserRouter } from "react-router-dom-dom";
import { Root } from "./Root";
import { LandingPage } from "./components/LandingPage";
import { Dashboard } from "./components/Dashboard";
import { FlashcardGenerator } from "./components/FlashcardGenerator";
import { FocusMode } from "./components/FocusMode";
import { Analytics } from "./components/Analytics";
import { StudyCalendar } from "./components/StudyCalendar";
import { Settings } from "./components/Settings";
import { Profile } from "./components/Profile";
import { Notes } from "./components/Notes";
import { Leaderboard } from "./components/Leaderboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: LandingPage },
      { path: "dashboard", Component: Dashboard },
      { path: "flashcards", Component: FlashcardGenerator },
      { path: "focus", Component: FocusMode },
      { path: "analytics", Component: Analytics },
      { path: "calendar", Component: StudyCalendar },
      { path: "settings", Component: Settings },
      { path: "profile", Component: Profile },
      { path: "notes", Component: Notes },
      { path: "notes/:subjectId", Component: Notes },
      { path: "leaderboard", Component: Leaderboard },
    ],
  },
]);
