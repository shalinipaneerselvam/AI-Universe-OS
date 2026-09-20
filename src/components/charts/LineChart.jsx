import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { month: "Jan", users: 400 },
  { month: "Feb", users: 900 },
  { month: "Mar", users: 700 },
  { month: "Apr", users: 1200 },
  { month: "May", users: 1800 },
  { month: "Jun", users: 2400 },
];

export default function AnalyticsChart() {
  return (
    <div
      className="
        bg-white
        rounded-2xl
        p-6
        mt-8
        border border-[#D9DADF]
        shadow-sm
        hover:shadow-md
        transition-all
        duration-300
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-[#25272B]">
            User Analytics
          </h2>

          <p className="text-sm text-[#686B72] mt-1">
            Monthly user growth
          </p>
        </div>

        <span className="text-xs font-medium text-[#686B72] bg-[#F1F2F4] px-3 py-1.5 rounded-lg">
          6 Months
        </span>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid
            stroke="#E5E6E9"
            strokeDasharray="4 4"
            vertical={false}
          />

          <XAxis
            dataKey="month"
            tick={{
              fill: "#686B72",
              fontSize: 12,
            }}
            axisLine={{
              stroke: "#D9DADF",
            }}
            tickLine={false}
          />

          <YAxis
            tick={{
              fill: "#686B72",
              fontSize: 12,
            }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            cursor={{
              stroke: "#D9DADF",
              strokeDasharray: "4 4",
            }}
            contentStyle={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #D9DADF",
              borderRadius: "12px",
              color: "#25272B",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
            }}
            labelStyle={{
              color: "#25272B",
              fontWeight: "600",
              marginBottom: "4px",
            }}
          />

          <Line
            type="monotone"
            dataKey="users"
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
              stroke: "#FFFFFF",
              strokeWidth: 2,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}