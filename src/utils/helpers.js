// ─── Helper Utility Functions for the Finance Dashboard ───
// These functions take the transactions array and return useful calculated values.

/**
 * getTotalIncome
 * Adds up the amount of all transactions where type is "income".
 * Example: Salary + Freelance earnings = total income
 */
export function getTotalIncome(transactions) {
  return transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
}

/**
 * getTotalExpenses
 * Adds up the amount of all transactions where type is "expense".
 * Example: Food + Bills + Shopping + ... = total expenses
 */
export function getTotalExpenses(transactions) {
  return transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
}

/**
 * getBalance
 * Calculates the remaining balance: total income minus total expenses.
 * A positive number means you earned more than you spent.
 */
export function getBalance(transactions) {
  return getTotalIncome(transactions) - getTotalExpenses(transactions);
}

/**
 * getCategoryTotals
 * Groups all expense transactions by their category and sums them up.
 * Returns an array of objects like: [{ category: "Food", total: 495 }, ...]
 * Sorted from highest spending to lowest.
 */
export function getCategoryTotals(transactions) {
  // Only look at expenses (we don't categorize income by spending category)
  const expenses = transactions.filter((t) => t.type === "expense");

  // Build a map: { "Food": 495, "Bills": 626, ... }
  const categoryMap = {};
  expenses.forEach((t) => {
    categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
  });

  // Convert the map to an array and sort by total (highest first)
  return Object.entries(categoryMap)
    .map(([category, total]) => ({ category, total }))
    .sort((a, b) => b.total - a.total);
}

/**
 * getMonthlyData
 * Groups transactions by month and calculates income & expenses for each.
 * Returns an array like:
 *   [{ month: "Jan", income: 6000, expenses: 2054 }, ...]
 * This is useful for bar/line charts showing trends over time.
 */
export function getMonthlyData(transactions) {
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  // Build a map: { "2026-01": { income: 6000, expenses: 2054 }, ... }
  const monthlyMap = {};

  transactions.forEach((t) => {
    // Extract "2026-01" from "2026-01-15"
    const monthKey = t.date.slice(0, 7);

    if (!monthlyMap[monthKey]) {
      monthlyMap[monthKey] = { income: 0, expenses: 0 };
    }

    if (t.type === "income") {
      monthlyMap[monthKey].income += t.amount;
    } else {
      monthlyMap[monthKey].expenses += t.amount;
    }
  });

  // Convert to array, sorted by date, with readable month names
  return Object.keys(monthlyMap)
    .sort()
    .map((key) => {
      const monthIndex = parseInt(key.split("-")[1], 10) - 1; // "01" → 0
      return {
        month: monthNames[monthIndex],
        income: monthlyMap[key].income,
        expenses: monthlyMap[key].expenses,
      };
    });
}

/**
 * getInsights
 * Returns a few simple insights derived from the transaction data:
 *   - highestSpendingCategory: the category where you spent the most
 *   - largestExpense: the single biggest expense transaction
 *   - savingsRate: what percentage of income you saved (as a whole number)
 *   - totalTransactions: how many transactions there are in total
 */
export function getInsights(transactions) {
  // Highest spending category (reuses getCategoryTotals — first item is biggest)
  const categoryTotals = getCategoryTotals(transactions);
  const highestSpendingCategory = categoryTotals.length > 0
    ? categoryTotals[0]
    : { category: "N/A", total: 0 };

  // Largest single expense
  const expenses = transactions.filter((t) => t.type === "expense");
  const largestExpense = expenses.length > 0
    ? expenses.reduce((max, t) => (t.amount > max.amount ? t : max), expenses[0])
    : null;

  // Savings rate = (income - expenses) / income * 100
  const income = getTotalIncome(transactions);
  const totalExpenses = getTotalExpenses(transactions);
  const savingsRate = income > 0
    ? Math.round(((income - totalExpenses) / income) * 100)
    : 0;

  return {
    highestSpendingCategory,
    largestExpense,
    savingsRate,
    totalTransactions: transactions.length,
  };
}
