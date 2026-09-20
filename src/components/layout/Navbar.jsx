export default function Navbar() {
  return (
    <nav className="h-16 bg-white border-b border-[#D9DADF] flex items-center justify-between px-6">

      {/* Title */}
      <div>
        <h1 className="text-xl font-bold text-[#25272B]">
          AI Universe OS
        </h1>
      </div>

      {/* Status */}
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-green-500"></span>

        <span className="text-sm text-[#686B72]">
          Online
        </span>
      </div>

    </nav>
  );
}