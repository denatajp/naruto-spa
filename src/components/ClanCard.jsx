import { useEye } from "../context/EyeContext";

export default function ClanCard({ name, characters = [], onViewDirectory }) {
    const { eyeMode } = useEye();
    const isDark = eyeMode > 0;

    const themes = {
        0: { // Normal
            card: "bg-white/70 border-orange-100/50 hover:bg-white shadow-sm hover:shadow-[0_20px_50px_-15px_rgba(251,146,60,0.1)]",
            title: "text-stone-800",
            label: "text-orange-400",
            button: "bg-stone-50 text-stone-600 hover:bg-stone-900 hover:text-white"
        },
        1: { // Sharingan
            card: "bg-stone-900/40 border-red-900/20 shadow-lg hover:shadow-[0_20px_40px_rgba(220,38,38,0.15)]",
            title: "text-white",
            label: "text-red-500",
            button: "bg-red-950/20 text-red-500 hover:bg-red-600 hover:text-white border border-red-900/30"
        }
    };

    const current = themes[isDark ? 1 : 0];

    return (
        <div className={`group relative p-8 rounded-[2.5rem] border transition-all duration-700 overflow-hidden ${current.card}`}>
            
            {/* Watermark Kanji */}
            <span className={`absolute -top-6 -right-4 text-7xl font-black opacity-[0.03] select-none transition-opacity duration-700 group-hover:opacity-[0.07] ${isDark ? 'text-red-600' : 'text-stone-900'}`}>
                氏
            </span>

            <div className="relative z-10">
                <p className={`text-[10px] font-black uppercase tracking-[0.3em] mb-2 ${current.label}`}>Lineage Detected</p>
                <h3 className={`jp-title text-3xl mb-8 tracking-tighter transition-colors duration-700 ${current.title}`}>
                    {name}
                </h3>

                <div className="flex items-center justify-between">
                    <div className="flex -space-x-3">
                        {/* Karena API hanya ID, kita buat placeholder visual untuk anggota */}
                        {[...Array(Math.min(characters.length, 4))].map((_, i) => (
                            <div 
                                key={i} 
                                className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-[10px] font-bold
                                    ${isDark ? 'bg-stone-800 border-stone-900 text-red-500' : 'bg-stone-100 border-white text-stone-400'}`}
                            >
                                ID
                            </div>
                        ))}
                        {characters.length > 4 && (
                            <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-[10px] font-black
                                ${isDark ? 'bg-red-600 border-stone-900 text-white' : 'bg-stone-900 border-white text-white'}`}>
                                +{characters.length - 4}
                            </div>
                        )}
                    </div>
                    <div className="text-right">
                        <p className={`text-[10px] font-black uppercase ${isDark ? 'text-stone-500' : 'text-stone-400'}`}>Total Population</p>
                        <p className={`text-xl font-sans font-black ${isDark ? 'text-white' : 'text-stone-900'}`}>{characters.length}</p>
                    </div>
                </div>

                <button
                    onClick={onViewDirectory}
                    className={`w-full mt-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-500 flex items-center justify-center gap-2 group/btn ${current.button}`}
                >
                    {isDark ? "Scan DNA Archives" : "View Directory"}
                    <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                </button>
            </div>
        </div>
    );
}