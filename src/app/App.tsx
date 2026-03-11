import { RouterProvider } from "react-router-dom-dom";
import { router } from "./routes";
import { AppProvider } from "./store";
import { ThemeProvider } from "./components/ThemeContext";

export default function App() {
  return (
    <AppProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AppProvider>
  );
}
