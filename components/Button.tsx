import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  icon,
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-[#0B0B0C] text-white hover:bg-[#1C1C1E] shadow-xl shadow-black/5",
    secondary: "bg-[#F5F5F7] text-[#0B0B0C] hover:bg-[#E5E5EA]",
    outline: "border border-[#E5E5EA] text-[#0B0B0C] hover:border-[#86868B] bg-transparent",
    ghost: "text-[#86868B] hover:text-[#0B0B0C] bg-transparent"
  };

  const sizes = {
    sm: "text-xs px-4 py-2 gap-1.5",
    md: "text-sm px-6 py-3 gap-2",
    lg: "text-base px-8 py-4 gap-2.5"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
      {icon && <span className="ml-1">{icon}</span>}
    </motion.button>
  );
};