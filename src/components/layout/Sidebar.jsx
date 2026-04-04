import { LayoutDashboard, ArrowRightLeft, Lightbulb, X } from "lucide-react";

/**
 * Sidebar
 *
 * RESPONSIBILITY:
 * The left-side navigation panel. It shows navigation links for each section
 * of the dashboard. On mobile, it slides in as an overlay and can be closed.
 * On desktop (lg and up), it is always visible.
 *
 * PROPS:
 *   - activePage (string): Which page is currently active — "dashboard", "transactions", or "insights"
 *   - onNavigate (function): Called with the page name when a nav link is clicked
 *   - isOpen (boolean): Whether the sidebar is visible on mobile
 *   - onClose (function): Called when the user clicks the close button or the backdrop on mobile
 */

// Navigation items — easy to add more pages later
const navItems = [
  { id: "dashboard",    label: "Dashboard",    icon: LayoutDashboard },
  { id: "transactions", label: "Transactions", icon: ArrowRightLeft },
  { id: "insights",     label: "Insights",     icon: Lightbulb },
];

function Sidebar({ activePage, onNavigate, isOpen, onClose }) {
  return (
    <>
      {/* Dark backdrop on mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-gray-900 border-r border-gray-800
          flex flex-col transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:z-auto
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* ── Header / Brand ── */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-800">
          <h2 className="text-xl font-bold text-white tracking-tight">
            💰 FinDash
          </h2>
          {/* Close button — only visible on mobile */}
          <button
            id="sidebar-close"
            onClick={onClose}
            className="text-gray-400 hover:text-white lg:hidden cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* ── Navigation Links ── */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;

            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => {
                  onNavigate(item.id);
                  onClose(); // close sidebar on mobile after navigating
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium
                  transition-all duration-200 cursor-pointer
                  ${
                    isActive
                      ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30"
                      : "text-gray-400 hover:bg-gray-800 hover:text-gray-200"
                  }
                `}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* ── Footer ── */}
        <div className="px-6 py-4 border-t border-gray-800">
          <p className="text-xs text-gray-500">© 2026 FinDash</p>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
