import { useEffect, useState } from "react";

// ==========================================
// ADD RECENT ACTIVITY
// ==========================================

const addActivity = (title) => {
  try {
    const savedActivities = localStorage.getItem(
      "ai-universe-activities"
    );

    const activities = savedActivities
      ? JSON.parse(savedActivities)
      : [];

    const newActivity = {
      id: Date.now(),
      title: title,
      createdAt: Date.now(),
    };

    const updatedActivities = [
      newActivity,
      ...activities,
    ].slice(0, 20);

    localStorage.setItem(
      "ai-universe-activities",
      JSON.stringify(updatedActivities)
    );

    window.dispatchEvent(new Event("storage"));
  } catch (error) {
    console.error(
      "Failed to save activity:",
      error
    );
  }
};

// ==========================================
// PROJECTS
// ==========================================

export default function Projects() {
  const [projects, setProjects] = useState(() => {
    try {
      const savedProjects = localStorage.getItem(
        "ai-universe-projects"
      );

      return savedProjects
        ? JSON.parse(savedProjects)
        : [];
    } catch (error) {
      console.error(
        "Failed to load projects:",
        error
      );

      return [];
    }
  });

  // ==========================================
  // FORM
  // ==========================================

  const [showForm, setShowForm] =
    useState(false);

  const [projectName, setProjectName] =
    useState("");

  const [projectDescription, setProjectDescription] =
    useState("");

  // ==========================================
  // SAVE PROJECTS
  // ==========================================

  useEffect(() => {
    try {
      localStorage.setItem(
        "ai-universe-projects",
        JSON.stringify(projects)
      );
    } catch (error) {
      console.error(
        "Failed to save projects:",
        error
      );
    }
  }, [projects]);

  // ==========================================
  // CREATE PROJECT
  // ==========================================

  const handleCreateProject = (e) => {
    e.preventDefault();

    const name = projectName.trim();
    const description =
      projectDescription.trim();

    if (!name) {
      return;
    }

    const newProject = {
      id: Date.now(),
      name,
      description:
        description || "No description",
      createdAt: Date.now(),
    };

    setProjects((prev) => [
      ...prev,
      newProject,
    ]);

    addActivity(
      `New Project Created: ${name}`
    );

    setProjectName("");
    setProjectDescription("");
    setShowForm(false);
  };

  // ==========================================
  // DELETE PROJECT
  // ==========================================

  const handleDeleteProject = (id) => {
    const projectToDelete = projects.find(
      (project) => project.id === id
    );

    setProjects((prev) =>
      prev.filter(
        (project) => project.id !== id
      )
    );

    if (projectToDelete) {
      addActivity(
        `Project Deleted: ${projectToDelete.name}`
      );
    }
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="min-h-full bg-[#F1F2F4] text-[#25272B]">

      {/* HEADER */}

      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-8">

        <div>
          <h1 className="text-4xl font-bold text-[#25272B]">
            Projects
          </h1>

          <p className="text-[#686B72] mt-2">
            Manage your AI projects in one place.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            setShowForm((prev) => !prev)
          }
          className="
            bg-[#252525]
            hover:bg-[#111111]
            text-white
            px-5
            py-3
            rounded-xl
            font-medium
            transition-all
            duration-200
          "
        >
          {showForm
            ? "✕ Close"
            : "+ New Project"}
        </button>

      </div>

      {/* CREATE FORM */}

      {showForm && (
        <div
          className="
            bg-white
            border border-[#D9DADF]
            rounded-2xl
            p-6
            mb-8
            shadow-sm
          "
        >

          <h2 className="text-xl font-bold text-[#25272B] mb-5">
            Create New Project
          </h2>

          <form
            onSubmit={handleCreateProject}
            className="space-y-5"
          >

            <div>
              <label className="block text-sm font-medium text-[#45474C] mb-2">
                Project Name
              </label>

              <input
                type="text"
                placeholder="Example: AI Resume Analyzer"
                value={projectName}
                onChange={(e) =>
                  setProjectName(
                    e.target.value
                  )
                }
                className="
                  w-full
                  bg-white
                  border border-[#D9DADF]
                  rounded-xl
                  px-4
                  py-3
                  outline-none
                  text-[#25272B]
                  placeholder:text-[#9A9CA2]
                  focus:border-[#FF4B2B]
                  focus:ring-4
                  focus:ring-[#FFE4DE]
                "
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#45474C] mb-2">
                Description
              </label>

              <textarea
                rows="4"
                placeholder="Describe your project..."
                value={projectDescription}
                onChange={(e) =>
                  setProjectDescription(
                    e.target.value
                  )
                }
                className="
                  w-full
                  bg-white
                  border border-[#D9DADF]
                  rounded-xl
                  px-4
                  py-3
                  outline-none
                  resize-none
                  text-[#25272B]
                  placeholder:text-[#9A9CA2]
                  focus:border-[#FF4B2B]
                  focus:ring-4
                  focus:ring-[#FFE4DE]
                "
              />
            </div>

            <div className="flex justify-end">

              <button
                type="submit"
                disabled={!projectName.trim()}
                className="
                  bg-[#FF4B2B]
                  hover:bg-[#E63E20]
                  disabled:bg-[#D9DADF]
                  disabled:text-[#9A9CA2]
                  text-white
                  px-6
                  py-3
                  rounded-xl
                  font-semibold
                  transition-all
                  duration-200
                  disabled:cursor-not-allowed
                "
              >
                Create Project
              </button>

            </div>

          </form>
        </div>
      )}

      {/* PROJECT LIST */}

      {projects.length > 0 ? (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {projects.map((project) => (

            <div
              key={project.id}
              className="
                bg-white
                border border-[#D9DADF]
                rounded-2xl
                p-6
                shadow-sm
                hover:border-[#FF4B2B]
                hover:shadow-md
                hover:-translate-y-1
                transition-all
                duration-300
              "
            >

              <div className="flex items-start justify-between gap-4 mb-4">

                <div className="min-w-0">

                  <h2 className="text-xl font-bold text-[#25272B] truncate">
                    {project.name}
                  </h2>

                  <p className="text-xs text-[#9A9CA2] mt-1">
                    AI Project
                  </p>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    handleDeleteProject(
                      project.id
                    )
                  }
                  className="
                    flex-shrink-0
                    w-8
                    h-8
                    rounded-lg
                    bg-white
                    border border-[#D9DADF]
                    text-[#686B72]
                    hover:bg-[#FFF0ED]
                    hover:text-[#D83A22]
                    hover:border-[#FFC9BE]
                    transition-all
                    duration-200
                    flex
                    items-center
                    justify-center
                  "
                  title="Delete Project"
                >
                  🗑️
                </button>

              </div>

              <p className="text-sm text-[#686B72] leading-6 min-h-[48px]">
                {project.description}
              </p>

              <div className="mt-6 pt-4 border-t border-[#D9DADF]">

                <span
                  className="
                    inline-flex
                    items-center
                    px-3
                    py-1
                    rounded-full
                    bg-[#F1F2F4]
                    border border-[#D9DADF]
                    text-[#45474C]
                    text-xs
                  "
                >
                  Active Project
                </span>

              </div>

            </div>
          ))}

        </div>

      ) : (

        <div
          className="
            bg-white
            border border-[#D9DADF]
            rounded-2xl
            p-12
            text-center
            shadow-sm
          "
        >

          <div className="text-5xl mb-4">
            📂
          </div>

          <h2 className="text-xl font-bold text-[#25272B]">
            No Projects Yet
          </h2>

          <p className="text-sm text-[#686B72] mt-2">
            Create your first AI project to get started.
          </p>

          <button
            type="button"
            onClick={() =>
              setShowForm(true)
            }
            className="
              mt-6
              bg-[#252525]
              hover:bg-[#111111]
              text-white
              px-5
              py-3
              rounded-xl
              font-medium
              transition-all
            "
          >
            + Create Project
          </button>

        </div>
      )}

    </div>
  );
}