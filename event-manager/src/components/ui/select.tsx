import * as React from "react";
import { cn } from "../../lib/utils";
import { ChevronDown } from "lucide-react";

interface SelectProps {
  children: React.ReactNode;
}

function Select({ children }: SelectProps) {
  return <div className="relative">{children}</div>;
}

function SelectTrigger({ className, ...props }: React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
        className
      )}
      {...props}
    >
      <span className="truncate">
        {props.children || <span className="text-gray-400">Chọn...</span>}
      </span>
      <ChevronDown className="ml-2 h-4 w-4 text-gray-500" />
    </button>
  );
}

function SelectContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "absolute z-10 mt-1 w-full rounded-md border bg-white shadow-lg",
        className
      )}
      {...props}
    />
  );
}

function SelectItem({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "cursor-pointer px-3 py-2 text-sm hover:bg-gray-100",
        className
      )}
      {...props}
    />
  );
}

function SelectValue({ placeholder }: { placeholder?: string }) {
  return <span className="text-gray-700">{placeholder || "Chọn..."}</span>;
}

export { Select, SelectTrigger, SelectContent, SelectItem, SelectValue };
