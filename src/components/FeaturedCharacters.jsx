import { useEffect } from "react";
import { useEye } from "../context/EyeContext";
// 1. Import Store
import { useNarutoStore } from "../store/useNarutoStore";

export default function FeaturedCharacters({ onSelect }) {
    const { eyeMode } = useEye();
    const isDark = eyeMode > 0;

    // 2. Ambil data, status loading, dan fungsi fetch dari Zustand
    const { characters, loadingStates, getCharacters } = useNarutoStore();
    const isLoading = loadingStates['characters'];

    // 3. Jalankan fetch saat komponen dimuat
    useEffect(() => {
        getCharacters();
    }, [getCharacters]);

    // 4. Logika Formatter (Tetap sama seperti kode asli Anda)
    // Kita mengambil 3 karakter pertama dari store untuk dijadikan "High-Priority Targets"
    const priorityTargets = characters.slice(0, 3).map(char => {
        let symbol = "忍";
        let color = "orange";
        let title = char.personal?.occupation || "Shinobi";

        const affiliation = Array.isArray(char.personal?.affiliation) 
            ? char.personal.affiliation[0] 
            : char.personal?.affiliation;

        if (affiliation?.includes("Akatsuki")) {
            symbol = "暁";
            color = "red";
            title = "S-Rank Criminal";
        } else if (affiliation?.includes("Kara")) {
            symbol = "殻";
            color = "stone";
            title = "Kara Inner";
        } else if (affiliation?.includes("Konoha")) {
            symbol = "火";
            color = "orange";
        }

        return {
            ...char, // Simpan data asli untuk modal
            title: title,
            symbol: symbol,
            img: char.images[0] || "https://via.placeholder.com/150",
            color: color
        };
    });

    const themes = {
        0: { card: "bg-white/80 border-white shadow-sm hover:shadow-2xl", title: "text-stone-800", kanji: "bg-stone-50 border-stone-100 text-stone-900", ring: "ring-white", line: "bg-stone-200" },
        1: { card: "bg-stone-900/40 border-red-500/20 shadow-md hover:shadow-[0_20px_40px_rgba(220,38,38,0.2)]", title: "text-stone-200", kanji: "bg-red-950/50 border-red-500/30 text-red-500", ring: "ring-red-600/30", line: "bg-red-900/50" },
        2: { card: "bg-black/50 border-purple-600/30 shadow-md hover:shadow-[0_25px_50px_rgba(147,51,234,0.2)]", title: "text-white", kanji: "bg-purple-950/50 border-purple-600/40 text-purple-400", ring: "ring-purple-600/40", line: "bg-purple-900/50" }
    };

    const current = themes[eyeMode] || themes[0];

    // Tampilkan loading hanya jika data benar-benar kosong
    if (isLoading && characters.length === 0) {
        return <div className="py-10 text-center animate-pulse text-stone-500 text-[10px] uppercase tracking-widest">Scanning Bio-Data...</div>;
    }

    return (
        <section className="py-2">
            <h3 className={`font-sans uppercase tracking-[0.3em] text-[10px] font-black mb-8 flex items-center gap-4 transition-colors duration-700 ${isDark ? 'text-stone-500' : 'text-stone-400'}`}>
                <span className={`w-12 h-[1px] transition-colors duration-700 ${current.line}`} />
                High-Priority Targets
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {priorityTargets.map((char) => (
                    <div
                        key={char.id}
                        onClick={() => onSelect(char)}
                        className={`
                            group relative backdrop-blur-md border-[1.5px] p-6 cursor-pointer rounded-[2.5rem]
                            transition-all duration-500 hover:-translate-y-2 overflow-hidden
                            ${current.card}
                        `}
                    >
                        <div className="relative z-10 flex flex-col items-center">
                            <div className={`w-24 h-24 rounded-full overflow-hidden ring-4 shadow-xl mb-4 group-hover:scale-110 transition-all duration-500 ${current.ring}`}>
                                <img
                                    src={char.img}
                                    className={`w-full h-full object-cover transition-all duration-700 ${isDark ? 'brightness-90 contrast-110' : ''}`}
                                    alt={char.name}
                                />
                            </div>

                            <span className={`text-[9px] font-black uppercase tracking-widest transition-colors duration-700 
                                ${isDark ? 'text-stone-500' : (char.color === 'red' ? 'text-red-500' : 'text-stone-400')}`}>
                                {char.title}
                            </span>

                            <h2 className={`jp-title text-xl mt-1 transition-colors duration-700 ${current.title}`}>
                                {char.name}
                            </h2>
                        </div>

                        <div className={`
                            absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-500
                            group-hover:scale-110
                            ${current.kanji}
                        `}>
                            <span className="text-[12px] jp-title">{char.symbol}</span>
                        </div>

                        {/* HUD Scanline Effect */}
                        {isDark && (
                            <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}