import React from 'react';
import { Link } from 'react-router-dom';
import { Sun, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Clock } from 'lucide-react';
import logoImg from '../assets/logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'AMC Plans', path: '/amc' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <footer className="bg-slate-950 text-white pt-16 pb-8 border-t border-white/5 relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-white/10">

          {/* Column 1: Company Logo & Details (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4 text-left">
            <Link to="/" className="relative inline-block transition-transform duration-300 w-fit">
              <img
                src={logoImg}
                alt="Surya Solar Logo"
                className="h-40 sm:h-40 w-auto object-contain relative z-10"
              />
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed mt-2 font-normal">
              Surya Solar is a leading system integrator of solar rooftop power solutions. Headquartered in Hyderabad, we design and execute high-yield, wind-load tested systems with lifetime AMC support.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-4">
              {[
                { icon: Facebook, href: 'https://facebook.com' },
                { icon: Twitter, href: 'https://twitter.com' },
                { icon: Instagram, href: 'https://instagram.com' },
                { icon: Linkedin, href: 'https://linkedin.com' },
              ].map((social, idx) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-slate-900 border border-white/5 hover:border-secondary hover:text-secondary rounded-lg transition-all duration-300"
                  >
                    <IconComponent className="h-4.5 w-4.5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Quick Links (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-4 text-left">
            <h3 className="font-heading font-bold text-sm uppercase tracking-widest text-secondary border-b border-white/5 pb-2">
              Quick Links
            </h3>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-slate-400 hover:text-secondary text-sm transition-colors duration-300 font-medium"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Working Hours (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-4 text-left">
            <h3 className="font-heading font-bold text-sm uppercase tracking-widest text-secondary border-b border-white/5 pb-2">
              Working Hours
            </h3>
            <div className="flex flex-col gap-3 mt-2 text-sm text-slate-400 font-medium">
              <div className="flex gap-2 items-start">
                <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-semibold">Mon - Sat</p>
                  <p className="text-xs">10:00 AM - 5:30 PM</p>
                </div>
              </div>
              <div className="flex gap-2 items-start">
                <Clock className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-semibold">Sunday</p>
                  <p className="text-xs text-red-400">Closed (Support Available)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Contact Coordinate Summary (3 cols) */}
          <div className="lg:col-span-3 flex flex-col gap-4 text-left">
            <h3 className="font-heading font-bold text-sm uppercase tracking-widest text-secondary border-b border-white/5 pb-2">
              Corporate Address
            </h3>
            <div className="flex flex-col gap-3 mt-2 text-sm text-slate-400 font-medium">
              <div className="flex gap-2 items-start">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  MN Reddy Nagar, Suchitra, Hyderabad, Telangana - 500055
                </span>
              </div>
              <div className="flex gap-2 items-center">
                <Phone className="h-4.5 w-4.5 text-primary shrink-0" />
                <span>+91 74002 04544</span>
              </div>
              <div className="flex gap-2 items-center">
                <Mail className="h-4.5 w-4.5 text-primary shrink-0" />
                <span>Infosuryasolar.in@gmail.com</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright, Terms, Privacy Regulations */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 text-xs text-slate-500 font-medium">
          <p>© {currentYear} Surya Solar. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/" className="hover:text-secondary transition-colors">Privacy Policy</Link>
            <Link to="/" className="hover:text-secondary transition-colors">Terms of Service</Link>
            <Link to="/" className="hover:text-secondary transition-colors">Discom Regulations</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;