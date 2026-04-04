/**
 * SummaryCard (Reusable)
 *
 * RESPONSIBILITY:
 * A generic card that displays a single financial metric.
 * It is purely presentational — it just renders whatever data it receives.
 * No calculations happen inside this component.
 *
 * PROPS:
 *   - title (string): Label shown above the value — e.g. "Total Income"
 *   - value (string): The formatted value to display — e.g. "$23,650"
 *   - icon (React element): A Lucide icon component already rendered — e.g. <DollarSign />
 *   - trend (string, optional): A short trend indicator — e.g. "+12%" or "54%"
 *   - trendLabel (string, optional): Describes the trend — e.g. "vs last month"
 *   - trendDirection (string, optional): "up", "down", or "neutral" — controls the trend color
 *   - accentColor (string, optional): Tailwind color class for the icon background — e.g. "bg-emerald-500/20"
 *   - iconColor (string, optional): Tailwind text color class for the icon — e.g. "text-emerald-400"
 */
function SummaryCard({
  title,
  value,
  icon,
  trend,
  trendLabel,
  trendDirection = "neutral",
  accentColor = "bg-indigo-500/20",
  iconColor = "text-indigo-400",
}) {
  // Pick the right color for the trend text
  const trendColors = {
    up: "text-emerald-400",
    down: "text-red-400",
    neutral: "text-gray-400",
  };

  return (
    <div className="rounded-xl bg-gray-800/60 border border-gray-700/50 p-5 flex flex-col gap-4 hover:border-gray-600/50 transition-all duration-300">
      {/* Top row: icon + title */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-400">{title}</span>
        <div className={`rounded-lg p-2 ${accentColor}`}>
          <span className={iconColor}>{icon}</span>
        </div>
      </div>

      {/* Value */}
      <p className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
        {value}
      </p>

      {/* Trend (optional) */}
      {trend && (
        <div className="flex items-center gap-2 text-sm">
          <span className={`font-semibold ${trendColors[trendDirection]}`}>
            {trend}
          </span>
          {trendLabel && <span className="text-gray-500">{trendLabel}</span>}
        </div>
      )}
    </div>
  );
}

export default SummaryCard;
