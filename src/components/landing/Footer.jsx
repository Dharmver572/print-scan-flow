import { QrCode, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
const columns = [
    { title: "Product", links: ["Features", "How It Works", "Pricing", "Dashboard"] },
    { title: "Company", links: ["About Us", "Contact Us", "Privacy Policy", "Terms & Conditions"] },
    { title: "Resources", links: ["Help Center", "Blog", "Status", "Changelog"] },
];
export function Footer() {
    return (<footer className="border-t border-border bg-muted/20">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary">
                <QrCode className="h-5 w-5 text-white"/>
              </div>
              <div>
                <div className="text-lg font-bold">Print<span className="text-primary">Easy</span></div>
                <div className="text-[10px] text-muted-foreground">Print Smarter. Print Easier.</div>
              </div>
            </a>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              The modern QR-based document upload platform for cyber cafés and print shops.
            </p>
            <div className="mt-6 flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (<a key={i} href="#" className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:border-primary hover:text-primary" aria-label="Social link">
                  <Icon className="h-4 w-4"/>
                </a>))}
            </div>
          </div>

          {columns.map((c) => (<div key={c.title}>
              <div className="mb-4 text-sm font-semibold">{c.title}</div>
              <ul className="space-y-2.5">
                {c.links.map((l) => (<li key={l}>
                    <a href="#" className="text-sm text-muted-foreground hover:text-primary">{l}</a>
                  </li>))}
              </ul>
            </div>))}
        </div>

        <div className="mt-12 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} PrintEasy. All rights reserved.
        </div>
      </div>
    </footer>);
}
