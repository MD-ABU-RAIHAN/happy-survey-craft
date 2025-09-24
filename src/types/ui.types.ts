/**
 * UI Component Type Definitions
 */

export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface IconProps {
  size?: number;
  className?: string;
}

// Button variants and sizes
export type ButtonVariant =
  | "default"
  | "secondary"
  | "outline"
  | "ghost"
  | "destructive";
export type ButtonSize = "sm" | "default" | "lg";

// Card variants
export type CardVariant = "default" | "elevated" | "outlined" | "filled";

// Modal and Dialog types
export interface ModalProps extends ComponentProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
}

// Form types
export interface FormFieldProps extends ComponentProps {
  label: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

// Theme types
export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  foreground: string;
  muted: string;
  accent: string;
  destructive: string;
  border: string;
}

export type ColorScheme = "light" | "dark" | "system";
