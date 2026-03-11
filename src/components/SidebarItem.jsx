import { Link, useLocation } from "react-router-dom";
// 1. Import hook context
import { useEye } from "../context/EyeContext";

export default function SidebarItem({ label }) {
    const location = useLocation();
    // 2. Ambil state eyeMode
    const { eyeMode } = useEye();
    
    const path = label === "Dashboard" ? "/" : `/${label.toLowerCase().replace(/\s+/g, '-')}`;
    const isActive = location.pathname === path;

    // 3. Konfigurasi styling berdasarkan mode mata
    const themeStyles = {
        0: { // Normal (Orange)
            active: "bg-stone-900 text-white shadow-lg shadow-stone-200",
            inactive: "text-stone-500 hover:bg-orange-50 hover:text-orange-600",
            dot: "bg-orange-500 shadow-[0_0_8px_rgba(251,146,60,1)]"
        },
        1: { // Sharingan (Red)
            active: "bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.4)]",
            inactive: "text-stone-400 hover:bg-red-950/30 hover:text-red-500",
            dot: "bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
        },
        2: { // Mangekyou (Purple)
            active: "bg-purple-600 text-white shadow-[0_0_20px_rgba(147,51,234,0.4)]",
            inactive: "text-stone-400 hover:bg-purple-950/30 hover:text-purple-400",
            dot: "bg-white shadow-[0_0_10px_rgba(255,255,255,1)]"
        }
    };

    const currentTheme = themeStyles[eyeMode];

    return (
        <Link
            to={path}
            className={`
                group flex items-center px-6 py-4 rounded-2xl transition-all duration-300
                ${isActive ? currentTheme.active : currentTheme.inactive}
            `}
        >
            <span className={`
                font-sans text-xs font-bold uppercase tracking-[0.15em] transition-colors duration-300
                ${isActive ? "opacity-100" : "opacity-70 group-hover:opacity-100"}
            `}>
                {label}
            </span>
            
            {/* Indikator Aktif */}
            {isActive && (
                <span className={`ml-auto w-1.5 h-1.5 rounded-full animate-pulse transition-all duration-300 ${currentTheme.dot}`} />
            )}
        </Link>
    );
}