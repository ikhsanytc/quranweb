import { FC, forwardRef, HTMLAttributes, ReactNode } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  center?: boolean;
  column?: boolean;
}

const Container = forwardRef<HTMLDivElement, Props>((props, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      className={`bg-gradient-to-br from-purple-950 text-white to-black min-h-screen ${
        props.center && "flex justify-center items-center"
      } ${props.column && "flex-col"} p-3`}
    >
      {props.children}
    </div>
  );
});

Container.displayName = "Container";

export default Container;
