import React, { useState } from 'react';
import { TrendingUp, Clock, ChevronRight, Newspaper, Bookmark, Globe, Zap, Cpu, Activity, Briefcase, Film, Pill, Home, ExternalLink, X, Info, Share2, Terminal, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const categories = [
    { id: 'top stories', name: 'Breaking', icon: <Zap size={14} />, color: 'text-amber-600' },
    { id: 'politics', name: 'Politics', icon: <Globe size={14} />, color: 'text-blue-600' },
    { id: 'geopolitics', name: 'Geopolitics', icon: <Globe size={14} />, color: 'text-indigo-600' },
    { id: 'cinema', name: 'Cinema', icon: <Film size={14} />, color: 'text-pink-600' },
    { id: 'sports', name: 'Sports', icon: <Activity size={14} />, color: 'text-emerald-600' },
    { id: 'business', name: 'Business', icon: <Briefcase size={14} />, color: 'text-cyan-600' },
    { id: 'technology', name: 'Tech', icon: <Cpu size={14} />, color: 'text-purple-600' },
    { id: 'medicine', name: 'Medicine', icon: <Pill size={14} />, color: 'text-rose-600' },
    { id: 'local news', name: 'Local', icon: <Home size={14} />, color: 'text-orange-600' },
];

const TrendingFeed = ({ stories, loading, onSelect, activeCategory, onCategoryChange }) => {
    const [previewStory, setPreviewStory] = useState(null);

    const handleSelect = (story) => {
        setPreviewStory(story);
    };

    return (
        <section className="glass-dark rounded-[32px] overflow-hidden flex flex-col p-6 h-full shadow-2xl border border-white/80 group relative">
            <div className="flex flex-col gap-6 mb-8 border-b border-indigo-500/10 pb-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
                            <TrendingUp size={22} className="text-indigo-600" />
                        </div>
                        <div>
                            <h3 className="text-xl font-extrabold tracking-tight italic uppercase tracking-widest text-slate-900">Intelligence Feed</h3>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] text-emerald-600 uppercase tracking-[2px] font-black">● RSS</span>
                                <span className="text-[10px] text-amber-600 uppercase tracking-[2px] font-black">● SCRAPED</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => onCategoryChange(cat.id)}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                activeCategory === cat.id 
                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
                                : 'bg-white/40 text-slate-500 hover:bg-white/80 hover:text-slate-900 border border-white/80'
                            }`}
                        >
                            <span className={activeCategory === cat.id ? 'text-white' : cat.color}>{cat.icon}</span>
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar max-h-[600px] pb-10">
                {loading && [...Array(5)].map((_, i) => (
                    <div key={i} className="p-4 bg-white/40 rounded-2xl border border-white/80 animate-pulse space-y-3">
                        <div className="w-2/3 h-4 bg-slate-200 rounded" />
                        <div className="w-full h-8 bg-slate-200 rounded" />
                    </div>
                ))}

                {!loading && stories.length === 0 && (
                    <div className="p-8 text-center text-slate-400 py-20 flex flex-col items-center gap-4 border border-dashed border-indigo-500/20 rounded-3xl">
                        <Newspaper size={42} className="opacity-20 animate-bounce" />
                        <p className="text-[10px] font-black uppercase tracking-[4px]">Scan Complete: No Intel Identified</p>
                    </div>
                )}

                {!loading && stories.map((story, i) => (
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.03 }}
                        key={`${story.source}-${story.link}-${i}`}
                        className={`p-5 bg-white/40 rounded-3xl border border-white/80 transition-all duration-300 group/item cursor-pointer relative overflow-hidden ${
                            story.sourceType === 'RSS' 
                            ? 'hover:border-emerald-500/50 hover:bg-emerald-500/10' 
                            : 'hover:border-amber-500/50 hover:bg-amber-500/10'
                        }`}
                        onClick={() => handleSelect(story)}
                    >
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <span className={`text-[10px] font-black py-1 px-3 rounded-full uppercase tracking-wider flex items-center gap-1.5 ${
                                    story.sourceType === 'RSS' 
                                    ? 'bg-emerald-500/10 text-emerald-600' 
                                    : 'bg-amber-500/10 text-amber-700 font-bold italic border border-amber-200/50'
                                }`}>
                                    <Layers size={10} />
                                    {story.sourceType} • {story.source}
                                </span>
                                <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-bold">
                                    <Clock size={11} />
                                    {new Date(story.pubDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </div>
                            
                            <h4 className={`text-sm font-bold leading-[1.6] line-clamp-2 transition-colors italic tracking-tight ${
                                story.sourceType === 'RSS' 
                                ? 'text-slate-800 group-hover/item:text-emerald-700' 
                                : 'text-slate-800 group-hover/item:text-amber-700'
                            }`}>
                                {story.title}
                            </h4>
                        </div>
                        
                        {/* Decorative Sidebar Indicating Type */}
                        <div className={`absolute top-0 right-0 h-full w-1 opacity-40 ${
                            story.sourceType === 'RSS' ? 'bg-emerald-500' : 'bg-amber-500'
                        }`} />
                    </motion.div>
                ))}
            </div>

            {/* PREVIEW MODAL / PANEL */}
            <AnimatePresence>
                {previewStory && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-50 bg-indigo-900/10 backdrop-blur-xl p-6 flex items-center justify-center rounded-[32px]"
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className={`w-full bg-white/95 border border-white p-8 rounded-[40px] space-y-8 relative shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border-l-[12px] ${
                                previewStory.sourceType === 'RSS' ? 'border-l-emerald-500' : 'border-l-amber-500'
                            }`}
                        >
                            <button 
                                onClick={() => setPreviewStory(null)}
                                className="absolute top-6 right-6 p-2 bg-indigo-50 rounded-full hover:bg-rose-500/10 hover:text-rose-600 transition border border-indigo-100 shadow-sm"
                            >
                                <X size={20} />
                            </button>

                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                     <Terminal size={14} className="text-indigo-600" />
                                     <span className="text-[10px] font-black text-slate-400 uppercase tracking-[4px]">Source Identification</span>
                                </div>
                                <h3 className="text-2xl font-black italic tracking-tighter text-slate-900 leading-tight">
                                    {previewStory.title}
                                </h3>
                                
                                <div className="flex flex-wrap gap-4 pt-4">
                                    <div className="flex flex-col gap-1">
                                         <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Protocol</span>
                                         <span className={`text-xs font-black italic uppercase ${previewStory.sourceType === 'RSS' ? 'text-emerald-600' : 'text-amber-600'}`}>
                                             {previewStory.sourceType} Intelligence
                                         </span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                         <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Agency</span>
                                         <span className="text-xs font-bold text-slate-600 italic">{previewStory.source}</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                         <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Signal Age</span>
                                         <span className="text-xs font-bold text-slate-600 italic">{new Date(previewStory.pubDate).toLocaleTimeString()}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-indigo-500/10 flex flex-col gap-4">
                                <button 
                                    onClick={() => {
                                        onSelect(previewStory.link);
                                        setPreviewStory(null);
                                    }}
                                    className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black italic uppercase tracking-[4px] flex items-center justify-center gap-3 shadow-xl shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    <Zap size={20} className="fill-white" /> Start AI Reality Analysis
                                </button>
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <a 
                                        href={previewStory.link} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="py-4 bg-indigo-50/50 hover:bg-indigo-100/50 text-indigo-600 rounded-2xl font-black italic uppercase tracking-[2px] flex items-center justify-center gap-2 text-[10px] transition group shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] border border-indigo-100"
                                    >
                                        <ExternalLink size={14} className="group-hover:rotate-12 transition-transform" /> Visit Original Story
                                    </a>
                                    <button className="py-4 bg-indigo-50/50 hover:bg-indigo-100/50 text-indigo-600 rounded-2xl font-black italic uppercase tracking-[2px] flex items-center justify-center gap-2 text-[10px] transition shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] border border-indigo-100">
                                        <Share2 size={14} /> Distribute Report
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="mt-6 pt-6 border-t border-indigo-500/10 flex items-center justify-between">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[4px] italic">Intake: {stories.length} Signals Identified</p>
                <div className="flex gap-1.5 items-center">
                    <span className="text-[8px] font-black text-slate-400 uppercase italic">ACTIVE MONITORING</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-ping" />
                </div>
            </div>
        </section>
    );
};

export default TrendingFeed;
