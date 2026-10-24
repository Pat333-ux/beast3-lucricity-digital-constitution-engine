import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", children, ...props }, ref) => {
    let variantStyles = "bg-primary text-primary-foreground shadow hover:bg-primary/90";
    if (variant === "secondary") {
      variantStyles = "bg-secondary text-secondary-foreground hover:bg-secondary/80";
    } else if (variant === "outline") {
      variantStyles = "border border-border bg-background hover:bg-muted hover:text-accent-foreground";
    } else if (variant === "ghost") {
      variantStyles = "hover:bg-muted hover:text-accent-foreground";
    } else if (variant === "destructive") {
      variantStyles = "bg-destructive text-destructive-foreground hover:bg-destructive/90";
    }

    let sizeStyles = "h-9 px-4 py-2 text-sm";
    if (size === "sm") {
      sizeStyles = "h-8 rounded-md px-3 text-xs";
    } else if (size === "lg") {
      sizeStyles = "h-11 rounded-md px-8 text-base";
    }

    const baseStyles =
      "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
