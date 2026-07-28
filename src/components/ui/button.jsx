import * as React from "react";
import { cn } from "@/lib/utils";
const variantClasses = {
    default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
    hero: "bg-gradient-primary text-primary-foreground shadow-elegant hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300",
    outlineDark: "border border-white/20 bg-white/5 text-white backdrop-blur hover:bg-white/10",
    destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
    outline: "border border-input bg-background shadow-sm hover:bg-accent/10 hover:text-foreground",
    secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
    ghost: "hover:bg-accent/10 hover:text-foreground",
    link: "text-primary underline-offset-4 hover:underline",
};
const sizeClasses = {
    default: "h-10 px-5 py-2",
    sm: "h-8 rounded-md px-3 text-xs",
    lg: "h-12 rounded-xl px-7 text-base",
    xl: "h-14 rounded-2xl px-8 text-base",
    icon: "h-9 w-9",
};
export function buttonVariants({ variant = "default", size = "default", className } = {}) {
    return cn("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed", variantClasses[variant], sizeClasses[size], className);
}
const Button = React.forwardRef(({ className, variant = "default", size = "default", ...props }, ref) => {
    return (<button ref={ref} className={buttonVariants({ variant, size, className })} {...props}/>);
});
Button.displayName = "Button";
export { Button };
