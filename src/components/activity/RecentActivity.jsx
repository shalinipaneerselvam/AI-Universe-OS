import { useEffect, useState } from "react";

// ==========================================
// FORMAT ACTIVITY TIME
// ==========================================

const formatActivityTime = (createdAt) => {
  if (!createdAt) {
    return "Just now";
  }

  const now = Date.now();
  const difference = Math.max(
    0,
    now - createdAt
  );

  const seconds = Math.floor(
    difference / 1000
  );

  const minutes = Math.floor(
    seconds / 60
  );

  const hours = Math.floor(
    minutes / 60
  );

  const days = Math.floor(
    hours / 24
  );

  if (seconds < 60) {
    return "Just now";
  }

  if (minutes < 60) {
    return minutes === 1
      ? "1 min ago"
      : `${minutes} mins ago`;
  }

  if (hours < 24) {
    return hours === 1
      ? "1 hour ago"
      : `${hours} hours ago`;
  }

  if (days === 1) {
    return "Yesterday";
  }

  if (days < 7) {
    return `${days} days ago`;
  }

  return new Date(
    createdAt
  ).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// ==========================================
// LOAD ACTIVITIES
// ==========================================

const getActivities = () => {
  try {
    const savedActivities =
      localStorage.getItem(
        "ai-universe-activities"
      );

    if (!savedActivities) {
      return [
        {
          id: 1,
          title:
            "Welcome to AI Universe OS",
          createdAt: Date.now(),
        },
      ];
    }

    return JSON.parse(savedActivities);
  } catch (error) {
    console.error(
      "Failed to load activities:",
      error
    );

    return [];
  }
};

// ==========================================
// RECENT ACTIVITY
// ==========================================

export default function RecentActivity() {
  // ========================================
  // LOAD INITIAL DATA
  // ========================================

  const [activities, setActivities] =
    useState(getActivities);

  // Used only to refresh displayed time
  const [, setTimeTick] = useState(0);

  // ========================================
  // LISTEN FOR ACTIVITY CHANGES
  // ========================================

  useEffect(() => {
    const handleStorageChange = () => {
      setActivities(getActivities());
    };

    window.addEventListener(
      "storage",
      handleStorageChange
    );

    return () => {
      window.removeEventListener(
        "storage",
        handleStorageChange
      );
    };
  }, []);

  // ========================================
  // UPDATE TIME EVERY MINUTE
  // ========================================

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeTick((prev) => prev + 1);
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // ========================================
  // UI
  // ========================================

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

      {/* ====================================
          HEADER
      ==================================== */}

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-xl font-bold text-[#25272B]">
          Recent Activity
        </h2>

        <span className="text-xs text-[#9A9CA2]">
          Latest
        </span>

      </div>

      {/* ====================================
          ACTIVITY LIST
      ==================================== */}

      <div className="space-y-1">

        {activities.length === 0 ? (

          <div className="text-center py-8">

            <p className="text-sm text-[#9A9CA2]">
              No recent activity
            </p>

          </div>

        ) : (

          activities
            .slice(0, 5)
            .map((item, index) => (

              <div
                key={
                  item.id || index
                }
                className="
                  flex
                  items-center
                  justify-between
                  gap-4
                  py-4
                  border-b
                  border-[#D9DADF]
                  last:border-b-0
                "
              >

                {/* ACTIVITY TITLE */}

                <div className="flex items-center gap-3 min-w-0">

                  <div
                    className="
                      w-2
                      h-2
                      rounded-full
                      bg-[#FF4B2B]
                      flex-shrink-0
                    "
                  />

                  <p
                    className="
                      text-[#25272B]
                      text-sm
                      font-medium
                      truncate
                    "
                  >
                    {item.title}
                  </p>

                </div>

                {/* TIME */}

                <span
                  className="
                    text-[#686B72]
                    text-xs
                    whitespace-nowrap
                  "
                >
                  {item.createdAt
                    ? formatActivityTime(
                        item.createdAt
                      )
                    : item.time ||
                      "Just now"}
                </span>

              </div>
            ))

        )}

      </div>

    </div>
  );
}