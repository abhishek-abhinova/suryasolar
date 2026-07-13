import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Award, Zap, CheckCircle2, Target, Eye, Shield, ChevronLeft, ChevronRight } from 'lucide-react';
import Card from '../components/Card';

const About = () => {
  const certifications = [
    { icon: Award, title: 'MNRE Approved', desc: 'Ministry of New & Renewable Energy channel partner' },
    { icon: ShieldCheck, title: 'ISO 9001:2015', desc: 'Quality management certification for installation standards' },
    { icon: Zap, title: 'TEDA Certified', desc: 'Approved solar developer status' },
  ];

  const values = [
    'IIT & NIT trained solar engineers & structural designers',
    'We use only ALMM-approved, Tier-1 Mono PERC / Bifacial panels',
    'Guaranteed hassle-free Net Metering coordination with TSSPDCL',
    'Comprehensive safety standards and wind-resistant mounting structures',
  ];

  const pillars = [
    {
      icon: Target,
      title: 'Our Mission',
      desc: 'To accelerate Telangana\'s transition to clean energy by providing accessible, high-yield, and economically profitable solar power integrations for homeowners and enterprises.',
      color: 'text-primary bg-primary/10 border-primary/20',
    },
    {
      icon: Eye,
      title: 'Our Vision',
      desc: 'To establish Surya Solar as India\'s most trusted solar system integrator, deploying 50+ MW of high-performance installations and building a carbon-neutral tomorrow.',
      color: 'text-secondary-dark bg-secondary/15 border-secondary/35',
    },
    {
      icon: Shield,
      title: 'Quality Mandate',
      desc: 'We enforce rigorous wind-load simulations (up to 150 km/h) and execute dual-grounding electrical safety standards for a lifetime of trouble-free operation.',
      color: 'text-emerald-600 bg-emerald-500/10 border-emerald-500/20',
    },
  ];

  // ઓરિજિનલ ટીમ મેમ્બર્સનો ડેટા
  const originalTeam = [
    {
      name: 'Avdhesh Dubey',
      role: 'Founder & Managing Director',
      avatarUrl: '/Founder -Avdhesh Dubey.jpeg',
      objectPos: 'object-top'
    },
    {
      name: 'B. Kishore',
      role: 'General Manager',
      avatarUrl: '/B.Kishore General manager.jpeg',
      objectPos: 'object-center'
    },
    {
      name: 'Abhishek Shukla',
      role: 'AI & Digital Marketing Manager',
      avatarUrl: '/aabb.png',
      objectPos: 'object-top'
    }
  ];

  const [visibleCards, setVisibleCards] = useState(2);

  // Responsive logic
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCards(1);
      } else {
        setVisibleCards(2);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Infinite Loop માટે ઓટોમેટેડ બફર એડ કર્યા
  const teamMembers = [
    ...originalTeam.slice(-visibleCards),
    ...originalTeam,
    ...originalTeam.slice(0, visibleCards)
  ];

  const [currentIndex, setCurrentIndex] = useState(visibleCards);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Drag and Touch properties માટે refs
  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const dragOffset = useRef(0);

  useEffect(() => {
    setCurrentIndex(visibleCards);
  }, [visibleCards]);

  // Auto-play loop
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentIndex, visibleCards]);

  const handleTransitionEnd = () => {
    if (currentIndex >= originalTeam.length + visibleCards) {
      setIsTransitioning(false);
      setCurrentIndex(visibleCards);
    } else if (currentIndex <= visibleCards - 1) {
      setIsTransitioning(false);
      setCurrentIndex(originalTeam.length + currentIndex);
    }
  };

  useEffect(() => {
    if (!isTransitioning) {
      const timeout = setTimeout(() => {
        setIsTransitioning(true);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [isTransitioning]);

  const nextSlide = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => prev - 1);
  };

  // --- Drag & Touch Handling ---

  // 1. Swipe/Drag Start
  const handleStart = (clientX) => {
    isDragging.current = true;
    startX.current = clientX - (containerRef.current ? containerRef.current.offsetLeft : 0);
    dragOffset.current = 0;
  };

  // 2. Swipe/Drag Moving
  const handleMove = (clientX) => {
    if (!isDragging.current) return;
    const x = clientX - (containerRef.current ? containerRef.current.offsetLeft : 0);
    dragOffset.current = x - startX.current;
  };

  // 3. Swipe/Drag End
  const handleEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    // Agar 50px se zyada left swipe kiya to next slide
    if (dragOffset.current < -50) {
      nextSlide();
    }
    // Agar 50px se zyada right swipe kiya to prev slide
    else if (dragOffset.current > 50) {
      prevSlide();
    }
    dragOffset.current = 0;
  };

  return (
    <div className="flex flex-col gap-24 py-12 bg-light">

      {/* 1. Who We Are Section */}
      <section id="about-who" className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">
              Who We Are
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-dark mt-3 leading-tight font-heading">
              Surya Solar — Hyderabad's Trusted Green Energy Partner
            </h2>
            <div className="w-12 h-1 bg-secondary mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/60">
                <video
                  src="/solar.mp4"
                  preload="metadata"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto min-h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent pointer-events-none" />
              </div>

              <div className="absolute -bottom-6 -right-6 bg-white p-4 sm:p-5 flex items-center gap-3 border border-slate-100 shadow-[0_12px_40px_rgba(0,0,0,0.15)] rounded-2xl max-w-xs z-10">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white font-black text-xl shrink-0 shadow-md shadow-primary/20">
                  10+
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-sm sm:text-base leading-snug">Years Experience</h4>
                  <p className="text-xs text-slate-600 font-semibold mt-0.5">In solar engineering & consulting</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col gap-6 text-left">
              <h3 className="text-xl sm:text-2xl font-extrabold text-dark leading-snug font-heading">
                Providing High-Efficiency Solar Solutions from Hyderabad to the World.
              </h3>
              <p className="text-dark-muted leading-relaxed font-normal">
                Based in **Suchitra, Hyderabad**, Surya Solar has emerged as a premium name in design, supply, testing, and commissioning of solar power plants. We help households, industries, and commercial buildings harvest solar energy efficiently to offset utility expenses.
              </p>

              <div className="flex flex-col gap-3 my-2">
                {values.map((val, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-dark-muted font-semibold">{val}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                {certifications.map((cert, idx) => {
                  const IconComp = cert.icon;
                  return (
                    <Card
                      key={idx}
                      hoverGlow={false}
                      className="p-4 flex flex-col gap-2 items-start border-slate-100 bg-white"
                    >
                      <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        <IconComp className="h-5 w-5" />
                      </div>
                      <h4 className="font-extrabold text-dark text-sm">{cert.title}</h4>
                      <p className="text-[11px] text-dark-muted leading-relaxed font-semibold">{cert.desc}</p>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Team Members Slider Section */}
      <section id="about-team" className="py-16 bg-slate-900 text-white relative overflow-hidden select-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,118,110,0.08),transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 max-w-6xl mx-auto">
            <div className="text-left">
              <div className="relative inline-block mb-3">
                <span className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-secondary" />
                <span className="text-sm font-bold uppercase tracking-widest text-slate-400 pl-3 pr-2">
                  Team Members
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1 leading-tight font-heading">
                Our Expert Team Members
              </h2>
            </div>

            <div className="flex gap-2">
              <button
                onClick={prevSlide}
                className="p-2 sm:p-2.5 rounded-full bg-slate-800 hover:bg-slate-700 border border-white/5 text-white transition-colors duration-200"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={nextSlide}
                className="p-2 sm:p-2.5 rounded-full bg-slate-800 hover:bg-slate-700 border border-white/5 text-white transition-colors duration-200"
                aria-label="Next Slide"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div
            className="overflow-hidden max-w-xs sm:max-w-md md:max-w-3xl lg:max-w-6xl mx-auto py-2 cursor-grab active:cursor-grabbing touch-pan-y"
            ref={containerRef}
            // Mouse Events (Desktop ke liye)
            onMouseDown={(e) => handleStart(e.pageX)}
            onMouseMove={(e) => { e.preventDefault(); handleMove(e.pageX); }}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            // Touch Events (Mobile ke liye)
            onTouchStart={(e) => handleStart(e.touches[0].clientX)}
            onTouchMove={(e) => handleMove(e.touches[0].clientX)}
            onTouchEnd={handleEnd}
          >
            <div
              className="flex"
              onTransitionEnd={handleTransitionEnd}
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
                transition: isTransitioning ? 'transform 500ms cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
                willChange: 'transform',
              }}
            >
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="shrink-0 px-3"
                  style={{
                    width: `calc(${100 / visibleCards}%)`
                  }}
                >
                  {/* Card Main Container */}
                  <div className="relative w-full rounded-2xl flex flex-col overflow-hidden shadow-2xl border border-white/5 group bg-slate-800">

                    {/* Photo Wrapper */}
                    <div className="w-full h-[340px] sm:h-[380px] overflow-hidden relative">
                      <img
                        src={member.avatarUrl}
                        alt={member.name}
                        loading="lazy"
                        className={`w-full h-full object-cover ${member.objectPos} group-hover:scale-105 transition-transform duration-500`}
                      />
                      {/* Slanted Shine Hover Animation Overlay */}
                      <span className="absolute inset-0 block w-[200%] h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-20 -translate-x-[120%] transition-transform duration-[1000ms] ease-out group-hover:translate-x-[100%] z-20 pointer-events-none" />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10" />
                    </div>

                    {/* Yellow Text Box */}
                    <div className="p-5 bg-gradient-to-r from-secondary to-amber-500 text-dark z-20 min-h-[90px] flex flex-col justify-center relative">
                      {/* Left Arrow Cut Design Effect */}
                      <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-3 h-3 bg-amber-700 transform rotate-45 -z-10 rounded-sm hidden sm:block" />

                      <h4 className="font-heading font-black text-sm sm:text-base text-slate-900 leading-tight">
                        {member.name}
                      </h4>
                      <p className="text-[10px] sm:text-xs font-bold text-slate-800 mt-1 uppercase tracking-widest">
                        {member.role}
                      </p>
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-900 font-extrabold text-sm opacity-80">
                        ≫
                      </span>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 3. Core Pillars of Excellence Section */}
      <section id="about-pillars" className="py-16 bg-slate-50 border-y border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">
              Pillars of Excellence
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-dark mt-3 leading-tight font-heading">
              Our Sincere Commitment & Core Vision
            </h2>
            <div className="w-12 h-1 bg-secondary mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar, idx) => {
              const IconComp = pillar.icon;
              return (
                <Card
                  key={idx}
                  hoverGlow={true}
                  className="p-8 border border-slate-200/60 bg-white flex flex-col gap-4 text-left transition-all duration-300 hover:shadow-lg"
                >
                  <div className={`p-3 rounded-xl border w-fit ${pillar.color}`}>
                    <IconComp className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading font-extrabold text-lg text-dark">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-dark-muted leading-relaxed font-normal">
                    {pillar.desc}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;