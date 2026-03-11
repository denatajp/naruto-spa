import { create } from 'zustand';

const BASE_URL = "https://dattebayo-api.onrender.com";

export const useNarutoStore = create((set, get) => ({
    // --- STATE ---
    characters: [],
    clans: [],
    villages: [],
    kekkeiGenkai: [],
    tailedBeasts: [],
    teams: [],
    akatsuki: [],
    kara: [],

    // UI States
    loadingStates: {}, // Menyimpan status loading per endpoint
    errors: {},        // Menyimpan error per endpoint

    // --- ACTIONS ---

    /**
     * Fungsi utama untuk mengambil data. 
     * @param {string} endpoint - Nama endpoint (misal: 'tailed-beasts')
     * @param {string} stateKey - Nama state di store (misal: 'tailedBeasts')
     */
    fetchCollection: async (endpoint, stateKey) => {
        // Hindari fetch ulang jika data sudah ada (Caching sederhana)
        if (get()[stateKey].length > 0) return;

        set((state) => ({
            loadingStates: { ...state.loadingStates, [stateKey]: true },
            errors: { ...state.errors, [stateKey]: null }
        }));

        try {
            const response = await fetch(`${BASE_URL}/${endpoint}`);
            if (!response.ok) throw new Error(`Failed to fetch ${endpoint}`);

            const data = await response.json();

            // API Dattebayo mengembalikan data dalam properti yang namanya mirip endpoint
            // Contoh: GET /akatsuki -> { akatsuki: [...] }
            // Contoh: GET /tailed-beasts -> { "tailed-beasts": [...] }
            const result = data[endpoint] || data.characters || data[stateKey] || [];

            set((state) => ({
                [stateKey]: result,
                loadingStates: { ...state.loadingStates, [stateKey]: false }
            }));
        } catch (err) {
            set((state) => ({
                loadingStates: { ...state.loadingStates, [stateKey]: false },
                errors: { ...state.errors, [stateKey]: err.message }
            }));
        }
    },

    // Helper Actions agar pemanggilan di komponen lebih bersih
    getCharacters: () => get().fetchCollection('characters', 'characters'),
    getClans: () => get().fetchCollection('clans', 'clans'),
    getVillages: () => get().fetchCollection('villages', 'villages'),
    getKekkeiGenkai: () => get().fetchCollection('kekkei-genkai', 'kekkeiGenkai'),
    getTailedBeasts: () => get().fetchCollection('tailed-beasts', 'tailedBeasts'),
    getTeams: () => get().fetchCollection('teams', 'teams'),
    getAkatsuki: () => get().fetchCollection('akatsuki', 'akatsuki'),
    getKara: () => get().fetchCollection('kara', 'kara'),
}));