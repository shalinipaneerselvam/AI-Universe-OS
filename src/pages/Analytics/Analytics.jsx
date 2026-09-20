import { useEffect, useState } from "react";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// ==========================================
// STORAGE KEYS
// ==========================================

const AGENTS_KEY = "ai-universe-agents";
const PROJECTS_KEY = "ai-universe-projects";
const CHATS_KEY = "ai-universe-chats";

// ==========================================
// LOAD ANALYTICS DATA
// ==========================================

const getAnalyticsData = () => {
  try {
    // ========================================
    // LOAD AGENTS
    // ========================================

    const savedAgents =
      localStorage.getItem(AGENTS_KEY);

    const agents = savedAgents
      ? JSON.parse(savedAgents)
      : [];

    // ========================================
    // LOAD PROJECTS
    // ========================================

    const savedProjects =
      localStorage.getItem(PROJECTS_KEY);

    const projects = savedProjects
      ? JSON.parse(savedProjects)
      : [];

    // ========================================
    // LOAD CHATS
    // ========================================

    const savedChats =
      localStorage.getItem(CHATS_KEY);

    const chats = savedChats
      ? JSON.parse(savedChats)
      : [];

    // ========================================
    // GET ALL USER MESSAGES
    // ========================================

    const userMessages = [];

    chats.forEach((chat) => {
      if (!Array.isArray(chat.messages)) {
        return;
      }

      chat.messages.forEach((message) => {
        if (message.sender === "user") {
          userMessages.push(message);
        }
      });
    });

    // ========================================
    // TOTAL REQUESTS
    // ========================================

    const totalRequests =
      userMessages.length;

    // ========================================
    // CURRENT YEAR
    // ========================================

    const currentYear =
      new Date().getFullYear();

    // ========================================
    // MONTHS
    // ========================================

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // ========================================
    // MONTHLY USAGE
    // ========================================

    const usageData = months.map(
      (month, monthIndex) => {
        let count = 0;

        userMessages.forEach((message) => {
          const createdAt =
            message.createdAt ||
            message.timestamp;

          if (!createdAt) {
            return;
          }

          const date = new Date(createdAt);

          if (
            Number.isNaN(date.getTime())
          ) {
            return;
          }

          if (
            date.getFullYear() ===
              currentYear &&
            date.getMonth() === monthIndex
          ) {
            count++;
          }
        });

        return {
          month,
          requests: count,
        };
      }
    );

    // ========================================
    // AGENT USAGE
    // ========================================

    const agentData = agents.map((agent) => ({
      name:
        agent.name || "Unnamed Agent",

      requests:
        Number(agent.requests) || 0,
    }));

    // ========================================
    // RETURN DATA
    // ========================================

    return {
      agentCount: agents.length,
      projectCount: projects.length,
      totalRequests,
      agentData,
      usageData,
    };
  } catch (error) {
    console.error(
      "Failed to load analytics:",
      error
    );

    return {
      agentCount: 0,
      projectCount: 0,
      totalRequests: 0,
      agentData: [],
      usageData: [],
    };
  }
};

// ==========================================
// ANALYTICS PAGE
// ==========================================

