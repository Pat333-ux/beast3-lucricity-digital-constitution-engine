import * as React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "destructive" | "success";
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className = "", variant = "default", children, ...props }, ref) => {
    let variantStyles = "bg-primary text-primary-foreground hover:bg-primary/80";
    if (variant === "secondary") {
      variantStyles = "bg-secondary text-secondary-foreground hover:bg-secondary/80";
    } else if (variant === "outline") {
      variantStyles = "border border-border text-foreground";
    } else if (variant === "destructive") {
      variantStyles = "bg-destructive text-destructive-foreground hover:bg-destructive/80";
    } else if (variant === "success") {
      variantStyles = "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800";
    }

    const baseStyles =
      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

    return (
      <div ref={ref} className={`${baseStyles} ${variantStyles} ${className}`} {...props}>
        {children}
      </div>
    );
  }
);

Badge.displayName = "Badge";
