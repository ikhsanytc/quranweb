import { forwardRef, HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}

export const Card = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  return (
    <div
      className="bg-gray-800 shadow rounded-lg bg-opacity-50 backdrop-filter backdrop-blur py-2 text-white w-full lg:w-1/2"
      {...props}
      ref={ref}
    >
      {props.children}
    </div>
  );
});

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  (props, ref) => {
    return (
      <h1 className="text-center font-bold text-2xl" {...props} ref={ref}>
        {props.children}
      </h1>
    );
  }
);

export const CardHeader = forwardRef<HTMLDivElement, CardProps>(
  (props, ref) => (
    <div {...props} ref={ref} className="px-3 text-center">
      {props.children}
      <hr className="border border-white mt-2 mb-2" />
    </div>
  )
);

export const CardBody = forwardRef<HTMLDivElement, CardProps>((props, ref) => (
  <div className="px-3" {...props} ref={ref}>
    {props.children}
    <hr className="border border-white mt-10 mb-2" />
  </div>
));

export const CardFooter = forwardRef<HTMLDivElement, CardProps>(
  (props, ref) => (
    <div className="px-3" {...props} ref={ref}>
      {props.children}
    </div>
  )
);

Card.displayName = "Card";
CardTitle.displayName = "CardTitle";
CardHeader.displayName = "CardHeader";
CardBody.displayName = "CardBody";
CardFooter.displayName = "CardFooter";
