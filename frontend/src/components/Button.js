import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "./lib/utils";

const buttonVariants = {
  default: "bg-primary text-white hover:bg-primary/90",
  outline: "border border-gray-200 bg-white hover:bg-gray-50 text-gray-900",
  secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
  ghost: "hover:bg-gray-100",
  link: "text-primary underline-offset-4 hover:underline",
};

const buttonSizes = {
  default: "h-9 px-4 py-2",
  sm: "h-8 rounded-full px-3 text-sm",
  lg: "h-10 rounded-md px-8",
  icon: "h-9 w-9",
};

const Button = React.forwardRef(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          buttonVariants[variant],
          buttonSizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
