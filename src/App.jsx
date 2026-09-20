import { useEffect } from "react";
import AppRoutes from "./routes/AppRoutes";

function App() {
  // ==========================================
  // APPLY SAVED DARK MODE
  // ==========================================

  useEffect(() => {
    try {
      const savedSettings =
        localStorage.getItem(
          "ai-universe-settings"
        );

      if (!savedSettings) return;

      const settings =
        JSON.parse(savedSettings);

      if (settings.darkMode) {
        document.documentElement.classList.add(
          "dark"
        );
      } else {
        document.documentElement.classList.remove(
          "dark"
        );
      }
    } catch (error) {
      console.error(
        "Failed to apply theme:",
        error
      );
    }
  }, []);

  return <AppRoutes />;
}

export default App;