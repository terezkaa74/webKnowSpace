import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [adminProfile, setAdminProfile] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfiles(session.user.id);
      } else {
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      (async () => {
        setUser(session?.user ?? null);
        if (session?.user) {
          await fetchProfiles(session.user.id);
        } else {
          setAdminProfile(null);
          setUserProfile(null);
          setLoading(false);
        }
      })();
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfiles = async (userId) => {
    try {
      const [adminResult, userResult] = await Promise.all([
        supabase.from('admin_profiles').select('*').eq('id', userId).maybeSingle(),
        supabase.from('user_profiles').select('*').eq('id', userId).maybeSingle(),
      ]);

      if (!adminResult.error && adminResult.data) {
        setAdminProfile(adminResult.data);
        setUserProfile(null);
      } else if (!userResult.error && userResult.data) {
        setUserProfile(userResult.data);
        setAdminProfile(null);
      } else {
        setAdminProfile(null);
        setUserProfile(null);
      }
    } catch (error) {
      console.error('Error fetching profiles:', error);
      setAdminProfile(null);
      setUserProfile(null);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  };

  const signUp = async (email, password, fullName) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (!error && data.user) {
      const { error: profileError } = await supabase
        .from('admin_profiles')
        .insert({
          id: data.user.id,
          full_name: fullName,
          role: 'content_editor',
        });

      if (profileError) {
        console.error('Error creating admin profile:', profileError);
      }
    }

    return { data, error };
  };

  const signUpUser = async (email, password, fullName) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (!error && data.user) {
      const { error: profileError } = await supabase
        .from('user_profiles')
        .insert({
          id: data.user.id,
          full_name: fullName,
        });

      if (profileError) {
        console.error('Error creating user profile:', profileError);
        return { data, error: profileError };
      }
    }

    return { data, error };
  };

  const signInUser = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  const value = {
    user,
    adminProfile,
    userProfile,
    loading,
    signIn,
    signUp,
    signUpUser,
    signInUser,
    signOut,
    isAdmin: !!adminProfile,
    isSuperAdmin: adminProfile?.role === 'super_admin',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
