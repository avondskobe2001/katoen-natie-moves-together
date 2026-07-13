import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "border-kn-red/25 bg-kn-red-soft text-kn-red-dark",
        secondary: "border-kn-red/15 bg-muted text-kn-red",
        success: "border-red-200 bg-kn-red-soft text-kn-red-dark",
        outline: "border-border bg-card text-muted-foreground",
        cycling: "border-red-200 bg-kn-red-soft text-kn-red-dark",
        football: "border-red-200 bg-kn-red-soft text-kn-red",
        running: "border-red-200 bg-kn-red-soft text-kn-red-dark",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };