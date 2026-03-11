import { useEffect } from "react";
import OverviewPanel from "./OverviewPanel";
// 1. Import Store
import { useNarutoStore } from "../store/useNarutoStore";

export default function OverviewGrid() {
    // 2. Ambil data, status loading, dan fungsi fetch dari Zustand
    const {
        characters, clans, villages, kekkeiGenkai,
        tailedBeasts, akatsuki, kara, teams,
        loadingStates,
        getCharacters, getClans, getVillages, getKekkeiGenkai,
        getTailedBeasts, getAkatsuki, getKara, getTeams
    } = useNarutoStore();

    // 3. Jalankan semua fetch saat dashboard dibuka
    // Store sudah diproteksi agar tidak fetch ulang jika data sudah ada
    useEffect(() => {
        getCharacters();
        getClans();
        getVillages();
        getKekkeiGenkai();
        getTailedBeasts();
        getAkatsuki();
        getKara();
        getTeams();
    }, [
        getCharacters, getClans, getVillages, getKekkeiGenkai,
        getTailedBeasts, getAkatsuki, getKara, getTeams
    ]);

    // Mengecek apakah ada salah satu yang masih loading untuk animasi UI
    const isAnyLoading = Object.values(loadingStates).some(state => state === true);

    // Konfigurasi stats menggunakan data dari Zustand
    // .length digunakan karena data di store berupa array hasil fetch
    const statsConfig = [
        { title: "Characters", value: characters.length || "0", kanji: "忍" },
        { title: "Clans", value: clans.length || "0", kanji: "家" },
        { title: "Villages", value: villages.length || "0", kanji: "里" },
        { title: "Kekkei Genkai", value: kekkeiGenkai.length || "0", kanji: "血" },
        { title: "Tailed Beasts", value: tailedBeasts.length || "0", kanji: "尾" },
        { title: "Akatsuki", value: akatsuki.length || "0", kanji: "暁" },
        { title: "Kara", value: kara.length || "0", kanji: "殻" },
        { title: "Teams", value: teams.length || "0", kanji: "班" },
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {statsConfig.map((stat, i) => (
                <OverviewPanel
                    key={i}
                    title={stat.title}
                    value={isAnyLoading && stat.value === 0 ? "—" : stat.value}
                    kanji={stat.kanji}
                    isLoading={loadingStates[stat.title.toLowerCase().replace(" ", "")] || false}
                />
            ))}
        </div>
    );
}