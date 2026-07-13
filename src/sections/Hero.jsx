import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sun } from 'lucide-react';
import Button from '../components/Button';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef(null);

  // Mouse position for parallax tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 });

  // Map mouse position to subtle rotation + translate (3D effect)
  const rotateX = useTransform(springY, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-4, 4]);
  const translateX = useTransform(springX, [-0.5, 0.5], [-14, 14]);
  const translateY = useTransform(springY, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?q=80&w=1920&auto=format&fit=crop",
      title: "Surya Solar: Pioneering Solar Rooftop Engineering",
      subtitle: "We specialize in designing and installing high-efficiency residential, commercial, and industrial rooftop solar systems.",
      btn1Text: "Our Services",
      btn1Link: "/services",
      btn2Text: "Get Quote",
      btn2Link: "/contact"
    },
    {
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1920&auto=format&fit=crop",
      title: "Save Up To 85% On Your Electricity Bills",
      subtitle: "Switch to clean energy with state-of-the-art solar panels, full net metering liaison, and government subsidy assistance.",
      btn1Text: "Calculate Savings",
      btn1Link: "/contact",
      btn2Text: "AMC Plans",
      btn2Link: "/amc"
    },
    {
      image: "https://images.unsplash.com/photo-1542336391-ae2936d8efe4?q=80&w=1920&auto=format&fit=crop",
      title: "25 Years Performance Warranty & Lifetime Support",
      subtitle: "Surya Solar ensures top-tier Tier-1 manufacturer equipment (Adani, Waaree, Vikram) and comprehensive maintenance plans.",
      btn1Text: "View Gallery",
      btn1Link: "/gallery",
      btn2Text: "Free Site Survey",
      btn2Link: "/contact"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[500px] md:h-[650px] lg:h-[750px] overflow-hidden bg-slate-900 select-none"
      style={{ perspective: '1200px' }}
    >

      {/* Rotating sun-ray glow behind everything — reinforces solar theme */}
      <motion.div
        aria-hidden="true"
        className="absolute -top-1/3 left-1/2 -translate-x-1/2 z-[5] pointer-events-none"
        style={{ width: '140%', height: '140%' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
      >
        <div
          className="w-full h-full opacity-25"
          style={{
            background: 'conic-gradient(from 0deg, transparent 0deg, rgba(251,191,36,0.35) 8deg, transparent 20deg, transparent 100deg, rgba(251,191,36,0.25) 108deg, transparent 120deg, transparent 220deg, rgba(251,191,36,0.3) 228deg, transparent 240deg)',
            filter: 'blur(2px)'
          }}
        />
      </motion.div>

      {/* Ambient floating light particles */}
      <div className="absolute inset-0 z-[6] pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-amber-300/40"
            style={{
              width: `${4 + (i % 3) * 3}px`,
              height: `${4 + (i % 3) * 3}px`,
              left: `${(i * 8.3) % 100}%`,
              top: `${(i * 17.7) % 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.7, 0.2],
            }}
            transition={{
              duration: 4 + (i % 4),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
          />
        ))}
      </div>

      {/* Slides Container - Overlap cross-fade style */}
      <div className="absolute inset-0 w-full h-full">
        {slides.map((slide, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentSlide ? 1 : 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            style={{ pointerEvents: index === currentSlide ? 'auto' : 'none' }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Slide Background Image with Ken Burns zoom + mouse-driven 3D parallax tilt */}
            <motion.div
              initial={{ scale: 1 }}
              animate={index === currentSlide ? { scale: 1.08 } : { scale: 1 }}
              transition={{ duration: 8.5, ease: "linear" }}
              style={{
                backgroundImage: `url(${slide.image})`,
                rotateX: index === currentSlide ? rotateX : 0,
                rotateY: index === currentSlide ? rotateY : 0,
                x: index === currentSlide ? translateX : 0,
                y: index === currentSlide ? translateY : 0,
                transformStyle: 'preserve-3d',
              }}
              className="absolute -inset-4 bg-cover bg-center will-change-transform"
            />
            {/* Dark Overlay for text legibility */}
            <div className="absolute inset-0 bg-slate-950/60 z-10" />

            {/* Slide Content Overlay */}
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <div className="max-w-4xl mx-auto px-6 text-center text-white flex flex-col gap-6 items-center justify-center">

                {/* Small animated sun badge above title */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5, rotate: -30 }}
                  animate={index === currentSlide ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.7, delay: 0.05, ease: "backOut" }}
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-amber-400/15 border border-amber-300/40 backdrop-blur-sm"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                  >
                    <Sun className="h-6 w-6 text-amber-300" />
                  </motion.div>
                </motion.div>

                {/* Animated Main Title with shimmering gradient sweep */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={index === currentSlide ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-heading leading-tight tracking-wide uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
                >
                  <span
                    className="bg-clip-text text-transparent bg-[linear-gradient(110deg,#ffffff_35%,#fde68a_50%,#ffffff_65%)] bg-[length:250%_100%] animate-[shimmer_5s_linear_infinite]"
                  >
                    {slide.title}
                  </span>
                </motion.h1>

                {/* Animated Subtitle Description */}
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={index === currentSlide ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-slate-200 text-sm sm:text-base md:text-lg max-w-2xl font-medium leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
                >
                  {slide.subtitle}
                </motion.p>

                {/* Animated Dual Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={index === currentSlide ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="flex flex-row gap-4 mt-2 justify-center items-center"
                >
                  <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      variant="secondary"
                      href={slide.btn1Link}
                      className="py-2.5 px-5 sm:px-8 text-sm md:text-base font-bold shadow-md"
                    >
                      {slide.btn1Text}
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      variant="glass"
                      href={slide.btn2Link}
                      className="py-2.5 px-5 sm:px-8 text-sm md:text-base font-bold border-white/35 hover:border-white/60 hover:bg-white/10 text-white shadow-md"
                    >
                      {slide.btn2Text}
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Slider Manual Controls - Left & Right Arrows */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 md:p-3 rounded-full bg-black/20 hover:bg-black/45 border border-white/10 text-white transition-colors duration-200"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="h-5 w-5 md:h-7 md:w-7" />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 md:p-3 rounded-full bg-black/20 hover:bg-black/45 border border-white/10 text-white transition-colors duration-200"
        aria-label="Next Slide"
      >
        <ChevronRight className="h-5 w-5 md:h-7 md:w-7" />
      </motion.button>

      {/* Keyframes for text shimmer — add once globally if not already present */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; }
        }
      `}</style>
    </section>
  );
};

export default Hero;