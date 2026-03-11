import { useEye } from "../context/EyeContext";

export default function AkatsukiCard({ name, images, personal, natureType, onClick }) {
    const { eyeMode } = useEye();
    const isDark = eyeMode > 0;

    // Helper untuk menangani data Partner yang dinamis dari API
    const displayPartner = () => {
        if (!personal?.partner) return "Solo";
        if (Array.isArray(personal.partner)) return personal.partner.join(", ");
        return personal.partner;
    };

    // Helper untuk klasifikasi (S-Rank, dll)
    const displayClassification = () => {
        if (!personal?.classification) return "Class S Criminal";
        if (Array.isArray(personal.classification)) return personal.classification[0];
        return personal.classification;
    };

    return (
        <div
            onClick={onClick}
            className={`group relative border rounded-[2rem] overflow-hidden transition-all duration-500 hover:-translate-y-2 cursor-pointer shadow-sm
                ${isDark 
                    ? 'bg-black border-red-900/30 hover:shadow-[0_20px_50px_rgba(220,38,38,0.2)]' 
                    : 'bg-stone-900 border-stone-800 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]'}`}
        >
            {/* Background Pattern (Cloud Akatsuki) */}
            <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-30 transition-opacity">
                <span className="text-6xl text-red-600">暁</span>
            </div>

            <div className="flex flex-col md:flex-row h-full">
                {/* Visual Karakter */}
                <div className="relative w-full md:w-48 h-64 md:h-auto overflow-hidden bg-stone-950">
                    <img
                        src={images?.[0] || "https://via.placeholder.com/400x600?text=Missing+Intel"}
                        alt={name}
                        className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 
                            ${isDark ? 'brightness-75 contrast-125' : ''}`}
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent md:bg-gradient-to-r" />
                </div>

                {/* Konten Detail */}
                <div className="flex-1 p-6 flex flex-col justify-center relative z-10">
                    <div className="mb-4">
                        <span className="text-[9px] font-black text-red-600 uppercase tracking-[0.4em] mb-1 block">
                            {displayClassification()}
                        </span>
                        <h2 className={`jp-title text-3xl tracking-tighter transition-colors duration-500
                            ${isDark ? 'text-white group-hover:text-red-500' : 'text-stone-100 group-hover:text-red-400'}`}>
                            {name}
                        </h2>
                    </div>

                    <div className="space-y-3">
                        {/* Partner Info */}
                        <div className="flex flex-col gap-1">
                            <span className="text-[9px] font-bold text-stone-500 uppercase tracking-widest">Current Partner</span>
                            <span className="text-xs text-stone-300 font-medium truncate">
                                {displayPartner()}
                            </span>
                        </div>

                        {/* Nature Type Chips dari API */}
                        <div className="flex flex-wrap gap-1.5 mt-4">
                            {natureType && natureType.length > 0 ? (
                                natureType.slice(0, 3).map((type, i) => (
                                    <span key={i} className="px-2 py-1 bg-red-950/20 text-[8px] font-bold text-red-400/80 rounded uppercase tracking-tighter border border-red-900/30">
                                        {type}
                                    </span>
                                ))
                            ) : (
                                <span className="text-[8px] text-stone-600 italic">No nature types recorded</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Garis Aksen Bawah - Bereaksi terhadap Mode Mata */}
            <div className={`absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-700
                ${eyeMode === 2 ? 'bg-purple-600' : 'bg-red-600'}`} 
            />
        </div>
    );
}