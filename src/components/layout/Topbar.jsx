import { Menu } from "lucide-react";
import RoleSwitcher from "./RoleSwitcher";

/**
 * Topbar
 *
 * RESPONSIBILITY:
 * The horizontal bar at the top of the main content area. It shows:
 *   1. A hamburger menu button (mobile only) to open the sidebar
 *   2. The current page title
 *   3. The RoleSwitcher component on the right side
 *
 * PROPS:
 *   - title (string): The title to display — e.g. "Dashboard", "Transactions"
 *   - role (string): The current role passed down to RoleSwitcher
 *   - onRoleChange (function): Setter function passed down to RoleSwitcher
 *   - onMenuClick (function): Called when the hamburger icon is clicked (opens the sidebar on mobile)
 */
function Topbar({ title, role, onRoleChange, onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
      {/* Left side: hamburger + title */}
      <div className="flex items-center gap-3">
        {/* Hamburger menu — only visible on mobile */}
        <button
          id="topbar-menu"
          onClick={onMenuClick}
          className="text-gray-400 hover:text-white lg:hidden cursor-pointer"
        >
          <Menu size={22} />
        </button>

        <h1 className="text-lg sm:text-xl font-semibold text-white">{title}</h1>
      </div>

      {/* Right side: role switcher */}
      <RoleSwitcher role={role} onRoleChange={onRoleChange} />
    </header>
  );
}

export default Topbar;
