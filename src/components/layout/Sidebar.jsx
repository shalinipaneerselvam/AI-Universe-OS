import { NavLink } from "react-router-dom";

const menuItems = [
  {
    name: "Dashboard",
    icon: "🏠",
    path: "/dashboard",
  },
  {
    name: "AI Agents",
    icon: "🤖",
    path: "/agents",
  },
  {
    name: "Analytics",
    icon: "📊",
    path: "/analytics",
  },
  {
    name: "Projects",
    icon: "📁",
    path: "/projects",
  },
  {
    name: "Settings",
    icon: "⚙",
    path: "/settings",
  },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#E8E9EC] border-r border-[#D9DADF] h-screen p-6 text-[#25272B] flex flex-col">

      {/* Logo / Title */}
      <h2 className="text-xl font-bold text-[#25272B] mb-8">
        AI Universe OS
      </h2>

      {/* Navigation */}
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `
                flex
                items-center
                gap-3
                p-3
                rounded-xl
                text-sm
                font-medium
                transition-all
                duration-200
                ${
                  isActive
                    ? "bg-[#FFE4DE] text-[#FF4B2B] border border-[#FFC9BE]"
                    : "text-[#45474C] hover:bg-[#D9DADF] hover:text-[#25272B]"
                }
              `
            }
          >
            <span className="text-lg">
              {item.icon}
            </span>

            <span>
              {item.name}
            </span>
          </NavLink>
        ))}
      </nav>

    </aside>
  );
}