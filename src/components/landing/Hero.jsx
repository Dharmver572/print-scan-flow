import { motion } from "framer-motion";
import { Play, ScanLine, UserX, Lock, FileText, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
const badges = [
    { icon: ScanLine, label: "No App Required" },
    { icon: UserX, label: "No Login for Customers" },
    { icon: Lock, label: "100% Secure & Private" },
];
export function Hero() {
    return (<section className="relative overflow-hidden bg-gradient-hero pt-32 pb-24 lg:pt-40 lg:pb-32">
      {/* glow orbs */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl"/>
      <div className="pointer-events-none absolute top-1/3 right-0 h-[400px] w-[400px] rounded-full bg-accent/10 blur-3xl"/>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2">
        {/* Left */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary-glow backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse"/>
            For Cyber Cafés & Print Shops
          </div>

          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-white lg:text-6xl xl:text-7xl">
            Print Documents<br />
            <span className="text-gradient-primary">Without WhatsApp.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
            Customers scan your QR code, upload documents instantly, choose print settings, and your
            print queue is ready — no WhatsApp, no downloads, no phone numbers.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button variant="hero" size="xl">Start Free Trial</Button>
            <Button variant="outlineDark" size="xl">
              <Play className="h-4 w-4"/> Watch Demo
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
            {badges.map((b) => (<div key={b.label} className="flex items-center gap-2 text-sm text-white/60">
                <b.icon className="h-4 w-4 text-accent"/> {b.label}
              </div>))}
          </div>
        </motion.div>

        {/* Right - mockup */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }} className="relative">
          <DashboardMock />
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="absolute -bottom-8 -right-4 w-52 lg:w-60">
            <PhoneMock />
          </motion.div>
        </motion.div>
      </div>
    </section>);
}
function DashboardMock() {
    return (<motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="rounded-3xl border border-white/10 bg-card p-3 shadow-elegant">
      <div className="rounded-2xl bg-background overflow-hidden">
        {/* topbar */}
        <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-destructive/70"/>
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400"/>
            <span className="h-2.5 w-2.5 rounded-full bg-success"/>
          </div>
          <div className="mx-auto text-xs text-muted-foreground">printeasy.app/dashboard</div>
        </div>

        <div className="grid grid-cols-[140px_1fr] min-h-[340px]">
          {/* sidebar */}
          <aside className="border-r border-border bg-muted/30 p-3 space-y-1 text-xs">
            {[
            { l: "Dashboard", active: true },
            { l: "Jobs" }, { l: "Customers" }, { l: "Payments" }, { l: "Analytics" }, { l: "Settings" },
        ].map((i) => (<div key={i.l} className={`rounded-lg px-3 py-2 ${i.active ? "bg-primary text-primary-foreground font-medium" : "text-muted-foreground"}`}>
                {i.l}
              </div>))}
          </aside>

          <div className="p-4 space-y-4">
            <div className="grid grid-cols-4 gap-2.5">
              {[
            { l: "Pending", v: "12", c: "text-primary", bg: "bg-primary/10" },
            { l: "Printing", v: "3", c: "text-accent", bg: "bg-accent/10" },
            { l: "Completed", v: "25", c: "text-success", bg: "bg-success/10" },
            { l: "Revenue", v: "₹2,450", c: "text-foreground", bg: "bg-muted" },
        ].map((s) => (<div key={s.l} className={`rounded-xl ${s.bg} p-2.5`}>
                  <div className="text-[10px] text-muted-foreground">{s.l}</div>
                  <div className={`mt-1 text-lg font-bold ${s.c}`}>{s.v}</div>
                </div>))}
            </div>

            <div className="rounded-xl border border-border bg-card">
              <div className="flex items-center justify-between border-b border-border px-3 py-2">
                <div className="text-xs font-semibold">Pending Jobs</div>
                <span className="text-[10px] text-primary">View all</span>
              </div>
              <div className="divide-y divide-border text-[11px]">
                {[
            { id: "#1023", doc: "A4_Document.pdf", set: "B&W • Duplex", t: "2 min" },
            { id: "#1022", doc: "Notes.pdf", set: "Color • Single", t: "5 min" },
            { id: "#1021", doc: "Assignment.docx", set: "B&W • Duplex", t: "10 min" },
        ].map((j) => (<div key={j.id} className="grid grid-cols-[50px_1fr_auto_60px] items-center gap-2 px-3 py-2">
                    <span className="text-muted-foreground">{j.id}</span>
                    <div className="flex items-center gap-1.5 truncate">
                      <FileText className="h-3 w-3 text-primary"/>
                      <span className="truncate font-medium">{j.doc}</span>
                    </div>
                    <span className="text-muted-foreground">{j.set}</span>
                    <button className="rounded-md bg-primary px-2 py-1 text-[10px] font-medium text-primary-foreground">
                      Print
                    </button>
                  </div>))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>);
}
function PhoneMock() {
    return (<motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="rounded-[2rem] border-4 border-dark bg-dark p-1.5 shadow-elegant">
      <div className="rounded-[1.6rem] bg-background p-3">
        <div className="mb-3 flex items-center justify-between text-[10px]">
          <span className="font-semibold">Upload Document</span>
          <span className="text-muted-foreground">1 of 3</span>
        </div>
        <div className="rounded-xl border-2 border-dashed border-primary/40 bg-primary/5 p-4 text-center">
          <Upload className="mx-auto mb-1.5 h-6 w-6 text-primary"/>
          <div className="text-[10px] font-medium">Upload your document</div>
          <div className="mt-0.5 text-[8px] text-muted-foreground">PDF, DOCX, JPG</div>
          <button className="mt-2 rounded-lg bg-gradient-primary px-3 py-1 text-[10px] font-medium text-white">
            Choose File
          </button>
        </div>
        <div className="mt-3 space-y-2 text-[10px]">
          <div className="font-semibold">Print Settings</div>
          {[
            { l: "Copies", v: "2" },
            { l: "Color", v: "B&W" },
            { l: "Paper", v: "A4" },
            { l: "Sides", v: "Double" },
        ].map((r) => (<div key={r.l} className="flex items-center justify-between rounded-lg bg-muted px-2 py-1.5">
              <span className="text-muted-foreground">{r.l}</span>
              <span className="font-medium">{r.v}</span>
            </div>))}
        </div>
        <button className="mt-3 w-full rounded-lg bg-gradient-primary py-2 text-[11px] font-semibold text-white">
          Continue
        </button>
      </div>
    </motion.div>);
}
