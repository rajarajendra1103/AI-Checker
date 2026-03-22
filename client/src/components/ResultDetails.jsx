import React from 'react';
import { ShieldCheck, AlertCircle, Info, CheckCircle2, XCircle, BrainCircuit, Search, Share2, Clipboard, TrendingDown, TrendingUp, AlertTriangle, Zap, Cpu, Sparkles, Building2, HighlighterIcon, ExternalLink, Link as LinkIcon, CpuIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';

const ResultDetails = ({ data }) => {
    const { analysis, metadata } = data;
    const score = analysis.credibilityScore;
    const verdict = analysis.verdict; 

    const scoreData = [
        { name: 'Credibility', value: score },
        { name: 'Risk', value: 100 - score }
    ];

    const COLORS = {
        'True': '#059669', 
        'Fake': '#dc2626', 
        'Misleading': '#d97706', 
        'Unverified': '#4f46e5' 
    };

    const statusIcon = {
        'True': <CheckCircle2 size={42} className="text-emerald-600 animate-pulse" />,
        'Fake': <XCircle size={42} className="text-rose-600 animate-pulse" />,
        'Misleading': <AlertCircle size={42} className="text-amber-600 animate-pulse" />,
        'Unverified': <Info size={42} className="text-indigo-600 animate-pulse" />
    };

    const currentTheme = COLORS[verdict] || COLORS['Unverified'];

    // Universal mapping helper
    const ensureArray = (field) => {
        if (Array.isArray(field)) return field;
        if (typeof field === 'string') return [field];
        return [];
    };

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-10"
        >
            {/* Verdict Hero Card */}
            <div className={`p-10 glass-dark rounded-[48px] border-l-[12px] relative overflow-hidden flex flex-col md:flex-row items-center gap-12 shadow-2xl shadow-indigo-500/5`} style={{ borderLeftColor: currentTheme }}>
                <div className="absolute top-0 right-0 w-96 h-96 blur-[120px] -z-10 rounded-full opacity-10 transition-all duration-1000" style={{ backgroundColor: currentTheme }} />

                {/* Score Chart */}
                <div className="w-60 h-60 shrink-0 relative p-4 bg-white/60 rounded-full border border-white shadow-inner">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={scoreData}
                                cx="50%" cy="50%"
                                innerRadius={75} outerRadius={95}
                                startAngle={90} endAngle={450}
                                paddingAngle={8}
                                dataKey="value"
                            >
                                <Cell key="c1" fill={currentTheme} stroke="none" />
                                <Cell key="c2" fill="rgba(0,0,0,0.03)" stroke="none" />
                                <Label 
                                    value={`${score}%`} 
                                    position="center" 
                                    className="font-black text-4xl italic"
                                    fill="#0f172a"
                                />
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center -z-10 opacity-5">
                         <Zap size={100} fill={currentTheme} />
                    </div>
                </div>

                <div className="flex-1 space-y-6 text-center md:text-left z-10">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="p-6 bg-white border border-indigo-50 rounded-[32px] shadow-xl">
                            {statusIcon[verdict]}
                        </div>
                        <div className="space-y-2">
                             <div className="flex items-center gap-2 justify-center md:justify-start">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[4px]">Verified Verdict</span>
                                <div className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: currentTheme }} />
                             </div>
                            <h2 className="text-6xl md:text-7xl font-black tracking-tighter italic" style={{ color: currentTheme }}>
                                {verdict.toUpperCase()}
                            </h2>
                        </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-3 justify-center md:justify-start font-bold">
                        <span className="px-4 py-1.5 bg-white/80 rounded-xl border border-indigo-100 text-[10px] font-black uppercase tracking-widest text-indigo-600 flex items-center gap-2 shadow-sm">
                             <BrainCircuit size={14} className="text-indigo-600" /> Neural Reasoning
                        </span>
                        {analysis.detection && (
                            <span className="px-4 py-1.5 bg-white/80 rounded-xl border border-amber-100 text-[10px] font-black uppercase tracking-widest text-amber-600 flex items-center gap-2 shadow-sm">
                                 <AlertTriangle size={14} /> {analysis.detection}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Content Summary & Intel Highlights */}
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 ${!analysis.summary ? 'hidden' : ''}`}>
                 <div className="p-10 glass-dark rounded-[48px] space-y-6 relative overflow-hidden group shadow-xl">
                    <div className="flex items-center gap-3 border-b border-indigo-500/10 pb-6">
                        <Sparkles size={24} className="text-indigo-600" />
                        <h3 className="text-xl font-black italic tracking-tight uppercase text-slate-900">Content AI Summary</h3>
                    </div>
                    <p className="text-slate-800 text-xl font-bold leading-relaxed tracking-tight italic">
                        "{analysis.summary}"
                    </p>
                </div>

                <div className="p-10 glass-dark rounded-[48px] space-y-6 relative overflow-hidden group shadow-xl">
                    <div className="flex items-center gap-3 border-b border-purple-500/10 pb-6">
                        <HighlighterIcon size={24} className="text-purple-600" />
                        <h3 className="text-xl font-black italic tracking-tight uppercase text-slate-900">Intel Highlights</h3>
                    </div>
                    <ul className="space-y-4">
                        {ensureArray(analysis.highlights).map((point, idx) => (
                            <li key={idx} className="flex gap-4 items-center text-slate-800 text-md font-bold italic">
                                <div className="w-2.5 h-2.5 rounded-full bg-purple-500 shrink-0 shadow-lg shadow-purple-500/40" />
                                {point}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Intelligence Reasoning Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="p-10 glass-dark rounded-[40px] shadow-xl space-y-6 md:col-span-2 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                         <Cpu size={120} />
                    </div>
                    <div className="flex items-center gap-3 border-b border-indigo-500/10 pb-6">
                        <Search size={24} className="text-indigo-600" />
                        <h3 className="text-xl font-black italic tracking-tight uppercase text-slate-900">Intelligence Reasoning</h3>
                    </div>
                    <p className="text-slate-700 text-lg leading-relaxed leading-[2] font-bold tracking-tight">
                        {analysis.reasoning}
                    </p>
                    
                    {/* Verifiable Source Links */}
                    <div className="pt-8 border-t border-indigo-500/10">
                         <div className="flex items-center gap-2 text-[11px] font-black text-emerald-600 mb-4 uppercase tracking-[4px]">
                            <ExternalLink size={16} /> Verified Resource Links & Credits
                         </div>
                         <div className="flex flex-wrap gap-3">
                            {ensureArray(analysis.sourceLinks).map((link, i) => (
                                <a 
                                    key={i} 
                                    href={link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="px-5 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl text-xs font-black border border-emerald-200 flex items-center gap-2 transition-all hover:scale-105 group shadow-sm"
                                >
                                    <LinkIcon size={14} /> SOURCE {i + 1}
                                </a>
                            ))}
                            {ensureArray(analysis.sourceLinks).length === 0 && (
                                <span className="text-[10px] text-slate-400 italic tracking-widest font-black uppercase">Deep search for live sources in progress...</span>
                            )}
                         </div>
                    </div>
                </div>

                <div className="space-y-8 flex flex-col justify-start">
                    <div className={`p-8 glass-dark rounded-[40px] space-y-6 shadow-xl ${ensureArray(analysis.officialSources).length === 0 ? 'hidden' : ''}`}>
                         <div className="flex items-center gap-2 text-[10px] font-black text-indigo-500 uppercase tracking-widest">
                            <Building2 size={16} /> Primary Agencies
                         </div>
                         <div className="flex flex-wrap gap-2">
                             {ensureArray(analysis.officialSources).map((org, i) => (
                                 <span key={i} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-[10px] font-black border border-indigo-100 uppercase tracking-widest italic">{org}</span>
                             ))}
                         </div>
                    </div>
                    {/* Removed Expert Counsel Section */}
                </div>
            </div>

            {/* Neural Claims */}
            <div className="p-12 glass-dark rounded-[56px] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.1)] relative group border-t-8 border-indigo-600">
                <div className="flex items-center gap-4 mb-10 border-b border-indigo-500/10 pb-8 text-slate-900">
                    <div className="p-3 bg-indigo-50 rounded-2xl">
                        <Clipboard size={24} className="text-indigo-600" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black italic tracking-tight uppercase">Factual Claims</h3>
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-[4px] mt-1 italic">Neural Analysis Results</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {ensureArray(analysis.claimExtraction).map((item, idx) => {
                        const claimText = typeof item === 'object' ? (item.claim || item.text || JSON.stringify(item)) : item;
                        const status = typeof item === 'object' ? item.status : null;
                        
                        return (
                            <div key={idx} className="flex gap-6 items-start p-8 bg-white border border-indigo-50 rounded-[40px] hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 group/claim">
                                <div className="w-12 h-12 shrink-0 flex items-center justify-center font-black text-sm bg-indigo-600 rounded-2xl text-white shadow-xl shadow-indigo-600/20 group-hover/claim:scale-110 transition-transform">
                                    {idx + 1}
                                </div>
                                <div className="flex-1 space-y-3">
                                    <p className="text-lg text-slate-900 font-black leading-relaxed italic tracking-tight">"{claimText}"</p>
                                    {status && (
                                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border transition-colors ${
                                            status.toLowerCase().includes('true') ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                                            status.toLowerCase().includes('false') ? 'bg-rose-50 text-rose-600 border-rose-100' : 
                                            'bg-amber-50 text-amber-600 border-amber-100'
                                        }`}>
                                            <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: 'currentColor' }} />
                                            {status}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            
            {/* Metadata Footer */}
            <div className="flex flex-col md:flex-row items-center justify-between p-8 opacity-40 px-12 border-t border-indigo-500/10">
                <div className="flex gap-8">
                   <div className="text-[10px] font-black tracking-[4px] text-slate-400 uppercase italic">SIGNAL IDENTIFIED: {new Date().toLocaleTimeString()}</div>
                </div>
                <div className="flex items-center gap-2">
                    <CpuIcon size={14} className="text-indigo-600" />
                    <div className="text-[10px] font-black tracking-[5px] text-slate-400 uppercase italic">NEURAL ENGINE 6.0 (LIGHT)</div>
                </div>
            </div>
        </motion.div>
    );
};

export default ResultDetails;
