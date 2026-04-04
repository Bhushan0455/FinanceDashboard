import { Menu } from "lucide-react";
import RoleSwitcher from "./RoleSwitcher";
import ThemeToggle from "./ThemeToggle";

function Topbar({ title, role, onRoleChange, onMenuClick }) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      {/* Left side: hamburger + title */}
      <div className="flex items-center gap-3">
        {/* Hamburger menu — only visible on mobile */}
        <button
          id="topbar-menu"
          onClick={onMenuClick}
          className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white lg:hidden cursor-pointer"
        >
          <Menu size={22} />
        </button>

        <h1 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">{title}</h1>
      </div>

      {/* Right side: theme toggle + role switcher */}
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <RoleSwitcher role={role} onRoleChange={onRoleChange} />
      </div>
    </header>
  );
}

export default Topbar;
