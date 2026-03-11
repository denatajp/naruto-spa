import React, { useState, useEffect } from "react";
import AkatsukiCard from "../components/AkatsukiCard";
import AkatsukiDetailModal from "../components/AkatsukiDetailModal";

export default function AkatsukiPage() {
    const [akatsukiMembers, setAkatsukiMembers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedMember, setSelectedMember] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    // Ambil data dari API menggunakan fetch
    useEffect(() => {
        const fetchMembers = async () => {
            try {
                setIsLoading(true);
                const response = await fetch("https://dattebayo-api.onrender.com/akatsuki");
                const data = await response.json();
                
                // Berdasarkan JSON, data utama ada di properti 'akatsuki'
                setAkatsukiMembers(data.akatsuki || []);
            } catch (error) {
                console.error("Error fetching Akatsuki data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMembers();
    }, []);

    const filteredMembers = akatsukiMembers.filter(m =>
        m.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="relative min-h-screen">
            <div className="flex flex-col gap-10 animate-in fade-in duration-1000 pb-20">

                {/* --- HEADER EDITORIAL --- */}
                <div className="relative p-12 bg-stone-950 rounded-[3.5rem] overflow-hidden border border-red-900/30 shadow-[0_20px_50px_rgba(0,0,0,0.4)] group">
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-red-600/10 blur-[120px] rounded-full group-hover:bg-red-600/20 transition-all duration-1000" />

                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
                        <div>
                            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                                <span className="w-12 h-[1px] bg-red-600" />
                                <span className="text-red-500 font-black text-[10px] uppercase tracking-[0.5em]">Class S Criminals</span>
                            </div>
                            <h1 className="jp-title text-6xl md:text-8xl text-white tracking-tighter">
                                Akatsuki <span className="text-red-600">暁</span>
                            </h1>
                        </div>

                        {/* Search Box */}
                        <div className="w-full md:w-80 relative group">
                            <input
                                type="text"
                                placeholder="Identify member..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-stone-900 border border-stone-800 rounded-2xl px-6 py-4 text-white text-sm focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-all placeholder:text-stone-600"
                            />
                            <span className="absolute right-5 top-4 opacity-30">🔍</span>
                        </div>
                    </div>
                </div>

                {/* --- GRID MEMBERS / LOADING STATE --- */}
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-24">
                        <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                        <p className="text-stone-500 font-bold tracking-widest uppercase text-xs">Accessing Bingo Book...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                        {filteredMembers.map((member) => (
                            <AkatsukiCard
                                key={member.id}
                                {...member}
                                onClick={() => setSelectedMember(member)}
                            />
                        ))}
                    </div>
                )}

                {!isLoading && filteredMembers.length === 0 && (
                    <div className="text-center py-24 bg-stone-900/50 rounded-[3rem] border border-dashed border-stone-800">
                        <p className="text-stone-500 jp-title text-xl tracking-widest opacity-50">Member not found in Bingo Book</p>
                    </div>
                )}
            </div>

            <AkatsukiDetailModal
                data={selectedMember}
                isOpen={!!selectedMember}
                onClose={() => setSelectedMember(null)}
            />
        </div>
    );
}