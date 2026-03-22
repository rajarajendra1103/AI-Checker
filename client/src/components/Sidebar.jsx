import React from 'react';
import { Home, History, TrendingUp, AlertTriangle, ShieldCheck, PieChart, HelpCircle, Menu, X, Settings, Zap, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = ({ isOpen, toggle, activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Real-time Intel', icon: Globe },
    { id: 'checker', label: 'AI Checker', icon: Zap },
  ];

  return (
    <motion.aside
      initial={false}
      animate={{ width: isOpen ? '260px' : '80px' }}
      className={`fixed top-0 left-0 h-full glass-dark border-r border-indigo-500/10 z-50 transition-all overflow-hidden flex flex-col p-4 shadow-2xl`}
    >
      <div className="flex items-center justify-between mb-10 px-2 h-12">
        {isOpen && (
            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="flex items-center gap-3 font-black text-xl tracking-tight"
            >
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-600/30">
                    <ShieldCheck size={20} className="text-white" />
                </div>
                <span className="text-slate-900 italic tracking-[2px]">AI CHECKER</span>
            </motion.div>
        )}
        <button 
          onClick={toggle} 
          className="p-2 rounded-xl hover:bg-indigo-50 transition-colors text-slate-400 hover:text-indigo-600"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full group flex items-center gap-4 p-3 rounded-2xl transition-all duration-300 relative ${
              activeTab === item.id 
                ? 'bg-indigo-600/10 text-indigo-600 shadow-sm' 
                : 'text-slate-400 hover:bg-indigo-50 hover:text-indigo-600'
            }`}
          >
            {activeTab === item.id && (
                <motion.div 
                    layoutId="active-pill" 
                    className="absolute left-0 w-1 h-6 bg-indigo-600 rounded-r-full"
                />
            )}
            <item.icon size={22} className={`transition-transform duration-300 ${activeTab === item.id ? 'scale-110' : 'group-hover:scale-110'}`} />
            {isOpen && <span className="font-semibold tracking-wide">{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* Removed Settings Section */}
    </motion.aside>
  );
};

export default Sidebar;
