import React from 'react';
import { Check, ShieldCheck, Sun } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';

const AMCOverview = () => {
  const plans = [
    {
      name: 'Basic Care',
      price: '₹3,999',
      billing: 'Annually',
      target: 'Suitable for residential systems up to 3 kW',
      features: [
        '2 Scheduled preventative maintenance visits',
        '2 Professional panel cleaning sessions',
        'Basic inverter health checkup',
        'DCDB & ACDB box diagnostics',
        'Structure health & nut-bolt inspection',
        'Response time: Within 72 Hours',
      ],
      isRecommended: false,
    },
    {
      name: 'Smart Care (Standard)',
      price: '₹6,999',
      billing: 'Annually',
      target: 'Ideal for standard homes (3 kW to 10 kW)',
      features: [
        '4 Scheduled preventative maintenance visits',
        '4 High-pressure demineralized panel washes',
        'Detailed thermal imaging (hot-spot testing)',
        'Inverter efficiency & generation audit reports',
        'String-level output check & calibration',
        'Priority response time: Within 24 Hours',
      ],
      isRecommended: true,
    },
    {
      name: 'Max Care (Premium)',
      price: '₹12,999',
      billing: 'Annually',
      target: 'Best for large homes, commercial & high-yield units',
      features: [
        '6 Scheduled preventative maintenance visits',
        '6 Professional panel cleaning sessions',
        '24/7 Remote system performance monitoring',
        'Full structural stability & earthing tests',
        'Electrical breakdown checks (Unlimited)',
        'Guaranteed response time: Within 12 Hours',
      ],
      isRecommended: false,
    },
  ];

  return (
    <section id="amc" className="py-20 bg-slate-900 text-white relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(15,118,110,0.15),transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-secondary font-bold text-xs uppercase tracking-widest bg-secondary/10 px-3 py-1 rounded-full">
            AMC Subscriptions
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 leading-tight font-heading">
            Annual Solar Maintenance Contracts (AMC)
          </h2>
          <div className="w-12 h-1 bg-secondary mx-auto mt-4 rounded-full" />
          <p className="text-slate-400 mt-4 text-sm sm:text-base">
            Protect your green investment. Our AMC packages ensure maximum performance and uninterrupted power generation.
          </p>
        </div>

        {/* 3 subscription cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            return (
              <div 
                key={index} 
                className={`flex flex-col h-full transition-all duration-500 ${
                  plan.isRecommended 
                    ? 'scale-105 z-10 shadow-2xl shadow-secondary/10' 
                    : 'opacity-90 hover:opacity-100 hover:scale-[1.02]'
                }`}
              >
                <Card 
                  variant="dark"
                  hoverGlow={false}
                  className={`relative flex flex-col justify-between h-full p-8 border bg-slate-800/60 backdrop-blur-md rounded-2xl ${
                    plan.isRecommended 
                      ? 'border-secondary shadow-xl shadow-secondary/5' 
                      : 'border-white/5'
                  }`}
                >
                  {/* Highlight Tag */}
                  {plan.isRecommended && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-secondary text-dark text-xs uppercase font-extrabold px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1 z-30 whitespace-nowrap">
                      <Sun className="h-3.5 w-3.5 fill-dark animate-spin-slow" />
                      Recommended Plan
                    </div>
                  )}
                  <div>
                    {/* Plan Header */}
                    <div className="text-left border-b border-white/10 pb-6">
                      <h3 className="font-heading font-extrabold text-xl text-white">
                        {plan.name}
                      </h3>
                      <p className="text-xs text-slate-400 mt-2 font-normal">
                        {plan.target}
                      </p>
                      <div className="flex items-baseline mt-4 gap-1">
                        <span className="text-3xl sm:text-4xl font-extrabold text-white font-heading">
                          {plan.price}
                        </span>
                        <span className="text-xs text-slate-400 font-semibold">
                          / {plan.billing}
                        </span>
                      </div>
                    </div>

                    {/* Features list */}
                    <ul className="flex flex-col gap-4 text-left my-8">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm">
                          <Check className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                          <span className="text-slate-300 font-medium leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Plan CTA */}
                  <div>
                    <Button 
                      variant={plan.isRecommended ? 'secondary' : 'glass'} 
                      href="/contact" 
                      className="w-full text-center flex items-center justify-center font-bold"
                    >
                      <span>Choose {plan.name}</span>
                    </Button>
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

export default AMCOverview;
