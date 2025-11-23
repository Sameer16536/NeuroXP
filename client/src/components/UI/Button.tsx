import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading, 
  className = '', 
  disabled,
  ...props 
}) => {
  const baseStyles = "px-6 py-2 font-display font-bold tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed clip-path-polygon";
  
  // Custom clip-path for angular buttons
  const clipStyle = { clipPath: 'polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)' };

  const variants = {
    primary: "bg-system-blue hover:bg-cyan-400 text-black shadow-[0_0_15px_rgba(0,240,255,0.4)] hover:shadow-[0_0_25px_rgba(0,240,255,0.6)]",
    secondary: "bg-dark-800 hover:bg-dark-700 text-cyan-100 border border-system-border hover:border-cyan-400/50",
    danger: "bg-red-600 hover:bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]",
    ghost: "bg-transparent hover:bg-system-blue/10 text-cyan-400 border border-transparent hover:border-system-blue/30",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading || disabled}
      style={clipStyle}
      {...props}
    >
      {isLoading ? (
        <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
      ) : children}
    </button>
  );
};