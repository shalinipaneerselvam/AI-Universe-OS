import { useNavigate } from "react-router-dom";

export default function AgentCard({
  name,
  status,
  version,
}) {
  const navigate = useNavigate();

  const handleOpenChat = () => {
    navigate("/chat");
  };

  return (
    <div
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
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="min-w-0">
          <h2 className="text-xl font-bold text-[#25272B] truncate">
            {name}
          </h2>

          <p className="text-xs text-[#9A9CA2] mt-1">
            AI Model
          </p>
        </div>

        {/* Status */}
        <span
          className={`
            flex-shrink-0
            px-3
            py-1
            rounded-full
            text-xs
            font-semibold
            ${
              status === "Online"
                ? "bg-[#E6F7ED] text-[#21874B]"
                : "bg-[#FFF0ED] text-[#D83A22]"
            }
          `}
        >
          {status}
        </span>
      </div>

      {/* Version */}
      <div className="mb-5">
        <p className="text-xs text-[#9A9CA2] mb-1">
          Version
        </p>

        <p className="text-sm font-medium text-[#45474C]">
          {version}
        </p>
      </div>

      {/* Capabilities */}
      <div className="flex flex-wrap gap-2 mb-6">
        <span className="bg-[#F1F2F4] border border-[#D9DADF] text-[#45474C] px-3 py-1 rounded-full text-xs">
          NLP
        </span>

        <span className="bg-[#F1F2F4] border border-[#D9DADF] text-[#45474C] px-3 py-1 rounded-full text-xs">
          Vision
        </span>

        <span className="bg-[#F1F2F4] border border-[#D9DADF] text-[#45474C] px-3 py-1 rounded-full text-xs">
          API
        </span>
      </div>

      {/* Open Chat */}
      <button
        type="button"
        onClick={handleOpenChat}
        className="
          w-full
          bg-[#252525]
          hover:bg-[#111111]
          text-white
          py-3
          rounded-xl
          font-semibold
          transition-all
          duration-200
        "
      >
        Open Chat →
      </button>

      {/* Stats */}
      <div className="mt-4 pt-4 border-t border-[#D9DADF] flex justify-between gap-3">
        <div>
          <p className="text-[11px] text-[#9A9CA2]">
            Requests
          </p>

          <p className="text-sm font-medium text-[#45474C] mt-1">
            12.5K
          </p>
        </div>

        <div className="text-right">
          <p className="text-[11px] text-[#9A9CA2]">
            Uptime
          </p>

          <p className="text-sm font-medium text-[#21874B] mt-1">
            99.9%
          </p>
        </div>
      </div>
    </div>
  );
}