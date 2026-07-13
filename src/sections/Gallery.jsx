import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Sun, Zap, X } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';

const Gallery = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'residential', name: 'Residential' },
    { id: 'commercial', name: 'Commercial' },
    { id: 'industrial', name: 'Industrial' },
  ];

  const projects = [
    {
      id: 1,
      title: '3 kW Residential Rooftop',
      category: ['residential'],
      location: 'Kompally, Secunderabad',
      capacity: '3 kW On-Grid',
      modules: 'Loom Solar Half-Cut',
      image: '/3KW .jpeg',
    },
    {
      id: 2,
      title: '5 kW Residential Rooftop',
      category: ['residential'],
      location: 'Suchitra, Hyderabad',
      capacity: '5 kW On-Grid',
      modules: 'Tata Power Mono PERC',
      image: '/5KW.jpeg',
    },
    {
      id: 3,
      title: '15 kW Residential Rooftop',
      category: ['residential'],
      location: 'Medchal, Hyderabad',
      capacity: '15 kW On-Grid',
      modules: 'Waaree Bifacial Panels',
      image: '/15KW.jpeg',
    },
    {
      id: 4,
      title: '25 kW Residential Rooftop',
      category: ['residential'],
      location: 'Alwal, Hyderabad',
      capacity: '25 kW Hybrid System',
      modules: 'Vikram Solar Panels',
      image: '/25KW.jpeg',
    },
    {
      id: 5,
      title: '150 kW Solar Power Array',
      category: ['commercial', 'industrial'],
      location: 'Suchitra Junction, Hyderabad',
      capacity: '150 kW On-Grid',
      modules: 'Adani Premium Modules',
      image: '/150KW.jpg',
    },
    {
      id: 6,
      title: '180 kW Industrial Solar Array',
      category: ['industrial'],
      location: 'Kompally IDA, Secunderabad',
      capacity: '180 kW Net Metered',
      modules: 'Adani Premium Modules',
      image: '/180KW.jpeg',
    },
    {
      id: 7,
      title: '200 kW Solar Power Plant',
      category: ['commercial', 'industrial'],
      location: 'Gachibowli, Hyderabad',
      capacity: '200 kW Net Metered',
      modules: 'Goldi Solar High Output',
      image: '/200KW.jpeg',
    },
    {
      id: 8,
      title: '250 kW Corporate Rooftop Plant',
      category: ['commercial', 'industrial'],
      location: 'Patancheru IDA, Hyderabad',
      capacity: '250 kW On-Grid',
      modules: 'Waaree Bifacial Panels',
      image: '/250KW.jpeg',
    },
  ];

  const filteredProjects = activeTab === 'all' 
    ? projects 
    : projects.filter(p => p.category.includes(activeTab));

  return (
    <section id="gallery" className="py-20 bg-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-primary font-bold text-xs uppercase tracking-widest bg-primary/10 px-3 py-1 rounded-full">
            Our Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-dark mt-3 leading-tight font-heading">
            Completed Projects Gallery
          </h2>
          <div className="w-12 h-1 bg-secondary mx-auto mt-4 rounded-full" />
          <p className="text-dark-muted mt-4 text-sm sm:text-base">
            Explore our residential, commercial, and industrial solar installations executed in and around Hyderabad.
          </p>
        </div>

        {/* Tab Switches */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                activeTab === cat.id
                  ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105'
                  : 'bg-white text-dark-muted hover:text-dark hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={project.id}
              >
                <Card 
                  onClick={() => setSelectedProject(project)}
                  className="group h-full p-0 overflow-hidden border border-slate-100 bg-white flex flex-col cursor-pointer hover:shadow-lg transition-all duration-300"
                >
                  {/* Image wrapper */}
                  <div className="relative h-56 w-full overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Category Label */}
                    <div className="absolute top-4 left-4 bg-primary/95 text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow-md backdrop-blur-sm">
                      {project.category.join(' & ')}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 text-left flex flex-col justify-between flex-grow">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs text-dark-muted font-semibold uppercase tracking-wider mb-2">
                        <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                        <span>{project.location}</span>
                      </div>
                      <h3 className="font-heading font-extrabold text-lg text-dark leading-snug group-hover:text-primary transition-colors duration-300">
                        {project.title}
                      </h3>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500 gap-4">
                      <span className="flex items-center gap-1.5 text-primary">
                        <Zap className="h-4 w-4 fill-primary/10 shrink-0" />
                        {project.capacity}
                      </span>
                      <span className="flex items-center gap-1 text-right text-dark-muted font-medium">
                        {project.modules}
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 flex flex-col md:flex-row"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 p-2 bg-slate-900/80 text-white hover:bg-slate-900 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Left Side: Large Image */}
              <div className="md:w-3/5 h-64 md:h-[450px] relative">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-primary text-white text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full shadow-md z-20">
                  {selectedProject.category.join(' & ')}
                </div>
              </div>

              {/* Right Side: Description & Details */}
              <div className="md:w-2/5 p-8 flex flex-col justify-between text-left bg-slate-50">
                <div className="flex flex-col gap-6">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-dark-muted font-semibold uppercase tracking-wider mb-2">
                      <MapPin className="h-4 w-4 text-primary shrink-0" />
                      <span>{selectedProject.location}</span>
                    </div>
                    <h3 className="font-heading font-extrabold text-2xl text-dark leading-tight">
                      {selectedProject.title}
                    </h3>
                    <div className="w-10 h-1 bg-secondary mt-3 rounded-full" />
                  </div>
                  
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-primary/10 rounded-xl text-primary">
                        <Zap className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider leading-none mb-1">System Capacity</p>
                        <p className="text-sm font-bold text-dark">{selectedProject.capacity}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-secondary/10 rounded-xl text-secondary-dark">
                        <Sun className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase text-slate-400 font-semibold tracking-wider leading-none mb-1">Solar Modules</p>
                        <p className="text-sm font-bold text-dark">{selectedProject.modules}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <Button 
                    variant="primary" 
                    href="/contact" 
                    onClick={() => setSelectedProject(null)} 
                    className="w-full text-center flex justify-center py-3 font-bold"
                  >
                    Request Free Survey
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
