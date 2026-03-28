import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Facebook, Twitter, Instagram, Youtube, Linkedin, Github, ChevronRight, Layout, Code2, Database, Terminal, Mail, Phone, Monitor, Server, Wrench, Layers, Lightbulb, Menu, X, ExternalLink, ArrowUp, Calendar, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Helper Components ---

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName === 'A' || 
          (e.target as HTMLElement).tagName === 'BUTTON' ||
          (e.target as HTMLElement).closest('a') ||
          (e.target as HTMLElement).closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-teal-500 pointer-events-none z-[9999] hidden md:block"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: isHovering ? 2 : 1,
          backgroundColor: isHovering ? 'rgba(20, 184, 166, 0.1)' : 'transparent',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 250, mass: 0.5 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-teal-500 rounded-full pointer-events-none z-[9999] hidden md:block"
        animate={{
          x: position.x - 3,
          y: position.y - 3,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 400, mass: 0.1 }}
      />
    </>
  );
};

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 w-12 h-12 bg-teal-600 text-white rounded-full shadow-lg z-50 flex items-center justify-center hover:bg-teal-500 transition-colors shadow-teal-500/20"
        >
          <ArrowUp className="w-6 h-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#11161d]/80 backdrop-blur-md py-4 border-b border-white/5' : 'bg-transparent py-6 md:py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center relative z-20">
        <div className="text-2xl font-bold text-white tracking-tighter invisible pointer-events-none md:visible md:pointer-events-auto">
          {/* Logo removed per request, keeping space-holder for alignment if needed, or just let nav float */}
        </div>
        <nav className="hidden md:flex space-x-10 text-sm font-semibold text-slate-300">
          <a href="#home" className="text-white border-b-2 border-teal-500 pb-1">Home</a>
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a>
          <a href="#skills" className="hover:text-white transition-colors">Skills</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </nav>
        <div className="hidden md:block">
          <a 
            href="/Shantanu_Lohare_Resume.pdf" 
            download="Shantanu_Lohare_Resume.pdf"
            className="px-5 py-2 rounded text-sm font-medium text-slate-300 border border-slate-600 hover:bg-white/5 transition-colors text-center inline-block"
          >
            Download CV
          </a>
        </div>
        
        {/* Mobile Menu Button - Left aligned on mobile if no logo */}
        <button className="md:hidden text-slate-300 hover:text-white absolute right-6 top-1/2 -translate-y-1/2" onClick={() => setIsOpen(!isOpen)}>
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
            className="md:hidden absolute top-full left-0 w-full bg-[#11161d]/95 backdrop-blur-lg border-b border-white/10 overflow-hidden"
          >
            <nav className="flex flex-col px-6 py-6 gap-6 text-base font-semibold text-slate-300">
              <a href="#home" onClick={() => setIsOpen(false)} className="hover:text-teal-400 transition-colors">Home</a>
              <a href="#about" onClick={() => setIsOpen(false)} className="hover:text-teal-400 transition-colors">About</a>
              <a href="#portfolio" onClick={() => setIsOpen(false)} className="hover:text-teal-400 transition-colors">Portfolio</a>
              <a href="#skills" onClick={() => setIsOpen(false)} className="hover:text-teal-400 transition-colors">Skills</a>
              <a href="#contact" onClick={() => setIsOpen(false)} className="hover:text-teal-400 transition-colors">Contact</a>
              <a href="/Shantanu_Lohare_Resume.pdf" download="Shantanu_Lohare_Resume.pdf" className="mt-4 px-5 py-3 rounded text-sm font-medium text-teal-400 border border-teal-500/30 bg-teal-500/10 text-center">
                Download CV
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

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
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      id="home" 
      className="relative min-h-[85vh] md:min-h-screen bg-cover bg-[position:80%_center] md:bg-center bg-no-repeat flex items-center pt-24 overflow-hidden border-b border-white/5"
      style={{ backgroundImage: "url('/shantanu-hero-bg.png')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#1a2128]/95 via-[#1a2128]/70 to-transparent z-0"></div>
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex items-center relative z-10">
        <div className="w-full md:w-[60%] lg:w-[55%] pt-10 pb-16 text-left">
          <h1 className="text-4xl md:text-[5.5rem] font-bold text-white mb-6 leading-[1.1] tracking-tight">
            Hello, I'm <br /> Shantanu Lohare
          </h1>
          <div className="inline-flex items-center px-5 py-2 bg-teal-600 rounded text-teal-50 font-medium mb-8 tracking-wide text-lg md:text-xl min-h-[48px]">
            {displayedRole}<span className="animate-pulse ml-1">|</span>
          </div>
          <p className="text-slate-300 max-w-lg mb-12 leading-relaxed text-lg lg:text-xl">
            Building intelligent web solutions to drive innovation and growth.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#portfolio" className="px-8 py-3.5 rounded border border-teal-500 bg-teal-600/10 text-white font-medium hover:bg-teal-600 transition-colors">
              View My Work
            </a>
            <a href="#contact" className="px-8 py-3.5 rounded border border-slate-500 text-slate-300 font-medium hover:bg-white/10 hover:text-white transition-colors">
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

const About = () => {
  const timeline = [
    { year: "2021 - Present", title: "B.Tech in Artificial Intelligence", institution: "Higher Education Institute", icon: GraduationCap },
    { year: "2023", title: "Full Stack Web Development", institution: "MERN Stack Certification", icon: Code2 },
    { year: "2024", title: "AI & Machine Learning Projects", institution: "Independent Research & Development", icon: Lightbulb },
  ];

  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7 }}
      id="about" 
      className="relative py-32 bg-cover bg-center bg-no-repeat border-b border-white/5"
      style={{ backgroundImage: "url('/skills-contact-bg.png')" }}
    >
      <div className="absolute inset-0 bg-[#0f141a]/85 z-0"></div>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center relative z-10">
        <div className="flex flex-col md:flex-row gap-20 items-center mb-24">
          <div className="w-full md:w-1/2">
            <h2 className="text-4xl font-bold text-white mb-2">About Me</h2>
            <div className="w-16 h-1 bg-teal-500 mb-6"></div>
            <p className="text-teal-400 font-semibold mb-8 text-sm tracking-wide">Abit About Myself</p>
            <p className="text-slate-400 leading-relaxed mb-10 text-lg max-w-lg">
              I'm a passionate web developer with experience in creating beautiful and functional websites. 
              I love transforming ideas into reality and building digital experiences that users love. Currently pursuing my B.Tech in Artificial Intelligence.
            </p>
            <button className="px-8 py-3.5 rounded border border-slate-600 text-slate-200 font-medium flex items-center gap-3 hover:bg-white/10 transition-colors group">
              Read More <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="w-full md:w-1/2">
            <div className="rounded-2xl overflow-hidden border-8 border-[#eef1f6] shadow-2xl opacity-90 h-[500px]">
              <img src="/about-me.png" alt="Shantanu Lohare" className="w-full h-full object-cover object-top grayscale mix-blend-multiply hover:grayscale-0 transition-all duration-700" />
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="w-full max-w-4xl">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-white mb-4">My Journey</h3>
            <p className="text-slate-400">Academic & Professional Growth</p>
          </div>
          <div className="relative border-l border-teal-500/30 ml-4 md:ml-auto md:mr-auto space-y-12">
            {timeline.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative pl-10"
              >
                <div className="absolute -left-[21px] top-0 w-10 h-10 rounded-full bg-[#11161d] border border-teal-500 flex items-center justify-center text-teal-400 shadow-[0_0_15px_rgba(20,184,166,0.2)]">
                  <item.icon className="w-5 h-5" />
                </div>
                <div className="bg-white/5 border border-white/10 p-6 rounded-xl backdrop-blur-sm">
                  <span className="text-teal-400 text-sm font-bold flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4" /> {item.year}
                  </span>
                  <h4 className="text-xl font-bold text-white mb-1">{item.title}</h4>
                  <p className="text-slate-400 font-medium">{item.institution}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

const ProjectModal = ({ project, onClose }: { project: any, onClose: () => void }) => {
  if (!project) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center px-6"
    >
      <div className="absolute inset-0 bg-[#11161d]/90 backdrop-blur-sm" onClick={onClose}></div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative bg-white rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col md:flex-row"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/10 flex items-center justify-center text-slate-600 hover:bg-black/20 hover:text-black transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="w-full md:w-1/2 bg-slate-100">
          <img src={project.img} alt={project.title} className="w-full h-full object-cover" />
        </div>
        
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col">
          <div className="mb-8">
            <span className="text-teal-600 font-bold text-xs tracking-widest uppercase mb-2 block">{project.subtitle}</span>
            <h3 className="text-3xl font-extrabold text-[#111827] mb-4">{project.title}</h3>
            <p className="text-slate-600 leading-relaxed">
              {project.description || "A detailed look at this premium MERN stack application, featuring robust backend logic and a modern, responsive user interface designed for maximum impact."}
            </p>
          </div>
          
          <div className="mb-10">
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {(project.tech || ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS"]).map((t: string) => (
                <span key={t} className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full">{t}</span>
              ))}
            </div>
          </div>
          
          <div className="mt-auto flex gap-4">
            <a href={project.live || "#"} className="flex-1 px-6 py-3 bg-teal-600 text-white rounded-xl font-bold text-center hover:bg-teal-500 transition-colors flex items-center justify-center gap-2">
              <ExternalLink className="w-4 h-4" /> Live Demo
            </a>
            <a href={project.repo || "#"} className="flex-1 px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-center hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
              <Github className="w-4 h-4" /> Github
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
      description: "A comprehensive ticket booking platform for historical sites across India. Features real-time booking, secure payments, and a dynamic tour guide marketplace.",
      tech: ["MongoDB", "Express", "React", "Node.js", "Redux", "Stripe API"],
      live: "https://guide-india-demo.vercel.app",
      repo: "https://github.com/Shantanulohare21/GuideIndia"
    },
    { 
      title: "Krishi-AI Platform", 
      subtitle: "Machine Learning & React", 
      img: "/Krishi-ai.png",
      description: "An AI-powered agricultural advisory platform that uses machine learning to predict crop yields and detect plant diseases from photographs.",
      tech: ["Python", "TensorFlow", "React", "FastAPI", "OpenCV"],
      live: "https://krishi-ai-shantanu.vercel.app",
      repo: "https://github.com/Shantanulohare21/Krishi-AI"
    },
    { 
      title: "E-Commerce Dashboard", 
      subtitle: "React & Node.js", 
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
      description: "A high-performance admin dashboard for e-commerce store management, featuring real-time sales tracking, inventory alerts, and customer analytics.",
      tech: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Recharts"],
      live: "#",
      repo: "#"
    }
  ];

  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7 }}
      id="portfolio" 
      className="py-32 bg-[#f4f7f6]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-6 mb-20">
          <h2 className="text-4xl font-extrabold text-[#111827]">My Portfolio</h2>
          <div className="h-6 w-px bg-slate-300"></div>
          <span className="text-slate-500 font-medium tracking-wide">Recent Projects</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
          {projects.map((project, i) => (
            <div 
              key={i} 
              onClick={() => setSelectedProject(project)}
              className="bg-white rounded-xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all flex flex-col p-5 border border-slate-100 group translate-y-0 hover:-translate-y-2 cursor-pointer"
            >
              <div className="rounded-lg overflow-hidden mb-6 aspect-video bg-slate-100 relative">
                <img src={project.img} alt={project.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                {/* Overlay hover UI */}
                <div className="absolute inset-0 bg-[#11161d]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <div className="px-6 py-2 bg-teal-600 text-white rounded-full font-bold text-sm shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    View Project Details
                  </div>
                </div>
              </div>
              <div className="text-center pb-3">
                <h3 className="font-bold text-[#111827] text-xl mb-1">{project.title}</h3>
                <p className="text-sm font-medium text-slate-500 mb-4">{project.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <button className="px-10 py-4 border-b-4 border-teal-800 rounded bg-teal-600 hover:bg-teal-700 hover:border-teal-900 text-white font-semibold flex items-center gap-2 transition-all active:border-b-0 active:translate-y-1">
            View All Projects <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      <AnimatePresence>
        {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </AnimatePresence>
    </motion.section>
  );
};

const Skills = () => (
  <motion.section 
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.7 }}
    id="skills" 
    className="relative py-24 bg-cover bg-center bg-no-repeat border-b border-white/5"
    style={{ backgroundImage: "url('/skills-contact-bg.png')" }}
  >
    <div className="absolute inset-0 bg-[#11161d]/90 z-0"></div>
    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal-500/20 to-transparent z-10"></div>
    <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-20">
      <div className="flex flex-col items-center mb-16 text-center">
        <div className="inline-block px-5 py-2 bg-teal-600/10 border border-teal-500/20 rounded-full text-teal-400 font-bold text-sm tracking-wide shadow-[0_0_15px_rgba(20,184,166,0.15)] mb-6 uppercase">
          Full Stack Developer
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">My Skills</h2>
        <div className="w-16 h-1.5 bg-teal-500 rounded-full mb-6 relative">
          <div className="absolute inset-0 bg-teal-400 blur-[2px] opacity-50 rounded-full"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative z-10">
        {[
          { title: "Programming", icon: Code2, items: ["Java", "JavaScript"] },
          { title: "Frontend", icon: Monitor, items: ["HTML5", "CSS3", "React.js"] },
          { title: "Backend", icon: Server, items: ["Node.js", "Express.js"] },
          { title: "Databases", icon: Database, items: ["MongoDB", "MySQL"] },
          { title: "Tools", icon: Wrench, items: ["Git", "GitHub", "VS Code", "Postman"] },
          { title: "Stack", icon: Layers, items: ["MERN (MongoDB, Express.js, React.js, Node.js)"] },
          { title: "Concepts", icon: Lightbulb, items: ["Data Structures & Algorithms", "REST APIs", "Web Development", "Machine Learning Fundamentals"] }
        ].map((category, i) => (
          <div key={i} className={`flex flex-col p-7 rounded-xl bg-white/5 border border-white/5 hover:border-teal-500/40 hover:bg-white/10 transition-all duration-300 group hover:shadow-[0_10px_30px_rgb(20,184,166,0.1)] ${i === 6 ? 'xl:col-span-2' : ''}`}>
            <div className="flex items-center gap-4 mb-6 pb-4 border-b border-white/10 group-hover:border-teal-500/30 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-teal-600/10 flex items-center justify-center text-teal-400 group-hover:bg-teal-600 group-hover:text-white group-hover:shadow-[0_0_15px_rgba(20,184,166,0.5)] transition-all duration-300">
                <category.icon className="w-6 h-6" />
              </div>
              <h3 className="text-white font-bold text-xl tracking-wide">{category.title}</h3>
            </div>
            <ul className="flex flex-col gap-4 flex-grow">
              {category.items.map((item, index) => (
                <li key={index} className="flex items-start gap-4">
                  <div className="mt-2 w-1.5 h-1.5 rounded-full bg-teal-500 flex-shrink-0 group-hover:scale-125 group-hover:shadow-[0_0_5px_rgba(20,184,166,0.8)] transition-all"></div>
                  <span className="text-slate-300 text-[15px] font-medium leading-relaxed group-hover:text-white transition-colors">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </motion.section>
);

const Contact = () => (
  <motion.section 
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.7 }}
    id="contact" 
    className="relative py-28 bg-cover bg-center bg-no-repeat border-b border-white/5"
    style={{ backgroundImage: "url('/skills-contact-bg.png')" }}
  >
    <div className="absolute inset-0 bg-[#1a2128]/85 z-0"></div>
    <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-16 relative z-10">
      <div className="w-full lg:w-[40%]">
        <div className="flex flex-col mb-8">
          <h2 className="text-4xl font-bold text-white mb-4">Get In Touch</h2>
          <div className="w-16 h-1 bg-teal-500 mb-6"></div>
          <span className="text-teal-400 font-medium tracking-wide text-sm">Contact Me</span>
        </div>
        <p className="text-slate-300 leading-relaxed text-lg lg:text-xl font-light mb-10">
          Have a project in mind or just want to say hello? <br className="hidden lg:block"/>
          Feel free to send me a message!
        </p>
        
        {/* Social Icons */}
        <div className="flex gap-4">
          <a href="#" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-teal-600 hover:text-white hover:border-teal-500 transition-all">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="#" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-teal-600 hover:text-white hover:border-teal-500 transition-all">
            <Github className="w-5 h-5" />
          </a>
          <a href="#" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-teal-600 hover:text-white hover:border-teal-500 transition-all">
            <Twitter className="w-5 h-5" />
          </a>
        </div>
      </div>
      
      <div className="w-full lg:w-[60%]">
        <form action="mailto:shantanulohare021@gmail.com" method="POST" encType="text/plain" className="flex flex-col gap-6 bg-white/5 backdrop-blur-md p-8 rounded-xl border border-white/10 shadow-2xl">
          <div className="flex flex-col md:flex-row gap-6">
            <input type="text" name="name" placeholder="Name" required className="w-full md:w-1/2 bg-[#1a2128]/80 border border-white/10 rounded-lg pl-5 py-4 text-white focus:outline-none focus:border-teal-500 focus:bg-[#1a2128] placeholder:text-slate-500 transition-all" />
            <input type="email" name="email" placeholder="Email" required className="w-full md:w-1/2 bg-[#1a2128]/80 border border-white/10 rounded-lg pl-5 py-4 text-white focus:outline-none focus:border-teal-500 focus:bg-[#1a2128] placeholder:text-slate-500 transition-all" />
          </div>
          <input type="text" name="subject" placeholder="Subject" required className="w-full bg-[#1a2128]/80 border border-white/10 rounded-lg pl-5 py-4 text-white focus:outline-none focus:border-teal-500 focus:bg-[#1a2128] placeholder:text-slate-500 transition-all" />
          <textarea rows={6} name="message" placeholder="Message" required className="w-full bg-[#1a2128]/80 border border-white/10 rounded-lg pl-5 py-4 text-white focus:outline-none focus:border-teal-500 focus:bg-[#1a2128] placeholder:text-slate-500 resize-none transition-all"></textarea>
          <div className="flex justify-end mt-2">
            <button type="submit" className="px-10 py-4 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-semibold flex items-center gap-3 transition-all transform hover:-translate-y-1 shadow-[0_5px_15px_rgba(20,184,166,0.3)] hover:shadow-[0_8px_25px_rgba(20,184,166,0.4)]">
              Send Message <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  </motion.section>
);

const Footer = () => (
  <footer 
    className="relative py-20 border-t border-teal-500/10 bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: "url('/skills-contact-bg.png')" }}
  >
    <div className="absolute inset-0 bg-[#0b0f14]/95 z-0"></div>
    <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left gap-16 relative z-10">
      {/* Brand & Mission - Left */}
      <div className="flex flex-col md:w-1/3 items-center md:items-start">
        <div className="text-3xl font-bold text-white mb-4 tracking-tighter">
          <span className="text-teal-500">S</span>L<span className="text-teal-500">.</span>
        </div>
        <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
          Passionate B.Tech AI student and MERN Stack Developer building intelligent web solutions that matter.
        </p>
        <div className="flex gap-4">
          <a href="https://www.linkedin.com/in/shantanulohare21/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-teal-600 hover:text-white hover:border-teal-500 hover:shadow-[0_0_15px_rgba(20,184,166,0.4)] transition-all">
            <Linkedin className="w-4 h-4" />
          </a>
          <a href="https://github.com/Shantanulohare21/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-teal-600 hover:text-white hover:border-teal-500 hover:shadow-[0_0_15px_rgba(20,184,166,0.4)] transition-all">
            <Github className="w-4 h-4" />
          </a>
          <a href="#" className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-teal-600 hover:text-white hover:border-teal-500 hover:shadow-[0_0_15px_rgba(20,184,166,0.4)] transition-all">
            <Twitter className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Quick Links - Center */}
      <div className="flex flex-col md:w-1/4 items-center md:items-start">
        <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6 px-3 border-l-2 border-teal-500">Navigation</h4>
        <nav className="flex flex-col gap-4 items-center md:items-start">
          {['Home', 'About', 'Portfolio', 'Skills', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-slate-400 hover:text-teal-400 transition-colors text-sm font-semibold">
              {item}
            </a>
          ))}
        </nav>
      </div>

      {/* Contact Info - Right */}
      <div className="flex flex-col md:w-1/3 items-center md:items-end md:text-right">
        <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6 px-3 md:border-r-2 md:border-l-0 border-l-2 border-teal-500">Contact</h4>
        <div className="flex flex-col gap-4">
          <a href="mailto:shantanulohare021@gmail.com" className="group flex items-center justify-center md:flex-row-reverse gap-3 text-slate-300 hover:text-teal-400 transition-colors text-sm font-medium">
            <Mail className="w-5 h-5 p-1 rounded-md bg-white/5 group-hover:bg-teal-600/20 group-hover:text-teal-400 transition-all" />
            shantanulohare021@gmail.com
          </a>
          <a href="tel:+918007157421" className="group flex items-center justify-center md:flex-row-reverse gap-3 text-slate-300 hover:text-teal-400 transition-colors text-sm font-medium">
            <Phone className="w-5 h-5 p-1 rounded-md bg-white/5 group-hover:bg-teal-600/20 group-hover:text-teal-400 transition-all" />
            +91 8007157421
          </a>
        </div>
      </div>
    </div>
    
    <div className="max-w-7xl mx-auto px-6 md:px-12 mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10 text-xs font-medium tracking-wider">
      <p className="text-slate-500">
        &copy; {new Date().getFullYear()} <span className="text-slate-300">Shantanu Lohare</span>. All Rights Reserved.
      </p>
      <p className="text-slate-500 flex items-center gap-2">
        Built with <span className="text-teal-500">React</span> & <span className="text-teal-500">Tailwind CSS</span>
      </p>
    </div>
  </footer>
);

const App = () => {
  return (
    <div className="min-h-screen font-sans bg-[#F9FAFB] cursor-none lg:cursor-auto">
      <CustomCursor />
      <ScrollToTop />
      <Header />
      <Hero />
      <About />
      <Portfolio />
      <Skills />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;
