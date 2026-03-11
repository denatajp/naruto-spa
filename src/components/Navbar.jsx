import { useLocation } from "react-router-dom";
// 1. Hapus useState, ganti dengan useEye
import { useEye } from "../context/EyeContext"; 

export default function Navbar() {
    const location = useLocation();

    // 2. Ambil state dan fungsi toggle dari Context Global
    const { eyeMode, toggleEye } = useEye();

    const pageTitles = {
        "/": "Dashboard",
        "/characters": "Characters",
        "/villages": "Villages",
        "/clans": "Clans",
        "/kekkei-genkai": "Kekkei Genkai",
        "/teams": "Teams",
        "/tailed-beasts": "Tailed Beasts",
        "/organizations": "Organizations",
        "/akatsuki": "Akatsuki",
    };

    const currentTitle = pageTitles[location.pathname] || "Shinobi System";

    // 3. Konfigurasi Visual tetap sama, namun sekarang sinkron secara global
    const themes = {
        0: { 
            bg: "bg-white/60", 
            border: "border-orange-100/50", 
            text: "text-orange-400", 
            title: "text-stone-800", 
            label: "Sharingan Off", 
            sub: "" 
        },
        1: { 
            bg: "bg-stone-900/90", 
            border: "border-red-500/50 shadow-[0_0_30px_rgba(220,38,38,0.2)]", 
            text: "text-red-500", 
            title: "text-white", 
            label: "Sharingan On", 
            sub: "Genjutsu Active" 
        },
        2: { 
            bg: "bg-black", 
            border: "border-purple-600/60 shadow-[0_0_40px_rgba(147,51,234,0.3)]", 
            text: "text-purple-500", 
            title: "text-purple-50", 
            label: "M. Sharingan", 
            sub: "Amaterasu Ready" 
        }
    };

    const currentTheme = themes[eyeMode];

    return (
        <header className="sticky top-4 z-50 px-4">
            <div className={`backdrop-blur-xl border rounded-[2rem] px-8 h-20 flex items-center justify-between transition-all duration-700 ${currentTheme.bg} ${currentTheme.border}`}>

                {/* Sisi Kiri */}
                <div className="flex flex-col text-left">
                    <span className={`font-sans text-[9px] font-black uppercase tracking-[0.3em] mb-1 transition-colors duration-500 ${currentTheme.text}`}>
                        {eyeMode === 2 ? "Forbidden Occult Power" : eyeMode === 1 ? "Uchiha Perception" : "Shinobi System"}
                    </span>
                    <h1 className={`jp-title text-2xl tracking-tighter transition-all duration-500 ${currentTheme.title}`}>
                        {currentTitle}
                    </h1>
                </div>

                {/* Sisi Kanan: Eye Toggle */}
                <div className="flex items-center gap-6">
                    <div
                        onClick={toggleEye}
                        className={`group relative flex items-center gap-4 pl-2 pr-6 py-2 rounded-2xl cursor-pointer transition-all duration-500 ${eyeMode !== 0 ? "bg-white/5 border border-white/10" : "bg-stone-100/50 hover:bg-stone-100"
                            }`}
                    >
                        {/* THE EYE VISUAL */}
                        <div className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-1000 ${eyeMode === 1 ? "bg-red-600 rotate-[360deg]" :
                                eyeMode === 2 ? "bg-red-700 animate-[spin_10s_linear_infinite]" : "bg-white"
                            }`}>
                            {/* Pupil */}
                            <div className={`w-2 h-2 rounded-full bg-black z-20 transition-all ${eyeMode === 2 ? "scale-125 shadow-[0_0_8px_black]" : ""}`} />

                            {/* Tomoe / Mangekyou Pattern */}
                            {eyeMode === 1 && (
                                <>
                                    <div className="absolute top-1.5 w-1.5 h-1.5 bg-black rounded-full" />
                                    <div className="absolute bottom-2.5 left-1.5 w-1.5 h-1.5 bg-black rounded-full" />
                                    <div className="absolute bottom-2.5 right-1.5 w-1.5 h-1.5 bg-black rounded-full" />
                                </>
                            )}

                            {eyeMode === 2 && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="absolute w-full h-1 bg-black rotate-0 rounded-full" />
                                    <div className="absolute w-full h-1 bg-black rotate-[120deg] rounded-full" />
                                    <div className="absolute w-full h-1 bg-black rotate-[240deg] rounded-full" />
                                    <div className="w-7 h-7 border-[3px] border-black rounded-full opacity-80" />
                                </div>
                            )}
                        </div>

                        {/* Label */}
                        <div className="flex flex-col">
                            <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${currentTheme.text}`}>
                                {currentTheme.label}
                            </span>
                            <span className="text-[8px] font-bold text-stone-500/50 uppercase tracking-[0.2em]">
                                {currentTheme.sub}
                            </span>
                        </div>
                    </div>

                    {/* Profile Icon */}
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-500 ${eyeMode === 2 ? "bg-purple-600 shadow-[0_0_15px_rgba(147,51,234,0.5)]" :
                            eyeMode === 1 ? "bg-red-600" : "bg-stone-900"
                        } text-white`}>
                        <span className="jp-title text-sm">{eyeMode === 2 ? "天" : eyeMode === 1 ? "写" : "火"}</span>
                    </div>
                </div>
            </div>
        </header>
    );
}