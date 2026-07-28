import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    name: "Free", price: "₹0", suffix: "/month", desc: "Perfect for small shops just getting started.",
    features: ["20 uploads per day", "Basic dashboard", "File auto-delete (24h)", "Email support"],
    cta: "Get Started Free", variant: "outline" as const,
  },
  {
    name: "Pro", price: "₹499", suffix: "/month", desc: "For growing print shops with steady traffic.",
    features: ["Unlimited uploads", "Advanced dashboard", "Analytics & reports", "Priority support", "Online payments"],
    cta: "Start Pro Trial", variant: "hero" as const, popular: true,
  },
  {
    name: "Enterprise", price: "Custom", suffix: "", desc: "For print shop chains and franchises.",
    features: ["Multi-branch support", "Team members & roles", "API access", "Custom integrations", "Dedicated support"],
    cta: "Contact Sales", variant: "outline" as const,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="bg-muted/30 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">Pricing</div>
          <h2 className="text-4xl font-bold tracking-tight lg:text-5xl">
            Simple, <span className="text-gradient-primary">transparent</span> pricing
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">Start free. Upgrade only when you're ready.</p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {tiers.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-3xl border bg-card p-8 ${t.popular ? "border-primary shadow-elegant lg:-translate-y-4 lg:scale-[1.02]" : "border-border"}`}
            >
              {t.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-primary px-4 py-1 text-xs font-semibold text-white shadow-glow">
                  Most Popular
                </div>
              )}
              <div className="mb-6">
                <div className="text-sm font-semibold text-primary">{t.name}</div>
                <div className="mt-1 text-sm text-muted-foreground">{t.desc}</div>
              </div>
              <div className="mb-6 flex items-baseline gap-1">
                <span className="text-5xl font-bold tracking-tight">{t.price}</span>
                {t.suffix && <span className="text-sm text-muted-foreground">{t.suffix}</span>}
              </div>
              <Button variant={t.variant} size="lg" className="w-full">{t.cta}</Button>
              <ul className="mt-8 space-y-3">
                {t.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-success/15 text-success">
                      <Check className="h-3 w-3" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
