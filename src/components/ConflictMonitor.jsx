import { useEffect } from "react";
import { useEye } from "../context/EyeContext";
// 1. Import Store
import { useNarutoStore } from "../store/useNarutoStore";

export default function ConflictMonitor() {
    const { eyeMode } = useEye();
    const isDark = eyeMode > 0;

    // 2. Ambil data Akatsuki dan Kara dari Zustand
    const {
        akatsuki,
        kara,
        loadingStates,
        getAkatsuki,
        getKara
    } = useNarutoStore();

    // 3. Trigger fetch jika data belum ada
    useEffect(() => {
        getAkatsuki();
        getKara();
    }, [getAkatsuki, getKara]);

    // 4. Logika Kalkulasi Dinamis (Berdasarkan data dari Store)
    const sRankCount = akatsuki.filter(m =>
        m.personal?.classification?.includes("S-rank")
    ).length;

    const innerCircle = kara.filter(m =>
        m.personal?.occupation?.includes("Inner")
    ).length;

    const threatData = {
        akatsuki: {
            sRankCount: sRankCount,
            // Kalkulasi threat: (jumlah S-rank / 12) * 100
            threatLevel: Math.min(Math.round((sRankCount / 12) * 100), 100)
        },
        kara: {
            innerCircle: innerCircle,
            // Kalkulasi threat: (jumlah Inner / 8) * 100
            threatLevel: Math.min(Math.round((innerCircle / 8) * 100), 100)
        }
    };

    const loading = loadingStates['akatsuki'] || loadingStates['kara'];

    const themes = {
        0: {
            card: "bg-white/80 border-stone-100 shadow-sm",
            textMain: "text-stone-800",
            textSub: "text-stone-400",
            status: "bg-red-50 text-red-500 border-red-100",
            barTrack: "bg-stone-100",
            kanji: "text-stone-50 group-hover:text-stone-100"
        },
        1: {
            card: "bg-stone-900/60 border-red-500/20 shadow-[0_0_40px_rgba(220,38,38,0.1)]",
            textMain: "text-stone-200",
            textSub: "text-red-500/60",
            status: "bg-red-900/40 text-red-400 border-red-500/30 animate-pulse",
            barTrack: "bg-stone-800",
            kanji: "text-red-600/10 group-hover:text-red-600/20"
        },
        2: {
            card: "bg-black/60 border-purple-500/20 shadow-[0_0_50px_rgba(147,51,234,0.15)]",
            textMain: "text-white",
            textSub: "text-purple-400/60",
            status: "bg-purple-900/40 text-purple-400 border-purple-500/30",
            barTrack: "bg-stone-900",
            kanji: "text-purple-600/10 group-hover:text-purple-600/20"
        }
    };

    const current = themes[eyeMode] || themes[0];

    // Hanya tampilkan loading jika data benar-benar masih kosong
    if (loading && akatsuki.length === 0) return <div className="p-8 text-center animate-pulse text-stone-500 text-[10px] uppercase tracking-widest">Scanning Signatures...</div>;

    return (
        <div className={`relative group overflow-hidden rounded-[2.5rem] p-8 border-[1.5px] transition-all duration-700 backdrop-blur-md ${current.card}`}>
            <div className="relative z-10">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h3 className={`jp-title text-xl flex items-center gap-3 transition-colors duration-700 ${current.textMain}`}>
                            <span className={`${eyeMode === 2 ? 'text-purple-500' : 'text-red-500'} animate-pulse`}>◈</span>
                            {isDark ? "System Threat Analysis" : "Global Threat Monitor"}
                        </h3>
                        <p className={`text-[10px] font-bold uppercase tracking-widest mt-1 transition-colors duration-700 ${current.textSub}`}>
                            {isDark ? "Kekkei Genkai Scan: Active" : "Intelligence Division: Sector 7"}
                        </p>
                    </div>
                    <div className="text-right">
                        <span className={`text-[9px] px-3 py-1 rounded-full font-black tracking-tighter border uppercase transition-all duration-700 ${current.status}`}>
                            Status: {threatData.akatsuki.threatLevel > 80 ? 'Critical' : 'Elevated'}
                        </span>
                    </div>
                </div>

                <div className="space-y-10">
                    {/* AKATSUKI BAR */}
                    <div className="group/bar">
                        <div className="flex justify-between items-end mb-3">
                            <div>
                                <span className={`text-xs font-black uppercase tracking-tighter transition-colors duration-700 ${current.textMain}`}>Akatsuki Org.</span>
                                <div className="flex gap-2 mt-1">
                                    <span className="text-[8px] text-stone-500 font-bold uppercase tracking-widest">
                                        {isDark ? "High Energy Signatures" : `${threatData.akatsuki.sRankCount} S-Rank Detected`}
                                    </span>
                                </div>
                            </div>
                            <span className={`text-xl font-black tracking-tighter transition-colors duration-700 ${eyeMode === 2 ? 'text-purple-400' : 'text-red-600'}`}>
                                {threatData.akatsuki.threatLevel}%
                            </span>
                        </div>
                        <div className={`h-4 w-full rounded-full p-1 shadow-inner transition-colors duration-700 ${current.barTrack}`}>
                            <div
                                className={`h-full rounded-full transition-all duration-1000 ease-out ${eyeMode === 2 ? 'bg-gradient-to-r from-purple-800 to-purple-500 shadow-[0_0_15px_rgba(147,51,234,0.3)]' :
                                        'bg-gradient-to-r from-red-700 to-red-500 shadow-[0_0_15px_rgba(220,38,38,0.3)]'
                                    }`}
                                style={{ width: `${threatData.akatsuki.threatLevel}%` }}
                            />
                        </div>
                    </div>

                    {/* KARA BAR */}
                    <div className="group/bar">
                        <div className="flex justify-between items-end mb-3">
                            <div>
                                <span className={`text-xs font-black uppercase tracking-tighter transition-colors duration-700 ${current.textMain}`}>Kara Collective</span>
                                <div className="flex gap-2 mt-1">
                                    <span className="text-[8px] text-stone-500 font-bold uppercase tracking-widest">
                                        {isDark ? "Ancient Chakra Detected" : `${threatData.kara.innerCircle} Inner Members`}
                                    </span>
                                </div>
                            </div>
                            <span className={`text-xl font-black tracking-tighter transition-colors duration-700 ${current.textMain}`}>
                                {threatData.kara.threatLevel}%
                            </span>
                        </div>
                        <div className={`h-4 w-full rounded-full p-1 shadow-inner transition-colors duration-700 ${current.barTrack}`}>
                            <div
                                className={`h-full rounded-full transition-all duration-1000 ${isDark ? 'bg-gradient-to-r from-stone-400 to-stone-200' : 'bg-gradient-to-r from-stone-800 to-stone-600'
                                    }`}
                                style={{ width: `${threatData.kara.threatLevel}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Kanji Background Decor: 戦 (War) */}
            <span className={`absolute -bottom-10 -right-5 text-[15rem] font-black transition-all duration-1000 jp-title select-none pointer-events-none ${current.kanji}`}>
                戦
            </span>
        </div>
    );
}