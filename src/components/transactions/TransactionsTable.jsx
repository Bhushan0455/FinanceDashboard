import { ArrowUpRight, ArrowDownLeft, Pencil } from "lucide-react";

function TransactionsTable({ transactions, role, onEdit }) {
  const isAdmin = role === "admin";

  // Format date: "2026-01-15" → "Jan 15, 2026"
  const formatDate = (dateStr) => {
    const date = new Date(dateStr + "T00:00:00"); // avoid timezone shift
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Format amount: 1400 → "$1,400.00"
  const formatAmount = (amount) =>
    "$" + amount.toLocaleString("en-US", { minimumFractionDigits: 2 });

  return (
    <div className="rounded-xl bg-white dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700/50 overflow-hidden shadow-sm dark:shadow-none">
      {/* ── Desktop Table (hidden on small screens) ── */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700/50">
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Date
              </th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Description
              </th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Category
              </th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Type
              </th>
              <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Amount
              </th>
              {/* Actions column header — only for Admin */}
              {isAdmin && (
                <th className="text-center px-5 py-3.5 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr
                key={t.id}
                className="border-b border-gray-100 dark:border-gray-700/30 hover:bg-gray-50 dark:hover:bg-gray-700/20 transition-colors duration-150"
              >
                {/* Date */}
                <td className="px-5 py-4 text-gray-600 dark:text-gray-300 whitespace-nowrap">
                  {formatDate(t.date)}
                </td>

                {/* Description */}
                <td className="px-5 py-4 text-gray-900 dark:text-white font-medium">
                  {t.description}
                </td>

                {/* Category badge */}
                <td className="px-5 py-4">
                  <span className="inline-block rounded-full bg-gray-100 dark:bg-gray-700/60 px-2.5 py-1 text-xs font-medium text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-transparent">
                    {t.category}
                  </span>
                </td>

                {/* Type indicator */}
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                      t.type === "income"
                        ? "bg-emerald-500/15 text-emerald-400"
                        : "bg-red-500/15 text-red-400"
                    }`}
                  >
                    {t.type === "income" ? (
                      <ArrowUpRight size={12} />
                    ) : (
                      <ArrowDownLeft size={12} />
                    )}
                    {t.type === "income" ? "Income" : "Expense"}
                  </span>
                </td>

                {/* Amount */}
                <td
                  className={`px-5 py-4 text-right font-semibold whitespace-nowrap ${
                    t.type === "income" ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {t.type === "income" ? "+" : "−"}
                  {formatAmount(t.amount)}
                </td>

                {/* Edit button — only for Admin */}
                {isAdmin && (
                  <td className="px-5 py-4 text-center">
                    <button
                      id={`btn-edit-${t.id}`}
                      onClick={() => onEdit(t)}
                      className="inline-flex items-center gap-1 rounded-lg bg-gray-100 dark:bg-gray-700/60 hover:bg-gray-200 dark:hover:bg-gray-600/60 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 cursor-pointer"
                    >
                      <Pencil size={12} />
                      Edit
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Mobile Cards (shown on small screens only) ── */}
      <div className="md:hidden divide-y divide-gray-100 dark:divide-gray-700/30">
        {transactions.map((t) => (
          <div key={t.id} className="px-4 py-4 flex items-center gap-3">
            {/* Icon */}
            <div
              className={`rounded-lg p-2 shrink-0 ${
                t.type === "income"
                  ? "bg-emerald-500/15 text-emerald-400"
                  : "bg-red-500/15 text-red-400"
              }`}
            >
              {t.type === "income" ? (
                <ArrowUpRight size={18} />
              ) : (
                <ArrowDownLeft size={18} />
              )}
            </div>

            {/* Description + meta */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {t.description}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                {formatDate(t.date)} · {t.category}
              </p>
            </div>

            {/* Amount */}
            <p
              className={`text-sm font-semibold whitespace-nowrap ${
                t.type === "income" ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {t.type === "income" ? "+" : "−"}
              {formatAmount(t.amount)}
            </p>

            {/* Edit button — Admin only, on mobile */}
            {isAdmin && (
              <button
                id={`btn-edit-mobile-${t.id}`}
                onClick={() => onEdit(t)}
                className="shrink-0 rounded-lg bg-gray-100 dark:bg-gray-700/60 hover:bg-gray-200 dark:hover:bg-gray-600/60 p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 cursor-pointer"
              >
                <Pencil size={14} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TransactionsTable;
