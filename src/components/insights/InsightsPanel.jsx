import { TrendingUp, BarChart3, Receipt, AlertTriangle } from "lucide-react";

/**
 * InsightsPanel
 *
 * RESPONSIBILITY:
 * Displays 4 financial insight cards derived from transaction data.
 * All data is calculated by helper functions in the parent and passed
 * as props — nothing is hardcoded. If transactions change, insights
 * update automatically.
 *
 * PROPS:
 *   - insights (object): From getInsights() helper — contains:
 *       • highestSpendingCategory: { category, total }
 *       • largestExpense: { description, amount, date, category }
 *       • savingsRate: number (0–100)
 *       • totalTransactions: number
 *   - monthlyData (array): From getMonthlyData() helper — array of
 *       { month, income, expenses } objects, used to compare months
 */
function InsightsPanel({ insights, monthlyData }) {
  // ── Month-over-month expense comparison ──────────────────
  // Compare the last two months to see if expenses went up or down.
  // DATA SOURCE: getMonthlyData() groups transactions by month and
  // sums income/expenses for each. We take the last two entries.
  let monthComparison = null;

  if (monthlyData.length >= 2) {
    const current = monthlyData[monthlyData.length - 1];   // most recent month
    const previous = monthlyData[monthlyData.length - 2];  // month before that

    const difference = current.expenses - previous.expenses;
    const percentChange = previous.expenses > 0
      ? Math.round((difference / previous.expenses) * 100)
      : 0;

    monthComparison = {
      currentMonth: current.month,
      previousMonth: previous.month,
      currentExpenses: current.expenses,
      previousExpenses: previous.expenses,
      difference,
      percentChange,
      direction: difference > 0 ? "up" : difference < 0 ? "down" : "same",
    };
  }

  // Format a number as currency
  const formatCurrency = (amount) =>
    "$" + amount.toLocaleString("en-US");

  // ── The 4 insight cards ──────────────────────────────────
  // Each card has: icon, title, value, description, and accent color.
  const insightCards = [
    // 1. Highest spending category
    // DATA SOURCE: getInsights() → getCategoryTotals() → groups expenses
    //   by category and returns the biggest one.
    // WHAT IT MEANS: The category where you spend the most money overall.
    {
      id: "top-category",
      icon: <BarChart3 size={20} />,
      title: "Top Spending Category",
      value: insights.highestSpendingCategory.category,
      description: `${formatCurrency(insights.highestSpendingCategory.total)} spent in this category`,
      accentColor: "bg-indigo-500/15",
      iconColor: "text-indigo-400",
    },

    // 2. Month-over-month expense change
    // DATA SOURCE: getMonthlyData() → last two months compared above.
    // WHAT IT MEANS: Are you spending more or less compared to last month?
    {
      id: "month-comparison",
      icon: <TrendingUp size={20} />,
      title: "Monthly Expense Trend",
      value: monthComparison
        ? `${monthComparison.percentChange >= 0 ? "+" : ""}${monthComparison.percentChange}%`
        : "N/A",
      description: monthComparison
        ? `${monthComparison.currentMonth} vs ${monthComparison.previousMonth}: ${formatCurrency(monthComparison.currentExpenses)} vs ${formatCurrency(monthComparison.previousExpenses)}`
        : "Not enough data for comparison",
      accentColor: monthComparison && monthComparison.direction === "down"
        ? "bg-emerald-500/15"
        : "bg-amber-500/15",
      iconColor: monthComparison && monthComparison.direction === "down"
        ? "text-emerald-400"
        : "text-amber-400",
    },

    // 3. Total number of transactions
    // DATA SOURCE: getInsights() → transactions.length
    // WHAT IT MEANS: How many financial entries exist in the system.
    {
      id: "total-transactions",
      icon: <Receipt size={20} />,
      title: "Total Transactions",
      value: insights.totalTransactions.toString(),
      description: "Total entries recorded across all months",
      accentColor: "bg-blue-500/15",
      iconColor: "text-blue-400",
    },

    // 4. Largest single expense
    // DATA SOURCE: getInsights() → finds the expense with the highest amount.
    // WHAT IT MEANS: Your single biggest purchase or payment.
    {
      id: "largest-expense",
      icon: <AlertTriangle size={20} />,
      title: "Largest Expense",
      value: insights.largestExpense
        ? formatCurrency(insights.largestExpense.amount)
        : "N/A",
      description: insights.largestExpense
        ? `${insights.largestExpense.description} (${insights.largestExpense.category})`
        : "No expenses recorded",
      accentColor: "bg-red-500/15",
      iconColor: "text-red-400",
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">Financial Insights</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {insightCards.map((card) => (
          <div
            key={card.id}
            className="rounded-xl bg-gray-800/60 border border-gray-700/50 p-5 hover:border-gray-600/50 transition-all duration-300"
          >
            {/* Icon + Title */}
            <div className="flex items-center gap-3 mb-3">
              <div className={`rounded-lg p-2.5 ${card.accentColor}`}>
                <span className={card.iconColor}>{card.icon}</span>
              </div>
              <span className="text-sm font-medium text-gray-400">
                {card.title}
              </span>
            </div>

            {/* Value */}
            <p className="text-2xl font-bold text-white mb-1.5">
              {card.value}
            </p>

            {/* Description */}
            <p className="text-sm text-gray-500">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InsightsPanel;
