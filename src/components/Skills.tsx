import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Monitor, Server, Database, Wrench, Layers, Lightbulb, ChevronRight } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    { title: "Programming", icon: Code2, items: ["Java", "JavaScript", "Python", "TypeScript"] },
    { title: "Frontend", icon: Monitor, items: ["React.js", "Next.js", "Tailwind CSS", "Redux"] },
    { title: "Backend", icon: Server, items: ["Node.js", "Express.js", "FastAPI", "Prisma"] },
    { title: "Databases", icon: Database, items: ["MongoDB", "MySQL", "PostgreSQL", "Prisma"] },
    { title: "Tools & DevOps", icon: Wrench, items: ["Git", "GitHub", "Docker", "Vercel"] },
    { title: "Stack Specialization", icon: Layers, items: ["MERN Stack Mastery", "Full Stack Development"] },
    { title: "Core AI Concepts", icon: Lightbulb, items: ["Machine Learning", "TensorFlow", "Deep Learning", "CNN/RNN"] }
  ];

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2 }}
      id="skills" 
      className="relative py-24 md:py-32 overflow-hidden bg-[#0f172a]"
    >
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal-500/20 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col items-center mb-20 text-center">
          <div className="inline-block px-6 py-2 bg-teal-500/10 border border-teal-500/20 rounded-full text-teal-400 font-bold text-xs tracking-widest mb-8 uppercase italic">
            Technical Arsenal
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 reveal-text tracking-tight leading-tight">Expertise & Stack</h2>
          <div className="w-24 h-1 bg-teal-500/30 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 relative z-10 pb-16">
          {skillCategories.map((category, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className={`flex flex-col p-8 rounded-3xl glass-card border border-white/5 hover:border-teal-500/40 transform hover:-translate-y-2 transition-all duration-300 group shadow-xl ${i > 4 ? 'xl:col-span-2' : ''}`}
            >
              <div className="flex items-center gap-5 mb-8 pb-4 border-b border-white/5 group-hover:border-teal-500/30 transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-teal-500/10 flex items-center justify-center text-teal-400 group-hover:bg-teal-500 group-hover:text-white group-hover:shadow-lg transition-all duration-300 select-none">
                  <category.icon className="w-7 h-7" />
                </div>
                <h3 className="text-white font-extrabold text-lg tracking-tight uppercase group-hover:text-teal-400 transition-colors">{category.title}</h3>
              </div>
              <ul className="flex flex-wrap gap-2 md:flex-col lg:flex-row xl:flex-col gap-3">
                {category.items.map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-teal-500 group-hover:scale-125 transition-all"></div>
                    <span className="text-slate-400 text-sm font-bold tracking-wide group-hover:text-white transition-colors">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Skills;
