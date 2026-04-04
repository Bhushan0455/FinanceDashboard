import { useState, useMemo } from "react";
import "./App.css";

// ─── Data ────────────────────────────────────────────────────
// Imported as initial seed, then stored in state so Admin can add/edit
import initialTransactions from "./data/transactions";

// ─── Helper Functions ────────────────────────────────────────
import {
  getTotalIncome,
  getTotalExpenses,
  getBalance,
  getCategoryTotals,
  getMonthlyData,
  getInsights,
} from "./utils/helpers";

// ─── Layout Components ──────────────────────────────────────
import Sidebar from "./components/layout/Sidebar";
import Topbar from "./components/layout/Topbar";

// ─── Dashboard Components ───────────────────────────────────
import SummaryCards from "./components/dashboard/SummaryCards";
import MonthlyTrendChart from "./components/dashboard/MonthlyTrendChart";
import CategoryBreakdownChart from "./components/dashboard/CategoryBreakdownChart";

// ─── Transaction Components ─────────────────────────────────
import TransactionsHeader from "./components/transactions/TransactionsHeader";
import TransactionFilters from "./components/transactions/TransactionFilters";
import TransactionsTable from "./components/transactions/TransactionsTable";
import AddEditTransactionModal from "./components/transactions/AddEditTransactionModal";

// ─── Common Components ──────────────────────────────────────
import EmptyState from "./components/common/EmptyState";

// ─── Insights Components ────────────────────────────────────
import InsightsPanel from "./components/insights/InsightsPanel";

// Page titles for the Topbar
const PAGE_TITLES = {
  dashboard: "Dashboard",
  transactions: "Transactions",
  insights: "Insights",
};

