import { Shield, Eye } from "lucide-react";

function RoleSwitcher({ role, onRoleChange }) {
  return (
    <div className="flex items-center gap-1 rounded-lg bg-gray-100 dark:bg-gray-800 p-1 transition-colors duration-300">
      {/* Admin button */}
      <button
        id="role-switch-admin"
        onClick={() => onRoleChange("admin")}
        className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-200 cursor-pointer ${
          role === "admin"
            ? "bg-indigo-600 text-white shadow-md"
            : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
        }`}
      >
        <Shield size={14} />
        Admin
      </button>

      {/* Viewer button */}
      <button
        id="role-switch-viewer"
        onClick={() => onRoleChange("viewer")}
        className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-200 cursor-pointer ${
          role === "viewer"
            ? "bg-indigo-600 text-white shadow-md"
            : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
        }`}
      >
        <Eye size={14} />
        Viewer
      </button>
    </div>
  );
}

export default RoleSwitcher;
