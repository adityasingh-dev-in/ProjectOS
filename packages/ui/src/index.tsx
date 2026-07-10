import React from "react";

export const UI_CONSTANT = "ui";

export interface ButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  className,
}) => {
  return (
    <button onClick={onClick} className={className}>
      {label}
    </button>
  );
};
