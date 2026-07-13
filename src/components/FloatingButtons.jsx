import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const WhatsAppIcon = () => (
  <svg viewBox="0 0 32 32" className="w-7 h-7" fill="white" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.668 4.61 1.832 6.5L4 29l7.75-1.813A11.94 11.94 0 0 0 16 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 2c5.523 0 10 4.477 10 10s-4.477 10-10 10a9.94 9.94 0 0 1-5.03-1.36l-.36-.21-4.6 1.077 1.1-4.48-.23-.37A9.94 9.94 0 0 1 6 15c0-5.523 4.477-10 10-10zm-3.5 5c-.2 0-.52.075-.8.375C11.42 10.675 10 12.1 10 13.9c0 1.8 1.325 3.55 1.5 3.8.2.225 2.575 4.025 6.3 5.475 3.1 1.225 3.725.975 4.4.925.675-.05 2.175-.875 2.475-1.725.3-.85.3-1.575.213-1.725-.088-.125-.313-.2-.663-.375-.35-.175-2.075-1.025-2.4-1.138-.325-.125-.55-.175-.775.175-.225.35-.875 1.138-1.075 1.363-.2.225-.4.25-.75.075-.35-.175-1.475-.538-2.813-1.725-1.038-.925-1.738-2.063-1.938-2.413-.2-.35-.025-.538.15-.713.163-.163.35-.425.525-.638.175-.213.225-.363.35-.6.125-.238.063-.45-.025-.625-.088-.175-.763-1.888-1.063-2.575-.275-.663-.563-.563-.775-.575-.2-.013-.425-.013-.65-.013z"/>
  </svg>
);

const FloatingButtons = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 300);
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 items-end">
      {/* WhatsApp Button */}
      <a
        href="https://wa.me/917400204544?text=Hi%20Surya%20Solar,%20I'm%20interested%20in%20solar%20rooftop%20installation."
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 hover:shadow-[#25D366]/40 border border-white/20"
        title="Chat on WhatsApp"
      >
        <WhatsAppIcon />
      </a>

      {/* Scroll to Top Button */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="flex items-center justify-center w-12 h-12 bg-white text-dark rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 border border-slate-200 backdrop-blur-md"
          title="Back to Top"
        >
          <ArrowUp className="w-5 h-5 text-primary" />
        </button>
      )}
    </div>
  );
};

export default FloatingButtons;
