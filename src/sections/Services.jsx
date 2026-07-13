import React from 'react';
import Card from '../components/Card';

const Services = () => {
  const services = [
    {
      title: 'Residential Solar',
      desc: 'Hassle-free grid-tied solar systems for independent homes and villas. Zero electricity bills, maximum comfort.',
      image: '/Residential Solar.jpeg',
    },
    {
      title: 'Commercial Solar',
      desc: 'Custom rooftop arrays for offices, hospitals, and educational institutions. Drastically reduce operating overheads.',
      image: '/Commercial Solar.jpeg',
    },
    {
      title: 'Industrial Solar',
      desc: 'Heavy-duty solar plants designed for factories, warehouses, and manufacturing plants with high energy requirements.',
      image: '/Industrial Solar.jpeg',
    },
    {
      title: 'Solar Water Pump',
      desc: 'Reliable, high-discharge solar pumps for agricultural and remote farms. Dependable irrigation without power cuts.',
      image: '/Solar pump.jpg',
    },
    {
      title: 'Solar Street Lights',
      desc: 'All-in-one solar street lights with intelligent dusk-to-dawn sensors and long-life LiFePO4 batteries.',
      image: '/Street light (2).jpeg',
    },
    {
      title: 'Solar AMC Plans',
      desc: 'Annual maintenance contracts including preventative checkups, inverter health tests, and performance optimization.',
      image: '/Solar AMC Plans.jpeg',
    },
    {
      title: 'Solar Panel Cleaning',
      desc: 'Professional pressure-washing and cleaning services to remove dust, scaling, and restore panel generation efficiency.',
      image: '/Solar pannel clenaing.jpeg',
    },
    {
      title: 'Repairs & Maintenance',
      desc: 'Prompt diagnostic checks, hot-spot testing, string adjustments, and replacement of damaged cables or panels.',
      image: '/Repairs & Maintenance.jpeg',
    },
    {
      title: 'Battery Backup Systems',
      desc: 'Hybrid and off-grid solar systems with intelligent battery storage for continuous power during grid blackouts.',
      image: '/Battery Backup Systems.jpeg',
    },
    {
      title: 'Net Metering Liaison',
      desc: 'End-to-end liaison support with TSSPDCL for feasibility surveys, meter installation, and commissioning.',
      image: '/Net Metering Liaison.png',
    },
  ];

  return (
    <section id="services" className="py-20 bg-slate-50 relative overflow-hidden">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-secondary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">
            Our Offerings
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-dark mt-3 leading-tight">
            High-Performance Solar Services We Offer
          </h2>
          <div className="w-12 h-1 bg-secondary mx-auto mt-4 rounded-full" />
          <p className="text-dark-muted mt-4 text-sm sm:text-base">
            From design to commissioning, and comprehensive lifecycle support, Surya Solar is your single window for solar integration.
          </p>
        </div>

        {/* 3x3 Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            // Adjust the 10th item (index 9) to occupy full width on desktop for nice alignment
            const isLastItem = index === 9;
            
            return (
              <div 
                key={index}
                className={`${isLastItem ? 'lg:col-span-3 lg:max-w-md lg:mx-auto lg:w-full' : ''}`}
              >
                <Card 
                  className="h-full p-0 border border-slate-100 flex flex-col relative overflow-hidden group hover:bg-gradient-to-br hover:from-white hover:to-primary/5 transition-all duration-300 hover:shadow-lg rounded-3xl"
                >
                  {/* Image header area: Using aspect-video for full image legibility */}
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  {/* Body Content */}
                  <div className="p-6 flex flex-col gap-2 text-left flex-grow">
                    <h3 className="font-heading font-extrabold text-lg text-dark group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-sm text-dark-muted leading-relaxed font-normal">
                      {service.desc}
                    </p>
                  </div>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
