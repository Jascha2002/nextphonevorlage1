import { createContext, useContext, useEffect, useState, useRef, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User, Session } from '@supabase/supabase-js';

function checkIsDemoMode(): boolean {
  if (typeof window === 'undefined') return false;
  const urlParam = new URLSearchParams(window.location.search).get('demo') === 'true';
  const stored = sessionStorage.getItem('np_demo') === 'true';
  return urlParam || stored;
}

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
  const skipNextAuthChange = useRef(false);

  const fetchAdminUser = async (userId: string): Promise<AdminUser | null> => {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('id', userId)
        .eq('is_active', true)
        .maybeSingle();

      if (!data || error) {
        return null;
      }

      // Update last_login (fire and forget)
      supabase
        .from('admin_users')
        .update({ last_login: new Date().toISOString() })
        .eq('id', userId)
        .then(() => {});

      return data as AdminUser;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      // If signIn handled everything, skip this callback
      if (skipNextAuthChange.current) {
        skipNextAuthChange.current = false;
        return;
      }

      setSession(nextSession);
      setUser(nextSession?.user ?? null);

      if (nextSession?.user) {
        // Use setTimeout to avoid blocking the auth flow
        setTimeout(async () => {
          const admin = await fetchAdminUser(nextSession.user.id);
          setAdminUser(admin);
        }, 0);
      } else {
        setAdminUser(null);
      }
    });

    // Get initial session
    supabase.auth.getSession().then(async ({ data: { session: initialSession } }) => {
      setSession(initialSession);
      setUser(initialSession?.user ?? null);

      if (initialSession?.user) {
        const admin = await fetchAdminUser(initialSession.user.id);
        setAdminUser(admin);
      }

      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    // Tell onAuthStateChange to skip — we handle everything here
    skipNextAuthChange.current = true;

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      skipNextAuthChange.current = false;
      return { error: error.message };
    }

    const userId = data.user?.id;
    if (!userId) {
      skipNextAuthChange.current = false;
      return { error: 'Anmeldung fehlgeschlagen.' };
    }

    // Set auth state immediately
    setSession(data.session);
    setUser(data.user);

    // Now fetch admin user (no race condition since onAuthStateChange is skipped)
    const admin = await fetchAdminUser(userId);
    if (!admin) {
      await supabase.auth.signOut();
      setSession(null);
      setUser(null);
      setAdminUser(null);
      return { error: 'Kein aktiver Admin-Zugang für diese E-Mail gefunden.' };
    }

    setAdminUser(admin);
    return { error: null };
  };

  const signUp = async (email: string, password: string, name: string) => {
    const { data: whitelisted } = await supabase.rpc('is_email_whitelisted', { _email: email });
    if (!whitelisted) {
      return { error: 'Diese E-Mail ist nicht berechtigt. Bitte kontaktiere den Administrator.' };
    }

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
    setUser(null);
    setSession(null);
  };

  const refreshAdminUser = async () => {
    if (user) {
      const admin = await fetchAdminUser(user.id);
      setAdminUser(admin);
    }
  };

  const isDemoActive = checkIsDemoMode();

  const effectiveAdminUser = isDemoActive && !adminUser
    ? {
        id: 'demo',
        email: 'demo@deutlicht.de',
        name: 'Demo-Ansicht',
        role: 'betrachter' as AdminRole,
        is_active: true,
        must_change_password: false,
        photo_url: null,
      }
    : adminUser;

  const isSuperAdmin = effectiveAdminUser?.role === 'super_admin';
  const isEditor = effectiveAdminUser?.role === 'redakteur' || isSuperAdmin;
  const canEdit = isDemoActive ? false : effectiveAdminUser?.role !== 'betrachter';

  return (
    <AuthContext.Provider value={{
      user: isDemoActive ? ({ id: 'demo' } as any) : user,
      session,
      adminUser: effectiveAdminUser,
      loading,
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
