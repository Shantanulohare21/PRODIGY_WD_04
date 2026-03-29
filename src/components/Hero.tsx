import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ArrowDown } from 'lucide-react';

const Hero = () => {
  const roles = ["AI Student", "MERN Stack Developer", "Problem Solver"];
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedRole(currentRole.slice(0, displayedRole.length + 1));
        if (displayedRole.length === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 1500);
        }
      } else {
        setDisplayedRole(currentRole.slice(0, displayedRole.length - 1));
        if (displayedRole.length === 0) {
          setIsDeleting(false);
          setRoleIndex((roleIndex + 1) % roles.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayedRole, isDeleting, roleIndex]);

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      id="home" 
      className="relative min-h-screen flex items-center pt-32 pb-24 overflow-hidden border-b border-white/5 bg-[#0f172a]"
    >
      {/* High-Impact Background Image - Maximum Visibility */}
      <div 
        className="absolute inset-0 bg-cover bg-center md:bg-[position:90%_center] bg-no-repeat transition-all duration-1000 scale-100 opacity-70"
        style={{ backgroundImage: "url('/shantanu-hero-bg.png')" }}
      ></div>
      
      {/* Dynamic Overlays: Ensuring text is 100% readable while maintaining image clarity */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/90 to-transparent md:via-[#0f172a]/40 z-0"></div>
      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#0f172a] to-transparent z-0"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
            className="text-left"
          >
            {/* Tagline removed per User Request */}
            
            <h1 className="text-6xl md:text-[6.5rem] font-black text-white mb-10 leading-[0.95] tracking-tighter uppercase italic drop-shadow-2xl">
              Shantanu <br /> <span className="text-white opacity-95 underline decoration-teal-600/40 decoration-8 underline-offset-10">Lohare</span>
            </h1>
            
            <div className="inline-flex items-center px-8 py-3 bg-teal-600/10 border border-teal-500/20 rounded-2xl text-teal-400 font-black mb-12 tracking-widest text-xl md:text-2xl min-h-[64px] backdrop-blur-sm shadow-2xl uppercase">
              {displayedRole}<span className="animate-pulse ml-1 text-teal-500 opacity-80">|</span>
            </div>
            
            <p className="text-slate-400 max-w-lg mb-14 leading-relaxed text-xl lg:text-2xl font-bold uppercase tracking-tight opacity-90 drop-shadow-md">
              Transforming <span className="text-white">Complex Data</span> into Seamless <span className="text-teal-400">Human Experiences</span> through the MERN Stack and AI solutions.
            </p>
            
            <div className="flex flex-wrap gap-6">
              <a href="#portfolio" className="px-12 py-5 rounded-[2rem] bg-teal-500 text-white font-black hover:bg-teal-600 transition-all transform hover:-translate-y-1 shadow-[0_15px_40px_rgba(20,184,166,0.4)] flex items-center gap-3 uppercase tracking-widest text-xs">
                View Portfolio <ChevronRight className="w-5 h-5" />
              </a>
              <a href="#contact" className="px-12 py-5 rounded-[2rem] border-2 border-white/10 glass-card text-white font-black hover:border-teal-500/50 transition-all transform hover:-translate-y-1 uppercase tracking-widest text-xs">
                Get In Touch
              </a>
            </div>
          </motion.div>

          {/* Right side for image visibility */}
          <div className="hidden lg:block"></div>

        </div>
      </div>
      
      {/* Decorative Final Polish Indicators */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-6 opacity-40">
        <span className="text-[10px] text-white font-black uppercase tracking-[0.6em] rotate-90 my-10 origin-center select-none">Discover More</span>
        <div className="w-px h-24 bg-gradient-to-b from-teal-500 to-transparent"></div>
      </div>
    </motion.section>
  );
};

export default Hero;
