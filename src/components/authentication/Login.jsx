import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router";
import { OrbitingCirclesLogos } from "../ui/orbiting-logos";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (email && password) {
            localStorage.setItem("isAuthenticated", "true");
            navigate("/dashboard");
        }
    };

    return (
        <div className="flex min-h-screen">

            <div className="relative w-1/2 flex flex-col items-center justify-center px-12">
                <div className="w-full max-w-md bg-white rounded-sm shadow-sm p-8">
                    <div className="mb-8 text-center">
                        <h1 className="text-5xl font-bold text-teal-600">HOTEL</h1>
                        <p className="text-gray-500">Management Service</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="example@gmail.com"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((s) => !s)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="w-4 h-4 text-teal-600 rounded"
                                />
                                <span className="text-gray-600">Remember me</span>
                            </label>
                            <a className="text-teal-600 font-medium cursor-pointer">
                                Forgot Password?
                            </a>
                        </div>

                        <button className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-lg shadow transition">
                            Login
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <button className="text-sm text-teal-600 font-medium hover:underline">
                            Create Account
                        </button>
                    </div>
                </div>

                <p className="mt-8 text-sm translate-y-20 text-gray-400">
                    Developed by <span className="text-black font-semibold">Zesung</span>
                </p>
            </div>


            <div className="relative w-1/2 flex items-center justify-center bg-[#e3fdff]">
                <OrbitingCirclesLogos />
            </div>
        </div>
    );
}
