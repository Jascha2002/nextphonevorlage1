import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Check, X } from 'lucide-react';
import { toast } from 'sonner';

const passwordRequirements = [
  { label: 'Minimum 12 Zeichen', test: (p: string) => p.length >= 12 },
  { label: 'Mindestens 1 Großbuchstabe', test: (p: string) => /[A-Z]/.test(p) },
  { label: 'Mindestens 1 Zahl', test: (p: string) => /[0-9]/.test(p) },
  { label: 'Mindestens 1 Sonderzeichen', test: (p: string) => /[^A-Za-z0-9]/.test(p) },
];

export default function AdminResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for recovery token in URL
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    if (!hashParams.get('type') || hashParams.get('type') !== 'recovery') {
      // Also check query params
      const searchParams = new URLSearchParams(window.location.search);
      if (!searchParams.get('type') || searchParams.get('type') !== 'recovery') {
        // Still allow the page to render for password change flows
      }
    }
  }, []);

  const allRequirementsMet = passwordRequirements.every(r => r.test(password));
  const passwordsMatch = password === confirmPassword && password.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!allRequirementsMet || !passwordsMatch) return;
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Passwort erfolgreich geändert');
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-xl border p-8 shadow-2xl">
          <div className="text-center mb-8">
            <img src="/images/nextphones-logo.png" alt="NextPhones" className="h-10 mx-auto mb-4" />
            <h1 className="text-2xl font-bold">Neues Passwort setzen</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="password">Neues Passwort</Label>
              <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required className="mt-1" />
              <div className="mt-2 space-y-1">
                {passwordRequirements.map((r, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    {r.test(password) ? <Check className="h-3 w-3 text-green-500" /> : <X className="h-3 w-3 text-muted-foreground" />}
                    <span className={r.test(password) ? 'text-green-500' : 'text-muted-foreground'}>{r.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="confirm">Passwort bestätigen</Label>
              <Input id="confirm" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required className="mt-1" />
            </div>

            <Button type="submit" className="w-full bg-primary" disabled={loading || !allRequirementsMet || !passwordsMatch}>
              {loading ? 'Speichern...' : 'Passwort ändern'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
