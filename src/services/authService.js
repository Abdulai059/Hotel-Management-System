import supabase from "@/services/supabase";

export const authService = {
  async fetchProfile(userId) {
    const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).maybeSingle();

    if (error && error.code === "PGRST116") {
      return null; // Profile doesn't exist
    }

    if (error) throw error;
    return data;
  },

  async createProfile(userId, email) {
    let userRole = "frontdesk";
    if (email && (email.endsWith("@admin.com") || email.includes("admin"))) {
      userRole = "admin";
    }

    const { data, error } = await supabase
      .from("profiles")
      .insert([{ id: userId, email, role: userRole }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getCurrentSession() {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  },

  async signUp(email, password) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { email } },
    });
    return { data, error };
  },

  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  },

  async signOut() {
    const { error } = await supabase.auth.signOut();
    return { error };
  },
};
