import { Search, Filter, ArrowUpDown } from "lucide-react";

function TransactionFilters({
  searchText,
  onSearchChange,
  typeFilter,
  onTypeFilterChange,
  categoryFilter,
  onCategoryFilterChange,
  sortBy,
  onSortChange,
  categories,
}) {
  // Shared styling for all select dropdowns
  const selectClass =
    "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors duration-200 cursor-pointer appearance-none shadow-sm dark:shadow-none";

  return (
    <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3">
      {/* ── Search Input ── */}
      {/* State needed: searchText (string) */}
      <div className="relative w-full sm:w-64">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
        />
        <input
          id="filter-search"
          type="text"
          placeholder="Search transactions..."
          value={searchText}                          // controlled by state
          onChange={(e) => onSearchChange(e.target.value)} // updates state on every keystroke
          className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-200 text-sm rounded-lg pl-9 pr-3 py-2.5 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors duration-200 shadow-sm dark:shadow-none"
        />
      </div>

      {/* ── Type Filter (All / Income / Expense) ── */}
      {/* State needed: typeFilter (string) — default "all" */}
      <div className="flex items-center gap-2">
        <Filter size={16} className="text-gray-500 hidden sm:block" />
        <select
          id="filter-type"
          value={typeFilter}                              // controlled by state
          onChange={(e) => onTypeFilterChange(e.target.value)}
          className={selectClass}
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      {/* ── Category Filter ── */}
      {/* State needed: categoryFilter (string) — default "all" */}
      <select
        id="filter-category"
        value={categoryFilter}                                // controlled by state
        onChange={(e) => onCategoryFilterChange(e.target.value)}
        className={selectClass}
      >
        <option value="all">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* ── Sort Dropdown ── */}
      {/* State needed: sortBy (string) — default "date-desc" */}
      <div className="flex items-center gap-2">
        <ArrowUpDown size={16} className="text-gray-500 hidden sm:block" />
        <select
          id="filter-sort"
          value={sortBy}                             // controlled by state
          onChange={(e) => onSortChange(e.target.value)}
          className={selectClass}
        >
          <option value="date-desc">Date (Newest)</option>
          <option value="date-asc">Date (Oldest)</option>
          <option value="amount-desc">Amount (High → Low)</option>
          <option value="amount-asc">Amount (Low → High)</option>
        </select>
      </div>
    </div>
  );
}

export default TransactionFilters;
