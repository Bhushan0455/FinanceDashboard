import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

// Custom tooltip that appears when hovering over the chart
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload || payload.length === 0) return null;

  return (
    <div className="rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-3 shadow-xl">
      <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} className="text-sm" style={{ color: entry.color }}>
          {entry.name}: ${entry.value.toLocaleString("en-US")}
        </p>
      ))}
    </div>
  );
}

function MonthlyTrendChart({ data }) {
  return (
    <div className="rounded-xl bg-white dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/50 p-5 flex flex-col h-full shadow-sm dark:shadow-none">
      {/* Card header */}
      <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
        Monthly Trend
      </h3>

      {/* Chart — ResponsiveContainer makes it fill the parent width */}
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            {/* Gradient definitions for the filled areas */}
            <defs>
              <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#34d399" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#34d399" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f87171" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#f87171" stopOpacity={0} />
              </linearGradient>
            </defs>

            {/* Grid lines in the background */}
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />

            {/* X-axis shows month names */}
            <XAxis
              dataKey="month"
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              axisLine={{ stroke: "#4b5563" }}
              tickLine={false}
            />

            {/* Y-axis shows dollar amounts */}
            <YAxis
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              axisLine={{ stroke: "#4b5563" }}
              tickLine={false}
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
            />

            {/* Hover tooltip */}
            <Tooltip content={<CustomTooltip />} />

            {/* Legend at the bottom */}
            <Legend
              wrapperStyle={{ fontSize: "13px", color: "#9ca3af" }}
            />

            {/* Income area */}
            <Area
              type="monotone"
              dataKey="income"
              name="Income"
              stroke="#34d399"
              strokeWidth={2}
              fill="url(#incomeGradient)"
            />

            {/* Expenses area */}
            <Area
              type="monotone"
              dataKey="expenses"
              name="Expenses"
              stroke="#f87171"
              strokeWidth={2}
              fill="url(#expenseGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default MonthlyTrendChart;
