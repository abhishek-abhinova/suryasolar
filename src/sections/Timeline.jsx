import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MessageSquareText, ShieldAlert, Layers3, Flame, RefreshCcw, HeartHandshake } from 'lucide-react';
import Card from '../components/Card';

const Timeline = () => {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(-1);

  const steps = [
    {
      icon: MessageSquareText,
      step: '01',
      title: 'Free Consultation',
      desc: 'We analyze your electricity bills, power requirements, and outline initial savings potential with government subsidies.',
    },
    {
      icon: ShieldAlert,
      step: '02',
      title: 'Technical Site Survey',
      desc: 'Our senior engineers visit your roof in Hyderabad to perform shade analysis, check structural loading, and measure space.',
    },
    {
      icon: Layers3,
      step: '03',
      title: 'Custom Engineering & Design',
      desc: 'We create 3D solar layouts and shadow mapping models to ensure maximum sun exposure and structural stability.',
    },
    {
      icon: Flame,
      step: '04',
      title: 'Seamless Installation',
      desc: 'Our trained technicians install hot-dip galvanized mounting structures and mount Tier-1 solar panels within 15 days.',
    },
    {
      icon: RefreshCcw,
      step: '05',
      title: 'Liaison & Net Metering',
      desc: 'We coordinate with TSSPDCL to replace your standard meter with a bidirectional net meter, enabling solar power export.',
    },
    {
      icon: HeartHandshake,
      step: '06',
      title: 'Testing & Lifetime Support',
      desc: 'We run full string diagnostics, set up mobile app monitoring on your phone, and kickstart lifetime support AMC plans.',
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Start timeline fill when container top reaches 75% viewport height
      const startPoint = viewportHeight * 0.75;
      // Complete timeline fill when container bottom reaches 25% viewport height
      const endPoint = viewportHeight * 0.25;
      
      const totalHeight = rect.height;
      const currentScroll = startPoint - rect.top;
      
      let progress = currentScroll / (totalHeight - (startPoint - endPoint));
      progress = Math.max(0, Math.min(1, progress));
      
      setScrollProgress(progress);
      
      // Calculate which node we have reached
      // Subtracting a small offset so steps highlight exactly as the colored line reaches them
      const stepFraction = 1 / steps.length;
      const activeIdx = Math.floor((progress + stepFraction * 0.4) * steps.length);
      setActiveStep(activeIdx - 1);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll(); // Trigger initial call
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [steps.length]);

  return (
    <section id="projects" className="py-20 bg-light relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">
            Our Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-dark mt-3 leading-tight font-heading">
            How We Get You Solar Powered
          </h2>
          <div className="w-12 h-1 bg-secondary mx-auto mt-4 rounded-full" />
          <p className="text-dark-muted mt-4 text-sm sm:text-base">
            From your first inquiry to lifetime maintenance, here is the seamless step-by-step process we execute.
          </p>
        </div>

        {/* Timeline Line & Node Layout */}
        <div ref={containerRef} className="relative max-w-5xl mx-auto">
          {/* Vertical Connection Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-slate-200 transform -translate-x-1/2 pointer-events-none rounded-full overflow-hidden">
            {/* Active Glowing Line Overlay driven by scroll progress */}
            <div 
              className="w-full bg-gradient-to-b from-primary via-secondary to-teal-600 transition-all duration-100 rounded-full"
              style={{
                height: `${scrollProgress * 100}%`,
              }}
            />
          </div>

          {/* Timeline Nodes */}
          <div className="flex flex-col gap-12">
            {steps.map((item, index) => {
              const Icon = item.icon;
              const isEven = index % 2 === 0;
              const isActive = index <= activeStep;
              
              return (
                <div 
                  key={index}
                  className={`flex flex-col md:flex-row relative items-start md:items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Vertical line spacer for mobile */}
                  <div className="absolute left-8 md:left-1/2 w-8 md:w-auto h-0.5 bg-slate-200 md:hidden top-6 z-0" />

                  {/* Left/Right Content Block */}
                  <div className="w-full md:w-1/2 pl-16 md:pl-0 md:px-8">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="transition-all duration-300"
                    >
                      <Card 
                        className={`p-6 border border-slate-100/80 bg-white/70 shadow-lg text-left relative transition-all duration-300 ${
                          isActive 
                            ? 'border-primary/45 shadow-primary/5 bg-white scale-[1.01]' 
                            : ''
                        }`}
                      >
                        {/* Mobile Step Badge */}
                        <span className="absolute top-4 right-4 text-xs font-bold text-slate-300 uppercase tracking-widest md:hidden">
                          Step {item.step}
                        </span>

                        <div className="flex gap-4 items-start">
                          <div className={`p-3 rounded-xl border transition-all duration-300 shrink-0 ${
                            isActive 
                              ? 'bg-primary text-white border-primary' 
                              : 'bg-primary/5 text-primary border-primary/10'
                          }`}>
                            <Icon className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className={`font-heading font-extrabold text-lg text-dark transition-colors duration-300 ${
                              isActive ? 'text-primary' : ''
                            }`}>
                              {item.title}
                            </h3>
                            <p className="text-sm text-dark-muted mt-2 leading-relaxed">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  </div>

                  {/* Centered Node Icon Badge */}
                  <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 z-10 flex items-center justify-center">
                    <div 
                      className={`w-10 h-10 rounded-full border-4 flex items-center justify-center font-bold text-sm transition-all duration-500 ${
                        isActive 
                          ? 'bg-secondary border-primary text-dark scale-110 shadow-lg shadow-secondary/35 font-extrabold' 
                          : 'bg-white border-slate-200 text-slate-400'
                      }`}
                    >
                      {item.step}
                    </div>
                  </div>

                  {/* Empty Spacer Column for Desktop Alignment */}
                  <div className="hidden md:block w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
