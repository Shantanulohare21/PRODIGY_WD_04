import React from 'react';
import { motion } from 'framer-motion';
import { Github, Star, GitFork, Activity } from 'lucide-react';

const GithubStats = () => {
  const stats = [
    { label: "Repositories", value: "32+", icon: Github, color: "text-white" },
    { label: "Total Stars", value: "150+", icon: Star, color: "text-yellow-400" },
    { label: "Forks", value: "45+", icon: GitFork, color: "text-teal-400" },
    { label: "Contributions", value: "850+", icon: Activity, color: "text-green-400" }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="glass-card p-6 rounded-2xl flex flex-col items-center justify-center text-center group hover:border-teal-500/50 transition-all duration-500"
        >
          <div className={`w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-white/10 transition-colors ${stat.color}`}>
            <stat.icon className="w-6 h-6" />
          </div>
          <h4 className="text-2xl font-bold text-white mb-1 tracking-tight">{stat.value}</h4>
          <p className="text-slate-400 text-xs font-semibold uppercase tracking-widest">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default GithubStats;
