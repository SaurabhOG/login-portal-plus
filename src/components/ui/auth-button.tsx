import * as React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface AuthButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "social";
  isLoading?: boolean;
  icon?: React.ReactNode;
}

const AuthButton = React.forwardRef<HTMLButtonElement, AuthButtonProps>(
  ({ className, variant = "primary", isLoading, icon, children, disabled, ...props }, ref) => {
    const baseStyles = "flex h-12 w-full items-center justify-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
    
    const variants = {
      primary: "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98]",
      social: "bg-auth-social-bg text-auth-social-text border border-auth-social-border hover:bg-opacity-90 hover:shadow-sm active:scale-[0.98]",
    };

    return (
      <button
        className={cn(baseStyles, variants[variant], className)}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <>
            {icon && <span className="flex-shrink-0">{icon}</span>}
            {children}
          </>
        )}
      </button>
    );
  }
);
AuthButton.displayName = "AuthButton";

export { AuthButton };
