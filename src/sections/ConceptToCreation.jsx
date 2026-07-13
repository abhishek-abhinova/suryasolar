import React from 'react';
import { motion } from 'framer-motion';
import Button from '../components/Button';

const ConceptToCreation = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">

      {/* Decorative Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="relative inline-block mb-4">
            <span className="absolute -top-1.5 -left-1.5 w-4 h-4 border-t-2 border-l-2 border-secondary" />
            <span className="text-sm font-bold uppercase tracking-widest text-slate-500 pl-3 pr-2">
              About Us
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-dark leading-tight font-heading mt-2">
            From Concept To Commissioning – <br className="hidden sm:inline" />
            Solar Excellence Delivered
          </h2>
          <div className="w-12 h-1 bg-secondary mx-auto mt-4 rounded-full" />
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center max-w-7xl mx-auto relative">

          {/* Background Dot Matrix behind the Video */}
          <div className="absolute -right-4 -top-8 w-48 h-48 opacity-20 pointer-events-none hidden lg:block bg-[radial-gradient(#0f766e_1.5px,transparent_1.5px)] [background-size:16px_16px]" />

          {/* Left Column: Text Card */}
          <div className="lg:col-span-5 z-20">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-gradient-to-br from-primary to-primary-dark text-white p-10 sm:p-12 shadow-[0_25px_50px_rgba(15,118,110,0.18)] relative overflow-hidden border-l-8 border-secondary h-full flex flex-col justify-center rounded-3xl rounded-tr-[4rem] rounded-bl-[4rem]"
            >
              <div className="absolute -top-16 -left-16 w-48 h-48 bg-secondary/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-teal-400/20 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col items-start">
                <h3 className="text-3xl sm:text-4xl font-black font-heading mb-6 text-white tracking-tight leading-none">
                  Surya Solar
                </h3>

                <p className="text-white/95 text-base sm:text-lg leading-relaxed mb-8 font-medium">
                  We specialize in delivering world-class solar energy solutions across both Commercial and Residential sectors. Since our establishment, we have proudly positioned ourselves as Hyderabad's premium <span className="text-secondary font-bold">"One Stop Solar Solution"</span> provider, delivering systems engineered to perform for decades.
                </p>

                <Button
                  href="/about"
                  className="bg-slate-950 text-white hover:bg-slate-900 border-none py-3.5 px-8 font-bold shadow-lg active:scale-95 transition-all text-sm rounded-xl inline-block w-fit"
                >
                  Read More
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Clean Rectangle Video Container */}
          <div className="lg:col-span-7 z-10">
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-full aspect-video shadow-2xl overflow-hidden border border-slate-100 bg-slate-900 group rounded-3xl"
            >
              <video
                src="/Solar work.mp4"
                preload="metadata"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
              />

              <div className="absolute inset-0 bg-slate-950/5 pointer-events-none z-10 group-hover:opacity-0 transition-opacity duration-500" />
              <div className="absolute inset-0 border border-white/10 pointer-events-none z-20" />
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ConceptToCreation;