import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight, User, Store, Check } from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

export const Route = createFileRoute("/signup")({
  component: SignupPage,
  head: () => ({
    meta: [
      { title: "Sign up — PrintEasy" },
      { name: "description", content: "Create your PrintEasy account and start printing without WhatsApp." },
      { property: "og:title", content: "Sign up — PrintEasy" },
      { property: "og:description", content: "Create your PrintEasy account in seconds." },
      { name: "robots", content: "noindex" },
    ],
  }),
});

const checks = ["Free plan available forever", "No credit card required", "Setup in under a minute"];

function SignupPage() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("This is a demo — connect Lovable Cloud to enable real auth.");
      navigate({ to: "/" });
    }, 800);
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start replacing WhatsApp printing today — free forever."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="name">Your name</Label>
            <div className="relative">
              <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input id="name" required placeholder="Jane Doe" className="pl-10 h-11" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="shop">Shop name</Label>
            <div className="relative">
              <Store className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input id="shop" required placeholder="Quick Prints" className="pl-10 h-11" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input id="email" type="email" required placeholder="you@printshop.com" className="pl-10 h-11" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input id="password" type={show ? "text" : "password"} required minLength={8} placeholder="At least 8 characters" className="pl-10 pr-10 h-11" />
            <button
              type="button"
              onClick={() => setShow(!show)}
              aria-label={show ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="flex items-start gap-2 pt-1">
          <Checkbox id="terms" required className="mt-0.5" />
          <Label htmlFor="terms" className="text-sm font-normal text-muted-foreground leading-relaxed">
            I agree to the{" "}
            <a href="#" className="text-primary hover:underline">Terms</a> and{" "}
            <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
          </Label>
        </div>

        <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
          {loading ? "Creating account..." : (<>Create account <ArrowRight className="h-4 w-4" /></>)}
        </Button>

        <ul className="grid gap-1.5 pt-1">
          {checks.map((c) => (
            <li key={c} className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-success/15 text-success">
                <Check className="h-2.5 w-2.5" />
              </span>
              {c}
            </li>
          ))}
        </ul>
      </form>
    </AuthLayout>
  );
}
