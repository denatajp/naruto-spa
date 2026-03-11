import { useEye } from "../context/EyeContext";

export default function CharacterCard({ name, clan, images, onClick }) {
    const { eyeMode } = useEye();
    const isDark = eyeMode > 0;

    // Konfigurasi Tema
    const themes = {
        0: { // Normal
            card: "bg-white/80 border-orange-100/50 hover:bg-white shadow-sm hover:shadow-[0_20px_50px_-15px_rgba(251,146,60,0.2)]",
            title: "text-stone-800",
            accent: "bg-orange-400",
            kanji: "text-stone-900",
            btn: "bg-stone-900 text-white shadow-md",
            imageRing: "ring-white"
        },
        1: { // Sharingan
            card: "bg-stone-900/60 border-red-500/20 hover:bg-stone-900/80 shadow-lg hover:shadow-[0_20px_40px_rgba(220,38,38,0.2)]",
            title: "text-stone-200",
            accent: "bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.5)]",
            kanji: "text-red-600",
            btn: "bg-red-700 text-white shadow-[0_0_15px_rgba(220,38,38,0.3)]",
            imageRing: "ring-red-900/50"
        },
        2: { // Mangekyou
            card: "bg-black/60 border-purple-500/20 hover:bg-black/80 shadow-xl hover:shadow-[0_25px_50px_rgba(147,51,234,0.2)]",
            title: "text-white",
            accent: "bg-purple-600 shadow-[0_0_15px_rgba(147,51,234,0.5)]",
            kanji: "text-purple-600",
            btn: "bg-purple-800 text-white shadow-[0_0_20px_rgba(147,51,234,0.4)]",
            imageRing: "ring-purple-900/50"
        }
    };

    const current = themes[eyeMode];

    return (
        <div 
            className={`
                group relative backdrop-blur-sm border rounded-3xl md:rounded-[2.5rem] p-3 md:p-4 
                transition-all duration-500 hover:-translate-y-2 overflow-hidden
                ${current.card}
            `}
        >
            {/* Ornamen Background Kanji */}
            <div className={`absolute -right-2 top-6 md:top-10 pointer-events-none select-none transition-all duration-700 
                ${isDark ? 'opacity-[0.1] scale-110' : 'opacity-[0.05] group-hover:opacity-[0.1]'}
            `}>
                <span className={`jp-title text-7xl md:text-9xl ${current.kanji}`}>忍</span>
            </div>

            <figure className="relative">
                <div className={`w-full h-48 md:h-56 bg-stone-100 rounded-2xl md:rounded-[2rem] overflow-hidden ring-4 shadow-inner transition-all duration-700 ${current.imageRing}`}>
                    {images && images[0] ? (
                        <img
                            src={images[0]}
                            alt={name}
                            className={`w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 ${isDark ? 'brightness-75 contrast-125 saturate-[0.8]' : ''}`}
                        />
                    ) : (
                        <div className={`flex flex-col items-center justify-center h-full transition-colors duration-700 ${isDark ? 'bg-stone-800 text-stone-600' : 'bg-stone-50 text-stone-400'}`}>
                             <span className="text-xs uppercase font-bold tracking-tighter">No Intel</span>
                        </div>
                    )}
                </div>

                {/* Target Overlay (Hanya di Mode Mata) */}
                {isDark && (
                    <div className="absolute top-4 left-4 flex gap-1">
                        <span className={`w-2 h-2 rounded-full animate-ping ${eyeMode === 2 ? 'bg-purple-500' : 'bg-red-500'}`} />
                        <span className={`text-[8px] font-black uppercase tracking-widest ${eyeMode === 2 ? 'text-purple-400' : 'text-red-400'}`}>Tracking</span>
                    </div>
                )}
            </figure>

            <div className="relative z-10 px-2 pb-2">
                <div className="mt-4 md:mt-6">
                    <span className={`font-sans text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] block mb-1 transition-colors duration-700 ${isDark ? 'text-stone-500' : 'text-orange-400'}`}>
                        {clan || "Independent"}
                    </span>
                    <h2 className={`jp-title text-xl md:text-2xl tracking-tighter transition-colors duration-500 ${current.title} ${!isDark && 'group-hover:text-orange-600'}`}>
                        {name}
                    </h2>
                    {/* Bar Aksen */}
                    <div className={`mt-2 h-1 rounded-full transition-all duration-700 ${current.accent} ${isDark ? 'w-16' : 'w-8 group-hover:w-16'}`} />
                </div>

                <div className="flex justify-between items-center mt-4 md:mt-6">
                    <div className="flex flex-col text-left">
                        <span className="font-sans text-[8px] font-black text-stone-300 uppercase tracking-[0.2em]">
                            {isDark ? "Target ID" : "Archives"}
                        </span>
                        <span className={`font-sans text-[9px] font-bold italic transition-colors duration-700 ${isDark ? 'text-stone-500' : 'text-stone-400'}`}>
                            #0{Math.floor(Math.random() * 900) + 100}
                        </span>
                    </div>

                    <button
                        onClick={onClick}
                        className={`
                            relative overflow-hidden group/btn px-4 md:px-6 py-2 rounded-lg md:rounded-xl 
                            transition-all active:scale-90 shadow-lg font-sans text-[9px] md:text-[10px] 
                            font-black tracking-widest uppercase
                            ${current.btn}
                        `}
                    >
                        <span className="relative z-10">Details</span>
                        {!isDark && (
                            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                        )}
                    </button>
                </div>
            </div>
            
            {/* HUD Scanline Effect */}
            {isDark && (
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
            )}
        </div>
    );
}