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
    up: "text-emerald-500 dark:text-emerald-400",
    down: "text-red-500 dark:text-red-400",
    neutral: "text-gray-500 dark:text-gray-400",
  };

  return (
    <div className="rounded-xl bg-white dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/50 p-5 flex flex-col gap-4 hover:border-gray-300 dark:hover:border-gray-600/50 transition-all duration-300 shadow-sm dark:shadow-none">
      {/* Top row: icon + title */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</span>
        <div className={`rounded-lg p-2 ${accentColor}`}>
          <span className={iconColor}>{icon}</span>
        </div>
      </div>

      {/* Value */}
      <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
        {value}
      </p>

      {/* Trend (optional) */}
      {trend && (
        <div className="flex items-center gap-2 text-sm">
          <span className={`font-semibold ${trendColors[trendDirection]}`}>
            {trend}
          </span>
          {trendLabel && <span className="text-gray-400 dark:text-gray-500">{trendLabel}</span>}
        </div>
      )}
    </div>
  );
}

export default SummaryCard;
