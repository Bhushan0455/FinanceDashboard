import { ArrowUpRight, ArrowDownLeft } from "lucide-react";

/**
 * TransactionsTable
 *
 * RESPONSIBILITY:
 * Displays a list of transactions in a clean, responsive table format.
 * This is purely presentational — it receives an already-filtered and
 * already-sorted array of transactions and just renders them.
 *
 * HOW FILTERED DATA ARRIVES:
 * The parent component:
 *   1. Starts with the full `transactions` array
 *   2. Applies search, type, and category filters
 *   3. Applies sorting
 *   4. Passes the resulting array as the `transactions` prop
 * This component never filters or sorts on its own.
 *
 * PROPS:
 *   - transactions (array): Pre-filtered & sorted array of transaction objects.
 *     Each object has: { id, date, description, amount, type, category }
 */
function TransactionsTable({ transactions }) {
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
    <div className="rounded-xl bg-gray-800/60 border border-gray-700/50 overflow-hidden">
      {/* ── Desktop Table (hidden on small screens) ── */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-700/50">
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Date
              </th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Description
              </th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Category
              </th>
              <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Type
              </th>
              <th className="text-right px-5 py-3.5 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr
                key={t.id}
                className="border-b border-gray-700/30 hover:bg-gray-700/20 transition-colors duration-150"
              >
                {/* Date */}
                <td className="px-5 py-4 text-gray-300 whitespace-nowrap">
                  {formatDate(t.date)}
                </td>

                {/* Description */}
                <td className="px-5 py-4 text-white font-medium">
                  {t.description}
                </td>

                {/* Category badge */}
                <td className="px-5 py-4">
                  <span className="inline-block rounded-full bg-gray-700/60 px-2.5 py-1 text-xs font-medium text-gray-300">
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Mobile Cards (shown on small screens only) ── */}
      <div className="md:hidden divide-y divide-gray-700/30">
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
              <p className="text-sm font-medium text-white truncate">
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default TransactionsTable;
