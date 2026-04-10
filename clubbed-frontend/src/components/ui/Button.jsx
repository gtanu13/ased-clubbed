import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility to merge tailwind classes safely
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Button = forwardRef(({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-full font-medium transition-all focus:outline-none disabled:opacity-50 disabled:pointer-events-none";
  
const variants = {
  // Soft Rose Gold Gradient
  gradient: "bg-gradient-to-r from-[#ff85a1] to-[#ffd700] text-[#0d0208] border-none hover:opacity-90 shadow-[0_0_20px_rgba(255,133,161,0.3)] font-bold",
  
  // Muted Plum Border
  primary: "bg-white/5 border border-[#ff85a1]/30 text-[#ff85a1] hover:bg-[#ff85a1]/10 shadow-none",
  
  secondary: "bg-white/5 border border-white/10 text-white hover:bg-white/10",
  ghost: "bg-transparent text-[#f9bec7] hover:text-white hover:bg-white/5"
};

  const sizes = {
    sm: "h-8 px-4 text-xs",
    md: "h-10 px-6 text-sm",
    lg: "h-12 px-8 text-base"
  };

  return (
    <motion.button
      ref={ref}
      whileTap={{ scale: 0.98 }}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </motion.button>
  );
});

Button.displayName = 'Button';
export default Button;