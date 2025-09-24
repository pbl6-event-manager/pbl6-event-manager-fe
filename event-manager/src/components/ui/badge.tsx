import * as React from "react";
import { cn } from "../../lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "destructive" | "outline";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variant === "default" && "bg-blue-100 text-blue-700",
        variant === "secondary" && "bg-gray-100 text-gray-700",
        variant === "destructive" && "bg-red-100 text-red-700",
        variant === "outline" &&
          "border border-gray-300 text-gray-700 bg-transparent",
        className
      )}
      {...props}
    />
  );
}

export { Badge };
