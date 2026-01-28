import Navbar from "../components/Shared/Navbar";
import Modules from "./Modules";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Modules />
        </div>
    )
}
