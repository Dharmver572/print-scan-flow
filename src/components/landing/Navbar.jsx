import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { QrCode, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const links = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how" },
  { label: "Pricing", href: "#pricing" },
  { label: "Why Us", href: "#why" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);

    onScroll();
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-dark/80 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
            <QrCode className="h-5 w-5 text-white" />
          </div>

          <div className="leading-tight">
            <div className="text-lg font-bold text-white">
              Print<span className="text-primary-glow">Easy</span>
            </div>

            <div className="text-[10px] text-white/50">
              Print Smarter. Print Easier.
            </div>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/login"
            className="text-sm font-medium text-white/80 hover:text-white"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="inline-flex items-center justify-center rounded-md bg-gradient-primary px-5 py-2 text-sm font-medium text-white shadow-elegant transition hover:shadow-glow hover:-translate-y-0.5"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="text-white md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="space-y-3 border-t border-white/10 bg-dark/95 px-6 py-4 backdrop-blur-xl md:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-sm text-white/80"
            >
              {l.label}
            </a>
          ))}

          <Link
            to="/login"
            onClick={() => setOpen(false)}
            className="block pt-2 text-sm text-white/80"
          >
            Login
          </Link>

          <Link
            to="/signup"
            onClick={() => setOpen(false)}
            className="inline-flex w-full items-center justify-center rounded-md bg-gradient-primary px-5 py-3 text-sm font-medium text-white shadow-elegant transition hover:-translate-y-0.5 hover:shadow-glow"
          >
            Sign Up
          </Link>
        </div>
      )}
    </motion.header>
  );
}