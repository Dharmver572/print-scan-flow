import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqs = [
  { q: "Do customers need to login or create an account?", a: "No. Customers just scan the QR code and upload — no login, no signup, no app installation required." },
  { q: "Which file formats are supported?", a: "PDF, DOCX, DOC, JPG, PNG, and most common document formats. You can also configure allowed formats per shop." },
  { q: "How long are files stored?", a: "By default, files are auto-deleted 24 hours after printing. You can configure retention rules from your dashboard." },
  { q: "Can customers pay online?", a: "Yes, PrintEasy Pro supports online payments before or after printing. Payments are optional and fully configurable." },
  { q: "Is my data secure?", a: "Absolutely. All uploads are encrypted in transit and at rest. No phone numbers are exchanged and files auto-delete after print." },
  { q: "Can I use this on mobile?", a: "Yes — the dashboard works beautifully on mobile, tablet, and desktop. Manage jobs from anywhere." },
];

export function FAQ() {
  return (
    <section id="faq" className="py-24 lg:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">FAQ</div>
          <h2 className="text-4xl font-bold tracking-tight lg:text-5xl">
            Frequently asked <span className="text-gradient-primary">questions</span>
          </h2>
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="rounded-2xl border border-border bg-card px-5 data-[state=open]:border-primary/40 data-[state=open]:shadow-soft"
              >
                <AccordionTrigger className="text-left text-base font-medium hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
