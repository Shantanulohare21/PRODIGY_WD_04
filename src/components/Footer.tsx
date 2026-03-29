import React from 'react';
import { Mail, Phone, Linkedin, Github, Twitter, MapPin, ExternalLink, Cpu } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative bg-[#0f172a] pt-24 pb-12 overflow-hidden border-t border-white/5">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-teal-500/5 blur-[120px] rounded-full"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 mb-20">
          
          {/* Brand & Perspective */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center gap-3 group cursor-pointer w-fit">
              <div className="p-3 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-400 group-hover:bg-teal-500 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(20,184,166,0.4)] transition-all">
                <Cpu className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">Shantanu <span className="text-teal-400">Lohare</span></h3>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">AI & MERN Engineer</span>
              </div>
            </div>
            
            <p className="text-slate-400 text-lg font-bold leading-relaxed max-w-md uppercase tracking-tight opacity-70">
              Dedicated to building seamless, intelligent digital experiences that bridge the gap between high-performance backends and intuitive user interfaces.
            </p>
            
            <div className="flex gap-4">
              {[
                { icon: Linkedin, href: "https://www.linkedin.com/in/shantanulohare21/" },
                { icon: Github, href: "https://github.com/Shantanulohare21" },
                { icon: Twitter, href: "#" }
              ].map((item, i) => (
                <a 
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-teal-500 hover:text-white hover:border-teal-500 transition-all shadow-xl group"
                >
                  <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Targeted Navigation */}
          <div className="space-y-8">
            <h4 className="text-white font-black text-xs uppercase tracking-[0.4em] italic mb-8 flex items-center gap-3">
              <span className="w-8 h-px bg-teal-500/40"></span> Directory
            </h4>
            <nav className="flex flex-col gap-5">
              {['Home', 'About', 'Portfolio', 'Skills', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`}
                  className="text-slate-500 hover:text-teal-400 font-black text-xs uppercase tracking-widest transition-all w-fit group flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500/0 group-hover:bg-teal-500 transition-all"></span>
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Core */}
          <div className="space-y-8">
            <h4 className="text-white font-black text-xs uppercase tracking-[0.4em] italic mb-8 flex items-center gap-3">
              <span className="w-8 h-px bg-teal-500/40"></span> Connectivity
            </h4>
            <div className="flex flex-col gap-6">
              <a href="mailto:shantanulohare021@gmail.com" className="group">
                <span className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 group-hover:text-teal-400 transition-colors">Direct Signal</span>
                <span className="text-white font-bold text-sm tracking-tight border-b border-transparent group-hover:border-teal-500/40 transition-all flex items-center gap-2">
                  shantanulohare021@gmail.com <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </span>
              </a>
              <div className="group">
                <span className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 group-hover:text-teal-400 transition-colors">Operational Base</span>
                <span className="text-white font-bold text-sm tracking-tight flex items-center gap-2">
                  Nagpur, India <MapPin className="w-3 h-3 text-teal-500" />
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Legal & Status */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
            <span>&copy; {currentYear} ALL PROTECTIONS VALID</span>
            <span className="w-1 h-1 bg-white/20 rounded-full"></span>
            <span className="text-slate-400">SHANTANU LOHARE</span>
          </div>
          
          <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Deployment Status: Optimized</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
