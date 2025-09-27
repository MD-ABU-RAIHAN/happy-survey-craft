import * as React from "react";
import { cn } from "@/lib/utils";

interface SlimSwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

const SlimSwitch = React.forwardRef<HTMLButtonElement, SlimSwitchProps>(
  ({ checked, onCheckedChange, disabled = false, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onCheckedChange(!checked)}
        className={cn(
          "relative inline-flex shrink-0 cursor-pointer items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
          checked
            ? "bg-black"
            : "bg-gray-300",
          className
        )}
        style={{
          inlineSize: "2rem",
          minInlineSize: "2rem",
          blockSize: "1rem"
        }}
        {...props}
      >
        <span
          className={cn(
            "pointer-events-none block rounded-full bg-white shadow-sm transition-transform",
            checked ? "translate-x-5" : "translate-x-1"
          )}
          style={{
            inlineSize: "0.5rem",
            blockSize: "0.5rem"
          }}
        />
      </button>
    );
  }
);

SlimSwitch.displayName = "SlimSwitch";

export { SlimSwitch };