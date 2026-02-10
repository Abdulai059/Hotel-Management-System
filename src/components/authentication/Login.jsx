import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSignIn, useSignUp } from "./useAuthQueries";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  // React Query mutations
  const signInMutation = useSignIn();
  const signUpMutation = useSignUp();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isSignUp) {
        const result = await signUpMutation.mutateAsync({ email, password });
        if (result.error) {
          // Error is handled by mutation error state
        } else {
          alert("Please check your email to confirm your account!");
          setEmail("");
          setPassword("");
        }
      } else {
        await signInMutation.mutateAsync({ email, password });
        // Navigation happens automatically via useEffect when user state updates
      }
    } catch (error) {
      // Error is already captured in mutation state
      console.error("Authentication error:", error);
    }
  };

  const currentMutation = isSignUp ? signUpMutation : signInMutation;
  const isLoading = currentMutation.isPending;
  const error = currentMutation.error?.message || currentMutation.error;

  return (
    <div className="flex min-h-screen">
      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
      <div className="relative flex w-1/2 flex-col items-center justify-center px-12">
        <div className="w-full max-w-md rounded-sm bg-white p-8 shadow-sm">
          <div className="mb-8 text-center">
            <h1 className="text-5xl font-bold text-teal-600">HOTEL</h1>
            <p className="text-gray-500">Management Service</p>
          </div>

          <div
            style={{
              maxWidth: "400px",
              margin: "100px auto",
              padding: "20px",
              border: "1px solid #ddd",
              borderRadius: "8px",
            }}
          >
            <h2 style={{ textAlign: "center" }}>{isSignUp ? "Sign Up" : "Login"}</h2>

            {error && (
              <div
                style={{
                  padding: "10px",
                  background: "#ffebee",
                  color: "#c62828",
                  borderRadius: "4px",
                  marginBottom: "15px",
                }}
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>Email:</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    opacity: isLoading ? 0.6 : 1,
                  }}
                />
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", marginBottom: "5px" }}>Password:</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  disabled={isLoading}
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                    opacity: isLoading ? 0.6 : 1,
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: isLoading ? "not-allowed" : "pointer",
                  fontSize: "16px",
                  opacity: isLoading ? 0.7 : 1,
                }}
              >
                {isLoading ? "Please wait..." : isSignUp ? "Sign Up" : "Login"}
                {isLoading && (
                  <span
                    style={{
                      marginLeft: "8px",
                      display: "inline-block",
                      width: "12px",
                      height: "12px",
                      border: "2px solid #ffffff",
                      borderRadius: "50%",
                      borderTopColor: "transparent",
                      animation: "spin 1s ease-in-out infinite",
                    }}
                  />
                )}
              </button>
            </form>

            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                // Reset mutation states when switching
                signInMutation.reset();
                signUpMutation.reset();
              }}
              disabled={isLoading}
              style={{
                marginTop: "15px",
                width: "100%",
                background: "none",
                border: "none",
                color: "#2196F3",
                cursor: isLoading ? "not-allowed" : "pointer",
                textDecoration: "underline",
                opacity: isLoading ? 0.6 : 1,
              }}
            >
              {isSignUp ? "Already have an account? Login" : "Need an account? Sign Up"}
            </button>
          </div>
        </div>

        <p className="mt-8 translate-y-20 text-sm text-gray-400">
          Developed by <span className="font-semibold text-black">Zesung</span>
        </p>
      </div>

      <div className="relative flex w-1/2 items-center justify-center bg-[#e3fdff]" />
    </div>
  );
}
