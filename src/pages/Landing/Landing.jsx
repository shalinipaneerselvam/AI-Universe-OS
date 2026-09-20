import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      icon: "🤖",
      title: "AI Agents",
      description: "Manage and interact with your AI agents.",
    },
    {
      icon: "💬",
      title: "AI Chat",
      description: "Chat with AI and get intelligent responses.",
    },
    {
      icon: "📊",
      title: "Analytics",
      description: "Track usage and monitor AI activity.",
    },
    {
      icon: "📁",
      title: "Projects",
      description: "Organize and manage your AI projects.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F1F2F4] text-[#25272B] px-6 py-10 overflow-hidden">

      {/* ==========================================
          BACKGROUND DECORATION
      ========================================== */}

      <div className="pointer-events-none absolute top-[-120px] left-[-120px] w-[280px] h-[280px] rounded-full bg-[#FFE4DE] opacity-60 blur-3xl" />

      <div className="pointer-events-none absolute bottom-[-140px] right-[-100px] w-[320px] h-[320px] rounded-full bg-[#FFE4DE] opacity-50 blur-3xl" />

      {/* ==========================================
          MAIN CONTENT
      ========================================== */}

      <div className="relative max-w-6xl mx-auto min-h-[calc(100vh-80px)] flex flex-col justify-center">

        {/* ==========================================
            HERO SECTION
        ========================================== */}

        <div className="text-center">

          {/* Logo */}
          <div className="group inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white border border-[#D9DADF] shadow-sm mb-7 transition-all duration-500 hover:-translate-y-3 hover:shadow-xl hover:border-[#FF4B2B] hover:bg-[#FFF7F5] cursor-pointer">
  <span className="text-5xl transition-all duration-500 group-hover:scale-125 group-hover:-rotate-12 group-hover:-translate-y-2">
    🚀
  </span>
</div>

          {/* Title */}
          <h1 className="group text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#25272B] cursor-default">
  <span className="inline-block transition-all duration-300 group-hover:-translate-y-1">
    AI Universe
  </span>

  <span className="inline-block text-[#FF4B2B] transition-all duration-300 group-hover:translate-x-1">
    {" "}OS
  </span>
</h1>

          {/* Subtitle */}
          <p className="mt-5 text-lg md:text-xl text-[#686B72] max-w-2xl mx-auto leading-8">
            Your intelligent AI-powered workspace
            for agents, projects, analytics and conversations.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-9">

            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="
                group
                px-7
                py-3.5
                rounded-xl
                bg-[#252525]
                hover:bg-[#111111]
                text-white
                font-semibold
                shadow-sm
                hover:shadow-lg
                hover:-translate-y-1
                transition-all
                duration-300
              "
            >
              <span className="flex items-center gap-2">
                Enter AI Universe
                <span className="group-hover:translate-x-1 transition-transform duration-200">
                  →
                </span>
              </span>
            </button>

            <button
              type="button"
              onClick={() => navigate("/chat")}
              className="
                px-7
                py-3.5
                rounded-xl
                bg-white
                border
                border-[#D9DADF]
                hover:border-[#FF4B2B]
                hover:bg-[#FFF7F5]
                text-[#25272B]
                font-semibold
                hover:-translate-y-1
                transition-all
                duration-300
              "
            >
              💬 Try AI Chat
            </button>

          </div>

          {/* ==========================================
              FEATURES
          ========================================== */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-16">

            {features.map((feature) => (
              <div
                key={feature.title}
                className="
                  group
                  bg-white
                  border
                  border-[#D9DADF]
                  rounded-2xl
                  p-5
                  text-left
                  shadow-sm
                  hover:border-[#FFB8AA]
                  hover:shadow-lg
                  hover:-translate-y-2
                  transition-all
                  duration-300
                "
              >

                <div className="
                  w-11
                  h-11
                  rounded-xl
                  bg-[#FFE4DE]
                  flex
                  items-center
                  justify-center
                  text-xl
                  group-hover:scale-110
                  transition-transform
                  duration-300
                ">
                  {feature.icon}
                </div>

                <h2 className="mt-4 text-base font-bold text-[#25272B]">
                  {feature.title}
                </h2>

                <p className="mt-2 text-sm text-[#686B72] leading-6">
                  {feature.description}
                </p>

              </div>
            ))}

          </div>

          {/* ==========================================
              FOOTER TEXT
          ========================================== */}

          <p className="mt-10 text-xs text-[#9A9CA2]">
            AI Universe OS • Your intelligent workspace
          </p>

        </div>

      </div>
    </div>
  );
}