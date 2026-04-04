import { useState, useMemo } from "react";
import "./App.css";

// Data — imported as initial seed, then stored in state so it can be modified
import initialTransactions from "./data/transactions";

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

  // ─── Transactions State ───────────────────────────────────
  // Transactions are stored in state (not just imported) so that
  // Admin can add new ones and edit existing ones. Changes persist
  // for the current session (not saved to a database).
  const [allTransactions, setAllTransactions] = useState(initialTransactions);

  // ─── Modal State ──────────────────────────────────────────
  // Controls whether the AddEditTransactionModal is open,
  // and which transaction is being edited (null = add mode).
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  // ── Open modal in ADD mode (empty form) ──
  const handleAddClick = () => {
    setEditingTransaction(null); // null = add mode
    setIsModalOpen(true);
  };

  // ── Open modal in EDIT mode (pre-filled form) ──
  const handleEditClick = (transaction) => {
    setEditingTransaction(transaction); // pass the transaction to edit
    setIsModalOpen(true);
  };

  // ── Close modal ──
  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingTransaction(null);
  };

  // ── Save handler — works for both add and edit ──
  // If the data has an `id`, it's an edit → update the matching entry.
  // If it has no `id`, it's a new transaction → assign a new id and append.
  const handleSaveTransaction = (formData) => {
    if (formData.id) {
      // EDIT: replace the transaction with the matching id
      setAllTransactions((prev) =>
        prev.map((t) => (t.id === formData.id ? { ...t, ...formData } : t))
      );
    } else {
      // ADD: create a new transaction with a unique id
      const newId =
        allTransactions.length > 0
          ? Math.max(...allTransactions.map((t) => t.id)) + 1
          : 1;

      setAllTransactions((prev) => [...prev, { ...formData, id: newId }]);
    }
  };

  // ─── Filter / Search / Sort State ─────────────────────────
  // These 4 state variables drive the TransactionFilters component.
  // Each one is a "controlled input" value.
  const [searchText, setSearchText] = useState("");           // free-text search
  const [typeFilter, setTypeFilter] = useState("all");        // "all" | "income" | "expense"
  const [categoryFilter, setCategoryFilter] = useState("all"); // "all" | specific category
  const [sortBy, setSortBy] = useState("date-desc");          // sort key

  // ─── Unique Categories (for the filter dropdown) ──────────
  // Recalculated when allTransactions changes (e.g., when a new
  // transaction with a new category is added).
  const uniqueCategories = useMemo(() => {
    const cats = new Set(allTransactions.map((t) => t.category));
    return [...cats].sort(); // alphabetical order
  }, [allTransactions]);

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
    let result = [...allTransactions];

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
  }, [allTransactions, searchText, typeFilter, categoryFilter, sortBy]);
  // ↑ DEPENDENCY ARRAY: useMemo will re-run when any filter changes,
  // OR when allTransactions changes (e.g., after add/edit).

  // ─── Derived Dashboard Data ───────────────────────────────
  // These use the FULL allTransactions array (not filtered),
  // because summary cards and charts should always reflect all data.
  // They automatically update when a transaction is added/edited.
  const totalIncome = useMemo(() => getTotalIncome(allTransactions), [allTransactions]);
  const totalExpenses = useMemo(() => getTotalExpenses(allTransactions), [allTransactions]);
  const balance = useMemo(() => getBalance(allTransactions), [allTransactions]);
  const monthlyData = useMemo(() => getMonthlyData(allTransactions), [allTransactions]);
  const categoryTotals = useMemo(() => getCategoryTotals(allTransactions), [allTransactions]);
  const insights = useMemo(() => getInsights(allTransactions), [allTransactions]);

  // ─── Render (placeholder for now) ─────────────────────────
  // Full page assembly will come in a later step.
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          Finance Dashboard 🚀
        </h1>
        <p className="text-gray-400">
          Filtered: {filteredTransactions.length} / {allTransactions.length} transactions
        </p>
        <p className="text-gray-400">
          Balance: ${balance.toLocaleString()} | Role: {role} | Page: {activePage}
        </p>
        <p className="text-gray-400">
          Modal: {isModalOpen ? "open" : "closed"} | Editing: {editingTransaction ? editingTransaction.id : "none"}
        </p>
      </div>
    </div>
  );
}

export default App;
