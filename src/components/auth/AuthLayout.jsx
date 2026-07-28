import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { QrCode, ArrowLeft, ShieldCheck, Zap, Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
const highlights = [
    { icon: Zap, title: "Setup in 60 seconds", desc: "Generate your QR and start receiving jobs." },
    { icon: ShieldCheck, title: "Private by design", desc: "No phone numbers, files auto-delete." },
    { icon: Sparkles, title: "Loved by 500+ shops", desc: "Built with real print shop owners." },
];
export function AuthLayout({ title, subtitle, children, footer, }) {
    return (<div className="min-h-screen grid lg:grid-cols-2 bg-background">
      {/* Left — brand panel */}
      <div className="relative hidden overflow-hidden bg-gradient-hero p-10 lg:flex lg:flex-col">
        <div className="pointer-events-none absolute -top-40 -left-20 h-96 w-96 rounded-full bg-primary/30 blur-3xl"/>
        <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-accent/20 blur-3xl"/>

        <div className="relative z-10 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary shadow-glow">
              <QrCode className="h-5 w-5 text-white"/>
            </div>
            <div className="leading-tight">
              <div className="text-lg font-bold text-white">Print<span className="text-primary-glow">Easy</span></div>
              <div className="text-[10px] text-white/50">Print Smarter. Print Easier.</div>
            </div>
          </Link>
          <Link to="/" className="flex items-center gap-1.5 text-xs text-white/60 hover:text-white">
            <ArrowLeft className="h-3.5 w-3.5"/> Back to site
          </Link>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10 my-auto max-w-md space-y-8">
          <div>
            <h2 className="text-4xl font-bold leading-tight text-white">
              Turn every print job into a <span className="text-gradient-primary">seamless experience.</span>
            </h2>
            <p className="mt-4 text-white/70">
              Join hundreds of print shops replacing WhatsApp with a modern, private, QR-based workflow.
            </p>
          </div>
          <div className="space-y-4">
            {highlights.map((h, i) => (<motion.div key={h.title} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 * i }} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-primary/20 text-primary-glow">
                  <h.icon className="h-4 w-4"/>
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{h.title}</div>
                  <div className="text-xs text-white/60">{h.desc}</div>
                </div>
              </motion.div>))}
          </div>
        </motion.div>

        <div className="relative z-10 text-xs text-white/40">
          © {new Date().getFullYear()} PrintEasy. All rights reserved.
        </div>
      </div>

      {/* Right — form */}
      <div className="relative flex flex-col p-6 sm:p-10">
        <div className="flex items-center justify-between lg:justify-end">
          <Link to="/" className="flex items-center gap-2 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary">
              <QrCode className="h-4 w-4 text-white"/>
            </div>
            <span className="font-bold">Print<span className="text-primary">Easy</span></span>
          </Link>
          <ThemeToggle />
        </div>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mx-auto my-auto w-full max-w-md py-10">
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          <div className="mt-8">{children}</div>
          <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>
        </motion.div>
      </div>
    </div>);
}
