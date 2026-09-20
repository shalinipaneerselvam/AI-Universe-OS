import { useEffect, useState } from "react";

import RecentActivity from "../../components/activity/RecentActivity";
import QuickActions from "../../components/actions/QuickActions";
import StatCard from "../../components/cards/StatCard";
import AnalyticsChart from "../../components/charts/LineChart";

export default function Dashboard() {
  const [agentCount, setAgentCount] = useState(4);
  const [projectCount, setProjectCount] = useState(0);

  useEffect(() => {
    const updateCounts = () => {
      // AI Agents count
      const savedAgents = localStorage.getItem(
        "ai-universe-agents"
      );

      const agents = savedAgents
        ? JSON.parse(savedAgents)
        : [];

      setAgentCount(agents.length);

      // Projects count
      const savedProjects = localStorage.getItem(
        "ai-universe-projects"
      );

      const projects = savedProjects
        ? JSON.parse(savedProjects)
        : [];

      setProjectCount(projects.length);
    };

    updateCounts();

    // Update when localStorage changes
    window.addEventListener(
      "storage",
      updateCounts
    );

    return () => {
      window.removeEventListener(
        "storage",
        updateCounts
      );
    };
  }, []);

  return (
    <div className="min-h-full bg-[#F1F2F4] text-[#25272B]">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#25272B]">
          Dashboard
        </h1>

        <p className="text-[#686B72] mt-2">
          Overview of your AI Universe workspace
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatCard
          title="AI Agents"
          value={agentCount}
          icon="🤖"
        />

        <StatCard
          title="Projects"
          value={projectCount}
          icon="📂"
        />

        <StatCard
          title="API Calls"
          value="1.2M"
          icon="⚡"
        />

        <StatCard
          title="Users"
          value="18,540"
          icon="👤"
        />

      </div>

      {/* Analytics */}
      <AnalyticsChart />

      {/* Activity + Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <RecentActivity />
        <QuickActions />
      </div>

    </div>
  );
}