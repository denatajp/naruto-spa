import React from 'react';

export default function AkatsukiDetailModal({ data, isOpen, onClose }) {
    if (!isOpen || !data) return null;

    return (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            {/* Backdrop dengan Blur Tinggi */}
            <div
                className="absolute inset-0 bg-stone-950/80 backdrop-blur-md transition-opacity"
                onClick={onClose}
            />

            {/* Kontainer Modal */}
            <div className="relative bg-stone-900 w-full max-w-5xl max-h-[90vh] rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-stone-800 animate-in fade-in zoom-in duration-300">

                {/* Sisi Kiri: Visual Karakter */}
                <div className="w-full md:w-2/5 bg-stone-950 relative p-8 flex flex-col items-center justify-center border-r border-stone-800">
                    {/* Watermark Kanji Background */}
                    <span className="absolute top-10 right-0 text-[12rem] font-black text-white/[0.03] select-none pointer-events-none jp-title">
                        秘
                    </span>

                    <div className="relative z-10 w-full aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl ring-1 ring-white/10">
                        <img
                            src={data.images?.[0]}
                            alt={data.name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="relative z-10 mt-8 text-center">
                        <span className="text-[10px] font-black text-red-500 uppercase tracking-[0.4em] mb-2 block">
                            Classified Information
                        </span>
                        <h2 className="jp-title text-4xl text-white tracking-tighter">
                            {data.name}
                        </h2>
                        <div className="h-1 w-12 bg-red-600 mx-auto mt-4 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.5)]" />
                    </div>
                </div>

                {/* Sisi Kanan: Data Detail (Scrollable) */}
                <div className="w-full md:w-3/5 p-8 md:p-12 overflow-y-auto custom-scrollbar bg-stone-900 text-left">
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-8 text-stone-500 hover:text-white transition-colors text-2xl"
                    >
                        ✕
                    </button>

                    <div className="space-y-10">
                        {/* Section: Personal Profile */}
                        <section>
                            <h3 className="text-[11px] font-black text-stone-600 uppercase tracking-[0.3em] mb-6 flex items-center gap-4">
                                Shinobi Profile
                                <div className="h-[1px] flex-1 bg-stone-800" />
                            </h3>
                            <div className="grid grid-cols-2 gap-6">
                                <InfoItem label="Status" value={data.personal?.status || "Active"} isStatus />
                                <InfoItem label="Partner" value={Array.isArray(data.personal?.partner) ? data.personal.partner.join(", ") : data.personal?.partner} />
                                <InfoItem label="Affiliation" value={data.personal?.affiliation?.join?.(", ") || data.personal?.affiliation} />
                                <InfoItem label="Rank" value={data.personal?.classification?.join?.(", ") || "S-Rank"} />
                            </div>
                        </section>

                        {/* Section: Nature Type */}
                        {data.natureType && (
                            <section>
                                <h3 className="text-[11px] font-black text-stone-600 uppercase tracking-[0.3em] mb-6 flex items-center gap-4">
                                    Nature Manipulation
                                    <div className="h-[1px] flex-1 bg-stone-800" />
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {data.natureType.map((type, i) => (
                                        <span key={i} className="px-4 py-2 bg-stone-800 border border-stone-700 rounded-xl text-[10px] font-bold text-stone-300 uppercase tracking-wide">
                                            {type}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Section: Jutsu */}
                        {data.jutsu && (
                            <section>
                                <h3 className="text-[11px] font-black text-stone-600 uppercase tracking-[0.3em] mb-6 flex items-center gap-4">
                                    Known Techniques
                                    <div className="h-[1px] flex-1 bg-stone-800" />
                                </h3>
                                <ul className="grid grid-cols-1 gap-2">
                                    {data.jutsu.slice(0, 8).map((j, i) => (
                                        <li key={i} className="text-sm text-stone-400 flex items-center gap-3">
                                            <span className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                                            {j}
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function InfoItem({ label, value, isStatus = false }) {
    if (!value) return null;
    return (
        <div className="flex flex-col gap-1">
            <span className="text-[9px] font-bold text-stone-600 uppercase tracking-widest">{label}</span>
            <span className={`text-sm font-bold tracking-tight ${isStatus ? 'text-red-500' : 'text-stone-200'}`}>
                {value}
            </span>
        </div>
    );
}