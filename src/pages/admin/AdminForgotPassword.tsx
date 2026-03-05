import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function AdminForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/passwort-zuruecksetzen`,
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      setSent(true);
      toast.success('Reset-Link wurde gesendet');
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-xl border p-8 shadow-2xl">
          <div className="text-center mb-8">
            <img src="/images/nextphones-logo.png" alt="NextPhones" className="h-10 mx-auto mb-4" />
            <h1 className="text-2xl font-bold">Passwort vergessen</h1>
            <p className="text-muted-foreground text-sm mt-1">Wir senden dir einen Reset-Link</p>
          </div>

          {sent ? (
            <div className="text-center space-y-4">
              <p className="text-sm">Prüfe dein E-Mail Postfach für den Reset-Link.</p>
              <Link to="/admin/login">
                <Button variant="outline" className="w-full">Zurück zum Login</Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">E-Mail Adresse</Label>
                <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1" />
              </div>
              <Button type="submit" className="w-full bg-primary" disabled={loading}>
                {loading ? 'Senden...' : 'Reset-Link senden'}
              </Button>
              <Link to="/admin/login" className="block text-center text-sm text-primary hover:underline">
                Zurück zum Login
              </Link>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
