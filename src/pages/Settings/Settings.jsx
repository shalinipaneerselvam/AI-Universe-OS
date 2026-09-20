import { useState, useEffect } from "react";

// ==========================================
// DEFAULT SETTINGS
// ==========================================

const defaultSettings = {
  workspaceName: "AI Universe OS",
  language: "English",
  notifications: true,
  autoSave: true,
  darkMode: false,
  defaultModel: "Gemini",
  responseStyle: "Balanced",
};

// ==========================================
// LOAD SAVED SETTINGS
// ==========================================

const loadSettings = () => {
  try {
    const saved = localStorage.getItem(
      "ai-universe-settings"
    );

    if (saved) {
      const parsedSettings = JSON.parse(saved);

      return {
        ...defaultSettings,
        ...parsedSettings,
      };
    }
  } catch (error) {
    console.error(
      "Failed to load settings:",
      error
    );
  }

  return defaultSettings;
};

// ==========================================
// APPLY DARK MODE
// ==========================================

const applyDarkMode = (enabled) => {
  if (enabled) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

// ==========================================
// SETTINGS PAGE
// ==========================================

export default function Settings() {
  const [settings, setSettings] =
    useState(loadSettings);

  const [saved, setSaved] = useState(false);

  // ========================================
  // APPLY SAVED DARK MODE
  // ========================================

  useEffect(() => {
    applyDarkMode(settings.darkMode);
  }, [settings.darkMode]);

  // ========================================
  // UPDATE SETTING
  // ========================================

  const updateSetting = (key, value) => {
    setSettings((previous) => {
      const updatedSettings = {
        ...previous,
        [key]: value,
      };

      // Save immediately
      try {
        localStorage.setItem(
          "ai-universe-settings",
          JSON.stringify(updatedSettings)
        );
      } catch (error) {
        console.error(
          "Failed to save setting:",
          error
        );
      }

      return updatedSettings;
    });

    // Apply dark mode immediately
    if (key === "darkMode") {
      applyDarkMode(value);
    }

    setSaved(false);
  };

  // ========================================
  // SAVE ALL SETTINGS
  // ========================================

  const handleSaveChanges = () => {
    try {
      localStorage.setItem(
        "ai-universe-settings",
        JSON.stringify(settings)
      );

      // Make sure dark mode is applied
      applyDarkMode(settings.darkMode);

      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 2000);
    } catch (error) {
      console.error(
        "Failed to save settings:",
        error
      );
    }
  };

  // ========================================
  // LANGUAGES
  // ========================================

  const languages = [
    "English",
    "Tamil",
    "Hindi",
    "Telugu",
    "Malayalam",
    "Kannada",
    "Bengali",
    "Marathi",
    "Gujarati",
    "Punjabi",
    "Urdu",
    "Odia",
    "Assamese",
    "Nepali",
    "Sanskrit",
    "Spanish",
    "French",
    "German",
    "Italian",
    "Portuguese",
    "Russian",
    "Dutch",
    "Polish",
    "Swedish",
    "Danish",
    "Norwegian",
    "Finnish",
    "Greek",
    "Czech",
    "Hungarian",
    "Romanian",
    "Ukrainian",
    "Chinese",
    "Japanese",
    "Korean",
    "Arabic",
    "Hebrew",
    "Thai",
    "Vietnamese",
    "Indonesian",
    "Malay",
    "Filipino",
    "Turkish",
    "Persian",
    "Swahili",
    "Afrikaans",
  ];

  // ========================================
  // UI
  // ========================================

  return (
    <div className="min-h-full bg-[#F1F2F4] text-[#25272B] dark:bg-[#171717] dark:text-[#F5F5F5]">

      {/* ====================================
          HEADER
      ==================================== */}

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#25272B] dark:text-white">
          Settings
        </h1>

        <p className="text-[#686B72] dark:text-[#A3A3A3] mt-2">
          Manage your AI Universe workspace
          preferences.
        </p>
      </div>

      {/* ====================================
          GENERAL SETTINGS
      ==================================== */}

      <div className="bg-white dark:bg-[#242424] border border-[#D9DADF] dark:border-[#3A3A3A] rounded-2xl p-6 shadow-sm mb-6">

        <h2 className="text-xl font-bold text-[#25272B] dark:text-white">
          General Settings
        </h2>

        <p className="text-sm text-[#686B72] dark:text-[#A3A3A3] mt-1 mb-6">
          Configure your workspace details.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* WORKSPACE NAME */}

          <div>
            <label className="block text-sm font-medium text-[#45474C] dark:text-[#D4D4D4] mb-2">
              Workspace Name
            </label>

            <input
              type="text"
              value={settings.workspaceName}
              onChange={(e) =>
                updateSetting(
                  "workspaceName",
                  e.target.value
                )
              }
              className="
                w-full
                px-4
                py-3
                bg-white
                dark:bg-[#242424]
                border
                border-[#D9DADF]
                dark:border-[#444444]
                rounded-xl
                outline-none
                text-[#25272B]
                dark:text-white
                placeholder:text-[#9A9CA2]
                focus:border-[#FF4B2B]
                focus:ring-4
                focus:ring-[#FFE4DE]
              "
            />
          </div>

          {/* LANGUAGE */}

          <div>
            <label className="block text-sm font-medium text-[#45474C] dark:text-[#D4D4D4] mb-2">
              Language
            </label>

            <select
              value={settings.language}
              onChange={(e) =>
                updateSetting(
                  "language",
                  e.target.value
                )
              }
              className="
                w-full
                px-4
                py-3
                bg-white
                dark:bg-[#242424]
                border
                border-[#D9DADF]
                dark:border-[#444444]
                rounded-xl
                outline-none
                text-[#25272B]
                dark:text-white
                focus:border-[#FF4B2B]
                focus:ring-4
                focus:ring-[#FFE4DE]
              "
            >
              {languages.map((language) => (
                <option
                  key={language}
                  value={language}
                >
                  {language}
                </option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* ====================================
          PREFERENCES
      ==================================== */}

      <div className="bg-white dark:bg-[#242424] border border-[#D9DADF] dark:border-[#3A3A3A] rounded-2xl p-6 shadow-sm mb-6">

        <h2 className="text-xl font-bold text-[#25272B] dark:text-white">
          Preferences
        </h2>

        <p className="text-sm text-[#686B72] dark:text-[#A3A3A3] mt-1 mb-6">
          Control how your workspace behaves.
        </p>

        <div className="space-y-6">

          {/* ==================================
              NOTIFICATIONS
          ================================== */}

          <div className="flex items-center justify-between gap-4">

            <div>
              <p className="text-sm font-semibold text-[#25272B] dark:text-white">
                Notifications
              </p>

              <p className="text-xs text-[#686B72] dark:text-[#A3A3A3] mt-1">
                Receive workspace notifications.
              </p>
            </div>

            <button
              type="button"
              aria-label="Toggle notifications"
              onClick={() =>
                updateSetting(
                  "notifications",
                  !settings.notifications
                )
              }
              className={`
                relative
                w-12
                h-6
                rounded-full
                transition-all
                duration-200
                ${
                  settings.notifications
                    ? "bg-[#FF4B2B]"
                    : "bg-[#D9DADF] dark:bg-[#555555]"
                }
              `}
            >
              <span
                className={`
                  absolute
                  top-1
                  w-4
                  h-4
                  bg-white
                  rounded-full
                  shadow-sm
                  transition-all
                  duration-200
                  ${
                    settings.notifications
                      ? "left-7"
                      : "left-1"
                  }
                `}
              />
            </button>

          </div>

          {/* ==================================
              AUTO SAVE
          ================================== */}

          <div className="flex items-center justify-between gap-4">

            <div>
              <p className="text-sm font-semibold text-[#25272B] dark:text-white">
                Auto Save
              </p>

              <p className="text-xs text-[#686B72] dark:text-[#A3A3A3] mt-1">
                Automatically save workspace changes.
              </p>
            </div>

            <button
              type="button"
              aria-label="Toggle auto save"
              onClick={() =>
                updateSetting(
                  "autoSave",
                  !settings.autoSave
                )
              }
              className={`
                relative
                w-12
                h-6
                rounded-full
                transition-all
                duration-200
                ${
                  settings.autoSave
                    ? "bg-[#FF4B2B]"
                    : "bg-[#D9DADF] dark:bg-[#555555]"
                }
              `}
            >
              <span
                className={`
                  absolute
                  top-1
                  w-4
                  h-4
                  bg-white
                  rounded-full
                  shadow-sm
                  transition-all
                  duration-200
                  ${
                    settings.autoSave
                      ? "left-7"
                      : "left-1"
                  }
                `}
              />
            </button>

          </div>

          {/* ==================================
              DARK MODE
          ================================== */}

          <div className="flex items-center justify-between gap-4">

            <div>
              <p className="text-sm font-semibold text-[#25272B] dark:text-white">
                Dark Mode
              </p>

              <p className="text-xs text-[#686B72] dark:text-[#A3A3A3] mt-1">
                Enable dark appearance.
              </p>
            </div>

            <button
              type="button"
              aria-label="Toggle dark mode"
              onClick={() =>
                updateSetting(
                  "darkMode",
                  !settings.darkMode
                )
              }
              className={`
                relative
                w-12
                h-6
                rounded-full
                transition-all
                duration-200
                ${
                  settings.darkMode
                    ? "bg-[#FF4B2B]"
                    : "bg-[#D9DADF] dark:bg-[#555555]"
                }
              `}
            >
              <span
                className={`
                  absolute
                  top-1
                  w-4
                  h-4
                  bg-white
                  rounded-full
                  shadow-sm
                  transition-all
                  duration-200
                  ${
                    settings.darkMode
                      ? "left-7"
                      : "left-1"
                  }
                `}
              />
            </button>

          </div>

        </div>
      </div>

      {/* ====================================
          AI CONFIGURATION
      ==================================== */}

      <div className="bg-white dark:bg-[#242424] border border-[#D9DADF] dark:border-[#3A3A3A] rounded-2xl p-6 shadow-sm mb-6">

        <h2 className="text-xl font-bold text-[#25272B] dark:text-white">
          AI Configuration
        </h2>

        <p className="text-sm text-[#686B72] dark:text-[#A3A3A3] mt-1 mb-6">
          Configure your default AI behavior.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* DEFAULT AI MODEL */}

          <div>
            <label className="block text-sm font-medium text-[#45474C] dark:text-[#D4D4D4] mb-2">
              Default AI Model
            </label>

            <select
              value={settings.defaultModel}
              onChange={(e) =>
                updateSetting(
                  "defaultModel",
                  e.target.value
                )
              }
              className="
                w-full
                px-4
                py-3
                bg-white
                dark:bg-[#242424]
                border
                border-[#D9DADF]
                dark:border-[#444444]
                rounded-xl
                outline-none
                text-[#25272B]
                dark:text-white
                focus:border-[#FF4B2B]
                focus:ring-4
                focus:ring-[#FFE4DE]
              "
            >
              <option value="Gemini">
                Gemini
              </option>

              <option value="GPT-5">
                GPT-5
              </option>

              <option value="Claude">
                Claude
              </option>

              <option value="DeepSeek">
                DeepSeek
              </option>
            </select>
          </div>

          {/* RESPONSE STYLE */}

          <div>
            <label className="block text-sm font-medium text-[#45474C] dark:text-[#D4D4D4] mb-2">
              Response Style
            </label>

            <select
              value={settings.responseStyle}
              onChange={(e) =>
                updateSetting(
                  "responseStyle",
                  e.target.value
                )
              }
              className="
                w-full
                px-4
                py-3
                bg-white
                dark:bg-[#242424]
                border
                border-[#D9DADF]
                dark:border-[#444444]
                rounded-xl
                outline-none
                text-[#25272B]
                dark:text-white
                focus:border-[#FF4B2B]
                focus:ring-4
                focus:ring-[#FFE4DE]
              "
            >
              <option value="Concise">
                Concise
              </option>

              <option value="Balanced">
                Balanced
              </option>

              <option value="Detailed">
                Detailed
              </option>
            </select>
          </div>

        </div>
      </div>

      {/* ====================================
          SAVE BUTTON
      ==================================== */}

      <div className="flex justify-end pb-8">

        <button
          type="button"
          onClick={handleSaveChanges}
          className="
            px-6
            py-3
            bg-[#252525]
            hover:bg-[#111111]
            text-white
            rounded-xl
            font-semibold
            transition-all
            duration-200
          "
        >
          {saved
            ? "✓ Changes Saved"
            : "Save Changes"}
        </button>

      </div>

    </div>
  );
}