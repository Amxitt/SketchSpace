"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children?: ReactNode;
  className?: string;
  appName?: string;
  size? : "lg" | "sm",
  variant?: string
}

export const Button = ({ children, className, appName }: ButtonProps) => {
  return (
    <button
      className={className}
    >
      {children}
    </button>
  );
};
