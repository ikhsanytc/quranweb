import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: "normal" | "small";
  styleButton?: "primary" | "secondary";
}

const Button = forwardRef<HTMLButtonElement, Props>(
  ({ children, size = "normal", styleButton = "primary", ...props }, ref) => {
    return (
      <button
        {...props}
        ref={ref}
        className={`inline-block rounded ${
          styleButton === "primary"
            ? "bg-indigo-600 text-white active:bg-indigo-500"
            : "bg-transparent border border-purple-600 text-purple-600"
        } text-sm font-medium transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring ${
          size === "normal" ? "py-3 px-8" : "py-2 px-6"
        }`}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
