import { motion } from "framer-motion";
import { X, Check, MessageCircle, QrCode } from "lucide-react";
const problems = [
    "Customers share personal phone numbers",
    "Manual downloading of every file",
    "Cluttered WhatsApp chats & lost files",
    "No privacy — files stay on personal device",
    "Print settings communicated in messages",
];
const solutions = [
    "Zero phone number exchange — 100% private",
    "Files land straight in your print queue",
    "Organized dashboard with search & filters",
    "Auto-delete after printing for full privacy",
    "Customer picks settings in the browser",
];
export function ProblemSolution() {
    return (<section id="why" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            Why PrintEasy
          </div>
          <h2 className="text-4xl font-bold tracking-tight lg:text-5xl">
            Stop printing through <span className="text-success line-through decoration-2 decoration-destructive">WhatsApp</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            The old way is messy, slow, and unsafe. Here's what changes with PrintEasy.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="rounded-3xl border border-destructive/20 bg-destructive/5 p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-destructive/15 text-destructive">
                <MessageCircle className="h-5 w-5"/>
              </div>
              <div>
                <div className="text-xs font-medium uppercase tracking-wider text-destructive">The Old Way</div>
                <div className="text-xl font-bold">WhatsApp Printing</div>
              </div>
            </div>
            <ul className="space-y-3">
              {problems.map((p) => (<li key={p} className="flex items-start gap-3 text-sm">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-destructive/15 text-destructive">
                    <X className="h-3 w-3"/>
                  </span>
                  <span className="text-foreground/80">{p}</span>
                </li>))}
            </ul>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="rounded-3xl border border-success/20 bg-gradient-to-br from-success/5 to-primary/5 p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-success/15 text-success">
                <QrCode className="h-5 w-5"/>
              </div>
              <div>
                <div className="text-xs font-medium uppercase tracking-wider text-success">The PrintEasy Way</div>
                <div className="text-xl font-bold">QR Code Uploads</div>
              </div>
            </div>
            <ul className="space-y-3">
              {solutions.map((s) => (<li key={s} className="flex items-start gap-3 text-sm">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-success/15 text-success">
                    <Check className="h-3 w-3"/>
                  </span>
                  <span className="text-foreground/80">{s}</span>
                </li>))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>);
}
