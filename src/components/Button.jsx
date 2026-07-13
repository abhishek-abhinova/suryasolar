import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({ 
  children, 
  variant = 'primary', 
  onClick, 
  type = 'button',
  className = '', 
  href,
  ...props 
}) => {
  const baseStyles = 'glass-btn px-6 py-3 flex items-center justify-center gap-2 font-semibold transition-all duration-300 active:scale-95 text-sm md:text-base border';
  
  const variants = {
    primary: 'bg-primary text-white border-primary/20 hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/25',
    secondary: 'bg-secondary text-dark border-secondary/20 hover:bg-secondary-dark hover:shadow-lg hover:shadow-secondary/25',
    outline: 'bg-transparent text-primary border-primary/30 hover:bg-primary/5',
    glass: 'bg-white/20 text-dark border-white/30 backdrop-blur-sm hover:bg-white/35 hover:shadow-lg',
    glassDark: 'bg-dark/40 text-white border-white/10 backdrop-blur-sm hover:bg-dark/50 hover:shadow-lg hover:shadow-black/20',
  };

  const combinedClasses = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    const isLocal = href.startsWith('/');
    if (isLocal) {
      return (
        <Link to={href} className={combinedClasses} {...props}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} className={combinedClasses} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={combinedClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
