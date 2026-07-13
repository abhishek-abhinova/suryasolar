import React from 'react';
import { Shield, BadgeCheck, Clock, RefreshCw, Anchor, Headphones } from 'lucide-react';
import Card from '../components/Card';

const WhyChooseUs = () => {
  const points = [
    {
      icon: Shield,
      title: '25-Year Warranty',
      desc: 'Tier-1 solar panels come with a 25-year linear performance warranty and a 10-12 year manufacturing warranty.',
      color: 'bg-teal-500/10 text-teal-600',
    },
    {
      icon: BadgeCheck,
      title: '100% Genuine Products',
      desc: 'We procure directly from ALMM-approved global brands. No duplicates, no compromises on quality control.',
      color: 'bg-amber-500/10 text-amber-600',
    },
    {
      icon: Clock,
      title: 'On-Time Execution',
      desc: 'We respect your schedules. System installation is typically finished within 10-15 business days from site approval.',
      color: 'bg-sky-500/10 text-sky-600',
    },
    {
      icon: RefreshCw,
      title: 'End-to-End Liaison',
      desc: 'We coordinate all paperwork for your solar application, feasibility test, electrical inspection, and net meter integration.',
      color: 'bg-purple-500/10 text-purple-600',
    },
    {
      icon: Anchor,
      title: 'Wind-Resistant Structures',
      desc: 'Custom-designed galvanized iron (GI) structures capable of resisting high winds of up to 150 km/h.',
      color: 'bg-rose-500/10 text-rose-600',
    },
    {
      icon: Headphones,
      title: '24-48 Hr Service SLA',
      desc: 'Any system faults? Our Hyderabad-based servicing team provides onsite diagnostics and rectification within 48 hours.',
      color: 'bg-indigo-500/10 text-indigo-600',
    },
  ];

  return (
    <section id="why-choose-us" className="py-20 bg-slate-900 text-white relative">
      {/* Background styling elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,118,110,0.1),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-secondary font-bold text-xs uppercase tracking-widest bg-secondary/10 px-3 py-1 rounded-full">
            Our Advantages
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 leading-tight font-heading">
            Why Choose Surya Solar?
          </h2>
          <div className="w-12 h-1 bg-secondary mx-auto mt-4 rounded-full" />
          <p className="text-slate-400 mt-4 text-sm sm:text-base">
            We deliver solar installations engineered to last decades. Discover the advantages of partnering with Surya Solar.
          </p>
        </div>

        {/* 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {points.map((point, index) => {
            const Icon = point.icon;
            return (
              <Card 
                key={index} 
                variant="dark"
                className="p-8 border border-white/5 bg-slate-800/40 backdrop-blur-md flex flex-col gap-4 text-left"
              >
                {/* Icon wrapper */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border border-white/10 ${point.color}`}>
                  <Icon className="h-6 w-6" />
                </div>

                {/* Details */}
                <div className="flex flex-col gap-2">
                  <h3 className="font-heading font-bold text-lg text-white">
                    {point.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed font-normal">
                    {point.desc}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
