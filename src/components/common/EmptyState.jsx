import { Inbox } from "lucide-react";

/**
 * EmptyState
 *
 * RESPONSIBILITY:
 * A friendly placeholder shown when no transactions match the current filters.
 * Instead of showing a blank screen or an empty table, this gives the user
 * clear feedback: "Nothing here — try adjusting your filters."
 *
 * WHEN TO SHOW:
 * The parent checks: if the filtered transactions array has length 0,
 * render EmptyState instead of the TransactionsTable.
 *
 * PROPS:
 *   - title (string, optional): Main heading — default "No transactions found"
 *   - message (string, optional): Supporting text — default suggests adjusting filters
 */
function EmptyState({
  title = "No transactions found",
  message = "Try adjusting your search or filter criteria to find what you're looking for.",
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {/* Icon */}
      <div className="rounded-full bg-gray-800 p-5 mb-5">
        <Inbox size={36} className="text-gray-500" />
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-300 mb-2">{title}</h3>

      {/* Message */}
      <p className="text-sm text-gray-500 text-center max-w-sm">{message}</p>
    </div>
  );
}

export default EmptyState;
