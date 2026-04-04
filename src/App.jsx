import { useState, useMemo } from "react";
import "./App.css";

// Data
import transactions from "./data/transactions";

// Helpers
import {
  getTotalIncome,
  getTotalExpenses,
  getBalance,
  getCategoryTotals,
  getMonthlyData,
  getInsights,
} from "./utils/helpers";

function App() {
  // ─── Layout & Role State ──────────────────────────────────
  const [role, setRole] = useState("admin");           // "admin" or "viewer"
  const [activePage, setActivePage] = useState("dashboard"); // current page
  const [sidebarOpen, setSidebarOpen] = useState(false);     // mobile sidebar

  // ─── Filter / Search / Sort State ─────────────────────────
  // These 4 state variables drive the TransactionFilters component.
  // Each one is a "controlled input" value.
  const [searchText, setSearchText] = useState("");           // free-text search
  const [typeFilter, setTypeFilter] = useState("all");        // "all" | "income" | "expense"
  const [categoryFilter, setCategoryFilter] = useState("all"); // "all" | specific category
  const [sortBy, setSortBy] = useState("date-desc");          // sort key

  // ─── Unique Categories (for the filter dropdown) ──────────
  // useMemo: only recalculated when `transactions` changes.
  // Since `transactions` is static mock data, this runs once.
  const uniqueCategories = useMemo(() => {
    const cats = new Set(transactions.map((t) => t.category));
    return [...cats].sort(); // alphabetical order
  }, [transactions]);

  // ─── Filtered & Sorted Transactions ───────────────────────
  // This is the core logic. useMemo ensures we don't re-filter
  // on every render — only when a filter value actually changes.
  //
  // ORDER OF OPERATIONS:
  //   1. Search  → narrow by text match
  //   2. Filter  → narrow by type and category
  //   3. Sort    → order the remaining results
  //
  // WHY useMemo?
  //   Without it, this filtering runs on EVERY render (even if
  //   filters haven't changed). With 36 rows it's fine, but it's
  //   a good habit for larger datasets. More importantly, it
  //   prevents child components from receiving a brand-new array
  //   reference on every render, which can trigger unnecessary
  //   re-renders down the tree.

  const filteredTransactions = useMemo(() => {
    let result = [...transactions];

    // ── Step 1: Search ──────────────────────────────────────
    // Match the search text against description OR category (case-insensitive)
    if (searchText.trim() !== "") {
      const query = searchText.toLowerCase();
      result = result.filter(
        (t) =>
          t.description.toLowerCase().includes(query) ||
          t.category.toLowerCase().includes(query)
      );
    }

    // ── Step 2a: Type Filter ────────────────────────────────
    // If not "all", keep only transactions of the selected type
    if (typeFilter !== "all") {
      result = result.filter((t) => t.type === typeFilter);
    }

    // ── Step 2b: Category Filter ────────────────────────────
    // If not "all", keep only transactions in the selected category
    if (categoryFilter !== "all") {
      result = result.filter((t) => t.category === categoryFilter);
    }

    // ── Step 3: Sort ────────────────────────────────────────
    // Sort the filtered results based on the selected sort key
    switch (sortBy) {
      case "date-desc":
        // Newest first (default) — compare date strings directly (ISO format sorts correctly)
        result.sort((a, b) => b.date.localeCompare(a.date));
        break;
      case "date-asc":
        // Oldest first
        result.sort((a, b) => a.date.localeCompare(b.date));
        break;
      case "amount-desc":
        // Highest amount first
        result.sort((a, b) => b.amount - a.amount);
        break;
      case "amount-asc":
        // Lowest amount first
        result.sort((a, b) => a.amount - b.amount);
        break;
      default:
        break;
    }

    return result;
  }, [searchText, typeFilter, categoryFilter, sortBy]);
  // ↑ DEPENDENCY ARRAY: useMemo will re-run ONLY when one of these changes.
  // `transactions` is a static import, so it never changes and doesn't need
  // to be listed (though adding it wouldn't hurt).

  // ─── Derived Dashboard Data ───────────────────────────────
  // These use the FULL transactions array (not filtered),
  // because summary cards and charts should always reflect all data.
  const totalIncome = useMemo(() => getTotalIncome(transactions), [transactions]);
  const totalExpenses = useMemo(() => getTotalExpenses(transactions), [transactions]);
  const balance = useMemo(() => getBalance(transactions), [transactions]);
  const monthlyData = useMemo(() => getMonthlyData(transactions), [transactions]);
  const categoryTotals = useMemo(() => getCategoryTotals(transactions), [transactions]);
  const insights = useMemo(() => getInsights(transactions), [transactions]);

  // ─── Render (placeholder for now) ─────────────────────────
  // Full page assembly will come in a later step.
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          Finance Dashboard 🚀
        </h1>
        <p className="text-gray-400">
          Filtered: {filteredTransactions.length} / {transactions.length} transactions
        </p>
        <p className="text-gray-400">
          Balance: ${balance.toLocaleString()} | Role: {role} | Page: {activePage}
        </p>
      </div>
    </div>
  );
}

export default App;
