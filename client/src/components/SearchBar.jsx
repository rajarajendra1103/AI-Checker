import React, { useState } from 'react';
import { Search, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [area, setArea] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const fullQuery = `${query} ${area}`.trim();
        onSearch(fullQuery);
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-4xl mx-auto mb-10"
        >
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3 p-2 bg-white/60 backdrop-blur-3xl rounded-[32px] border border-indigo-50 shadow-2xl shadow-indigo-500/5">
                <div className="flex-1 flex items-center gap-3 px-4 py-2">
                    <Search className="text-indigo-600 shrink-0" size={24} />
                    <input 
                        type="text" 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search news, topics, or articles..."
                        className="w-full bg-transparent border-none outline-none text-slate-900 font-bold placeholder:text-slate-400 text-lg"
                    />
                </div>
                
                <div className="md:w-px h-auto md:h-10 bg-indigo-500/10" />
                
                <div className="flex items-center gap-3 px-4 py-2 md:max-w-[200px]">
                    <MapPin className="text-emerald-500 shrink-0" size={20} />
                    <input 
                        type="text" 
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        placeholder="Area/City..."
                        className="w-full bg-transparent border-none outline-none text-slate-900 font-bold placeholder:text-slate-400 text-sm"
                    />
                </div>

                <button 
                    type="submit"
                    className="p-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-[24px] flex items-center justify-center gap-2 transition-all active:scale-95 px-8 font-black uppercase tracking-widest text-xs shadow-xl shadow-indigo-600/30"
                >
                    Explore <ArrowRight size={18} />
                </button>
            </form>
            
            <div className="flex gap-6 mt-6 justify-center">
                {['Local News', 'Historic Events', 'Recent Articles'].map((tag) => (
                    <button 
                        key={tag}
                        onClick={() => {
                            setQuery(tag);
                        }}
                        className="text-[10px] uppercase font-black tracking-[4px] text-slate-400 hover:text-indigo-600 transition-all flex items-center gap-2 italic hover:scale-105"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-200" /> {tag}
                    </button>
                ))}
            </div>
        </motion.div>
    );
};

export default SearchBar;
