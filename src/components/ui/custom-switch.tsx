import * as React from "react";
import { cn } from "@/lib/utils";

interface CustomSwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

const CustomSwitch = React.forwardRef<HTMLButtonElement, CustomSwitchProps>(
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
          "relative inline-flex shrink-0 cursor-pointer items-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
          "before:content-[''] before:absolute before:z-[1] before:-top-[0.0625rem] before:-right-[0.0625rem] before:-bottom-[0.0625rem] before:-left-[0.0625rem]",
          checked
            ? "bg-black"
            : "bg-gray-200",
          className
        )}
        style={{
          height: "1.25rem",
          width: "2rem",
          padding: ".25rem",
          boxShadow: "inset 0 .0625rem .25rem rgba(0,0,0,.05)",
          border: "none",
          borderRadius: ".375rem",
          cursor: "pointer"
        }}
        {...props}
      >
        <span
          className={cn(
            "pointer-events-none block rounded-sm bg-white shadow-sm ring-0 transition-transform",
            checked ? "translate-x-3" : "translate-x-0"
          )}
          style={{
            height: "0.75rem",
            width: "0.75rem"
          }}
        />
      </button>
    );
  }
);

CustomSwitch.displayName = "CustomSwitch";

export { CustomSwitch };