export default function Analytics() {
  const [analytics, setAnalytics] =
    useState(getAnalyticsData);

  // ========================================
  // REFRESH ANALYTICS
  // ========================================

  const refreshAnalytics = () => {
    setAnalytics(getAnalyticsData());
  };

  // ========================================
  // STORAGE EVENT
  // ========================================

  useEffect(() => {
    const handleStorageChange = () => {
      refreshAnalytics();
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
  // AUTO REFRESH
  // ========================================

  useEffect(() => {
    const interval = setInterval(() => {
      refreshAnalytics();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // ========================================
  // FORMAT NUMBER
  // ========================================

  const formatNumber = (number) => {
    if (number >= 1000000) {
      return (
        (number / 1000000).toFixed(1) +
        "M"
      );
    }

    if (number >= 1000) {
      return (
        (number / 1000).toFixed(1) +
        "K"
      );
    }

    return number.toString();
  };

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
          Analytics
        </h1>

        <p className="text-[#686B72] dark:text-[#A3A3A3] mt-2">
          Monitor your AI Universe usage
          and performance.
        </p>
      </div>

      {/* ====================================
          STAT CARDS
      ==================================== */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

        {/* TOTAL REQUESTS */}

        <div className="bg-white dark:bg-[#242424] border border-[#D9DADF] dark:border-[#3A3A3A] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">

          <p className="text-sm text-[#686B72] dark:text-[#A3A3A3]">
            Total Requests
          </p>

          <h2 className="text-3xl font-bold mt-2 text-[#25272B] dark:text-white">
            {formatNumber(
              analytics.totalRequests
            )}
          </h2>

        </div>

        {/* AI AGENTS */}

        <div className="bg-white dark:bg-[#242424] border border-[#D9DADF] dark:border-[#3A3A3A] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">

          <p className="text-sm text-[#686B72] dark:text-[#A3A3A3]">
            AI Agents
          </p>

          <h2 className="text-3xl font-bold mt-2 text-[#25272B] dark:text-white">
            {analytics.agentCount}
          </h2>

        </div>

        {/* PROJECTS */}

        <div className="bg-white dark:bg-[#242424] border border-[#D9DADF] dark:border-[#3A3A3A] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">

          <p className="text-sm text-[#686B72] dark:text-[#A3A3A3]">
            Projects
          </p>

          <h2 className="text-3xl font-bold mt-2 text-[#25272B] dark:text-white">
            {analytics.projectCount}
          </h2>

        </div>

        {/* UPTIME */}

        <div className="bg-white dark:bg-[#242424] border border-[#D9DADF] dark:border-[#3A3A3A] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">

          <p className="text-sm text-[#686B72] dark:text-[#A3A3A3]">
            Avg. Uptime
          </p>

          <h2 className="text-3xl font-bold mt-2 text-[#21874B]">
            99.9%
          </h2>

        </div>

      </div>

      {/* ====================================
          CHARTS
      ==================================== */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* ==================================
            API USAGE
        ================================== */}

        <div className="bg-white dark:bg-[#242424] border border-[#D9DADF] dark:border-[#3A3A3A] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">

          <h2 className="text-xl font-bold text-[#25272B] dark:text-white">
            API Usage
          </h2>

          <p className="text-sm text-[#686B72] dark:text-[#A3A3A3] mt-1 mb-6">
            Monthly chat requests
          </p>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <LineChart
              data={analytics.usageData}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 5,
              }}
            >

              <CartesianGrid
                stroke="#555555"
                strokeDasharray="4 4"
                vertical={false}
              />

              <XAxis
                dataKey="month"
                tick={{
                  fill: "#A3A3A3",
                  fontSize: 12,
                }}
                axisLine={{
                  stroke: "#555555",
                }}
                tickLine={false}
              />

              <YAxis
                tick={{
                  fill: "#A3A3A3",
                  fontSize: 12,
                }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: "#242424",
                  border:
                    "1px solid #444444",
                  borderRadius: "12px",
                  color: "#FFFFFF",
                }}
              />

              <Line
                type="monotone"
                dataKey="requests"
                stroke="#FF4B2B"
                strokeWidth={3}
                dot={{
                  r: 4,
                  fill: "#FF4B2B",
                  stroke: "#FFFFFF",
                  strokeWidth: 2,
                }}
                activeDot={{
                  r: 6,
                }}
              />

            </LineChart>
          </ResponsiveContainer>

        </div>

        {/* ==================================
            AGENT USAGE
        ================================== */}

        <div className="bg-white dark:bg-[#242424] border border-[#D9DADF] dark:border-[#3A3A3A] rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">

          <h2 className="text-xl font-bold text-[#25272B] dark:text-white">
            Agent Usage
          </h2>

          <p className="text-sm text-[#686B72] dark:text-[#A3A3A3] mt-1 mb-6">
            Requests by AI agent
          </p>

          {analytics.agentData.length ===
          0 ? (

            <div className="h-[300px] flex items-center justify-center">

              <div className="text-center">

                <div className="text-3xl mb-2">
                  🤖
                </div>

                <p className="text-sm text-[#9A9CA2]">
                  No agents available
                </p>

                <p className="text-xs text-[#9A9CA2] mt-1">
                  Create an AI agent to
                  see usage data.
                </p>

              </div>

            </div>

          ) : (

            <ResponsiveContainer
              width="100%"
              height={300}
            >

              <BarChart
                data={analytics.agentData}
                margin={{
                  top: 10,
                  right: 10,
                  left: 0,
                  bottom: 5,
                }}
              >

                <CartesianGrid
                  stroke="#555555"
                  strokeDasharray="4 4"
                  vertical={false}
                />

                <XAxis
                  dataKey="name"
                  tick={{
                    fill: "#A3A3A3",
                    fontSize: 12,
                  }}
                  axisLine={{
                    stroke: "#555555",
                  }}
                  tickLine={false}
                />

                <YAxis
                  tick={{
                    fill: "#A3A3A3",
                    fontSize: 12,
                  }}
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#242424",
                    border:
                      "1px solid #444444",
                    borderRadius: "12px",
                    color: "#FFFFFF",
                  }}
                />

                <Bar
                  dataKey="requests"
                  fill="#FF4B2B"
                  radius={[
                    8,
                    8,
                    0,
                    0,
                  ]}
                />

              </BarChart>

            </ResponsiveContainer>

          )}

        </div>

      </div>

    </div>
  );
}