import { Search, Filter, ArrowUpDown } from "lucide-react";

/**
 * TransactionFilters
 *
 * RESPONSIBILITY:
 * Renders the filter/search/sort controls for the transactions page.
 * This is purely a UI component — it does NOT filter data itself.
 * It receives the current filter values and setter functions from its parent,
 * making every input a "controlled input."
 *
 * CONTROLLED INPUT:
 * A controlled input is an input whose value is driven by React state.
 *   - The `value` attribute is set to a state variable
 *   - The `onChange` handler updates that state variable
 *   - React re-renders the input with the new value
 * This means React is the "single source of truth" for what the input shows.
 *
 * PROPS:
 *   - searchText (string): Current search query text
 *   - onSearchChange (function): Called with new text when user types in the search box
 *
 *   - typeFilter (string): Current type filter — "all", "income", or "expense"
 *   - onTypeFilterChange (function): Called with new type value when user picks a type
 *
 *   - categoryFilter (string): Current category filter — "all" or a specific category name
 *   - onCategoryFilterChange (function): Called with new category when user picks one
 *
 *   - sortBy (string): Current sort key — "date-desc", "date-asc", "amount-desc", "amount-asc"
 *   - onSortChange (function): Called with new sort key when user picks a sort option
 *
 *   - categories (array of strings): List of unique category names to populate the dropdown
 */

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
    "bg-gray-800 border border-gray-700 text-gray-300 text-sm rounded-lg px-3 py-2.5 focus:outline-none focus:border-indigo-500 transition-colors duration-200 cursor-pointer appearance-none";

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
          className="w-full bg-gray-800 border border-gray-700 text-gray-200 text-sm rounded-lg pl-9 pr-3 py-2.5 placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors duration-200"
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
