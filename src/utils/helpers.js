// These functions take the transactions array and return useful calculated values.

export function getTotalIncome(transactions) {
  return transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
}

export function getTotalExpenses(transactions) {
  return transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
}

export function getBalance(transactions) {
  return getTotalIncome(transactions) - getTotalExpenses(transactions);
}

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
