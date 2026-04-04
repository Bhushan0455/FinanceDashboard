import { Inbox } from "lucide-react";

function EmptyState({
  title = "No transactions found",
  message = "Try adjusting your search or filter criteria to find what you're looking for.",
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      {/* Icon */}
      <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-5 mb-5">
        <Inbox size={36} className="text-gray-400 dark:text-gray-500" />
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-300 mb-2">{title}</h3>

      {/* Message */}
      <p className="text-sm text-gray-500 text-center max-w-sm">{message}</p>
    </div>
  );
}

export default EmptyState;
