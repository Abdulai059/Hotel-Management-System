import { OrbitingCircles } from "@/components/ui/orbiting-circles";

export function OrbitingCirclesLogos() {
    return (
        <div className="relative flex h-[500px] w-full items-center justify-center overflow-hidden">
            <OrbitingCircles iconSize={120}>
                <img src="/aishahomes.png" alt="aishahomes" />
                <img src="/global-dreams.png" alt="Global Dream" />
            </OrbitingCircles>


            <div className="relative z-10 text-center">

                <h2 className="text-2xl font-bold text-teal-700">HOTEL</h2>
                <p className="text-teal-600 text-sm font-medium">Management Service</p>
            </div>

        </div>
    );
}
