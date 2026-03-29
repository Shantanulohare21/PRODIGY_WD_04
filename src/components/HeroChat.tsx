import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, Sparkles, ExternalLink, X, MessageSquare } from 'lucide-react';

const HeroChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', content: "Hi! I'm Shantanu's AI. Want to see his MERN projects or check his AI expertise?", type: 'text' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, isOpen]);

  const knowledgeBase: Record<string, any> = {
    "mern": {
      content: "Proficient in MERN. Check out 'GuideIndia'—a full-scale booking system with Stripe and Redux.",
      suggestion: { label: "View Case Study", link: "#portfolio" }
    },
    "projects": {
      content: "Featured: 'GuideIndia' (MERN) and 'Krishi-AI' (TensorFlow/Python). Both solve real-world problems.",
      suggestion: { label: "Explore Projects", link: "#portfolio" }
    },
    "skills": {
      content: "Stack: React, Node, Mongo, Python, AI/ML. Focus: Scalability & Impact.",
      suggestion: { label: "See Full Skills", link: "#skills" }
    },
    "default": {
      content: "Great question! I'm here to show you Shantanu's range in MERN and AI. What should we look at?",
      suggestion: { label: "Check Portfolio", link: "#portfolio" }
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage, type: 'text' }]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let responseObj = knowledgeBase.default;
      const lowerInput = userMessage.toLowerCase();
      if (lowerInput.includes('mern')) responseObj = knowledgeBase.mern;
      else if (lowerInput.includes('project')) responseObj = knowledgeBase.projects;
      else if (lowerInput.includes('skill')) responseObj = knowledgeBase.skills;

      setMessages(prev => [...prev, { role: 'bot', content: responseObj.content, type: 'text' }]);
      if (responseObj.suggestion) {
        setMessages(prev => [...prev, { role: 'bot', content: responseObj.suggestion, type: 'suggestion' }]);
      }
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="w-full h-full flex flex-col items-center lg:items-end justify-center">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="closed"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={() => setIsOpen(true)}
            className="group cursor-pointer glass-card w-full max-w-[400px] p-8 rounded-3xl flex flex-col border-teal-500/20 hover:border-teal-500/40 hover:bg-white/10 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="w-14 h-14 rounded-2xl bg-teal-500 flex items-center justify-center text-white shadow-lg shadow-teal-500/20 group-hover:scale-110 transition-transform">
                <Bot className="w-8 h-8" />
              </div>
              <div className="text-right">
                <span className="text-teal-400 font-bold text-[10px] uppercase tracking-widest block mb-1">Status</span>
                <span className="text-white text-xs font-bold flex items-center gap-1.5 justify-end">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Online
                </span>
              </div>
            </div>
            
            <h4 className="text-xl font-bold text-white mb-3">AI Recruiting Assistant</h4>
            <p className="text-slate-400 text-sm font-medium mb-8">
              I can guide you through Shantanu's technical expertise in MERN and AI.
            </p>
            
            <div className="flex items-center gap-2 text-teal-400 font-bold text-sm tracking-tight transition-all">
              <span>Start Conversation</span>
              <Sparkles className="w-4 h-4" />
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="open"
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            className="glass-card w-full max-w-[420px] h-[520px] rounded-3xl overflow-hidden flex flex-col shadow-2xl relative border-teal-500/30"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center text-white shadow-lg shadow-teal-500/20">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">AI Agent</h4>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Active</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
                className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all active:scale-90"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages area */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar bg-[#0f172a]/40">
              {messages.map((msg: any, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.type === 'text' ? (
                    <div className={`max-w-[85%] p-4 rounded-2xl text-[13px] leading-relaxed font-medium shadow-sm ${
                      msg.role === 'user' 
                        ? 'bg-teal-600 text-white rounded-tr-none' 
                        : 'bg-white/10 text-slate-100 border border-white/5 rounded-tl-none'
                    }`}>
                      {msg.content}
                    </div>
                  ) : (
                    <motion.a
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      href={msg.content.link}
                      className="flex items-center gap-2 px-5 py-2.5 bg-teal-500 text-white rounded-full text-xs font-bold shadow-lg shadow-teal-500/20 hover:bg-teal-600 transition-all group mt-2"
                    >
                      {msg.content.label} <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </motion.a>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/10 p-4 rounded-2xl rounded-tl-none border border-white/5 flex gap-1.5">
                    <span className="w-2 h-2 bg-teal-500 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-teal-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-2 h-2 bg-teal-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}
            </div>

            {/* Input section */}
            <div className="p-6 bg-white/5 border-t border-white/10 backdrop-blur-md">
              <div className="flex gap-3 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about MERN, AI or Projects..."
                  className="w-full bg-[#111827] border border-white/10 rounded-2xl px-6 py-4 text-xs font-bold text-white placeholder:text-slate-600 focus:outline-none focus:border-teal-500 transition-all pr-12 shadow-inner"
                />
                <button
                  onClick={handleSend}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center text-white hover:bg-teal-600 transition-all shadow-xl shadow-teal-500/20 active:scale-95"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeroChat;
