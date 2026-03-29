import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X, ChevronRight, Target, Lightbulb, TrendingUp } from 'lucide-react';

const ProjectModal = ({ project, onClose }: { project: any, onClose: () => void }) => {
  const [mainImage, setMainImage] = useState(project?.img);
  if (!project) return null;

  const gallery = project.gallery || [project.img];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center px-6"
    >
      <div className="absolute inset-0 bg-[#0f172a]/90 backdrop-blur-md" onClick={onClose}></div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative bg-[#111827] rounded-3xl overflow-hidden max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col md:flex-row border border-white/10"
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition-all shadow-xl"
        >
          <X className="w-5 h-5" />
        </button>
        
        {/* Left Side: Images */}
        <div className="w-full md:w-[45%] bg-slate-900 flex flex-col overflow-hidden">
          <div className="flex-1 min-h-[300px] relative overflow-hidden group">
            <AnimatePresence mode="wait">
              <motion.img 
                key={mainImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                src={mainImage} 
                alt={project.title} 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent pointer-events-none"></div>
          </div>
          {gallery.length > 1 && (
            <div className="p-6 bg-white/5 backdrop-blur-3xl border-t border-white/10 flex gap-3 overflow-x-auto custom-scrollbar">
              {gallery.map((img: string, idx: number) => (
                <button 
                  key={idx} 
                  onClick={() => setMainImage(img)}
                  className={`w-20 h-14 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 shadow-lg ${mainImage === img ? 'border-teal-500 scale-105' : 'border-transparent opacity-40 hover:opacity-100'}`}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Right Side: Case Study Content */}
        <div className="w-full md:w-[55%] p-10 md:p-14 flex flex-col bg-[#111827] text-slate-100">
          <div className="mb-8">
            <span className="text-teal-400 font-bold text-xs uppercase tracking-widest mb-3 block">MERN & AI Specialized</span>
            <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-6 leading-tight">{project.title}</h3>
            <div className="flex flex-wrap gap-2.5 mb-8">
              {(project.tech || []).map((t: string) => (
                <span key={t} className="px-4 py-1.5 bg-teal-500/10 text-teal-300 text-[10px] font-bold rounded-full border border-teal-500/20 uppercase tracking-widest shadow-sm">{t}</span>
              ))}
            </div>
          </div>
          
          <div className="space-y-10 mb-14">
            <div className="flex gap-6 group">
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center flex-shrink-0 border border-red-500/20 shadow-lg group-hover:bg-red-500/20 transition-all">
                <Target className="w-6 h-6 text-red-400" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-2">The Challenge</h4>
                <p className="text-slate-400 text-sm leading-relaxed font-medium">{project.challenge}</p>
              </div>
            </div>

            <div className="flex gap-6 group">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 flex items-center justify-center flex-shrink-0 border border-teal-500/20 shadow-lg group-hover:bg-teal-500/20 transition-all">
                <Lightbulb className="w-6 h-6 text-teal-400" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-2">The Solution</h4>
                <p className="text-slate-400 text-sm leading-relaxed font-medium">{project.solution}</p>
              </div>
            </div>

            <div className="flex gap-6 group">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center flex-shrink-0 border border-blue-500/20 shadow-lg group-hover:bg-blue-500/20 transition-all">
                <TrendingUp className="w-6 h-6 text-blue-400" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-2">The Impact</h4>
                <p className="text-slate-400 text-sm leading-relaxed font-medium">{project.impact}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-auto flex gap-6 pt-10 border-t border-white/5">
            <a href={project.live || "#"} target="_blank" rel="noopener noreferrer" className="flex-1 px-8 py-4 bg-teal-500 text-white rounded-2xl font-bold text-xs text-center border border-teal-400/50 hover:bg-teal-600 transition-all flex items-center justify-center gap-3 shadow-lg active:scale-95 group">
              Explore Live <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
            <a href={project.repo || "#"} target="_blank" rel="noopener noreferrer" className="flex-1 px-8 py-4 bg-white/5 text-white rounded-2xl font-bold text-xs text-center hover:bg-white/10 transition-all border border-white/10 flex items-center justify-center gap-3 shadow-xl active:scale-95 group">
              Source Code <Github className="w-4 h-4" />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const projects = [
    { 
      title: "GuideIndia", 
      subtitle: "MERN Stack Application", 
      img: "/guide-india.png",
      gallery: ["/guide-india-1.jfif", "/guide-india-2.jfif", "/guide-india-3.jfif", "/guide-india-4.jfif"],
      challenge: "Monument management in India often suffers from long queues and inefficient ticketing systems during peak historical seasons.",
      solution: "Engineered a high-concurrency MERN app with Stripe integration, Redux toolkit for inventory, and a dynamic Multi-monument selection engine.",
      impact: "Simulated load tests show a 60% reduction in average booking time compared to traditional manual systems and legacy platforms.",
      tech: ["MongoDB", "Express", "React", "Node.js", "Redux", "Stripe API"],
      live: "https://guide-india-demo.vercel.app",
      repo: "https://github.com/Shantanulohare21/GuideIndia"
    },
    { 
      title: "Krishi-AI Platform", 
      subtitle: "Machine Learning & React", 
      img: "/Krishi-ai.png",
      challenge: "Small-scale farmers lack access to advanced crop disease diagnostic tools, leading to late detections and massive yield losses.",
      solution: "Developed a Python-based CNN model for leaf disease classification, integrated with a FastAPI backend and a visually intuitive React dashboard.",
      impact: "Provides a zero-cost early detection tool that helps farmers identify issues from simple photographs, with over 92% diagnostic accuracy.",
      tech: ["Python", "TensorFlow", "React", "FastAPI", "OpenCV"],
      live: "https://krishi-ai-shantanu.vercel.app",
      repo: "https://github.com/Shantanulohare21/Krishi-AI"
    },
    { 
      title: "Management System", 
      subtitle: "Full Stack Dashboard", 
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
      challenge: "Businesses need robust, real-time management dashboards that aggregate data from multiple streams into actionable insights.",
      solution: "Built a high-performance administration suite with Next.js and Prisma, featuring advanced data visualization and automated workflow triggers.",
      impact: "Optimized administrative throughput by 30% through automated data aggregation and visual intelligence reporting.",
      tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Recharts"],
      live: "#",
      repo: "#"
    }
  ];

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1.2 }}
      id="portfolio" 
      className="relative py-24 md:py-32 bg-[#0f172a]/80 backdrop-blur-3xl"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="w-10 h-1 bg-teal-500 rounded-full"></span>
              <span className="text-teal-400 font-bold text-sm tracking-widest uppercase">Project Showcase</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight tracking-tight reveal-text">The Project Gallery</h2>
          </div>
          <p className="text-slate-400 font-medium max-w-sm md:text-right uppercase tracking-widest opacity-80 leading-relaxed text-sm">
            Curated selection of industrial-grade MERN and AI/ML applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 mb-20">
          {projects.map((project, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.8 }}
              onClick={() => setSelectedProject(project)}
              className="glass-card group flex flex-col p-6 md:p-8 rounded-3xl border border-white/5 hover:border-teal-500/40 cursor-pointer overflow-hidden transform-gpu"
            >
              <div className="rounded-2xl overflow-hidden mb-8 aspect-video relative shadow-xl bg-slate-900">
                <img src={project.img} alt={project.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-teal-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white text-teal-600 flex items-center justify-center shadow-xl transform scale-0 group-hover:scale-100 transition-transform duration-300">
                    <ChevronRight className="w-8 h-8" />
                  </div>
                </div>
              </div>
              <div className="px-1">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.slice(0, 3).map((t, idx) => (
                    <span key={idx} className="text-[10px] font-bold uppercase text-teal-400/80 tracking-widest">{t}</span>
                  ))}
                </div>
                <h3 className="font-extrabold text-white text-2xl mb-2 tracking-tight group-hover:text-teal-400 transition-colors uppercase">{project.title}</h3>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{project.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-5 rounded-full bg-teal-500 hover:bg-teal-600 text-white font-bold flex items-center gap-3 transition-all shadow-lg shadow-teal-500/20 uppercase tracking-widest text-xs border border-teal-400/50"
          >
            Explore Full Repository <Github className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
      
      <AnimatePresence>
        {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </AnimatePresence>
    </motion.section>
  );
};

export default Portfolio;
