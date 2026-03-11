import { useState, useEffect } from "react";
import CharacterCard from "../components/CharacterCard";
import CharacterDetailModal from "../components/CharacterDetailModal";
import { useEye } from "../context/EyeContext";
// 1. Import Store kita
import { useNarutoStore } from "../store/useNarutoStore";

export default function CharactersPage() {
    const { eyeMode } = useEye();
    const isDark = eyeMode > 0;

    // 2. Ambil state dan action dari Zustand
    // Kita ambil 'characters', status loading spesifik, dan fungsi fetch-nya
    const { characters, loadingStates, getCharacters } = useNarutoStore();
    
    // State lokal hanya untuk UI yang sifatnya sementara (seperti Modal)
    const [selectedChar, setSelectedChar] = useState(null);
    
    // Ambil status loading khusus untuk endpoint characters
    const isLoading = loadingStates['characters'];

    // 3. Jalankan Action saat komponen pertama kali muncul
    useEffect(() => {
        getCharacters();
    }, [getCharacters]);

    return (
        <div className="flex flex-col gap-10">
            {/* Loading State: Menggunakan isLoading dari Zustand */}
            {isLoading && characters.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-32">
                    <div className={`w-12 h-12 border-4 rounded-full animate-spin mb-4 ${
                        isDark ? (eyeMode === 2 ? 'border-purple-600' : 'border-red-600') : 'border-orange-500'
                    } border-t-transparent`}></div>
                    <p className="text-stone-500 font-black tracking-widest uppercase text-xs animate-pulse">
                        Synchronizing Neural Archives...
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {characters.map((char) => (
                        <CharacterCard
                            key={char.id}
                            {...char}
                            // Logika pembersihan data tetap dipertahankan
                            clan={Array.isArray(char.personal?.affiliation) 
                                ? char.personal.affiliation[0] 
                                : char.personal?.affiliation || "Unknown"}
                            onClick={() => setSelectedChar(char)}
                        />
                    ))}
                </div>
            )}

            {/* Modal Detail */}
            <CharacterDetailModal
                character={selectedChar}
                isOpen={!!selectedChar}
                onClose={() => setSelectedChar(null)}
            />
        </div>
    );
}