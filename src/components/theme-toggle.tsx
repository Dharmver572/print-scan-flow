import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

export function ThemeToggle({ variant = "light" }: { variant?: "light" | "dark" }) {
  const { theme, setTheme } = useTheme();
  const opts = [
    { v: "light" as const, Icon: Sun, label: "Light" },
    { v: "dark" as const, Icon: Moon, label: "Dark" },
    { v: "system" as const, Icon: Monitor, label: "System" },
  ];
  const isDark = variant === "dark";
  return (
    <div
      role="radiogroup"
      aria-label="Theme"
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full border p-0.5",
        isDark ? "border-white/15 bg-white/5" : "border-border bg-card",
      )}
    >
      {opts.map(({ v, Icon, label }) => {
        const active = theme === v;
        return (
          <button
            key={v}
            role="radio"
            aria-checked={active}
            aria-label={label}
            title={label}
            onClick={() => setTheme(v)}
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-full transition-all",
              active
                ? "bg-gradient-primary text-white shadow-glow"
                : isDark
                  ? "text-white/60 hover:text-white"
                  : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Icon className="h-3.5 w-3.5" />
          </button>
        );
      })}
    </div>
  );
}
