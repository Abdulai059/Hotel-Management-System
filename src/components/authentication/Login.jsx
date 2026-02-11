import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSignIn } from "./useAuthQueries";
import LogInImageSlider from "../ui/LogInImageSlider";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const signInMutation = useSignIn();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInMutation.mutateAsync({ email, password });
    } catch (error) {
      console.error("Authentication error:", error);
    }
  };

  const isLoading = signInMutation.isPending;
  const error = signInMutation.error;

  return (
    <div className="relative flex min-h-screen items-center justify-center">
      <div className="absolute inset-0 flex">
        <div className="w-1/2 bg-[#e3fdff]"></div>
        <div className="w-1/2 bg-white"></div>
      </div>

      <div className="relative z-10 flex h-[75vh] w-full max-w-7xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="hidden w-1/2 md:block">
          <img className="h-full w-[500px] object-cover" src="/globaldr2.jpg" alt="Login background" />
        </div>

        <div className="flex w-full flex-col items-center justify-center bg-white p-8 md:w-1/2">
          <div className="w-full max-w-sm">
            <h2 className="text-4xl font-medium text-gray-900">Sign in</h2>
            <p className="mt-3 text-sm text-gray-500/90">Welcome back! Please sign in to continue</p>

            {error && (
              <div className="mt-4 rounded-lg border border-red-300 bg-red-50 p-3 text-center text-sm text-red-800">
                {error.message}
              </div>
            )}

            <button
              type="button"
              className="mt-8 flex h-12 w-full items-center justify-center rounded-full bg-gray-500/10 transition-colors hover:bg-gray-500/20"
            >
              <img
                src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg"
                alt="Google logo"
              />
            </button>

            <div className="my-5 flex w-full items-center gap-4">
              <div className="h-px w-full bg-gray-300/90"></div>
              <p className="w-full text-sm text-nowrap text-gray-500/90">or sign in with email</p>
              <div className="h-px w-full bg-gray-300/90"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex h-12 w-full items-center gap-2 overflow-hidden rounded-full border border-gray-300/60 bg-transparent pl-6">
                <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z"
                    fill="#6B7280"
                  />
                </svg>
                <input
                  type="email"
                  placeholder="Email id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="h-full w-full bg-transparent text-sm text-gray-500/80 placeholder-gray-500/80 outline-none disabled:opacity-60"
                  required
                />
              </div>

              <div className="flex h-12 w-full items-center gap-2 overflow-hidden rounded-full border border-gray-300/60 bg-transparent pl-6">
                <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
                    fill="#6B7280"
                  />
                </svg>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="h-full w-full bg-transparent text-sm text-gray-500/80 placeholder-gray-500/80 outline-none disabled:opacity-60"
                  required
                  minLength={6}
                />
              </div>

              <div className="flex w-full items-center justify-between text-gray-500/80">
                <div className="flex items-center gap-2">
                  <input
                    className="h-5 cursor-pointer"
                    type="checkbox"
                    id="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label className="cursor-pointer text-sm" htmlFor="checkbox">
                    Remember me
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="h-11 w-full rounded-full bg-indigo-500 text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    Please wait...
                    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  </span>
                ) : (
                  "Login"
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-500/90">
              Don't have an account?{" "}
              <a className="text-indigo-400 hover:underline" href="#">
                Contact Admin
              </a>
            </p>
          </div>

          <p className="mt-8 text-center text-sm text-gray-400">
            Engineered by <span className="font-semibold text-black">Zesung</span>
          </p>
        </div>
      </div>
    </div>
  );
}
