import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Check, X } from 'lucide-react';
import { toast } from 'sonner';

const passwordRequirements = [
  { label: 'Minimum 12 Zeichen', test: (p: string) => p.length >= 12 },
  { label: 'Mindestens 1 Großbuchstabe', test: (p: string) => /[A-Z]/.test(p) },
  { label: 'Mindestens 1 Zahl', test: (p: string) => /[0-9]/.test(p) },
  { label: 'Mindestens 1 Sonderzeichen', test: (p: string) => /[^A-Za-z0-9]/.test(p) },
];

export default function AdminRegister() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const allRequirementsMet = passwordRequirements.every(r => r.test(password));
  const passwordsMatch = password === confirmPassword && password.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!allRequirementsMet) {
      toast.error('Passwort erfüllt nicht alle Anforderungen');
      return;
    }
    if (!passwordsMatch) {
      toast.error('Passwörter stimmen nicht überein');
      return;
    }
    setLoading(true);
    const { error } = await signUp(email, password, name);
    setLoading(false);
    if (error) {
      toast.error(error);
    } else {
      toast.success(`Willkommen bei NextPhones, ${name}!`);
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-xl border p-8 shadow-2xl">
          <div className="text-center mb-8">
            <img src="/images/nextphones-logo.png" alt="NextPhones" className="h-10 mx-auto mb-4" />
            <h1 className="text-2xl font-bold">Registrieren</h1>
            <p className="text-muted-foreground text-sm mt-1">Erstelle deinen Admin-Account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Vollständiger Name</Label>
              <Input id="name" value={name} onChange={e => setName(e.target.value)} placeholder="Max Mustermann" required className="mt-1" />
            </div>

            <div>
              <Label htmlFor="email">E-Mail Adresse</Label>
              <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@nextphones.de" required className="mt-1" />
            </div>

            <div>
              <Label htmlFor="password">Passwort</Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
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
              <div className="relative mt-1">
                <Input
                  id="confirm"
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {confirmPassword && !passwordsMatch && <p className="text-xs text-destructive mt-1">Passwörter stimmen nicht überein</p>}
            </div>

            <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={loading || !allRequirementsMet || !passwordsMatch}>
              {loading ? 'Registrieren...' : 'Registrieren'}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Bereits registriert?{' '}
            <Link to="/admin/login" className="text-primary hover:underline">Anmelden</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
