import { useEffect, useState } from "react";
import AgentCard from "../../components/agents/AgentCard";

// ==========================================
// DEFAULT AGENTS
// ==========================================

const defaultAgents = [
  {
    id: 1,
    name: "GPT-5",
    status: "Online",
    version: "v5.0",
  },
  {
    id: 2,
    name: "Claude",
    status: "Online",
    version: "v4",
  },
  {
    id: 3,
    name: "Gemini",
    status: "Online",
    version: "2.5 Pro",
  },
  {
    id: 4,
    name: "DeepSeek",
    status: "Offline",
    version: "R1",
  },
];

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
// AGENTS PAGE
// ==========================================

export default function Agents() {
  const [agents, setAgents] = useState(() => {
    try {
      const savedAgents = localStorage.getItem(
        "ai-universe-agents"
      );

      return savedAgents
        ? JSON.parse(savedAgents)
        : defaultAgents;
    } catch (error) {
      console.error(
        "Failed to load agents:",
        error
      );

      return defaultAgents;
    }
  });

  // ==========================================
  // SEARCH
  // ==========================================

  const [search, setSearch] = useState("");

  // ==========================================
  // CREATE FORM
  // ==========================================

  const [showCreateForm, setShowCreateForm] =
    useState(false);

  const [agentName, setAgentName] =
    useState("");

  const [agentVersion, setAgentVersion] =
    useState("");

  const [agentStatus, setAgentStatus] =
    useState("Online");

  // ==========================================
  // SAVE AGENTS
  // ==========================================

  useEffect(() => {
    try {
      localStorage.setItem(
        "ai-universe-agents",
        JSON.stringify(agents)
      );
    } catch (error) {
      console.error(
        "Failed to save agents:",
        error
      );
    }
  }, [agents]);

  // ==========================================
  // CREATE AGENT
  // ==========================================

  const handleCreateAgent = (e) => {
    e.preventDefault();

    const name = agentName.trim();
    const version = agentVersion.trim();

    if (!name || !version) {
      return;
    }

    const newAgent = {
      id: Date.now(),
      name,
      version,
      status: agentStatus,
    };

    setAgents((prev) => [
      ...prev,
      newAgent,
    ]);

    addActivity(
      `New AI Agent Created: ${name}`
    );

    setAgentName("");
    setAgentVersion("");
    setAgentStatus("Online");

    setShowCreateForm(false);
  };

  // ==========================================
  // DELETE AGENT
  // ==========================================

  const handleDeleteAgent = (id) => {
    const agentToDelete = agents.find(
      (agent) => agent.id === id
    );

    setAgents((prev) =>
      prev.filter(
        (agent) => agent.id !== id
      )
    );

    if (agentToDelete) {
      addActivity(
        `AI Agent Deleted: ${agentToDelete.name}`
      );
    }
  };

  // ==========================================
  // FILTER AGENTS
  // ==========================================

  const filteredAgents = agents.filter(
    (agent) =>
      agent.name
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="min-h-full bg-[#F1F2F4] text-[#25272B]">

      {/* HEADER */}

      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-8">

        <div>
          <h1 className="text-4xl font-bold text-[#25272B]">
            AI Agents
          </h1>

          <p className="text-[#686B72] mt-2">
            Manage all your AI models in one place.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">

          {/* SEARCH */}

          <input
            type="text"
            placeholder="Search AI Agent..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="
              bg-white
              border border-[#D9DADF]
              text-[#25272B]
              placeholder:text-[#9A9CA2]
              rounded-xl
              px-4
              py-3
              w-full
              sm:w-64
              outline-none
              focus:border-[#FF4B2B]
              focus:ring-4
              focus:ring-[#FFE4DE]
              transition-all
              duration-200
            "
          />

          {/* CREATE */}

          <button
            type="button"
            onClick={() =>
              setShowCreateForm(
                (prev) => !prev
              )
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
              whitespace-nowrap
            "
          >
            {showCreateForm
              ? "✕ Close"
              : "+ Create Agent"}
          </button>

        </div>
      </div>

      {/* CREATE FORM */}

      {showCreateForm && (
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
            Create New Agent
          </h2>

          <form
            onSubmit={handleCreateAgent}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >

            <div>
              <label className="block text-sm font-medium text-[#45474C] mb-2">
                Agent Name
              </label>

              <input
                type="text"
                placeholder="Example: Llama"
                value={agentName}
                onChange={(e) =>
                  setAgentName(e.target.value)
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
                Version
              </label>

              <input
                type="text"
                placeholder="Example: v1.0"
                value={agentVersion}
                onChange={(e) =>
                  setAgentVersion(e.target.value)
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
                Status
              </label>

              <select
                value={agentStatus}
                onChange={(e) =>
                  setAgentStatus(e.target.value)
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
                  focus:border-[#FF4B2B]
                  focus:ring-4
                  focus:ring-[#FFE4DE]
                "
              >
                <option value="Online">
                  Online
                </option>

                <option value="Offline">
                  Offline
                </option>
              </select>
            </div>

            <div className="md:col-span-3 flex justify-end">

              <button
                type="submit"
                disabled={
                  !agentName.trim() ||
                  !agentVersion.trim()
                }
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
                Create Agent
              </button>

            </div>

          </form>
        </div>
      )}

      {/* AGENTS */}

      {filteredAgents.length > 0 ? (

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

          {filteredAgents.map((agent) => (

            <div
              key={agent.id}
              className="relative"
            >

              <AgentCard
                name={agent.name}
                status={agent.status}
                version={agent.version}
              />

              <button
                type="button"
                onClick={() =>
                  handleDeleteAgent(agent.id)
                }
                className="
                  absolute
                  top-4
                  right-4
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
                title="Delete Agent"
              >
                🗑️
              </button>

            </div>
          ))}

        </div>

      ) : (

        <div className="text-center py-16">

          <div className="text-4xl mb-4">
            🤖
          </div>

          <p className="text-[#686B72]">
            No AI agents found.
          </p>

        </div>
      )}

    </div>
  );
}