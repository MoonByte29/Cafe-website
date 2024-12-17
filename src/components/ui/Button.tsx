import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  className = '',
  ...props
}) => {
  const baseStyles = 'px-4 py-2 rounded-md transition-colors';
  const variantStyles = {
    primary: 'bg-amber-600 text-white hover:bg-amber-700',
    secondary: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
  };

  return (
    <button
      {...props}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </button>
  );
};