function App() {
  // ══════════════════════════════════════════════════════════
  //  RAW STATE — values that can change via user interaction
  // ══════════════════════════════════════════════════════════

  // ─── Layout & Role ────────────────────────────────────────
  const [role, setRole] = useState("admin");               // "admin" or "viewer"
  const [activePage, setActivePage] = useState("dashboard"); // current page
  const [sidebarOpen, setSidebarOpen] = useState(false);     // mobile sidebar toggle

  // ─── Transactions (mutable array) ─────────────────────────
  // Stored in state so Admin can add/edit. The initial mock data
  // is the seed. Changes persist for the current browser session.
  const [allTransactions, setAllTransactions] = useState(initialTransactions);

  // ─── Modal ────────────────────────────────────────────────
  // isModalOpen: controls visibility of AddEditTransactionModal
  // editingTransaction: null = add mode, object = edit mode
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  // ─── Filters / Search / Sort ──────────────────────────────
  const [searchText, setSearchText] = useState("");            // search query
  const [typeFilter, setTypeFilter] = useState("all");         // "all" | "income" | "expense"
  const [categoryFilter, setCategoryFilter] = useState("all"); // "all" | category name
  const [sortBy, setSortBy] = useState("date-desc");           // sort key

  // ══════════════════════════════════════════════════════════
  //  HANDLER FUNCTIONS — respond to user actions
  // ══════════════════════════════════════════════════════════

  // Open modal in ADD mode
  const handleAddClick = () => {
    setEditingTransaction(null);
    setIsModalOpen(true);
  };

  // Open modal in EDIT mode
  const handleEditClick = (transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  // Close modal
  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingTransaction(null);
  };

  // Save handler — works for both add and edit
  const handleSaveTransaction = (formData) => {
    if (formData.id) {
      // EDIT: update the matching transaction
      setAllTransactions((prev) =>
        prev.map((t) => (t.id === formData.id ? { ...t, ...formData } : t))
      );
    } else {
      // ADD: append with a new unique id
      const newId =
        allTransactions.length > 0
          ? Math.max(...allTransactions.map((t) => t.id)) + 1
          : 1;
      setAllTransactions((prev) => [...prev, { ...formData, id: newId }]);
    }
  };

  // ══════════════════════════════════════════════════════════
  //  DERIVED STATE — computed from raw state using useMemo
  // ══════════════════════════════════════════════════════════

  // Unique categories for the filter dropdown
  const uniqueCategories = useMemo(() => {
    const cats = new Set(allTransactions.map((t) => t.category));
    return [...cats].sort();
  }, [allTransactions]);

  // Filtered & sorted transactions (for the Transactions page)
  const filteredTransactions = useMemo(() => {
    let result = [...allTransactions];

    // 1. Search
    if (searchText.trim() !== "") {
      const query = searchText.toLowerCase();
      result = result.filter(
        (t) =>
          t.description.toLowerCase().includes(query) ||
          t.category.toLowerCase().includes(query)
      );
    }

    // 2. Type filter
    if (typeFilter !== "all") {
      result = result.filter((t) => t.type === typeFilter);
    }

    // 3. Category filter
    if (categoryFilter !== "all") {
      result = result.filter((t) => t.category === categoryFilter);
    }

    // 4. Sort
    switch (sortBy) {
      case "date-desc":
        result.sort((a, b) => b.date.localeCompare(a.date));
        break;
      case "date-asc":
        result.sort((a, b) => a.date.localeCompare(b.date));
        break;
      case "amount-desc":
        result.sort((a, b) => b.amount - a.amount);
        break;
      case "amount-asc":
        result.sort((a, b) => a.amount - b.amount);
        break;
      default:
        break;
    }

    return result;
  }, [allTransactions, searchText, typeFilter, categoryFilter, sortBy]);

  // Dashboard summary values (use ALL transactions, not filtered)
  const totalIncome = useMemo(() => getTotalIncome(allTransactions), [allTransactions]);
  const totalExpenses = useMemo(() => getTotalExpenses(allTransactions), [allTransactions]);
  const balance = useMemo(() => getBalance(allTransactions), [allTransactions]);
  const savingsRate = useMemo(() => getInsights(allTransactions).savingsRate, [allTransactions]);
  const monthlyData = useMemo(() => getMonthlyData(allTransactions), [allTransactions]);
  const categoryTotals = useMemo(() => getCategoryTotals(allTransactions), [allTransactions]);
  const insights = useMemo(() => getInsights(allTransactions), [allTransactions]);

  // ══════════════════════════════════════════════════════════
  //  PAGE CONTENT — renders different content based on activePage
  // ══════════════════════════════════════════════════════════

  const renderPageContent = () => {
    switch (activePage) {
      // ─── Dashboard Page ─────────────────────────────────────
      case "dashboard":
        return (
          <div className="space-y-6">
            {/* Summary Cards: Balance, Income, Expenses, Savings Rate */}
            <SummaryCards
              totalIncome={totalIncome}
              totalExpenses={totalExpenses}
              balance={balance}
              savingsRate={savingsRate}
            />

            {/* Charts: side by side on large screens, stacked on small */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MonthlyTrendChart data={monthlyData} />
              <CategoryBreakdownChart data={categoryTotals} />
            </div>
          </div>
        );

      // ─── Transactions Page ──────────────────────────────────
      case "transactions":
        return (
          <div className="space-y-5">
            {/* Header with Add button (Admin only) */}
            <TransactionsHeader
              role={role}
              onAddClick={handleAddClick}
            />

            {/* Filter / Search / Sort controls */}
            <TransactionFilters
              searchText={searchText}
              onSearchChange={setSearchText}
              typeFilter={typeFilter}
              onTypeFilterChange={setTypeFilter}
              categoryFilter={categoryFilter}
              onCategoryFilterChange={setCategoryFilter}
              sortBy={sortBy}
              onSortChange={setSortBy}
              categories={uniqueCategories}
            />

            {/* Table or Empty State */}
            {filteredTransactions.length > 0 ? (
              <TransactionsTable
                transactions={filteredTransactions}
                role={role}
                onEdit={handleEditClick}
              />
            ) : (
              <EmptyState />
            )}
          </div>
        );

      // ─── Insights Page ──────────────────────────────────────
      case "insights":
        return (
          <InsightsPanel
            insights={insights}
            monthlyData={monthlyData}
          />
        );

      default:
        return null;
    }
  };

  // ══════════════════════════════════════════════════════════
  //  RENDER — the final layout assembly
  // ══════════════════════════════════════════════════════════
  //
  //  ┌──────────┬──────────────────────────────────┐
  //  │          │  Topbar (title + role switcher)  │
  //  │ Sidebar  ├──────────────────────────────────┤
  //  │  (nav)   │                                  │
  //  │          │       Page Content Area          │
  //  │          │  (dashboard / transactions /     │
  //  │          │   insights based on activePage)  │
  //  └──────────┴──────────────────────────────────┘

  return (
    <div className="flex min-h-screen bg-gray-950 text-white overflow-x-hidden">
      {/* ── Sidebar ── always visible on lg+, slide-in overlay on mobile */}
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* ── Main wrapper ── fills remaining width beside the sidebar */}
      <div className="flex-1 flex flex-col min-h-screen lg:ml-64">
        {/* Topbar — sticky so it stays visible while scrolling */}
        <Topbar
          title={PAGE_TITLES[activePage]}
          role={role}
          onRoleChange={setRole}
          onMenuClick={() => setSidebarOpen(true)}
        />

        {/* Scrollable page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {renderPageContent()}
        </main>
      </div>

      {/* Modal — floats above everything (only rendered when open) */}
      <AddEditTransactionModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleSaveTransaction}
        transaction={editingTransaction}
      />
    </div>
  );
}

export default App;
