import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User, Session } from '@supabase/supabase-js';

type AdminRole = 'super_admin' | 'redakteur' | 'betrachter';

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  is_active: boolean;
  must_change_password: boolean;
  photo_url: string | null;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  adminUser: AdminUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string, name: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  refreshAdminUser: () => Promise<void>;
  isSuperAdmin: boolean;
  isEditor: boolean;
  canEdit: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAdminUser = async (userId: string): Promise<AdminUser | null> => {
    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('id', userId)
      .eq('is_active', true)
      .maybeSingle();

    if (!data || error) {
      return null;
    }

    // Update last_login
    await supabase
      .from('admin_users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', userId);

    return data as AdminUser;
  };

  useEffect(() => {
    let initialLoadDone = false;

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, nextSession) => {
      setSession(nextSession);
      setUser(nextSession?.user ?? null);

      if (nextSession?.user) {
        const nextAdmin = await fetchAdminUser(nextSession.user.id);
        setAdminUser(nextAdmin);
      } else {
        setAdminUser(null);
      }

      if (!initialLoadDone) {
        initialLoadDone = true;
        setLoading(false);
      }
    });

    supabase.auth.getSession().then(async ({ data: { session: initialSession } }) => {
      setSession(initialSession);
      setUser(initialSession?.user ?? null);

      if (initialSession?.user) {
        const initialAdmin = await fetchAdminUser(initialSession.user.id);
        setAdminUser(initialAdmin);
      }

      initialLoadDone = true;
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };
    return { error: null };
  };

  const signUp = async (email: string, password: string, name: string) => {
    // Check whitelist first
    const { data: whitelisted } = await supabase.rpc('is_email_whitelisted', { _email: email });
    if (!whitelisted) {
      return { error: 'Diese E-Mail ist nicht berechtigt. Bitte kontaktiere den Administrator.' };
    }

    // Check if already registered
    const { data: existing } = await supabase.from('admin_users').select('id').eq('email', email).maybeSingle();
    if (existing) {
      return { error: 'Ein Account mit dieser E-Mail existiert bereits. Bitte melde dich an.' };
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name }, emailRedirectTo: window.location.origin + '/admin' }
    });
    if (error) return { error: error.message };
    return { error: null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setAdminUser(null);
  };

  const refreshAdminUser = async () => {
    if (user) await fetchAdminUser(user.id);
  };

  const isSuperAdmin = adminUser?.role === 'super_admin';
  const isEditor = adminUser?.role === 'redakteur' || isSuperAdmin;
  const canEdit = adminUser?.role !== 'betrachter';

  return (
    <AuthContext.Provider value={{
      user, session, adminUser, loading,
      signIn, signUp, signOut, refreshAdminUser,
      isSuperAdmin, isEditor, canEdit
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
