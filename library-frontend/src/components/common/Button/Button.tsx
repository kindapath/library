import { forwardRef } from "react";
import { ButtonProps } from "./Button.types";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, isLoading = false, className = "", disabled, ...props },
    ref
  ) => {
    const baseClass = "button";
    const classes = [baseClass, className].filter(Boolean).join(" ");

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="button__loader">Loading...</span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
