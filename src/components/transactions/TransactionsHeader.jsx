import { Plus, Eye } from "lucide-react";

/**
 * TransactionsHeader
 *
 * RESPONSIBILITY:
 * A header bar above the transactions list that shows the page title
 * and role-specific actions. Admin sees an "Add Transaction" button.
 * Viewer sees a read-only badge instead.
 *
 * HOW ROLE AFFECTS THIS COMPONENT:
 *   - role === "admin"  → Show the "Add Transaction" button
 *   - role === "viewer" → Show a "View Only" badge (no add button)
 *
 * PROPS:
 *   - role (string): "admin" or "viewer"
 *   - onAddClick (function): Called when Admin clicks the Add button.
 *     (The modal itself will be built in a later step.)
 */
function TransactionsHeader({ role, onAddClick }) {
  const isAdmin = role === "admin";

  return (
    <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
      {/* Role badge — makes role effect visually obvious */}
      <span
        className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wider ${
          isAdmin
            ? "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30"
            : "bg-gray-800 text-gray-400 border border-gray-700"
        }`}
      >
        {isAdmin ? "Admin Role Active" : <><Eye size={12} /> View Only</>}
      </span>

      {/* Add button — only visible for Admin */}
      {isAdmin && (
        <button
          id="btn-add-transaction"
          onClick={onAddClick}
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white transition-colors duration-200 cursor-pointer"
        >
          <Plus size={16} />
          Add Transaction
        </button>
      )}
    </div>
  );
}

export default TransactionsHeader;
