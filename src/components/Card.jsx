import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  variant = 'light', // 'light' or 'dark'
  hoverGlow = true,
  ...props 
}) => {
  const baseClasses = variant === 'dark' 
    ? 'glass-card-dark p-6 transition-all duration-300' 
    : 'glass-card p-6 transition-all duration-300';
  
  const hoverClasses = hoverGlow 
    ? variant === 'dark' 
      ? 'hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/40 hover:border-white/20' 
      : 'hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/5 hover:border-primary/20'
    : '';

  return (
    <div className={`${baseClasses} ${hoverClasses} ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Card;
