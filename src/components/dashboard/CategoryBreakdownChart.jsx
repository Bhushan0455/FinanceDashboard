import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

/**
 * CategoryBreakdownChart
 *
 * RESPONSIBILITY:
 * Displays a donut/pie chart showing how expenses are split across categories.
 * This answers the question: "Where is my money going?"
 *
 * EXPECTED DATA FORMAT (passed via the `data` prop):
 *   [
 *     { category: "Housing",       total: 4200 },
 *     { category: "Food",          total: 495 },
 *     { category: "Bills",         total: 626 },
 *     ...
 *   ]
 *
 * This data is produced by the `getCategoryTotals()` helper function from
 * `src/utils/helpers.js`. It filters only expense transactions, groups them
 * by category, sums each group, and sorts from highest to lowest.
 *
 * PROPS:
 *   - data (array): Array of objects with `category` (string) and `total` (number)
 */

// A curated color palette for pie slices — one per category
const COLORS = [
  "#818cf8", // indigo  — Housing
  "#34d399", // emerald — Food
  "#fbbf24", // amber   — Bills
  "#f87171", // red     — Shopping
  "#60a5fa", // blue    — Transport
  "#a78bfa", // violet  — Entertainment
  "#fb923c", // orange  — Health
  "#2dd4bf", // teal    — Freelance (if income categories show)
  "#e879f9", // fuchsia — extra
];

// Custom tooltip for the pie chart
function CustomTooltip({ active, payload }) {
  if (!active || !payload || payload.length === 0) return null;

  const { category, total } = payload[0].payload;

  return (
    <div className="rounded-lg bg-gray-800 border border-gray-700 px-4 py-3 shadow-xl">
      <p className="text-sm font-semibold text-white">{category}</p>
      <p className="text-sm text-gray-300">
        ${total.toLocaleString("en-US")}
      </p>
    </div>
  );
}

// Custom legend that shows category name + dollar amount
function CustomLegend({ payload }) {
  return (
    <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4">
      {payload.map((entry, index) => (
        <li key={index} className="flex items-center gap-1.5 text-sm">
          <span
            className="inline-block w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-gray-400">{entry.value}</span>
        </li>
      ))}
    </ul>
  );
}

function CategoryBreakdownChart({ data }) {
  return (
    <div className="rounded-xl bg-gray-800/60 border border-gray-700/50 p-5 flex flex-col h-full">
      {/* Card header */}
      <h3 className="text-base font-semibold text-white mb-4">
        Spending by Category
      </h3>

      {/* Chart */}
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="total"
              nameKey="category"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={95}
              paddingAngle={3}
              strokeWidth={0}
            >
              {/* Each slice gets a color from the palette */}
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default CategoryBreakdownChart;
