import React, { useState, useEffect, useRef } from 'react';
import { Sun, CheckSquare, ShieldCheck, Heart } from 'lucide-react';
import Card from '../components/Card';

const AnimatedNumber = ({ value, suffix = '', duration = 1500 }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const target = parseInt(value.replace(/,/g, ''), 10);
    if (isNaN(target)) {
      setCount(value);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTime = null;

          const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const easeProgress = progress * (2 - progress); // easeOutQuad
            const currentCount = Math.floor(easeProgress * target);
            
            setCount(currentCount);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(target);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    const currentEl = elementRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      if (currentEl) {
        observer.unobserve(currentEl);
      }
    };
  }, [value, duration]);

  const formattedCount = value.includes(',') ? count.toLocaleString('en-IN') : count;

  return (
    <span ref={elementRef}>
      {formattedCount}
      {suffix}
    </span>
  );
};

const Stats = () => {
  const stats = [
    {
      value: '500+',
      label: 'Projects Completed',
      desc: 'Across Hyderabad and surrounding regions',
      icon: Sun,
      color: 'bg-teal-500/10 text-teal-600',
    },
    {
      value: '100%',
      label: 'Satisfaction Rate',
      desc: 'Top-tier liaison and support services',
      icon: CheckSquare,
      color: 'bg-amber-500/10 text-amber-600',
    },
    {
      value: '25+',
      label: 'Years Warranty',
      desc: 'Linear performance warranty on Tier-1 panels',
      icon: ShieldCheck,
      color: 'bg-sky-500/10 text-sky-600',
    },
    {
      value: '1,000+',
      label: 'Happy Customers',
      desc: 'Homeowners and enterprises cutting expenses',
      icon: Heart,
      color: 'bg-rose-500/10 text-rose-600',
    },
  ];

  return (
    <section className="py-16 bg-slate-900 text-white relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(15,118,110,0.1),transparent_50%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Card
                key={idx}
                variant="dark"
                hoverGlow={true}
                className="p-8 border border-white/5 bg-slate-800/40 backdrop-blur-md flex flex-col items-center justify-center text-center"
              >
                {/* Icon wrapper */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border border-white/10 ${stat.color} mb-6`}>
                  <Icon className="h-6 w-6" />
                </div>

                {/* Counter value */}
                <span className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-secondary to-white font-heading tracking-tight">
                  <AnimatedNumber 
                    value={stat.value.replace(/[+%]/g, '')} 
                    suffix={stat.value.includes('+') ? '+' : stat.value.includes('%') ? '%' : ''} 
                  />
                </span>

                {/* Labels */}
                <h3 className="font-heading font-bold text-lg text-white mt-4">
                  {stat.label}
                </h3>
                <p className="text-xs text-slate-400 mt-2 font-normal leading-relaxed max-w-[200px]">
                  {stat.desc}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;
