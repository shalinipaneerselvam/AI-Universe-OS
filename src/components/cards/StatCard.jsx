export default function StatCard({ title, value, icon }) {
  return (
    <div
      className="
        bg-white
        border border-[#D9DADF]
        rounded-2xl
        p-6
        shadow-sm
        hover:-translate-y-1
        hover:shadow-md
        hover:border-[#FF4B2B]
        transition-all
        duration-300
      "
    >
      <div className="flex items-center justify-between">

        {/* Text */}
        <div>
          <p className="text-[#686B72] text-sm font-medium">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-2 text-[#25272B]">
            {value}
          </h2>
        </div>

        {/* Icon */}
        <div
          className="
            w-12
            h-12
            flex
            items-center
            justify-center
            rounded-xl
            bg-[#FFE4DE]
            text-[#FF4B2B]
            text-2xl
            flex-shrink-0
          "
        >
          {icon}
        </div>

      </div>
    </div>
  );
}