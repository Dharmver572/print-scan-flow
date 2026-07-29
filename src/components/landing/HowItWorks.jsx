import { motion } from "framer-motion";
import { QrCode, Upload, Sliders, Printer, ArrowRight } from "lucide-react";
const steps = [
    { icon: QrCode, title: "Scan QR Code", desc: "Customer scans your unique QR code at the counter.", accent: "text-primary bg-primary/10" },
    { icon: Upload, title: "Upload Document", desc: "Files are uploaded straight from the browser — no app.", accent: "text-accent bg-accent/10" },
    { icon: Sliders, title: "Select Settings", desc: "Copies, color, paper size, and duplex — all chosen by the customer.", accent: "text-chart-4 bg-chart-4/10" },
    { icon: Printer, title: "Ready to Print", desc: "The job appears instantly on your dashboard. Just hit print!", accent: "text-success bg-success/10" },
];
export function HowItWorks() {
    return (<section id="how" className="bg-muted/30 py-2 md:py-6">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            How It Works
          </div>
          <h2 className="text-4xl font-bold tracking-tight lg:text-5xl">
            From scan to print in <span className="text-gradient-primary">under 30 seconds</span>
          </h2>
        </div>

        <div className="mt-2 md:mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (<motion.div key={s.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }} className="relative">
              <div className="h-full rounded-3xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elegant">
                <div className="mb-4 flex items-center justify-between">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${s.accent}`}>
                    <s.icon className="h-6 w-6"/>
                  </div>
                  <span className="text-3xl font-bold text-muted-foreground/20">0{i + 1}</span>
                </div>
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
              {i < steps.length - 1 && (<ArrowRight className="absolute top-1/2 -right-5 hidden h-5 w-5 -translate-y-1/2 text-muted-foreground/40 lg:block"/>)}
            </motion.div>))}
        </div>
      </div>
    </section>);
}
