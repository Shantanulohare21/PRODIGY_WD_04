import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sparkles, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Language } from '../i18n/translations';

interface HeaderProps {
  onToggleBot: () => void;
}

const Header = ({ onToggleBot }: HeaderProps) => {
  const { t, language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { id: 'home', label: t.nav.home },
    { id: 'about', label: t.nav.about },
    { id: 'portfolio', label: t.nav.portfolio },
    { id: 'skills', label: t.nav.skills },
    { id: 'contact', label: t.nav.contact },
  ];

  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'hi', label: 'HI' },
    { code: 'mr', label: 'MR' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    ['home', 'about', 'portfolio', 'skills', 'contact'].forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#0f172a]/80 backdrop-blur-md py-4 border-b border-white/5' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center relative z-20">

        {/* Language Switcher */}
        <div className="hidden md:flex items-center gap-1 p-1 bg-white/5 border border-white/10 rounded-full">
          <Globe className="w-3.5 h-3.5 text-slate-500 ml-2" />
          {languages.map(({ code, label }) => (
            <button
              key={code}
              onClick={() => setLanguage(code)}
              className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                language === code
                  ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-10 text-sm font-bold uppercase tracking-widest text-slate-400">
          {navItems.map(item => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`relative py-2 transition-all duration-300 hover:text-white ${activeSection === item.id ? 'text-white' : ''}`}
            >
              {item.label}
              {activeSection === item.id && (
                <motion.div
                  layoutId="activeUnderline"
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-teal-500 shadow-[0_4px_10px_rgba(20,184,166,0.6)]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-6">
          <button
            onClick={onToggleBot}
            className="flex items-center gap-3 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest text-teal-400 border-2 border-teal-500/20 hover:bg-teal-500/10 hover:border-teal-500/50 transition-all group shadow-xl"
          >
            <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            {t.nav.aiAssistant}
          </button>
          <a
            href="/Shantanu_Lohare_Resume.pdf"
            download="Shantanu_Lohare_Resume.pdf"
            className="px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest text-white bg-teal-500 hover:bg-teal-600 transition-all shadow-[0_10px_25px_rgba(20,184,166,0.3)] border border-teal-400/50"
          >
            {t.nav.resume}
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-slate-300 hover:text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 w-full bg-[#0f172a]/95 backdrop-blur-lg border-b border-white/10 overflow-hidden"
          >
            <nav className="flex flex-col px-8 py-8 gap-6 text-base font-black uppercase tracking-widest text-slate-400">
              {navItems.map(item => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setIsOpen(false)}
                  className={`transition-colors ${activeSection === item.id ? 'text-teal-400' : 'hover:text-white'}`}
                >
                  {item.label}
                </a>
              ))}
              <div className="h-px bg-white/5 w-full"></div>
              {/* Mobile Language Switcher */}
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-slate-500" />
                {languages.map(({ code, label }) => (
                  <button
                    key={code}
                    onClick={() => setLanguage(code)}
                    className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                      language === code ? 'bg-teal-500 text-white' : 'bg-white/5 text-slate-400'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <button
                onClick={() => { onToggleBot(); setIsOpen(false); }}
                className="w-full py-5 rounded-2xl bg-white/5 border border-white/10 text-teal-400 text-xs font-black uppercase tracking-widest shadow-lg"
              >
                {t.nav.aiAssistant}
              </button>
              <a
                href="/Shantanu_Lohare_Resume.pdf"
                download="Shantanu_Lohare_Resume.pdf"
                className="px-5 py-5 rounded-2xl bg-teal-500 text-white text-xs font-black uppercase tracking-widest text-center shadow-xl border border-teal-400/50"
              >
                {t.nav.downloadResume}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
