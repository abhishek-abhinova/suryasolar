import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Brands from './sections/Brands';
import About from './sections/About';
import Services from './sections/Services';
import WhyChooseUs from './sections/WhyChooseUs';
import Timeline from './sections/Timeline';
import ConceptToCreation from './sections/ConceptToCreation';
import AMCOverview from './sections/AMCOverview';
import Gallery from './sections/Gallery';
import Testimonials from './sections/Testimonials';
import Stats from './sections/Stats';
import FAQ from './sections/FAQ';
import Contact from './sections/Contact';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Home Page Layout: Combines Hero, Brands, Why Choose Us, Stats, Testimonials, and FAQ
const Home = () => (
  <>
    <Hero />
    <Brands />
    <ConceptToCreation />
    <Stats />
    <Timeline />
    <WhyChooseUs />
    <Testimonials />
  </>
);

// Wrapper to add top padding to avoid header overlap
const MainContent = () => {
  return (
    <main className="flex-grow pt-24 md:pt-[136px]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/amc" element={<AMCOverview />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<><Contact /><FAQ /></>} />
      </Routes>
    </main>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="relative min-h-screen bg-light font-sans text-dark overflow-x-hidden antialiased flex flex-col justify-between">


        {/* Header / Navigation Bar */}
        <Navbar />

        {/* Main Content Area */}
        <MainContent />

        {/* Footer */}
        <Footer />

        {/* Persistent Call/WhatsApp/Scroll-to-Top Shortcuts */}
        <FloatingButtons />
      </div>
    </Router>
  );
}

export default App;
