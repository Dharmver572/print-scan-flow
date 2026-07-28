import { motion } from "framer-motion";
import { QrCode, FileText, Zap, Users } from "lucide-react";
const stats = [
    { icon: QrCode, value: "500+", label: "Print Shops" },
    { icon: FileText, value: "1M+", label: "Documents Printed" },
    { icon: Zap, value: "99.9%", label: "Uptime" },
    { icon: Users, value: "10K+", label: "Happy Customers" },
];
export function Stats() {
    return (<section className="relative -mt-14 px-6">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mx-auto grid max-w-6xl grid-cols-2 gap-6 rounded-3xl border border-border bg-card p-8 shadow-elegant md:grid-cols-4">
        {stats.map((s, i) => (<motion.div key={s.label} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <s.icon className="h-6 w-6"/>
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">{s.value}</div>
              <div className="text-sm text-muted-foreground">{s.label}</div>
            </div>
          </motion.div>))}
      </motion.div>
    </section>);
}
