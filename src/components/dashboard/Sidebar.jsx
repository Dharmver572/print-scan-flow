```jsx
import {
  LayoutDashboard,
  Printer,
  Users,
  Store,
  QrCode,
  Settings,
  LogOut,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const menuItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    label: "Print Jobs",
    icon: Printer,
    path: "/dashboard/print-jobs",
  },
  {
    label: "Customers",
    icon: Users,
    path: "/dashboard/customers",
  },
  {
    label: "My Shop",
    icon: Store,
    path: "/dashboard/shop",
  },
  {
    label: "QR Code",
    icon: QrCode,
    path: "/dashboard/qr",
  },
  {
    label: "Settings",
    icon: Settings,
    path: "/dashboard/settings",
  },
];

export function Sidebar({ open, onClose, onLogout }) {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={
          fixed inset-y-0 left-0 z-50
          flex w-64 flex-col
          border-r border-border
          bg-card
          transition-transform duration-200
          lg:translate-x-0
          ${open ? "translate-x-0" : "-translate-x-full"}
        }
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-border px-5">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Printer className="h-5 w-5" />
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight">
                PrintEasy
              </h1>

              <p className="text-[10px] text-muted-foreground">
                Print shop management
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          <p className="px-3 pb-2 pt-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            Workspace
          </p>

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/dashboard"}
                onClick={onClose}
                className={({ isActive }) =>
                  
                  flex items-center gap-3 rounded-lg px-3 py-2.5
                  text-sm font-medium
                  transition-colors
                  ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }
                  
                }
              >
                <Icon className="h-4 w-4 shrink-0" />

                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="border-t border-border p-3">
          <button
            type="button"
            onClick={onLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="h-4 w-4" />

            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
```
