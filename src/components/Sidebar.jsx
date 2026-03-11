import SidebarItem from "./SidebarItem";
import { useEye } from "../context/EyeContext";

const ITEMS = [
    "Dashboard",
    "Characters",
    "Clans",
    "Tailed Beasts",
    "Akatsuki",
];

export default function Sidebar({ logo }) {
    const { eyeMode } = useEye();
    const isDark = eyeMode > 0;
    
    const themeClasses = {
        // Mode 0: Normal - Clean look
        0: "bg-white/60 border-orange-100/50 shadow-[0_8px_32px_rgba(251,146,60,0.05)]", 
        
        // Mode 1: Sharingan - Deep Black Shadow agar tidak foggy
        1: "bg-stone-900/80 border-2 border-red-600/50 shadow-[0_20px_50px_rgba(0,0,0,0.8)]", 
        
        // Mode 2: Mangekyou - Solid & Dark
        2: "bg-black/90 border-2 border-purple-600/60 shadow-[0_25px_60px_rgba(0,0,0,1)]", 
    };

    return (
        <aside
            className={`
                w-72
                backdrop-blur-xl
                border
                rounded-[2.5rem]
                flex flex-col
                sticky top-4
                h-[calc(100vh-2rem)]
                m-4
                transition-all duration-700 ease-in-out
                ${themeClasses[eyeMode]}
            `}
        >
            {/* Logo Section */}
            <div className="px-8 py-10 flex justify-center relative">
                <img 
                    src={logo} 
                    alt="Naruto logo" 
                    className={`
                        h-16 w-auto relative z-10 transition-all duration-700 
                        ${isDark 
                            ? 'drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]' // Logo tetap berwarna, hanya dikasih glow tipis
                            : 'drop-shadow-sm'
                        }
                    `} 
                />
                
                {/* Cahaya di belakang logo */}
                <div className={`
                    absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full blur-3xl transition-all duration-700
                    ${eyeMode === 2 ? 'bg-purple-900/30' : eyeMode === 1 ? 'bg-red-900/30' : 'bg-orange-100/20'}
                `} />
            </div>

            {/* Navigation Section */}
            <nav className="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar">
                {ITEMS.map((label) => (
                    <SidebarItem key={label} label={label} />
                ))}
            </nav>

            {/* Footer Aksen */}
            <div className="p-8">
                <div className={`
                    rounded-2xl p-4 border-2 transition-all duration-700
                    ${eyeMode === 2 ? 'bg-purple-950/20 border-purple-600/40' : 
                      eyeMode === 1 ? 'bg-red-950/20 border-red-500/40' : 
                      'bg-orange-50/50 border-orange-100/50'}
                `}>
                    <p className={`text-[9px] font-black uppercase tracking-[0.2em] mb-1 transition-colors duration-700 ${isDark ? 'text-red-500' : 'text-orange-400'}`}>
                        {eyeMode === 2 ? "Rinnesharingan Mode" : eyeMode === 1 ? "Sharingan Activated" : "Jean Paul Denata"}
                    </p>
                    <p className={`text-[10px] italic font-medium leading-tight transition-colors duration-700 ${isDark ? 'text-stone-500' : 'text-stone-400'}`}>
                        {eyeMode !== 0 ? "Visual Prowess Active" : "React Vite Project"}
                    </p>
                </div>
            </div>
        </aside>
    );
}