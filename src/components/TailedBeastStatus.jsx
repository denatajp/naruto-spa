import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useNarutoStore } from "../store/useNarutoStore";
import { useEye } from "../context/EyeContext";

export default function TailedBeastStatus() {
    const navigate = useNavigate();
    const { eyeMode } = useEye();
    const isDark = eyeMode > 0;

    // 1. Ambil data dan fungsi dari Zustand Store
    const { tailedBeasts, loadingStates, getTailedBeasts } = useNarutoStore();

    // 2. Trigger fetch saat mount (Zustand akan menangani cache internal)
    useEffect(() => {
        getTailedBeasts();
    }, [getTailedBeasts]);

    // 3. Transformasi data menggunakan useMemo (hanya ambil 3 teratas)
    const displayBeasts = useMemo(() => {
        if (!tailedBeasts.length) return [];

        const tailMap = {
            "One": 1, "Two": 2, "Three": 3, "Four": 4, "Five": 5,
            "Six": 6, "Seven": 7, "Eight": 8, "Nine": 9, "Ten": 10
        };

        return tailedBeasts.slice(0, 3).map((beast) => {
            const tailWord = beast.name.split("-")[0];
            return {
                name: beast.name,
                tails: tailMap[tailWord] || "?",
                status: beast.personal?.status || "Active"
            };
        });
    }, [tailedBeasts]);

    const loading = loadingStates['tailedBeasts'];

    // Tema dinamis mengikuti EyeContext
    const themes = {
        0: "bg-white/80 border-orange-100 text-stone-800 shadow-sm",
        1: "bg-stone-900/60 border-red-900/20 text-white shadow-lg",
        2: "bg-black/60 border-purple-900/20 text-white shadow-xl"
    };

    return (
        <div className={`
            relative rounded-[2.5rem] p-6 overflow-hidden transition-all duration-700 border
            ${themes[eyeMode] || themes[0]}
        `}>
            <h3 className={`font-sans text-[10px] font-black uppercase tracking-[0.3em] mb-6 ${isDark ? 'text-red-500' : 'text-orange-500'}`}>
                Bijuu Monitoring
            </h3>

            <div className="space-y-4">
                {loading && tailedBeasts.length === 0 ? (
                    [1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center justify-between border-b border-stone-500/10 pb-3 animate-pulse">
                            <div className="space-y-2">
                                <div className="h-3 w-20 bg-stone-500/20 rounded"></div>
                                <div className="h-2 w-10 bg-stone-500/10 rounded"></div>
                            </div>
                            <div className="h-5 w-14 bg-stone-500/20 rounded-full"></div>
                        </div>
                    ))
                ) : (
                    displayBeasts.map((b, i) => (
                        <div key={i} className="flex items-center justify-between border-b border-stone-500/10 pb-3 group">
                            <div>
                                <p className="text-sm font-bold group-hover:translate-x-1 transition-transform duration-300">
                                    {b.name}
                                </p>
                                <p className="text-[9px] text-stone-500 uppercase tracking-widest">{b.tails} Tails Signature</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase transition-all duration-500 ${b.status.toLowerCase().includes('sealed') || b.status.toLowerCase().includes('incapacitated')
                                    ? 'bg-red-500/20 text-red-400 border border-red-500/20'
                                    : 'bg-green-500/20 text-green-400 border border-green-500/20'
                                }`}>
                                {b.status}
                            </span>
                        </div>
                    ))
                )}
            </div>

            <button
                onClick={() => navigate("/tailed-beasts")}
                className={`
                    w-full mt-4 py-3 rounded-xl text-[9px] font-bold uppercase transition-all duration-300
                    ${isDark
                        ? 'bg-white/5 hover:bg-red-600 hover:text-white text-stone-400'
                        : 'bg-stone-100 hover:bg-orange-500 hover:text-white text-stone-600'}
                `}
            >
                View All Jinchūriki
            </button>

            {/* Dekorasi HUD untuk mode Dark */}
            {isDark && (
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <div className={`w-12 h-12 border-2 rounded-full border-dashed animate-spin-slow ${eyeMode === 2 ? 'border-purple-500' : 'border-red-500'}`} />
                </div>
            )}
        </div>
    );
}