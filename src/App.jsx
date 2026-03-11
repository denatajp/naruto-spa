// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import logo from "./assets/logo.svg";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import CharactersPage from "./pages/CharactersPage";
import ClansPage from "./pages/ClanPages";
import TailedBeastsPage from "./pages/TailedBeastsPage";
import AkatsukiPage from "./pages/AkatsukiPages";

// 1. Import Provider dan Hook
import { EyeProvider, useEye } from "./context/EyeContext";

function AppContent() {
  const { eyeMode } = useEye();

  // 2. Tentukan class pembungkus berdasarkan mode
  const getThemeClass = () => {
    if (eyeMode === 1) return "bg-stone-950 text-white"; // Sharingan
    if (eyeMode === 2) return "bg-black text-white";     // Mangekyou
    return "bg-[#f8f6f2]"; // Normal (Washi Paper)
  };

  return (
    <div className={`min-h-screen p-6 flex gap-6 transition-all duration-700 ease-in-out ${getThemeClass()}`}>
      <Sidebar logo={logo} />
      <div className="flex-1 flex flex-col gap-6">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/characters" element={<CharactersPage />} />
            <Route path="/clans" element={<ClansPage />} />
            <Route path="/tailed-beasts" element={<TailedBeastsPage />} />
            <Route path="/akatsuki" element={<AkatsukiPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <EyeProvider>
      <Router>
        <AppContent />
      </Router>
    </EyeProvider>
  );
}