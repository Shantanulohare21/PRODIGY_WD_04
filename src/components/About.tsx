import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Code2, Lightbulb } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const About = () => {
  const { t } = useLanguage();
  const icons = [GraduationCap, Code2, Lightbulb];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 1.2 }}
      id="about"
      className="relative py-24 md:py-32 overflow-hidden bg-[#0f172a]"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal-500/20 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 md:gap-24 items-center mb-24 md:mb-32">

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="w-12 h-px bg-teal-500 opacity-60"></span>
              <span className="text-teal-400 font-extrabold text-xs uppercase tracking-[0.4em]">{t.about.badge}</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight tracking-tight reveal-text uppercase italic">{t.about.title}</h2>

            <p className="text-slate-400 leading-relaxed mb-6 text-lg font-bold uppercase tracking-tight opacity-80">
              {t.about.bio1}
            </p>

            <p className="text-slate-400 leading-relaxed mb-10 text-lg font-bold uppercase tracking-tight opacity-70">
              {t.about.bio2} <span className="text-white underline decoration-teal-600/40 decoration-4">{t.about.bio2Highlight1}</span> {t.about.bio2Mid} <span className="text-teal-400">{t.about.bio2Highlight2}</span>{t.about.bio2End}
            </p>

            <button className="px-10 py-5 rounded-[2rem] border-4 border-white/5 glass-card text-white font-black hover:border-teal-500/30 transition-all shadow-2xl uppercase tracking-widest text-xs">
              {t.about.cta}
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2"
          >
            <div className="rounded-[3rem] overflow-hidden border-8 border-white/5 glass-card shadow-2xl relative aspect-[4/5] md:aspect-square">
              <img
                src="/about-me.png"
                alt="Shantanu"
                className="w-full h-full object-cover object-top grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-80"></div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.about.timeline.map((item, index) => {
            const Icon = icons[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="glass-card p-10 rounded-[2.5rem] hover:-translate-y-3 transition-all duration-500 group shadow-[0_30px_60px_rgba(0,0,0,0.3)] border-white/5 hover:border-teal-500/30"
              >
                <div className="w-16 h-16 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-400 mb-8 group-hover:bg-teal-500 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(20,184,166,0.6)] transition-all">
                  <Icon className="w-8 h-8" />
                </div>
                <span className="text-teal-500 text-xs font-black flex items-center gap-3 mb-4 uppercase tracking-[0.3em] opacity-90 italic">
                  {item.year}
                </span>
                <h4 className="text-xl font-black text-white mb-3 group-hover:text-teal-400 transition-colors uppercase tracking-tight italic">{item.title}</h4>
                <p className="text-slate-500 font-extrabold text-[10px] tracking-widest uppercase opacity-70 leading-relaxed">{item.institution}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

export default About;
