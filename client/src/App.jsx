import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, History, TrendingUp, AlertTriangle, ShieldCheck, CheckCircle2, CloudLightning as Lightning, Menu, X, BarChart3, HelpCircle, Zap, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Helper for Tailwind classes
function cn(...inputs) {
    return twMerge(clsx(inputs));
}

// Sub-components
import Sidebar from './components/Sidebar';
import AnalysisForm from './components/AnalysisForm';
import TrendingFeed from './components/TrendingFeed';
import ResultDetails from './components/ResultDetails';
import SearchBar from './components/SearchBar';

const API_BASE = "http://localhost:5000/api";

export default function App() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [trendingPosts, setTrendingPosts] = useState([]);
    const [loadingTrending, setLoadingTrending] = useState(false);
    const [analysisResult, setAnalysisResult] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [activeTab, setActiveTab] = useState('dashboard'); // dashboard = Intel Feed, checker = Fact Tool
    const [activeCategory, setActiveCategory] = useState('top stories');

    useEffect(() => {
        fetchTrending(activeCategory);
    }, [activeCategory]);

    const fetchTrending = async (category) => {
        setLoadingTrending(true);
        try {
            const res = await axios.get(`${API_BASE}/trending?category=${category}`);
            setTrendingPosts(res.data.stories || []);
        } catch (err) {
            console.error("Trending Error:", err);
        } finally {
            setLoadingTrending(false);
        }
    };

    const handleSearch = async (query) => {
        setLoadingTrending(true);
        try {
            const res = await axios.get(`${API_BASE}/trending?q=${query}`);
            setTrendingPosts(res.data.stories || []);
            setActiveCategory(null);
        } catch (err) {
            console.error("Search Error:", err);
        } finally {
            setLoadingTrending(false);
        }
    };

    const handleAnalyze = async (data) => {
        setIsAnalyzing(true);
        setAnalysisResult(null);
        setActiveTab('checker'); // Switch to checker view to see results
        try {
            const res = await axios.post(`${API_BASE}/analyze`, data);
            setAnalysisResult(res.data);
        } catch (err) {
            alert(err.response?.data?.error || "Analysis failed.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="flex bg-[#f8fafc] min-h-screen text-slate-800 selection:bg-indigo-500/10 overflow-x-hidden relative">
            
            {/* VIBRANT AMBIENT BLOBS (BRIGHT MODE) */}
            <div className="fixed inset-0 pointer-events-none -z-10">
                <div className="absolute top-[0%] left-[0%] w-[60%] h-[60%] bg-indigo-500/10 blur-[150px] animate-pulse rounded-full" />
                <div className="absolute bottom-[0%] right-[0%] w-[50%] h-[50%] bg-emerald-500/10 blur-[150px] animate-pulse rounded-full" />
                <div className="absolute top-[30%] right-[10%] w-[40%] h-[40%] bg-purple-500/5 blur-[120px] rounded-full" />
            </div>

            {/* Sidebar Component */}
            <Sidebar 
                isOpen={sidebarOpen} 
                toggle={() => setSidebarOpen(!sidebarOpen)} 
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            {/* Main Application Area */}
            <main className={cn(
                "flex-1 transition-all duration-300 min-h-screen relative p-4 md:p-10",
                sidebarOpen ? "ml-64" : "ml-20"
            )}>
                <div className="max-w-7xl mx-auto space-y-12 pb-20">
                    {/* Common Header */}
                    <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-indigo-500/10 pb-10">
                        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
                            <div className="flex items-center gap-3 mb-3">
                                <span className="p-2.5 bg-indigo-500/10 rounded-xl border border-indigo-500/20 shadow-xl shadow-indigo-600/5">
                                    <ShieldCheck size={20} className="text-indigo-600" />
                                </span>
                                <h2 className="text-slate-400 font-extrabold text-[10px] uppercase tracking-[6px] italic">Deep Intel Scraper v6.0</h2>
                            </div>
                            <h1 className="text-7xl font-black tracking-tighter italic text-slate-900 leading-none">AI CHECKER</h1>
                            <p className="text-slate-500 mt-4 flex items-center gap-2 font-bold tracking-tight text-lg">
                                <Zap size={20} className="text-indigo-600 fill-indigo-500/20" />
                                {activeTab === 'dashboard' ? "Aggregated global intelligence and factual news streams." : "Neural fact-checking and automated claim verification."}
                            </p>
                        </motion.div>
                        
                        <div className="flex items-center gap-8 bg-white/40 p-6 rounded-[32px] border border-white/80 shadow-2xl backdrop-blur-3xl">
                            <div className="text-right">
                                <p className="text-[10px] text-slate-400 font-black uppercase tracking-[4px] mb-1 text-center md:text-right">INTEL SOURCE</p>
                                <p className="text-md font-black text-slate-900 uppercase tracking-widest italic">{activeTab === 'dashboard' ? "Multiplex RSS/Scrape" : "Direct Analysis"}</p>
                            </div>
                            <div className="w-14 h-14 rounded-2xl bg-indigo-600/10 flex items-center justify-center border border-indigo-500/20 shadow-xl shadow-indigo-600/10">
                                {activeTab === 'dashboard' ? <Globe size={28} className="text-indigo-600" /> : <Zap size={28} className="text-indigo-600 animate-pulse" />}
                            </div>
                        </div>
                    </header>

                    <AnimatePresence mode="wait">
                        {activeTab === 'dashboard' ? (
                            <motion.div 
                                key="dashboard"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ type: 'spring', stiffness: 100 }}
                                className="space-y-16"
                            >
                                <SearchBar onSearch={handleSearch} />
                                <TrendingFeed 
                                    stories={trendingPosts} 
                                    loading={loadingTrending} 
                                    activeCategory={activeCategory}
                                    onCategoryChange={setActiveCategory}
                                    onSelect={(url) => handleAnalyze({ url, type: 'news' })} 
                                />
                            </motion.div>
                        ) : (
                            <motion.div 
                                key="checker"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ type: 'spring', stiffness: 100 }}
                                className="grid grid-cols-1 lg:grid-cols-12 gap-10"
                            >
                                <div className="lg:col-span-12 space-y-10">
                                    <div className="p-1 glass-dark shadow-2xl">
                                         <div className="p-10 rounded-[48px] bg-white/20 relative overflow-hidden group">
                                            <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/5 blur-[100px] group-hover:bg-indigo-500/10 transition-all duration-700" />
                                            <AnalysisForm onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
                                         </div>
                                    </div>

                                    <AnimatePresence mode="wait">
                                        {isAnalyzing && (
                                            <motion.div 
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 1.1 }}
                                                className="p-20 glass-dark border border-indigo-500/10 flex flex-col items-center justify-center space-y-10 shadow-2xl"
                                            >
                                                <div className="relative">
                                                    <div className="absolute inset-[-40px] bg-indigo-500 blur-[80px] opacity-10 animate-pulse rounded-full" />
                                                    <Lightning className="text-indigo-600 animate-bounce w-24 h-24 relative z-10 drop-shadow-[0_0_15px_rgba(99,102,241,0.2)]" />
                                                </div>
                                                <div className="text-center space-y-3">
                                                    <h3 className="text-4xl font-black italic tracking-tighter uppercase text-slate-900">Neural Intelligence Core...</h3>
                                                    <p className="text-slate-400 text-xs font-black tracking-[6px] uppercase opacity-80 italic text-center">Cross-referencing Global News Nodes</p>
                                                </div>
                                            </motion.div>
                                        )}

                                        {analysisResult && !isAnalyzing && (
                                            <ResultDetails data={analysisResult} />
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
}
