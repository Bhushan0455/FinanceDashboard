import { Shield, Eye } from "lucide-react";

/**
 * RoleSwitcher
 *
 * RESPONSIBILITY:
 * A small toggle that lets the user switch between "Admin" and "Viewer" roles.
 * It does NOT own the role state — it receives the current role and a function
 * to change it from its parent. This makes it a "controlled component."
 *
 * PROPS:
 *   - role (string): The currently active role — either "admin" or "viewer"
 *   - onRoleChange (function): Called with the new role string when the user clicks a button
 */
function RoleSwitcher({ role, onRoleChange }) {
  return (
    <div className="flex items-center gap-1 rounded-lg bg-gray-800 p-1">
      {/* Admin button */}
      <button
        id="role-switch-admin"
        onClick={() => onRoleChange("admin")}
        className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-200 cursor-pointer ${
          role === "admin"
            ? "bg-indigo-600 text-white shadow-md"
            : "text-gray-400 hover:text-gray-200"
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
            : "text-gray-400 hover:text-gray-200"
        }`}
      >
        <Eye size={14} />
        Viewer
      </button>
    </div>
  );
}

export default RoleSwitcher;
