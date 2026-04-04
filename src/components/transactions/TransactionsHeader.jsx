import { Plus, Eye, Download } from "lucide-react";
import { useState } from "react";
import { exportToCSV, exportToJSON } from "../../utils/exportUtils";

function TransactionsHeader({ role, transactions, onAddClick }) {
  const isAdmin = role === "admin";
  const [showExportMenu, setShowExportMenu] = useState(false);
  const hasTransactions = transactions && transactions.length > 0;

  return (
    <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
      {/* Role badge — makes role effect visually obvious */}
      <span
        className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wider ${
          isAdmin
            ? "bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/30"
            : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700"
        }`}
      >
        {isAdmin ? "Admin Role Active" : <><Eye size={12} /> View Only</>}
      </span>

      <div className="flex items-center gap-3">
        {/* Export Dropdown */}
        {hasTransactions && (
          <div className="relative">
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              onBlur={() => setTimeout(() => setShowExportMenu(false), 200)}
              className="inline-flex items-center gap-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer shadow-sm dark:shadow-none"
            >
              <Download size={16} />
              Export
            </button>
            
            {showExportMenu && (
              <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl z-20 overflow-hidden">
                <button
                  onMouseDown={() => exportToCSV(transactions)}
                  className="w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  Export as CSV
                </button>
                <button
                  onMouseDown={() => exportToJSON(transactions)}
                  className="w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border-t border-gray-100 dark:border-gray-700"
                >
                  Export as JSON
                </button>
              </div>
            )}
          </div>
        )}

        {/* Add button — only visible for Admin */}
        {isAdmin && (
          <button
            id="btn-add-transaction"
            onClick={onAddClick}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white transition-colors duration-200 cursor-pointer shadow-sm"
          >
            <Plus size={16} />
            Add Transaction
          </button>
        )}
      </div>
    </div>
  );
}

export default TransactionsHeader;
