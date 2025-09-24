import * as React from "react";
import { cn } from "../../lib/utils";

interface RadioGroupProps {
  name: string;
  children: React.ReactNode;
  className?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

function RadioGroup({
  name,
  children,
  className,
  defaultValue,
  onChange,
}: RadioGroupProps) {
  const [value, setValue] = React.useState(defaultValue);

  const handleChange = (val: string) => {
    setValue(val);
    onChange?.(val);
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, {
              name,
              checked: child.props.value === value,
              onChange: () => handleChange(child.props.value),
            })
          : child
      )}
    </div>
  );
}

interface RadioGroupItemProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

function RadioGroupItem({ className, label, ...props }: RadioGroupItemProps) {
  return (
    <label className="inline-flex items-center gap-2 cursor-pointer">
      <input
        type="radio"
        className={cn(
          "h-4 w-4 rounded-full border border-gray-300 text-blue-600 focus:ring-blue-500",
          className
        )}
        {...props}
      />
      {label && <span className="text-sm text-gray-700">{label}</span>}
    </label>
  );
}

export { RadioGroup, RadioGroupItem };
