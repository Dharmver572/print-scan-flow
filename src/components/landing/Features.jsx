import { motion } from "framer-motion";
import { QrCode, LayoutDashboard, ShieldCheck, Cloud, Printer, CreditCard, BarChart3, Building2 } from "lucide-react";
const features = [
    { icon: QrCode, title: "QR Code Upload", desc: "Unique QR code for each shop. Customers can upload instantly.", color: "text-primary bg-primary/10" },
    { icon: LayoutDashboard, title: "Instant Dashboard", desc: "Files appear on your dashboard in real-time. No refresh needed.", color: "text-accent bg-accent/10" },
    { icon: ShieldCheck, title: "Privacy Focused", desc: "No phone numbers exchanged. 100% private & GDPR-friendly.", color: "text-success bg-success/10" },
    { icon: Cloud, title: "Cloud Storage", desc: "Secure cloud storage with auto delete after print (configurable).", color: "text-chart-4 bg-chart-4/10" },
    { icon: Printer, title: "One Click Print", desc: "No downloading. Print directly from your browser.", color: "text-destructive bg-destructive/10" },
    { icon: CreditCard, title: "Online Payments", desc: "Accept online payments before or after printing (optional).", color: "text-chart-5 bg-chart-5/10" },
    { icon: BarChart3, title: "Analytics", desc: "Track orders, revenue, popular documents and much more.", color: "text-primary bg-primary/10" },
    { icon: Building2, title: "Multi Branch", desc: "Manage multiple outlets from a single account with ease.", color: "text-accent bg-accent/10" },
];
export function Features() {
    return (<section id="features" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            Features
          </div>
          <h2 className="text-4xl font-bold tracking-tight lg:text-5xl">
            Powerful features, <span className="text-gradient-primary">zero setup</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything a modern print shop needs — designed to save time and delight customers.
          </p>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (<motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 4) * 0.05, duration: 0.5 }} className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-elegant hover:border-primary/30">
              <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${f.color} transition-transform group-hover:scale-110`}>
                <f.icon className="h-5 w-5"/>
              </div>
              <h3 className="text-base font-semibold">{f.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>))}
        </div>
      </div>
    </section>);
}
