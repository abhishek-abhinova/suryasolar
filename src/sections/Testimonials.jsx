import React, { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonials = () => {
  const originalReviews = [
    {
      name: 'Roshan Shaik',
      role: 'Homeowner',
      location: 'Suchitra, Hyderabad',
      text: 'Extremely pleased with our 10kW residential solar setup by Surya Solar. Our monthly power bills have plummeted, and the system easily powers our air conditioning and home appliances. Perfect work!',
      rating: 5,
    },
    {
      name: 'Ramesh',
      role: 'Homeowner',
      location: 'Alwal, Hyderabad',
      text: 'Surya Solar did an amazing job with our 5kW installation. Our electricity bills went from ₹6,500 down to under ₹500! Their liaison team managed the TSSPDCL net-metering approvals seamlessly. Highly recommended!',
      rating: 5,
    },
    {
      name: 'Saikiran Beverages',
      role: 'Commercial Partner',
      location: 'Jeedimetla IDA, Hyderabad',
      text: "Working with Surya Solar was a pleasure. Their team's expertise and attention to detail are remarkable. The industrial solar solutions they provided for our beverages facility were exactly what we needed. We look forward to collaborating again.",
      rating: 5,
    },
    {
      name: 'Charoen Pokphand Seeds (India) Pvt Ltd',
      role: 'Industrial Partner',
      location: 'Medchal, Telangana',
      text: 'Surya Solar has been our reliable energy supplier for many years. Their panels and installations are of exceptional quality, and their customer service is unparalleled. They have always exceeded our expectations and delivered projects on time.',
      rating: 5,
    },
    {
      name: 'Narendar Reddy',
      role: 'Director, Commercial Complex',
      location: 'Medchal, Hyderabad',
      text: 'We installed a 25kW rooftop solar system for our commercial complex. The ROI is outstanding, saving us over ₹22,000 every single month. The team is professional, and the mounting structure design is extremely solid.',
      rating: 5,
    },
  ];

  const [visibleCards, setVisibleCards] = useState(3);

  // Infinite loop
  const reviews = [
    ...originalReviews.slice(-visibleCards),
    ...originalReviews,
    ...originalReviews.slice(0, visibleCards)
  ];

  const [currentIndex, setCurrentIndex] = useState(visibleCards);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Drag & Touch properties
  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const dragOffset = useRef(0);

  // Responsive logic Fix: Tailwind break points matches perfectly now
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCards(3);
      } else {
        setVisibleCards(1);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setCurrentIndex(visibleCards);
  }, [visibleCards]);

  // Auto Play Loop
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex, visibleCards, isTransitioning]);

  const handleTransitionEnd = () => {
    if (currentIndex >= originalReviews.length + visibleCards) {
      setIsTransitioning(false);
      setCurrentIndex(visibleCards);
    } else if (currentIndex <= visibleCards - 1) {
      setIsTransitioning(false);
      setCurrentIndex(originalReviews.length + currentIndex);
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
    if (!isTransitioning) return;
    setCurrentIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    if (!isTransitioning) return;
    setCurrentIndex((prev) => prev - 1);
  };

  // --- Mouse & Touch Drag Functions (Unified) ---
  const handleDragStart = (clientX) => {
    isDragging.current = true;
    startX.current = clientX - containerRef.current.offsetLeft;
    dragOffset.current = 0;
  };

  const handleDragMove = (clientX) => {
    if (!isDragging.current) return;
    const x = clientX - containerRef.current.offsetLeft;
    dragOffset.current = x - startX.current;
  };

  const handleDragEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    if (dragOffset.current < -55) {
      nextSlide();
    } else if (dragOffset.current > 55) {
      prevSlide();
    }
    dragOffset.current = 0;
  };

  return (
    <section
      id="testimonials"
      className="py-20 sm:py-24 relative overflow-hidden bg-cover bg-center bg-fixed select-none"
      style={{
        backgroundImage: "url('/Commercial Solar.jpg')"
      }}
    >
      {/* Dark overlay backdrop */}
      <div className="absolute inset-0 bg-slate-950/75 z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(253,184,19,0.05),transparent_70%)] pointer-events-none z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">

        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 gap-6 max-w-6xl mx-auto">
          <div className="text-left">
            <div className="relative inline-block mb-3">
              <span className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-secondary" />
              <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-secondary pl-3 pr-2">
                Testimonials
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-1 leading-tight font-heading">
              Our Satisfied Clients
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex gap-2 self-end sm:self-auto">
            <button
              onClick={prevSlide}
              className="p-2 sm:p-2.5 rounded-full bg-slate-900/60 hover:bg-slate-800 border border-white/10 text-white transition-colors duration-200 focus:outline-none"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 sm:p-2.5 rounded-full bg-slate-900/60 hover:bg-slate-800 border border-white/10 text-white transition-colors duration-200 focus:outline-none"
              aria-label="Next Slide"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Carousel Window */}
        <div
          className="overflow-hidden max-w-6xl mx-auto py-4 cursor-grab active:cursor-grabbing touch-mono"
          ref={containerRef}
          // Desktop Mouse Events
          onMouseDown={(e) => handleDragStart(e.pageX)}
          onMouseMove={(e) => { e.preventDefault(); handleDragMove(e.pageX); }}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          // Mobile Touch Events
          onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
          onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
          onTouchEnd={handleDragEnd}
        >
          <div
            className="flex gap-6 items-center"
            onTransitionEnd={handleTransitionEnd}
            style={{
              transform: `translateX(calc(-${currentIndex * (100 / visibleCards)}% - ${(currentIndex * 24) / visibleCards}px))`,
              transition: isTransitioning ? 'transform 500ms ease-in-out' : 'none',
              willChange: 'transform',
            }}
          >
            {reviews.map((review, index) => {
              // Proper Central Highlight Logic for both Mobile (1) and Desktop (3)
              const isMiddle = visibleCards === 3
                ? index === currentIndex + 1
                : index === currentIndex;

              return (
                <div
                  key={index}
                  className="shrink-0 transition-all duration-500 w-full"
                  style={{
                    width: `calc(${100 / visibleCards}% - ${(24 * (visibleCards - 1)) / visibleCards}px)`
                  }}
                >
                  <div
                    className={`relative w-full min-h-[360px] sm:min-h-[380px] rounded-2xl flex flex-col justify-between text-center transition-all duration-500 border ${isMiddle
                        ? 'bg-slate-900 border-secondary shadow-[0_20px_40px_rgba(253,184,19,0.12)] scale-[1.02] sm:scale-[1.03] p-6 sm:p-10 z-20 opacity-100'
                        : 'bg-slate-900/50 border-white/5 opacity-40 scale-[0.95] p-6 sm:p-9 z-10 backdrop-blur-sm pointer-events-none md:pointer-events-auto'
                      }`}
                  >
                    <div className="text-secondary font-serif text-5xl sm:text-6xl leading-none select-none">
                      “
                    </div>

                    <div className="flex justify-center gap-1.5 -mt-2 mb-4 sm:mb-6">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-secondary text-secondary"
                        />
                      ))}
                    </div>

                    <div className="flex-grow flex items-center justify-center px-2">
                      <p className="text-slate-300 text-xs sm:text-base leading-relaxed font-normal italic">
                        "{review.text}"
                      </p>
                    </div>

                    <div className="mt-6 sm:mt-8 border-t border-white/5 pt-4 sm:pt-6">
                      <h4 className="font-heading font-black text-xs sm:text-base text-secondary tracking-wide uppercase">
                        {review.name}
                      </h4>
                      <p className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1.5">
                        {review.role} — <span className="text-slate-500 font-semibold">{review.location}</span>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;