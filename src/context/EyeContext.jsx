import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const EyeContext = createContext();

export const EyeProvider = ({ children }) => {
    const [eyeMode, setEyeMode] = useState(0);
    const [isGenjutsuActive, setIsGenjutsuActive] = useState(false);

    // Menggunakan useRef agar audio object tetap konsisten
    const audioSharingan = useRef(null);
    const audioRinnegan = useRef(null);
    const audioDeactivate = useRef(null);

    useEffect(() => {
        // Inisialisasi audio di dalam useEffect (Client Side)
        audioSharingan.current = new Audio("/sounds/sharingan1.mp3");
        audioRinnegan.current = new Audio("/sounds/rinnegan2.mp3");
        audioDeactivate.current = new Audio("/sounds/deactivate.mp3");

        // Pre-load dan setting volume
        [audioSharingan, audioRinnegan, audioDeactivate].forEach(audio => {
            if (audio.current) {
                audio.current.load();
                audio.current.volume = 0.5;
            }
        });
    }, []);

    const toggleEye = () => {
        // 1. Tentukan mode berikutnya dulu
        const nextMode = (eyeMode + 1) % 3;

        // 2. SOUND FIRST: Panggil audio sebelum melakukan update state yang berat
        let soundToPlay = null;
        if (nextMode === 1) soundToPlay = audioSharingan.current;
        else if (nextMode === 2) soundToPlay = audioRinnegan.current;
        else soundToPlay = audioDeactivate.current;

        if (soundToPlay) {
            // Reset posisi ke 0 agar bisa di-spam kliknya tanpa nunggu selesai
            soundToPlay.pause(); 
            soundToPlay.currentTime = 0;
            
            // Gunakan catch untuk menghindari error jika interaksi user belum divalidasi browser
            soundToPlay.play().catch(e => console.warn("Audio play blocked by browser:", e));
        }

        // 3. VISUAL GENJUTSU (State Update)
        setIsGenjutsuActive(true);
        setEyeMode(nextMode);

        // Timer untuk menghilangkan overlay
        setTimeout(() => setIsGenjutsuActive(false), 1200);
    };

    useEffect(() => {
        const body = document.body;
        body.classList.remove('mode-normal', 'mode-sharingan', 'mode-mangekyou');
        
        const classes = ['mode-normal', 'mode-sharingan', 'mode-mangekyou'];
        body.classList.add(classes[eyeMode]);
    }, [eyeMode]);

    return (
        <EyeContext.Provider value={{ eyeMode, toggleEye }}>
            {/* GENJUTSU OVERLAY LAYER */}
            <div className={`
                fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center transition-all duration-700
                ${isGenjutsuActive ? 'opacity-100' : 'opacity-0'}
            `}>
                <div className={`absolute inset-0 bg-radial-gradient from-transparent to-black/60 transition-opacity duration-1000 ${isGenjutsuActive ? 'opacity-100' : 'opacity-0'}`} />

                <div className={`
                    relative w-full h-full flex items-center justify-center transition-all duration-[1200ms] ease-in-out
                    ${isGenjutsuActive ? 'scale-[2] rotate-12 opacity-40' : 'scale-50 rotate-0 opacity-0'}
                `}>
                    {/* Menggunakan eyeMode yang sedang aktif untuk visual */}
                    {eyeMode === 1 && (
                        <img 
                            src="/images/sharingan.png" 
                            className="w-[80%] max-w-[800px] object-contain filter drop-shadow-[0_0_50px_rgba(220,38,38,0.5)]"
                            alt="Sharingan"
                        />
                    )}
                    {eyeMode === 2 && (
                        <img 
                            src="/images/rinnegan.png" 
                            className="w-[80%] max-w-[800px] object-contain filter drop-shadow-[0_0_50px_rgba(147,51,234,0.5)]"
                            alt="Rinnegan"
                        />
                    )}
                </div>
            </div>

            {children}
        </EyeContext.Provider>
    );
};

export const useEye = () => useContext(EyeContext);