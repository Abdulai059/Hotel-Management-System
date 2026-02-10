import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/services/authService";

export const authKeys = {
  session: ["session"],
  profile: (userId) => ["profile", userId],
};

export function useSession() {
  return useQuery({
    queryKey: authKeys.session,
    queryFn: authService.getCurrentSession,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
}

export function useProfile(userId) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: authKeys.profile(userId),
    queryFn: async () => {
      const profile = await authService.fetchProfile(userId);

      // If profile doesn't exist, create it
      if (!profile) {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        return await authService.createProfile(userId, user?.email);
      }

      return profile;
    },
    enabled: !!userId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useSignIn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, password }) => authService.signIn(email, password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.session });
    },
  });
}

export function useSignUp() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, password }) => authService.signUp(email, password),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.session });
    },
  });
}

export function useSignOut() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authService.signOut,
    onSuccess: () => {
      queryClient.clear(); // Clear all queries on sign out
    },
  });
}
