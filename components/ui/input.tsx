import { forwardRef, HTMLAttributes, InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, Props>((props, ref) => (
  <div>
    <label
      htmlFor={props.label}
      className={`block text-sm font-medium ${props.error && "text-red-600"}`}
    >
      {props.label}
    </label>

    <input
      id={props.label}
      {...props}
      ref={ref}
      className={`mt-1 w-full rounded-md bg-gray-800 border-2 p-2 outline-none shadow-sm sm:text-sm ${
        props.error
          ? "border-red-500 focus:border-red-600"
          : "focus:border-purple-600"
      }`}
    />
    <p className="text-sm text-red-600 mt-1">{props.error}</p>
  </div>
));

Input.displayName = "Input";

export default Input;
