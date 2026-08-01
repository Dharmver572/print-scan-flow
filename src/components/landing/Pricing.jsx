import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    name: "Free",
    price: "₹0",
    suffix: "",
    description:
      "Perfect for students and small print shops to get started.",
    features: [
      "20 Documents / Day",
      "QR Code Upload",
      "Basic Print Settings",
      "7 Days Order History",
      "Email Support",
    ],
    button: "Start Free",
    variant: "outline",
  },

  {
    name: "Basic",
    price: "₹149",
    suffix: "/month",
    description:
      "Best for cyber cafés and print shops with unlimited daily usage.",
    features: [
      "Unlimited Documents",
      "Unlimited Customers",
      "Unlimited QR Uploads",
      "Live Print Queue",
      "Live Order Status",
      "Unlimited Order History",
      "Basic Analytics",
      "Priority Support",
    ],
    button: "Get Started",
    variant: "hero",
    popular: true,
  },

  {
    name: "Standard",
    price: "₹499",
    suffix: "/year",
    description:
      "🔥 Limited Time Launch Offer for growing print businesses.",
    features: [
      "Everything in Basic",
      "Advanced Analytics",
      "Revenue Reports",
      "Faster Support",
      "Early Access to New Features",
      "Future Premium Features",
    ],
    button: "Choose Standard",
    variant: "outline",
    launch: true,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative overflow-hidden bg-muted/30 py-4" >
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <div className="mb-4 inline-flex rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            Pricing Plans
          </div>

          <h2 className="text-4xl font-bold lg:text-5xl">
            Affordable Pricing for{" "}
            <span className="text-gradient-primary">
              Every Print Shop
            </span>
          </h2>

          <p className="mt-5 text-lg text-muted-foreground">
            Start with our Free plan and upgrade whenever your
            business grows. No hidden charges. Cancel anytime.
          </p>
        </motion.div>

        {/* Cards */}

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -8 }}
              className={`relative rounded-3xl border bg-card p-8 shadow-sm transition-all duration-300

              ${
                tier.popular
                  ? "border-primary shadow-xl lg:scale-105"
                  : "border-border"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-2 text-xs font-semibold text-white shadow-lg">
                  ⭐ Most Popular
                </div>
              )}

              {tier.launch && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-5 py-2 text-xs font-semibold text-white shadow-lg">                  Launch Offer
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold">
                  {tier.name}
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  {tier.description}
                </p>
              </div>

              <div className="mt-8 flex items-end">
                <span className="text-5xl font-bold">
                  {tier.price}
                </span>

                {tier.suffix && (
                  <span className="ml-2 text-muted-foreground">
                    {tier.suffix}
                  </span>
                )}
              </div>

              <Button
                variant={tier.variant}
                size="lg"
                className="mt-8 w-full"
              >
                {tier.button}
              </Button>

              <div className="my-8 h-px bg-border" />

              <ul className="space-y-4">
                {tier.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3"
                  >
                    <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-green-500/10">
                      <Check
                        className="h-4 w-4 text-green-600"
                      />
                    </span>

                    <span className="text-sm">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Launch Offer */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 rounded-3xl border border-primary/20 bg-primary/5 p-8 text-center"
        >
          <h3 className="text-2xl font-bold">
            🎉 Limited Time Launch Offer
          </h3>

          <p className="mt-4 text-muted-foreground">
            Upgrade to the{" "}
            <span className="font-semibold text-primary">
              Standard Plan
            </span>{" "}
            for just{" "}
            <span className="font-bold text-primary">
              ₹499/year
            </span>{" "}
            and lock in this special introductory pricing before it
            increases.
          </p>

          <Button
            variant="hero"
            size="lg"
            className="mt-6"
          >
            Upgrade Now
          </Button>
        </motion.div>
      </div>
    </section>
  );
}