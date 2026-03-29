import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Linkedin, Github, Twitter, MapPin, ExternalLink } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Contact = () => {
  const { t } = useLanguage();

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 1.2 }}
      id="contact"
      className="relative py-24 md:py-32 overflow-hidden bg-[#0f172a]"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal-500/20 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col items-center mb-20 text-center">
          <div className="inline-block px-6 py-2 bg-teal-500/10 border border-teal-500/20 rounded-full text-teal-400 font-bold text-xs tracking-widest mb-8 uppercase italic">
            {t.contact.badge}
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 reveal-text tracking-tight leading-tight">{t.contact.title}</h2>
          <div className="w-24 h-1 bg-teal-500/30 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">{t.contact.info}</h3>
              <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-md opacity-80">
                {t.contact.description}
              </p>
            </div>

            <div className="space-y-6">
              {[
                { icon: Mail, label: t.contact.emailLabel, value: 'shantanulohare021@gmail.com', href: 'mailto:shantanulohare021@gmail.com' },
                { icon: MapPin, label: t.contact.locationLabel, value: t.contact.location, href: '#' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6 group">
                  <div className="w-14 h-14 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-400 border border-teal-500/20 group-hover:bg-teal-500 group-hover:text-white transition-all shadow-lg">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{item.label}</h4>
                    <a href={item.href} className="text-white text-lg font-extrabold hover:text-teal-400 transition-colors uppercase tracking-tight">{item.value}</a>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 flex gap-4">
              {[Linkedin, Github, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 border border-white/5 hover:bg-teal-500 hover:text-white hover:border-teal-500 transition-all shadow-xl transform hover:-translate-y-1">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-card p-10 md:p-12 rounded-3xl border border-white/5 shadow-2xl bg-[#0f172a]/60 backdrop-blur-3xl"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">{t.contact.namePlaceholder}</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-sm font-medium focus:outline-none focus:border-teal-500 transition-all placeholder:text-slate-700" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">{t.contact.emailPlaceholder}</label>
                  <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-sm font-medium focus:outline-none focus:border-teal-500 transition-all placeholder:text-slate-700" placeholder="john@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">{t.contact.subjectPlaceholder}</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white text-sm font-medium focus:outline-none focus:border-teal-500 transition-all placeholder:text-slate-700" placeholder={t.contact.subjectHint} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">{t.contact.messagePlaceholder}</label>
                <textarea rows={5} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white text-sm font-medium focus:outline-none focus:border-teal-500 transition-all placeholder:text-slate-700 resize-none" placeholder={t.contact.messageHint} />
              </div>
              <button className="w-full py-5 rounded-2xl bg-teal-500 text-white font-extrabold uppercase text-xs tracking-widest hover:bg-teal-600 transition-all shadow-lg shadow-teal-500/20 flex items-center justify-center gap-3">
                {t.contact.sendBtn} <ExternalLink className="w-5 h-5" />
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
