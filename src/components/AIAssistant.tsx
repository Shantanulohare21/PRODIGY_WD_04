import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, ExternalLink } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIAssistant = ({ isOpen, onClose }: AIAssistantProps) => {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Reset messages when language changes, with translated greeting
  useEffect(() => {
    setMessages([{ role: 'bot', content: t.ai.greeting, type: 'text' }]);
  }, [t]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, isOpen]);

  const knowledgeBase: Record<string, any> = {
    mern: {
      content: "Shantanu is proficient in the MERN stack (MongoDB, Express, React, Node.js). He has built complex applications like 'GuideIndia' using these technologies, focusing on scalable architecture and seamless UX.",
      suggestion: { label: 'View GuideIndia Case Study', link: '#portfolio' },
    },
    projects: {
      content: "His top projects include 'GuideIndia' (a ticket booking system) and 'Krishi-AI' (an agricultural advisory platform using Machine Learning). He loves solving real-world problems with code.",
      suggestion: { label: 'See all projects', link: '#portfolio' },
    },
    contact: {
      content: 'You can reach Shantanu at shantanulohare021@gmail.com or via the contact form below. He is currently looking for opportunities where he can contribute his AI and Full Stack skills.',
      suggestion: { label: 'Go to Contact', link: '#contact' },
    },
    experience: {
      content: 'He is a B.Tech student in Artificial Intelligence with a strong foundation in Data Structures, Algorithms, and Modern Web Technologies.',
      suggestion: { label: 'Download Resume', link: '/Shantanu_Lohare_Resume.pdf' },
    },
    skills: {
      content: 'Key skills: JavaScript, TypeScript, React, Node.js, MongoDB, Python, TensorFlow, and REST API development.',
      suggestion: { label: 'View Skills Section', link: '#skills' },
    },
    default: {
      content: "That's a great question! While I'm a simplified AI, I can tell you that Shantanu is highly dedicated to MERN stack development and AI research. Would you like to know about his projects or skills?",
      suggestion: null,
    },
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage, type: 'text' }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const lower = userMessage.toLowerCase();
      let responseObj = knowledgeBase.default;
      if (lower.includes('mern') || lower.includes('stack')) responseObj = knowledgeBase.mern;
      else if (lower.includes('project')) responseObj = knowledgeBase.projects;
      else if (lower.includes('contact') || lower.includes('email') || lower.includes('reach')) responseObj = knowledgeBase.contact;
      else if (lower.includes('experience') || lower.includes('education')) responseObj = knowledgeBase.experience;
      else if (lower.includes('skill') || lower.includes('tech')) responseObj = knowledgeBase.skills;

      setMessages(prev => [...prev, { role: 'bot', content: responseObj.content, type: 'text' }]);
      if (responseObj.suggestion) {
        setMessages(prev => [...prev, { role: 'bot', content: responseObj.suggestion, type: 'suggestion' }]);
      }
      setIsTyping(false);
    }, 1000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0f172a]/60 backdrop-blur-sm z-[100]"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 w-full md:w-[450px] h-full bg-[#0f172a] border-l border-white/10 z-[101] flex flex-col shadow-2xl shadow-teal-500/10"
          >
            {/* Header */}
            <div className="p-8 border-b border-white/5 bg-white/5 backdrop-blur-md flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-teal-500 flex items-center justify-center text-white shadow-lg shadow-teal-500/20">
                  <Bot className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-white font-black text-base uppercase tracking-tight">
                    {t.ai.title} <span className="text-[10px] bg-teal-500/20 text-teal-400 px-2 py-0.5 rounded-md ml-1">{t.ai.version}</span>
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{t.ai.status}</span>
                  </div>
                </div>
              </div>
              <button onClick={onClose} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all active:scale-90">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar bg-mesh">
              {messages.map((msg: any, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.type === 'text' ? (
                    <div className={`max-w-[85%] p-5 rounded-2xl text-[13px] leading-relaxed font-semibold shadow-xl ${
                      msg.role === 'user'
                        ? 'bg-teal-600 text-white rounded-tr-none shadow-teal-500/20'
                        : 'bg-white/5 text-slate-100 border border-white/10 rounded-tl-none'
                    }`}>
                      {msg.content}
                    </div>
                  ) : (
                    <motion.a
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      href={msg.content.link}
                      onClick={() => msg.content.link.startsWith('#') && onClose()}
                      className="flex items-center gap-3 px-6 py-3 bg-teal-600/20 border border-teal-500/30 rounded-full text-teal-400 text-xs font-black shadow-lg hover:bg-teal-600 hover:text-white transition-all group mt-2 uppercase tracking-widest"
                    >
                      {msg.content.label} <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </motion.a>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-5 rounded-2xl rounded-tl-none border border-white/10 flex gap-2">
                    <span className="w-2 h-2 bg-teal-500 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-teal-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-2 h-2 bg-teal-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-8 border-t border-white/10 bg-white/5 backdrop-blur-xl">
              <div className="flex gap-4 relative">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && handleSend()}
                  placeholder={t.ai.placeholder}
                  className="w-full bg-[#111827] border border-white/5 rounded-2xl px-8 py-5 text-sm font-semibold text-white focus:outline-none focus:border-teal-500/50 transition-all pr-16 shadow-inner"
                />
                <button
                  onClick={handleSend}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center text-white hover:bg-teal-500 transition-all shadow-xl shadow-teal-500/20 active:scale-95 group"
                >
                  <Send className="w-6 h-6 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AIAssistant;
