import { useNavigate } from "react-router-dom";

const actions = [
  {
    title: "Create Agent",
    icon: "➕",
    path: "/agents",
  },
  {
    title: "New Project",
    icon: "📂",
    path: "/projects",
  },
  {
    title: "Open AI Chat",
    icon: "🤖",
    path: "/chat",
  },
  {
    title: "View Analytics",
    icon: "📊",
    path: "/analytics",
  },
];

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <div
      className="
        bg-white
        border border-[#D9DADF]
        rounded-2xl
        p-6
        shadow-sm
        hover:shadow-md
        transition-all
        duration-300
      "
    >
      {/* Header */}
      <h2 className="text-xl font-bold mb-6 text-[#25272B]">
        Quick Actions
      </h2>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-4">
        {actions.map((action, index) => (
          <button
            key={index}
            type="button"
            onClick={() => navigate(action.path)}
            className="
              group
              bg-[#F1F2F4]
              border border-[#D9DADF]
              text-[#25272B]
              rounded-xl
              p-4
              flex
              flex-col
              items-center
              justify-center
              gap-2
              min-h-[100px]
              hover:bg-[#FFE4DE]
              hover:border-[#FF4B2B]
              hover:text-[#FF4B2B]
              hover:-translate-y-1
              transition-all
              duration-200
            "
          >
            <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
              {action.icon}
            </span>

            <span className="text-sm font-medium text-center">
              {action.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}