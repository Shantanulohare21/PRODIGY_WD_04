import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CustomCursor from './components/CustomCursor';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Portfolio from './components/Portfolio';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
// import GithubStats from './components/GithubStats';
import AIAssistant from './components/AIAssistant';

const App = () => {
  const [isBotOpen, setIsBotOpen] = useState(false);

  const toggleBot = () => setIsBotOpen(!isBotOpen);

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 cursor-none lg:cursor-auto overflow-x-hidden selection:bg-teal-500/30 selection:text-white font-['Inter',sans-serif]">
      <CustomCursor />
      <ScrollToTop />
      
      {/* Global AI Assistant Sidebar */}
      <AIAssistant isOpen={isBotOpen} onClose={() => setIsBotOpen(false)} />
      
      <Header onToggleBot={toggleBot} />
      
      <main className="relative z-10 w-full overflow-hidden bg-mesh">
        <Hero />
        
        {/* 
          // Hiding the Impact Stats section as requested.
          // This code is preserved but will not render in the current production site.
          
        <div className="relative z-10 py-24 bg-[#0f172a]/80 backdrop-blur-xl border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16 text-center"
            >
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 reveal-text">
                Impact & Activity
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-lg font-medium">
                Proof of work through open-source contributions and repository metrics.
              </p>
            </motion.div>
            <GithubStats />
          </div>
        </div>
        */}

        <About />
        <Portfolio />
        <Skills />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
};

export default App;
