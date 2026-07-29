import {
  QrCode,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Settings,
  Sun,
  Moon,
  Monitor,
} from "lucide-react";

import { useState, useEffect, useRef } from "react";
import { useTheme } from "@/components/theme-provider";
const columns = [
  { title: "Product", links: ["Features", "How It Works", "Pricing", "Dashboard"] },
  { title: "Company", links: ["About Us", "Contact Us", "Privacy Policy", "Terms & Conditions"] },
  { title: "Resources", links: ["Help Center", "Blog", "Status", "Changelog"] },
];
export function Footer() {
  const [open, setOpen] = useState(false);

  const menuRef = useRef(null);

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);

    return () =>
      document.removeEventListener("mousedown", handleClick);
  }, []);

  const themes = [
    {
      id: "light",
      label: "Light Mode",
      icon: Sun,
    },
    {
      id: "dark",
      label: "Dark Mode",
      icon: Moon,
    },
    {
      id: "system",
      label: "System Default",
      icon: Monitor,
    },
  ];


  return (<footer className="border-t border-border bg-muted/20">
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="grid gap-10 grid-cols-1 lg:grid-cols-5">
        <div className="text-center lg:col-span-2 lg:text-left">
          <a
            href="#"
            className="flex items-center justify-center gap-2.5 lg:justify-start"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary">
              <QrCode className="h-5 w-5 text-white" />
            </div>

            <div>
              <div className="text-lg font-bold">
                Print<span className="text-primary">Easy</span>
              </div>

              <div className="text-[10px] text-muted-foreground">
                Print Smarter. Print Easier.
              </div>
            </div>
          </a>

          <p className="mx-auto mt-4 max-w-sm text-sm text-muted-foreground lg:mx-0">
            The modern QR-based document upload platform for cyber cafés and print
            shops.
          </p>

          <div className="mt-6 flex justify-center gap-3 lg:justify-start">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                aria-label="Social link"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 text-center lg:contents lg:text-left">
          {columns.map((c) => (<div key={c.title}>
            <div className="mb-4 text-sm font-semibold">{c.title}</div>
            <ul className="space-y-2.5">
              {c.links.map((l) => (<li key={l}>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary">{l}</a>
              </li>))}
            </ul>
          </div>))}
        </div>
      </div>

      <div className="mt-12 border-t border-border pt-6">

        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

          <p className="text-center text-sm text-muted-foreground md:text-left">
            © {new Date().getFullYear()} PrintEasy. All rights reserved.
          </p>

          <div className="relative self-center md:self-auto" ref={menuRef}>

            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium transition-all hover:border-primary hover:text-primary"
            >
              <Settings className="h-4 w-4" />
              Settings
            </button>

            {open && (
              <div className="absolute bottom-14 right-0 w-60 overflow-hidden rounded-2xl border border-border bg-background shadow-2xl">

                {themes.map((item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setTheme(item.id);
                        setOpen(false);
                      }}
                      className={`flex w-full items-center justify-between px-4 py-3 transition hover:bg-muted ${theme === item.id
                        ? "bg-primary text-primary-foreground"
                        : ""
                        }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </div>

                      {theme === item.id && (
                        <div className="h-2 w-2 rounded-full bg-current" />
                      )}
                    </button>
                  );
                })}

              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  </footer>);
}
