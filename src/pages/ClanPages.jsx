import { useState, useEffect } from "react";
import ClanCard from "../components/ClanCard";
import { useEye } from "../context/EyeContext";
// 1. Import Store
import { useNarutoStore } from "../store/useNarutoStore";

export default function ClansPage() {
    const { eyeMode } = useEye();
    const isDark = eyeMode > 0;
    
    // 2. Ambil state dan action dari Zustand
    const { clans, loadingStates, getClans } = useNarutoStore();
    const isLoading = loadingStates['clans'];

    // State lokal tetap dipertahankan untuk interaksi UI (Modal & Search)
    const [selectedClan, setSelectedClan] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    // 3. Gunakan action dari Zustand dalam useEffect
    useEffect(() => {
        getClans();
    }, [getClans]);

    // --- LOGIKA FILTER (Design Tetap Sama) ---
    const filteredMembers = selectedClan?.characters?.filter(id => 
        id.toString().includes(searchQuery.toLowerCase())
    ) || [];

    const themes = {
        0: { // Normal
            panel: "bg-white border-orange-100/50 shadow-[-20px_0_80px_rgba(0,0,0,0.15)]",
            header: "border-stone-50",
            title: "text-stone-800",
            label: "text-orange-400",
            input: "bg-stone-50 text-stone-800 focus:ring-orange-200 placeholder-stone-400",
            item: "bg-white border-stone-100 hover:border-orange-200",
            footer: "bg-stone-50/50 border-stone-100",
            accent: "bg-orange-500"
        },
        1: { // Sharingan
            panel: "bg-stone-950 border-red-900/40 shadow-[-20px_0_100px_rgba(220,38,38,0.1)]",
            header: "border-red-900/20",
            title: "text-stone-100",
            label: "text-red-500",
            input: "bg-red-950/20 text-red-100 border border-red-900/30 focus:ring-red-500/50 placeholder-red-900/50",
            item: "bg-stone-900/40 border-red-900/10 hover:border-red-500/40",
            footer: "bg-red-950/10 border-red-900/20",
            accent: "bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.4)]"
        },
        2: { // Mangekyou
            panel: "bg-black border-purple-900/40 shadow-[-20px_0_120px_rgba(147,51,234,0.15)]",
            header: "border-purple-900/20",
            title: "text-white",
            label: "text-purple-400",
            input: "bg-purple-950/20 text-purple-100 border border-purple-900/30 focus:ring-purple-500/50 placeholder-purple-900/50",
            item: "bg-stone-900/20 border-purple-900/10 hover:border-purple-500/40",
            footer: "bg-purple-950/10 border-purple-900/20",
            accent: "bg-purple-600 shadow-[0_0_15px_rgba(147,51,234,0.4)]"
        }
    };

    const current = themes[eyeMode] || themes[0];

    return (
        <div className="relative min-h-[80vh]">
            {/* Loading State - Menggunakan isLoading dari Zustand */}
            {isLoading && clans.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24">
                    <div className={`w-12 h-12 border-4 rounded-full animate-spin mb-4 ${isDark ? 'border-red-600 border-t-transparent' : 'border-orange-500 border-t-transparent'}`}></div>
                    <p className="text-stone-500 font-bold tracking-widest uppercase text-xs animate-pulse">Scanning Clan Archives...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Map dari clans (Zustand) */}
                    {clans.map((clan) => (
                        <ClanCard 
                            key={clan.id} 
                            {...clan} 
                            onViewDirectory={() => {
                                setSelectedClan(clan);
                                setSearchQuery("");
                            }} 
                        />
                    ))}
                </div>
            )}

            {/* Backdrop - UI Tetap Sama */}
            <div 
                className={`fixed inset-0 z-[100] transition-all duration-700 ${selectedClan ? 'opacity-100 visible' : 'opacity-0 invisible'} ${isDark ? 'bg-black/60 backdrop-blur-md' : 'bg-stone-900/20 backdrop-blur-sm'}`}
                onClick={() => setSelectedClan(null)}
            />

            {/* Panel Directory - UI Tetap Sama */}
            <div className={`
                fixed inset-y-4 right-4 w-[calc(100%-2rem)] max-w-[500px] rounded-[3rem] z-[110] transform transition-all duration-700 ease-out border flex flex-col overflow-hidden
                ${selectedClan ? 'translate-x-0' : 'translate-x-[120%]'}
                ${current.panel}
            `}>
                
                {/* Header */}
                <div className={`p-10 pb-6 border-b relative transition-colors duration-700 ${current.header}`}>
                    <button 
                        onClick={() => setSelectedClan(null)}
                        className={`absolute top-10 right-10 w-10 h-10 rounded-full flex items-center justify-center transition-all ${isDark ? 'bg-white/5 text-stone-500 hover:text-white' : 'bg-stone-50 text-stone-400 hover:text-orange-500'}`}
                    >✕</button>
                    
                    <span className={`text-[10px] font-black uppercase tracking-[0.4em] mb-4 block transition-colors duration-700 ${current.label}`}>
                        {isDark ? "DNA Directory Analysis" : "Clan Database"}
                    </span>
                    <h2 className={`jp-title text-5xl mb-2 transition-colors duration-700 ${current.title}`}>
                        {selectedClan?.name || "Clan"}
                    </h2>
                    <div className={`h-1.5 w-16 rounded-full mb-6 transition-all duration-700 ${current.accent}`} />
                    
                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder={isDark ? "Scanning for ID markers..." : "Search by ID..."} 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={`w-full rounded-2xl px-6 py-4 text-sm transition-all outline-none ${current.input}`}
                        />
                    </div>
                </div>

                {/* List Area */}
                <div className="flex-1 overflow-y-auto p-10 pt-6 custom-scrollbar relative">
                    {isDark && (
                        <div className="absolute inset-0 pointer-events-none opacity-[0.05]" 
                             style={{ backgroundImage: `radial-gradient(${eyeMode === 2 ? '#9333ea' : '#ef4444'} 1px, transparent 0)`, backgroundSize: '30px 30px' }} />
                    )}

                    <div className="space-y-4 relative z-10">
                        {filteredMembers.length > 0 ? (
                            filteredMembers.map((charId) => (
                                <div key={charId} className={`group flex items-center gap-5 p-5 rounded-[2rem] border transition-all duration-500 ${current.item}`}>
                                    <div className={`w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 border flex flex-col items-center justify-center ${isDark ? 'bg-black border-white/5' : 'bg-orange-50 border-orange-100'}`}>
                                        <span className="text-[8px] font-black uppercase text-stone-500">Entry</span>
                                        <span className={`text-[10px] font-black ${isDark ? 'text-red-500/60' : 'text-stone-400'}`}>#{charId}</span>
                                    </div>
                                    <div className="flex flex-col text-left">
                                        <span className={`text-sm font-black uppercase ${current.title}`}>Character ID: {charId}</span>
                                        <div className="flex items-center gap-2 mt-1">
                                            <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${isDark ? 'bg-red-500' : 'bg-orange-400'}`} />
                                            <span className="text-[10px] font-bold text-stone-500 uppercase">DNA Verified</span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-20">
                                <p className="text-stone-500 text-xs font-bold uppercase tracking-widest">No Data Found</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className={`p-8 border-t transition-colors duration-700 ${current.footer}`}>
                    <div className="flex justify-between items-center text-[10px] font-black uppercase px-2">
                        <span className="text-stone-500">Scanner: Online</span>
                        <span className={current.label}>Results: {filteredMembers.length}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}