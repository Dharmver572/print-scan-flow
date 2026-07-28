import * as React from "react";
import { cn } from "@/lib/utils";
const Checkbox = React.forwardRef(({ className, ...props }, ref) => (<input ref={ref} type="checkbox" className={cn("h-4 w-4 rounded-sm border border-input bg-background text-primary accent-primary shadow-sm transition duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", className)} {...props}/>));
Checkbox.displayName = "Checkbox";
export { Checkbox };
