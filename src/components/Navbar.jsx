import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MessageSquare, MapPin, Mail, Clock } from 'lucide-react';
import Button from './Button';
import logoImg from '../assets/logo.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const location = useLocation();
  const currentPath = location.pathname;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'AMC Plans', path: '/amc' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Handle screen resize to toggle mobile dimensions
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle scroll trigger for navbar height and Top Bar collapse
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const topOffset = isMobile 
    ? (isScrolled ? '80px' : '96px') 
    : (isScrolled ? '80px' : '136px');

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
      
      {/* 1. Header Top (Top Bar) - Collapses on scroll */}
      <div 
        className={`bg-slate-950/95 border-b border-slate-800 text-slate-300 transition-all duration-300 hidden md:block ${
          isScrolled 
            ? 'h-0 opacity-0 overflow-hidden border-none' 
            : 'h-10 opacity-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between text-xs font-medium">
          {/* Top Left - Location and Phone */}
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-secondary" />
              Suchitra, Hyderabad, Telangana
            </span>
            <a 
              href="tel:+917400204544" 
              className="flex items-center gap-1.5 hover:text-secondary transition-colors"
            >
              <Phone className="h-3.5 w-3.5 text-secondary" />
              +91 74002 04544
            </a>
          </div>

          {/* Top Right - Email and Clock */}
          <div className="flex items-center gap-6">
            <a 
              href="mailto:Infosuryasolar.in@gmail.com" 
              className="flex items-center gap-1.5 hover:text-secondary transition-colors"
            >
              <Mail className="h-3.5 w-3.5 text-secondary" />
              Infosuryasolar.in@gmail.com
            </a>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-secondary" />
              Mon-Sat: 9.00 AM - 7.00 PM
            </span>
          </div>
        </div>
      </div>

      {/* 2. Header Lower (Main Nav Bar) */}
      <nav className="glass-nav w-full transition-all duration-300 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between transition-all duration-300 ${
            isScrolled ? 'h-20' : 'h-24'
          }`}>

            {/* Logo Container */}
            <Link to="/" className="flex items-center relative h-full overflow-visible">
              <img
                src={logoImg}
                alt="Surya Solar Logo"
                className={`w-auto object-contain transition-all duration-300 transform origin-left ${
                  isScrolled
                    ? 'h-[120px] sm:h-[68px] scale-105'
                    : 'h-[120px] sm:h-[88px] scale-110'
                }`}
              />
            </Link>

            {/* Desktop Navigation Links (with Underline Slide effect) */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = currentPath === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`relative py-2 text-sm font-semibold transition-colors duration-300 ${
                      isActive 
                        ? 'text-primary' 
                        : 'text-dark/85 hover:text-primary'
                    } after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 ${
                      isActive 
                        ? 'after:w-full' 
                        : 'after:w-0 hover:after:w-full'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Get Quote CTA Button */}
            <div className="hidden lg:flex items-center gap-3">
              <Button
                variant="secondary"
                href="/contact"
                className="py-2.5 px-6 text-sm font-bold shadow-md hover:shadow-lg"
              >
                Get Quote
              </Button>
            </div>

            {/* Mobile Actions and Hamburger (Visible on mobile/tablet) */}
            <div className="flex lg:hidden items-center gap-4">
              <a
                href="tel:+917400204544"
                className="p-2 rounded-full text-primary hover:bg-primary/10 transition-colors"
                aria-label="Call Now"
              >
                <Phone className="h-5 w-5" />
              </a>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-xl text-dark hover:bg-dark/5 transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        {isMobileMenuOpen && (
          <div 
            className="lg:hidden fixed left-0 w-full z-40 transition-all duration-300 flex flex-col justify-between py-6 px-6 overflow-y-auto bg-white border-b border-slate-100 shadow-2xl pb-14"
            style={{
              top: topOffset,
              height: `calc(100dvh - ${topOffset})`,
            }}
          >
            <div className="flex flex-col gap-1.5">
              {navLinks.map((link) => {
                const isActive = currentPath === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-5 py-3 text-base font-semibold rounded-xl transition-all duration-200 flex items-center justify-between group ${
                      isActive
                        ? 'text-primary bg-primary/5 font-bold shadow-sm'
                        : 'text-dark/80 hover:text-primary hover:bg-primary/5'
                    }`}
                  >
                    <span>{link.name}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-primary">→</span>
                  </Link>
                );
              })}
            </div>

            {/* Action CTAs in Mobile Drawer */}
            <div className="flex flex-col gap-3 mt-6 pt-5 border-t border-slate-100">
              <Button
                variant="outline"
                href="tel:+917400204544"
                className="w-full py-3.5 border-slate-200 text-dark hover:bg-slate-50 font-bold"
              >
                <Phone className="h-4 w-4" />
                <span>Call Now</span>
              </Button>

              <Button
                variant="primary"
                href="https://wa.me/917400204544?text=Hi%20Surya%20Solar,%20I'm%20interested%20in%20solar%20rooftop%20installation."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 font-bold"
              >
                <MessageSquare className="h-4 w-4 fill-white" />
                <span>WhatsApp</span>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;