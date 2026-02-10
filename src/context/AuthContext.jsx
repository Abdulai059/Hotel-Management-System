import supabase from "@/services/supabase";
import { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorageState } from "@/hooks/useLocalStorageState";
import { useProfile } from "@/components/authentication/useAuthQueries";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [preferences, setPreferences] = useLocalStorageState(
    {
      theme: "light",
      language: "en",
      lastVisitedPage: "/dashboard",
      rememberMe: false,
    },
    "userPreferences",
  );

  const [sessionInfo, setSessionInfo] = useLocalStorageState(null, "sessionInfo");

  // Fetch profile using React Query
  const { data: profile, isLoading: profileLoading } = useProfile(user?.id);

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session?.user) {
          setUser(session.user);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
      } finally {
        setAuthLoading(false);
      }
    };

    initAuth();

    // Listen to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser(session.user);
        setSessionInfo({
          userId: session.user.id,
          email: session.user.email,
          lastLogin: new Date().toISOString(),
        });
      } else {
        setUser(null);
        setSessionInfo(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const value = {
    user,
    profile,
    loading: authLoading || profileLoading,
    preferences,
    setPreferences,
    sessionInfo,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
