import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import Card from '../components/Card';

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <Card 
      hoverGlow={false}
      className={`border border-slate-100 p-5 cursor-pointer bg-white transition-all duration-300 ${
        isOpen ? 'border-primary/20 bg-primary/5' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between gap-4 select-none">
        <h4 className="font-heading font-extrabold text-sm sm:text-base text-dark flex items-center gap-2">
          <HelpCircle className={`h-5 w-5 shrink-0 ${isOpen ? 'text-primary' : 'text-slate-400'}`} />
          {question}
        </h4>
        <span className={`p-1.5 rounded-lg bg-slate-100 text-slate-500 transition-all ${
          isOpen ? 'bg-primary text-white rotate-180' : ''
        }`}>
          <ChevronDown className="h-4 w-4" />
        </span>
      </div>
      
      {/* Collapsible Answer */}
      <div 
        className={`transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-60 mt-4 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-sm text-dark-muted leading-relaxed font-normal border-t border-slate-200/60 pt-3">
          {answer}
        </p>
      </div>
    </Card>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: 'What is the cost of solar installation in Hyderabad?',
      a: 'The cost varies depending on system capacity. A standard 3 kW residential system costs around ₹2.1 - ₹2.3 Lakhs before subsidy, and around ₹1.3 - ₹1.5 Lakhs after applying the PM Surya Ghar government subsidy (₹78,000).',
    },
    {
      q: 'What is the eligibility for the PM Surya Ghar subsidy?',
      a: 'Residential households with independent roofs, a registered TSSPDCL domestic electrical connection, and sufficient shadow-free space (approx. 100 Sq.Ft per kW of capacity) are eligible. Commercial and industrial sectors are not eligible for subsidies but can claim accelerated depreciation.',
    },
    {
      q: 'How long does the solar panel installation process take?',
      a: 'The actual onsite structural assembly and panel mounting takes only 2-3 days. The net-metering approval, Discom inspection, and commissioning take about 10-15 business days, which we handle completely on your behalf.',
    },
    {
      q: 'Will solar panels work during power cuts or night time?',
      a: 'Grid-tied (on-grid) systems shut down during power cuts for safety reasons (islanding protection for grid workers). If you need power backup during blackouts, we recommend a hybrid solar system equipped with solar battery backups.',
    },
    {
      q: 'What maintenance do solar panels require?',
      a: 'Solar panels require very little maintenance. You only need to rinse off dust and bird droppings with water every 2-3 weeks to maintain optimal output. Our AMC plans provide professional cleaning and annual inverter string testing.',
    },
  ];

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-light">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">
            FAQ Accordion
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-dark mt-3 leading-tight font-heading">
            Frequently Asked Questions
          </h2>
          <div className="w-12 h-1 bg-secondary mx-auto mt-4 rounded-full" />
          <p className="text-dark-muted mt-4 text-sm sm:text-base">
            Find answers to common questions about rooftop solar engineering, TSSPDCL subsidies, and net metering.
          </p>
        </div>

        {/* FAQ list */}
        <div className="flex flex-col gap-4 text-left">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.q}
              answer={faq.a}
              isOpen={openIndex === index}
              onClick={() => handleToggle(index)}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQ;
