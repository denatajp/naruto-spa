import { useEye } from "../context/EyeContext";

export default function TailedBeastCard({ name, images, personal, natureType, onClick }) {
    const { eyeMode } = useEye();
    const isDark = eyeMode > 0;
    
    // Logic untuk menghitung ekor berdasarkan nama (misal "Two-Tails" -> 2)
    const tailCount = name.match(/\d+|One|Two|Three|Four|Five|Six|Seven|Eight|Nine|Ten/g);

    return (
        <div 
            onClick={onClick}
            className={`group relative border rounded-[3rem] p-6 flex flex-col lg:flex-row gap-8 transition-all duration-700 cursor-pointer overflow-hidden shadow-sm
                ${isDark 
                    ? 'bg-stone-900/40 border-red-900/20 hover:bg-stone-900/60 shadow-red-900/5' 
                    : 'bg-white/70 backdrop-blur-md border-orange-100/50 hover:bg-white'}`}
        >
            {/* Visual Monster */}
            <div className="relative w-full lg:w-72 h-72 shrink-0 rounded-[2.5rem] overflow-hidden shadow-2xl ring-4 ring-white/10">
                <img 
                    src={images?.[0] || "https://via.placeholder.com/400?text=Bijuu+Missing"} 
                    alt={name} 
                    className={`w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 ${isDark ? 'brightness-75' : ''}`}
                />
                <div className={`absolute inset-0 bg-gradient-to-t transition-opacity duration-700 ${isDark ? 'from-red-950/60' : 'from-orange-900/40'} to-transparent`} />
            </div>

            {/* Content Details */}
            <div className="flex-1 flex flex-col justify-between py-2">
                <div>
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <p className={`text-[10px] font-black uppercase tracking-[0.3em] mb-2 ${isDark ? 'text-red-500' : 'text-orange-400'}`}>
                                {personal?.classification || "Tailed Beast"}
                            </p>
                            <h2 className={`jp-title text-4xl md:text-5xl tracking-tighter transition-colors duration-700 ${isDark ? 'text-white' : 'text-stone-800'}`}>
                                {name}
                            </h2>
                        </div>
                        <span className={`px-4 py-1 rounded-full text-[10px] font-black border transition-all duration-700 ${isDark ? 'bg-red-950/30 border-red-900/50 text-red-400' : 'bg-orange-50 border-orange-100 text-orange-600'}`}>
                            {personal?.status || "Active"}
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-8">
                        <div>
                            <p className="text-[9px] font-black text-stone-400 uppercase tracking-widest mb-2">Primary Jinchūriki</p>
                            <p className={`text-xs font-bold truncate ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>
                                {Array.isArray(personal?.jinchūriki) ? personal.jinchūriki[0] : (personal?.jinchūriki || "None")}
                            </p>
                        </div>
                        <div>
                            <p className="text-[9px] font-black text-stone-400 uppercase tracking-widest mb-2">Species</p>
                            <p className={`text-xs font-bold truncate ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>
                                {personal?.species || "Unknown"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Nature Types */}
                <div className="flex flex-wrap gap-2">
                    {natureType?.slice(0, 4).map((type, i) => (
                        <span key={i} className={`text-[9px] font-bold px-4 py-1.5 rounded-lg uppercase tracking-tighter border transition-all duration-500 
                            ${isDark 
                                ? 'bg-red-950/20 border-red-900/30 text-red-400' 
                                : 'bg-stone-100 border-stone-200 text-stone-500'}`}>
                            {type}
                        </span>
                    ))}
                </div>
            </div>

            {/* Background Tail Number (Watermark) */}
            <span className={`absolute -bottom-4 -right-2 text-8xl font-black italic select-none pointer-events-none transition-all duration-700 
                ${isDark ? 'text-white/[0.02] group-hover:text-red-600/10' : 'text-stone-100 group-hover:text-orange-100'}`}>
                {tailCount}
            </span>
        </div>
    );
}