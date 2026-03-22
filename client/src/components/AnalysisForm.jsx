import React, { useState } from 'react';
import { Search, Link as LinkIcon, FileText, Youtube, Instagram, Facebook, Globe, Sparkles, Wand2, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AnalysisForm = ({ onAnalyze, isAnalyzing }) => {
    const [inputValue, setInputValue] = useState("");
    const [mode, setMode] = useState("url"); // url, text
    const [type, setType] = useState("news"); // news, youtube, social

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;
        
        onAnalyze({
            [mode === "url" ? "url" : "rawText"]: inputValue,
            type: mode === "url" ? type : "text"
        });
    };

    const inputConfig = {
        url: {
            placeholder: "Paste Link (News URL, YouTube, Social Media)",
            icon: LinkIcon,
            color: "text-indigo-600"
        },
        text: {
            placeholder: "Paste or type content text to verify claims...",
            icon: FileText,
            color: "text-purple-600"
        }
    };

    const current = inputConfig[mode];

    return (
        <section className="relative group">
            <div className="flex flex-col gap-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-indigo-500/10 pb-8">
                    <div>
                        <h2 className="text-2xl font-black italic tracking-tight text-slate-900">VERIFICATION ENGINE</h2>
                        <p className="text-[10px] text-slate-500 uppercase font-black tracking-[3px] mt-1">Direct Deep Search & Scraping</p>
                    </div>

                    <div className="flex gap-2 p-1.5 bg-indigo-50/50 border border-indigo-100 rounded-2xl md:w-fit shadow-inner">
                        <button 
                            onClick={() => setMode("url")}
                            className={`px-5 py-2.5 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all flex items-center gap-2 ${mode === "url" ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-slate-400 hover:text-indigo-600 hover:bg-white/50'}`}
                        >
                            <LinkIcon size={14} /> URL
                        </button>
                        <button 
                            onClick={() => setMode("text")}
                            className={`px-5 py-2.5 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all flex items-center gap-2 ${mode === "text" ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-slate-400 hover:text-indigo-600 hover:bg-white/50'}`}
                        >
                            <FileText size={14} /> Text
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative group/field">
                        <div className="absolute inset-0 bg-indigo-500/5 blur-3xl opacity-0 group-focus-within/field:opacity-100 transition-opacity" />
                        
                        <div className="relative bg-white/40 border border-indigo-100 group-focus-within/field:border-indigo-500/40 rounded-3xl p-2 transition-all shadow-xl shadow-indigo-500/5">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="flex-1 flex items-start p-4">
                                    <current.icon className={`${current.color} mr-4 mt-1 shrink-0 transition-transform group-focus-within/field:rotate-6`} size={22} />
                                    {mode === "url" ? (
                                        <input 
                                            type="text" 
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            placeholder={current.placeholder}
                                            className="w-full bg-transparent text-slate-900 placeholder-slate-400 outline-none text-xl font-bold tracking-tight py-1"
                                        />
                                    ) : (
                                        <textarea 
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            placeholder={current.placeholder}
                                            rows={3}
                                            className="w-full bg-transparent text-slate-900 placeholder-slate-400 outline-none text-xl font-bold tracking-tight py-1 resize-none"
                                        />
                                    )}
                                </div>
                                <button 
                                    type="submit"
                                    disabled={isAnalyzing || !inputValue.trim()}
                                    className="sm:w-auto w-full px-8 py-5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 rounded-2xl text-white shadow-2xl shadow-indigo-600/30 font-black uppercase tracking-[2px] transition-all flex items-center justify-center gap-3 active:scale-95"
                                >
                                    {isAnalyzing ? (
                                        <div className="animate-spin w-5 h-5 border-2 border-white/20 border-t-white rounded-full" />
                                    ) : (
                                        <>RUN CHECK <Zap size={18} fill="white" /></>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex p-0.5 bg-white/60 rounded-lg border border-indigo-100 shrink-0 shadow-sm">
                            <button onClick={() => setType('news')} className={`px-2 py-1.5 rounded-md transition-colors ${type === 'news' ? 'text-indigo-600 bg-white' : 'text-slate-400 hover:text-indigo-600'}`}><Globe size={16} /></button>
                            <button onClick={() => setType('youtube')} className={`px-2 py-1.5 rounded-md transition-colors ${type === 'youtube' ? 'text-red-600 bg-white' : 'text-slate-400 hover:text-red-500'}`}><Youtube size={16} /></button>
                            <button onClick={() => setType('social')} className={`px-2 py-1.5 rounded-md transition-colors ${type === 'social' ? 'text-blue-600 bg-white' : 'text-slate-400 hover:text-blue-500'}`}><Instagram size={16} /></button>
                        </div>
                        
                        <div className="h-4 w-px bg-indigo-500/10 hidden md:block" />
                        
                        <div className="flex items-center gap-2">
                             <Sparkles size={14} className="text-indigo-600" />
                             <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Global Neural Processing v6.0</span>
                        </div>

                        {mode === "text" && (
                             <div className="flex items-center gap-2 px-3 py-1 bg-purple-500/5 rounded-full border border-purple-500/10">
                                <span className="text-[10px] font-black text-purple-600 uppercase tracking-widest">Natural Language Processing</span>
                             </div>
                        )}
                    </div>
                </form>
            </div>
        </section>
    );
};

export default AnalysisForm;
