import * as React from "react";
import { cn } from "../../lib/utils";

function Alert({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-md border-l-4 border-blue-500 bg-blue-50 p-4 text-sm text-blue-700",
        className
      )}
      {...props}
    />
  );
}

function AlertDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-sm leading-relaxed text-blue-700", className)}
      {...props}
    />
  );
}

export { Alert, AlertDescription };
