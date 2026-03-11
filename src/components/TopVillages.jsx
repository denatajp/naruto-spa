import { useEffect, useMemo } from "react";
import { useEye } from "../context/EyeContext";
import { useNarutoStore } from "../store/useNarutoStore";

export default function TopVillages() {
    const { eyeMode } = useEye();
    const isDark = eyeMode > 0;

    // 1. Ambil data dan fungsi dari Zustand Store
    const { villages, loadingStates, getVillages } = useNarutoStore();

    // 2. Aset statis untuk mapping UI
    const villageAssets = {
        "Konohagakure": { icon: "🍃", color: "bg-green-500" },
        "Sunagakure": { icon: "⏳", color: "bg-yellow-600" },
        "Iwagakure": { icon: "🪨", color: "bg-stone-500" },
        "Kumogakure": { icon: "⚡", color: "bg-blue-400" },
        "Kirigakure": { icon: "🌫️", color: "bg-cyan-600" },
        "Amegakure": { icon: "🌧️", color: "bg-indigo-500" },
        "Otogakure": { icon: "🎵", color: "bg-purple-600" },
        "default": { icon: "🏮", color: "bg-red-500" }
    };

    // 3. Trigger fetch saat mount
    useEffect(() => {
        getVillages();
    }, [getVillages]);

    // 4. Transformasi data menggunakan useMemo agar efisien
    const topVillages = useMemo(() => {
        if (!villages.length) return [];

        return [...villages]
            .sort((a, b) => b.characters.length - a.characters.length)
            .slice(0, 3)
            .map(v => ({
                name: v.name,
                count: v.characters.length,
                icon: villageAssets[v.name]?.icon || villageAssets.default.icon,
                color: villageAssets[v.name]?.color || villageAssets.default.color
            }));
    }, [villages]);

    const themes = {
        0: {
            container: "bg-white/80 border-white shadow-sm",
            title: "text-stone-800",
            subtitle: "bg-stone-50 text-stone-400",
            villageName: "text-stone-700 group-hover:text-stone-900",
            track: "bg-stone-100"
        },
        1: {
            container: "bg-stone-900/40 border-red-500/20 shadow-lg",
            title: "text-stone-200",
            subtitle: "bg-red-950/50 text-red-500 border border-red-900/30",
            villageName: "text-stone-400 group-hover:text-red-400",
            track: "bg-stone-800"
        },
        2: {
            container: "bg-black/40 border-purple-600/20 shadow-xl",
            title: "text-white",
            subtitle: "bg-purple-950/50 text-purple-400 border border-purple-900/30",
            villageName: "text-stone-300 group-hover:text-purple-400",
            track: "bg-stone-900"
        }
    };

    const current = themes[eyeMode] || themes[0];
    const loading = loadingStates['villages'];
    const maxCount = topVillages.length > 0 ? topVillages[0].count : 1;

    return (
        <div className={`
            relative backdrop-blur-md border-[1.5px] rounded-[2.5rem] p-8 overflow-hidden transition-all duration-700 min-h-[300px]
            ${current.container}
        `}>
            <div className="flex justify-between items-center mb-8 relative z-10">
                <h3 className={`jp-title text-lg tracking-tight transition-colors duration-700 ${current.title}`}>
                    Population
                </h3>
                <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full transition-all duration-700 ${current.subtitle}`}>
                    {loading && villages.length === 0 ? "Syncing..." : (isDark ? "Geopolitical Analysis" : "Database 2.0")}
                </span>
            </div>

            <div className="space-y-6 relative z-10">
                {loading && villages.length === 0 ? (
                    [1, 2, 3].map(i => (
                        <div key={i} className="animate-pulse flex flex-col gap-3">
                            <div className="h-4 bg-stone-300/20 rounded w-1/2"></div>
                            <div className="h-1.5 bg-stone-300/10 rounded w-full"></div>
                        </div>
                    ))
                ) : (
                    topVillages.map((v, i) => (
                        <div key={i} className="group cursor-default">
                            <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center gap-3">
                                    <span className={`text-lg transition-transform duration-500 group-hover:scale-125 ${isDark ? 'grayscale-[0.5] brightness-125' : ''}`}>
                                        {v.icon}
                                    </span>
                                    <span className={`text-xs font-bold transition-colors duration-500 ${current.villageName}`}>
                                        {v.name}
                                    </span>
                                </div>
                                <span className={`text-xs font-black transition-colors duration-700 ${isDark ? 'text-stone-500' : 'text-stone-400'}`}>
                                    {v.count}
                                </span>
                            </div>

                            <div className={`h-1.5 w-full rounded-full overflow-hidden transition-colors duration-700 ${current.track}`}>
                                <div
                                    className={`h-full ${v.color} transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(0,0,0,0.1)]`}
                                    style={{
                                        width: `${(v.count / maxCount) * 100}%`,
                                        filter: isDark ? 'saturate(1.5) brightness(0.8)' : 'none'
                                    }}
                                />
                            </div>
                        </div>
                    ))
                )}
            </div>

            {isDark && (
                <div className="absolute inset-0 pointer-events-none">
                    <div className={`absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] ${eyeMode === 2 ? 'from-purple-500 via-transparent to-transparent' : 'from-red-500 via-transparent to-transparent'}`} />
                </div>
            )}
        </div>
    );
}