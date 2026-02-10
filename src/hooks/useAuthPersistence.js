import { useLocalStorageState } from "./useLocalStorageState";
import { useAuth } from "@/context/AuthContext";

/**
 * Hook to persist user authentication state in localStorage
 * Useful for maintaining login state across browser sessions
 */
export function useAuthPersistence() {
  const { user, profile, loading } = useAuth();
  
  // Store user session info in localStorage
  const [sessionData, setSessionData] = useLocalStorageState(null, "userSession");
  
  // Store user preferences
  const [preferences, setPreferences] = useLocalStorageState({
    theme: "light",
    language: "en",
    lastVisitedPage: "/dashboard"
  }, "userPreferences");

  // Update session data when auth state changes
  const updateSessionData = () => {
    if (user && profile) {
      setSessionData({
        userId: user.id,
        email: user.email,
        role: profile.role,
        lastLogin: new Date().toISOString()
      });
    } else {
      setSessionData(null);
    }
  };

  // Clear all stored data
  const clearStoredData = () => {
    setSessionData(null);
    setPreferences({
      theme: "light",
      language: "en",
      lastVisitedPage: "/dashboard"
    });
  };

  return {
    sessionData,
    preferences,
    setPreferences,
    updateSessionData,
    clearStoredData
  };
}
