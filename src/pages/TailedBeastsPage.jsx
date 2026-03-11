import React, { useState, useEffect } from "react";
import TailedBeastsCard from "../components/TailedBeastsCard";
import { useEye } from "../context/EyeContext";
// 1. Import Store
import { useNarutoStore } from "../store/useNarutoStore";

export default function TailedBeastsPage() {
    const { eyeMode } = useEye();
    const isDark = eyeMode > 0;

    // 2. Ambil state dan action dari Zustand
    // tailedBeasts: data array Bijuu
    // loadingStates: status loading spesifik untuk key 'tailedBeasts'
    const { tailedBeasts, loadingStates, getTailedBeasts } = useNarutoStore();
    const isLoading = loadingStates['tailedBeasts'];

    // 3. Panggil fungsi fetch dari store
    useEffect(() => {
        getTailedBeasts();
    }, [getTailedBeasts]);

    return (
        <div className="flex flex-col gap-12 pb-20">
            {/* Header Section - Design Tetap Sama */}
            <div className="relative p-12 rounded-[4rem] overflow-hidden group transition-all duration-700 bg-stone-900 border border-stone-800">
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-3 mb-6">
                            <div className={`h-[1px] w-12 ${isDark ? 'bg-red-600' : 'bg-orange-500'}`} />
                            <span className={`text-[10px] font-black uppercase tracking-[0.5em] ${isDark ? 'text-red-500' : 'text-orange-400'}`}>
                                Forbidden Archives
                            </span>
                        </div>
                        <h1 className="jp-title text-5xl md:text-7xl text-white mb-6 leading-none">
                            Tailed <span className={isDark ? 'text-red-600' : 'text-orange-500'}>Beasts</span>
                        </h1>
                        <p className="text-stone-400 text-sm md:text-base leading-relaxed font-medium max-w-xl">
                            The Bijuu are nine titanic concentrations of chakra.
                            Explore the data of these living weapons of mass destruction.
                        </p>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                        <span className="text-[60px] font-black text-white/5 italic leading-none select-none">BIJUU</span>
                        <div className={`px-6 py-2 rounded-full border text-[10px] font-black uppercase tracking-widest ${isDark ? 'border-red-900/50 text-red-500' : 'border-stone-700 text-stone-500'}`}>
                            Detected Signatures: {tailedBeasts.length}
                        </div>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-red-600/10 to-transparent pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
            </div>

            {/* List Tailed Beasts / Loading - Menggunakan data dari Zustand */}
            {isLoading && tailedBeasts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24">
                    <div className={`w-12 h-12 border-4 rounded-full animate-spin mb-4 ${isDark ? 'border-red-600 border-t-transparent' : 'border-orange-500 border-t-transparent'}`}></div>
                    <p className="text-stone-500 font-bold tracking-widest uppercase text-xs animate-pulse">Gathering Chakra Signatures...</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-8">
                    {tailedBeasts.map((beast) => (
                        <TailedBeastsCard
                            key={beast.id}
                            {...beast}
                            onClick={() => console.log("Details for:", beast.name)}
                        />
                    ))}
                </div>
            )}

            {/* End Section Ornament - Design Tetap Sama */}
            <div className="flex flex-col items-center justify-center py-12 gap-4">
                <div className={`h-20 w-[1px] bg-gradient-to-b from-transparent transition-all duration-700 ${isDark ? (eyeMode === 2 ? 'via-purple-900/50' : 'via-red-900/50') : 'via-orange-200'} to-transparent`} />
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-stone-500 opacity-30 italic">
                    End of Records
                </p>
            </div>
        </div>
    );
}