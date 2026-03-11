import { useEye } from "../context/EyeContext";

export default function CharacterDetailModal({ character, isOpen, onClose }) {
    const { eyeMode } = useEye();
    const isDark = eyeMode > 0;

    if (!isOpen || !character) return null;

    // Konfigurasi Tema Modal
    const themes = {
        0: { // Normal (Orange)
            overlay: "bg-stone-900/60",
            content: "bg-white",
            sidePanel: "bg-orange-50 border-orange-100",
            kanji: "text-orange-100/50",
            title: "text-stone-800",
            subtitle: "text-orange-500",
            mainText: "text-stone-700",
            subText: "text-stone-400",
            sectionLine: "bg-stone-100",
            badge: "bg-stone-50 border-stone-100 text-stone-600",
            voiceJp: "bg-orange-50/50 border-orange-100/50",
            voiceEn: "bg-stone-50 border-stone-100"
        },
        1: { // Sharingan (Red)
            overlay: "bg-red-950/80",
            content: "bg-stone-950",
            sidePanel: "bg-stone-900 border-red-900/30",
            kanji: "text-red-600/10",
            title: "text-stone-100",
            subtitle: "text-red-500",
            mainText: "text-stone-300",
            subText: "text-red-900/80",
            sectionLine: "bg-red-900/20",
            badge: "bg-red-950/40 border-red-900/30 text-red-400",
            voiceJp: "bg-red-900/20 border-red-500/20",
            voiceEn: "bg-stone-900 border-red-900/20"
        },
        2: { // Mangekyou (Purple)
            overlay: "bg-black/90",
            content: "bg-black",
            sidePanel: "bg-stone-950 border-purple-900/30",
            kanji: "text-purple-600/10",
            title: "text-white",
            subtitle: "text-purple-400",
            mainText: "text-stone-200",
            subText: "text-purple-900/80",
            sectionLine: "bg-purple-900/20",
            badge: "bg-purple-950/40 border-purple-900/30 text-purple-300",
            voiceJp: "bg-purple-900/20 border-purple-500/20",
            voiceEn: "bg-stone-950 border-purple-900/20"
        }
    };

    const current = themes[eyeMode];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <div className={`absolute inset-0 backdrop-blur-md transition-opacity duration-700 ${current.overlay}`} onClick={onClose} />

            <div className={`
                relative w-full max-w-5xl max-h-[90vh] rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in duration-300 border
                ${current.content} ${isDark ? 'border-white/5' : 'border-transparent'}
            `}>
                
                {/* Sisi Kiri: Visual */}
                <div className={`w-full md:w-2/5 p-8 flex flex-col items-center border-r overflow-hidden relative transition-colors duration-700 ${current.sidePanel}`}>
                    <span className={`absolute -top-10 -right-10 text-[15rem] font-black jp-title select-none transition-colors duration-700 ${current.kanji}`}>忍</span>
                    
                    <div className={`relative z-10 w-full aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl ring-4 transition-all duration-700 ${isDark ? 'ring-stone-800' : 'ring-white'}`}>
                        <img 
                            src={character.images?.[0]} 
                            alt={character.name} 
                            className={`w-full h-full object-cover transition-all duration-700 ${isDark ? 'brightness-75 contrast-125 saturate-50' : ''}`} 
                        />
                        {isDark && <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />}
                    </div>

                    <div className="mt-8 text-center relative z-10">
                        <h2 className={`jp-title text-4xl tracking-tighter transition-colors duration-700 ${current.title}`}>{character.name}</h2>
                        <p className={`font-black text-[10px] uppercase tracking-[0.4em] mt-2 transition-colors duration-700 ${current.subtitle}`}>
                            {isDark ? `Target Class: ${character.personal?.classification || "Unknown"}` : (character.personal?.classification || "Shinobi")}
                        </p>
                    </div>
                </div>

                {/* Sisi Kanan: Detail Scrollable */}
                <div className={`flex-1 p-8 md:p-12 overflow-y-auto text-left custom-scrollbar transition-colors duration-700 ${current.content}`}>
                    <button onClick={onClose} className={`absolute top-8 right-8 transition-colors text-2xl z-20 ${isDark ? 'text-stone-700 hover:text-white' : 'text-stone-300 hover:text-orange-500'}`}>✕</button>

                    <div className="space-y-10 relative z-10">
                        {/* Section: Personal Info */}
                        <section>
                            <h3 className={`text-[11px] font-black uppercase tracking-[0.3em] mb-6 flex items-center gap-4 transition-colors duration-700 ${current.subText}`}>
                                {isDark ? "Biological Intel" : "Personal Profile"} 
                                <div className={`h-[1px] flex-1 transition-colors duration-700 ${current.sectionLine}`} />
                            </h3>
                            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                                <InfoItem label="Sex" value={character.personal?.sex} theme={current} />
                                <InfoItem label="Occupation" value={character.personal?.occupation} theme={current} />
                                <InfoItem label="Affiliation" value={character.personal?.affiliation?.join?.(", ") || character.personal?.affiliation} theme={current} />
                                <InfoItem label="Manga Debut" value={character.debut?.manga} theme={current} />
                            </div>
                        </section>

                        {/* Section: Jutsu */}
                        {character.jutsu && (
                            <section>
                                <h3 className={`text-[11px] font-black uppercase tracking-[0.3em] mb-6 flex items-center gap-4 transition-colors duration-700 ${current.subText}`}>
                                    {isDark ? "Analyzed Techniques" : "Known Techniques"} 
                                    <div className={`h-[1px] flex-1 transition-colors duration-700 ${current.sectionLine}`} />
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {character.jutsu.slice(0, 10).map((j, i) => (
                                        <span key={i} className={`px-3 py-1.5 border rounded-xl text-[10px] font-bold uppercase transition-all duration-700 ${current.badge}`}>
                                            {j}
                                        </span>
                                    ))}
                                    {character.jutsu.length > 10 && <span className="text-[10px] text-stone-500 font-bold">+{character.jutsu.length - 10} more</span>}
                                </div>
                            </section>
                        )}

                        {/* Section: Voice Actors */}
                        <section>
                            <h3 className={`text-[11px] font-black uppercase tracking-[0.3em] mb-6 flex items-center gap-4 transition-colors duration-700 ${current.subText}`}>
                                Voice Archives <div className={`h-[1px] flex-1 transition-colors duration-700 ${current.sectionLine}`} />
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className={`p-4 rounded-2xl border transition-all duration-700 ${current.voiceJp}`}>
                                    <span className={`text-[9px] font-bold uppercase block mb-1 ${isDark ? 'text-stone-500' : 'text-orange-400'}`}>Japanese</span>
                                    <p className={`text-xs font-bold transition-colors duration-700 ${current.mainText}`}>
                                        {Array.isArray(character.voiceActors?.japanese) ? character.voiceActors.japanese[0] : character.voiceActors?.japanese}
                                    </p>
                                </div>
                                <div className={`p-4 rounded-2xl border transition-all duration-700 ${current.voiceEn}`}>
                                    <span className="text-[9px] font-bold text-stone-500 uppercase block mb-1">English</span>
                                    <p className={`text-xs font-bold transition-colors duration-700 ${current.mainText}`}>
                                        {Array.isArray(character.voiceActors?.english) ? character.voiceActors.english[0] : character.voiceActors?.english}
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Komponen InfoItem dengan support tema
function InfoItem({ label, value, theme }) {
    if (!value) return null;
    return (
        <div className="flex flex-col gap-1">
            <span className={`text-[9px] font-bold uppercase tracking-widest transition-colors duration-700 ${theme.subText}`}>{label}</span>
            <span className={`text-sm font-bold tracking-tight transition-colors duration-700 ${theme.mainText}`}>{value}</span>
        </div>
    );
}