import { motion } from "framer-motion";
import { ArrowRight, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
export function CTA() {
    return (<section className="px-6 pb-24">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-hero p-10 lg:p-16 shadow-elegant">
        <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-primary/40 blur-3xl"/>
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-accent/30 blur-3xl"/>

        <div className="relative flex flex-col items-center justify-between gap-6 lg:flex-row">
          <div className="flex items-start gap-5">
            <div className="hidden h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-white/10 backdrop-blur sm:flex">
              <QrCode className="h-7 w-7 text-white"/>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white lg:text-3xl">
                Ready to stop using WhatsApp for printing?
              </h3>
              <p className="mt-2 text-white/70">
                Join 500+ print shops already simplifying their workflow with PrintEasy.
              </p>
            </div>
          </div>
          <Button variant="hero" size="xl" className="flex-shrink-0">
            Start Free Today <ArrowRight className="h-4 w-4"/>
          </Button>
        </div>
      </motion.div>
    </section>);
}
