import OverviewGrid from "../components/OverviewGrid";
import FeaturedCharacters from "../components/FeaturedCharacters";
import TopVillages from "../components/TopVillages";
import ConflictMonitor from "../components/ConflictMonitor"; // New
import TailedBeastStatus from "../components/TailedBeastStatus"; // New

export default function Dashboard() {
    return (
        <div className="flex flex-col gap-8">
            <section>
                <OverviewGrid />
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Kolom Kiri: Utama */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <FeaturedCharacters />
                    <ConflictMonitor />
                </div>

                {/* Kolom Kanan: Sidebar Dashboard */}
                <div className="flex flex-col gap-6">
                    <TopVillages />
                    <TailedBeastStatus />
                </div>
            </div>
        </div>
    );
}