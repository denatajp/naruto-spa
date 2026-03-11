import { useEye } from "../context/EyeContext";

// Tambahkan prop isLoading untuk sinkronisasi dengan OverviewGrid
export default function OverviewPanel({ title, value = "0", kanji = "火", isLoading = false }) {
    const { eyeMode } = useEye();
    const isDark = eyeMode > 0;

    // Konfigurasi visual berdasarkan mode (Template tetap sesuai kode Anda)
    const themes = {
        0: { // Normal (Orange)
            card: "bg-white/80 border-white shadow-[0_10px_30px_rgba(139,94,60,0.05)] hover:shadow-[0_20px_40px_rgba(251,146,60,0.12)]",
            accent: "border-orange-200/30",
            dot: "bg-orange-400 shadow-[0_0_8px_rgba(251,146,60,0.6)]",
            textTitle: "text-stone-400 group-hover:text-orange-500",
            textValue: "text-stone-800",
            barTrack: "bg-stone-100",
            barFill: "from-orange-300 to-orange-500"
        },
        1: { // Sharingan (Red)
            card: "bg-stone-900/40 border-red-500/20 shadow-[0_10px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_20px_40px_rgba(220,38,38,0.15)]",
            accent: "border-red-500/20",
            dot: "bg-red-500 shadow-[0_0_8px_rgba(220,38,38,0.8)]",
            textTitle: "text-stone-500 group-hover:text-red-500",
            textValue: "text-stone-200",
            barTrack: "bg-stone-800",
            barFill: "from-red-900 to-red-600"
        },
        2: { // Mangekyou (Purple)
            card: "bg-black/40 border-purple-600/20 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_40px_rgba(147,51,234,0.15)]",
            accent: "border-purple-600/20",
            dot: "bg-purple-500 shadow-[0_0_10px_rgba(147,51,234,0.8)]",
            textTitle: "text-stone-500 group-hover:text-purple-400",
            textValue: "text-white",
            barTrack: "bg-stone-900",
            barFill: "from-purple-900 to-purple-600"
        }
    };

    const current = themes[eyeMode] || themes[0];

    return (
        <div className={`
            relative group overflow-hidden backdrop-blur-md border-[1.5px] p-6 rounded-[2.5rem] transition-all duration-500 hover:-translate-y-1
            ${current.card}
        `}>
            {/* Corner Accents */}
            <div className={`absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 rounded-tl-[2.5rem] transition-colors duration-700 ${current.accent}`} />
            <div className={`absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 rounded-br-[2.5rem] transition-colors duration-700 ${current.accent}`} />

            {/* Kanji Background Decor */}
            <div className="absolute -right-2 -top-2 opacity-[0.05] group-hover:opacity-[0.08] transition-opacity duration-700 pointer-events-none">
                <span className={`text-8xl font-serif select-none transition-colors duration-700 ${isDark ? 'text-white' : 'text-black'}`}>
                    {kanji}
                </span>
            </div>

            <div className="relative z-10">
                <div className="flex items-center gap-3">
                    {/* Animasi ping pada dot jika sedang loading */}
                    <span className={`w-1.5 h-1.5 rounded-full transition-all duration-700 ${current.dot} ${isLoading ? 'animate-ping' : ''}`} />
                    <p className={`font-sans text-[11px] font-bold uppercase tracking-[0.2em] transition-colors italic ${current.textTitle}`}>
                        {title}
                    </p>
                </div>

                <div className="mt-4 flex items-baseline gap-1">
                    {/* Tampilkan animasi pulse jika loading, gunakan value asli jika sudah ada */}
                    <h2 className={`text-4xl font-black tracking-tighter group-hover:scale-105 transition-all duration-500 origin-left ${current.textValue} ${isLoading ? 'opacity-40 animate-pulse' : ''}`}>
                        {value}
                    </h2>
                    <span className="font-sans text-[10px] font-medium text-stone-500 uppercase tracking-widest ml-1">
                        Total
                    </span>
                </div>

                {/* Progress Bar */}
                <div className={`w-full h-[3px] mt-4 rounded-full overflow-hidden shadow-inner transition-colors duration-700 ${current.barTrack}`}>
                    <div 
                        className={`h-full bg-gradient-to-r transition-all duration-1000 ease-in-out ${current.barFill}`} 
                        // Jika loading, bar berada di 10%, jika selesai group-hover akan menariknya ke 66%
                        style={{ width: isLoading ? '10%' : '' }}
                        id="progress-bar-fill"
                    />
                </div>
            </div>
        </div>
    );
}