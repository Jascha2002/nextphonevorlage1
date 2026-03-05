import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Trash2, Shield, Users, ClipboardList, Download, Eye, EyeOff, Check, X } from 'lucide-react';
import { toast } from 'sonner';

const passwordRequirements = [
  { label: 'Minimum 12 Zeichen', test: (p: string) => p.length >= 12 },
  { label: 'Mindestens 1 Großbuchstabe', test: (p: string) => /[A-Z]/.test(p) },
  { label: 'Mindestens 1 Zahl', test: (p: string) => /[0-9]/.test(p) },
  { label: 'Mindestens 1 Sonderzeichen', test: (p: string) => /[^A-Za-z0-9]/.test(p) },
];

export default function AdminEinstellungen() {
  const { adminUser, isSuperAdmin, refreshAdminUser } = useAuth();
  const queryClient = useQueryClient();
  const [newPassword, setNewPassword] = useState('');
  const [whitelistEmail, setWhitelistEmail] = useState('');
  const [whitelistNote, setWhitelistNote] = useState('');

  const { data: whitelist = [] } = useQuery({
    queryKey: ['admin-whitelist'],
    enabled: isSuperAdmin,
    queryFn: async () => {
      const { data } = await supabase.from('email_whitelist').select('*').order('added_at', { ascending: false });
      return data || [];
    },
  });

  const { data: admins = [] } = useQuery({
    queryKey: ['admin-users-list'],
    enabled: isSuperAdmin,
    queryFn: async () => {
      const { data } = await supabase.from('admin_users').select('*').order('created_at');
      return data || [];
    },
  });

  const { data: activityLog = [] } = useQuery({
    queryKey: ['admin-activity-log'],
    enabled: isSuperAdmin,
    queryFn: async () => {
      const { data } = await supabase.from('admin_activity_log').select('*').order('timestamp', { ascending: false }).limit(100);
      return data || [];
    },
  });

  const changePassword = useMutation({
    mutationFn: async (password: string) => {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      if (adminUser?.must_change_password) {
        await supabase.from('admin_users').update({ must_change_password: false }).eq('id', adminUser.id);
      }
    },
    onSuccess: () => {
      setNewPassword('');
      toast.success('Passwort erfolgreich geändert');
      refreshAdminUser();
    },
    onError: (e: any) => toast.error(e.message),
  });

  const addWhitelist = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from('email_whitelist').insert({
        email: whitelistEmail,
        added_by: adminUser?.id,
        note: whitelistNote || null,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-whitelist'] });
      setWhitelistEmail('');
      setWhitelistNote('');
      toast.success('E-Mail zur Whitelist hinzugefügt');
    },
    onError: (e: any) => toast.error(e.message),
  });

  const removeWhitelist = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('email_whitelist').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-whitelist'] });
      toast.success('E-Mail von Whitelist entfernt');
    },
  });

  const updateAdminRole = useMutation({
    mutationFn: async ({ id, role }: { id: string; role: string }) => {
      const { error } = await supabase.from('admin_users').update({ role: role as any }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users-list'] });
      toast.success('Rolle aktualisiert');
    },
    onError: (e: any) => toast.error(e.message),
  });

  const toggleAdminActive = useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await supabase.from('admin_users').update({ is_active }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users-list'] });
      toast.success('Status aktualisiert');
    },
  });

  const allPasswordMet = passwordRequirements.every(r => r.test(newPassword));

  const isRegistered = (email: string) => admins.some(a => a.email.toLowerCase() === email.toLowerCase());

  const exportCSV = (data: any[], filename: string) => {
    if (!data.length) return;
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(r => Object.values(r).map(v => `"${v}"`).join(',')).join('\n');
    const blob = new Blob([`${headers}\n${rows}`], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Einstellungen</h2>

      <Tabs defaultValue="profil">
        <TabsList>
          <TabsTrigger value="profil">Profil</TabsTrigger>
          {isSuperAdmin && <TabsTrigger value="whitelist">Mitarbeiter Whitelist</TabsTrigger>}
          {isSuperAdmin && <TabsTrigger value="admins">Admin Zugänge</TabsTrigger>}
          {isSuperAdmin && <TabsTrigger value="log">Aktivitätslog</TabsTrigger>}
          {isSuperAdmin && <TabsTrigger value="export">Daten Export</TabsTrigger>}
        </TabsList>

        <TabsContent value="profil" className="space-y-4">
          <Card>
            <CardHeader><CardTitle className="text-base">Profil</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Name</Label><Input value={adminUser?.name || ''} disabled className="mt-1" /></div>
                <div><Label>E-Mail</Label><Input value={adminUser?.email || ''} disabled className="mt-1" /></div>
              </div>
              <div>
                <Label>Rolle</Label>
                <div className="mt-1">
                  <Badge>{adminUser?.role === 'super_admin' ? 'Super Admin' : adminUser?.role === 'redakteur' ? 'Redakteur' : 'Betrachter'}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-base">Passwort ändern</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Neues Passwort</Label>
                <Input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} className="mt-1" />
                <div className="mt-2 space-y-1">
                  {passwordRequirements.map((r, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                      {r.test(newPassword) ? <Check className="h-3 w-3 text-green-500" /> : <X className="h-3 w-3 text-muted-foreground" />}
                      <span className={r.test(newPassword) ? 'text-green-500' : 'text-muted-foreground'}>{r.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Button onClick={() => changePassword.mutate(newPassword)} disabled={!allPasswordMet} className="bg-primary">
                Passwort ändern
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {isSuperAdmin && (
          <TabsContent value="whitelist" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Mitarbeiter Whitelist</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input placeholder="E-Mail Adresse" value={whitelistEmail} onChange={e => setWhitelistEmail(e.target.value)} />
                  <Input placeholder="Notiz (optional)" value={whitelistNote} onChange={e => setWhitelistNote(e.target.value)} className="w-48" />
                  <Button onClick={() => addWhitelist.mutate()} disabled={!whitelistEmail} className="bg-primary shrink-0">
                    <Plus className="h-4 w-4 mr-2" />Hinzufügen
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 font-medium text-muted-foreground">E-Mail</th>
                        <th className="text-left py-3 font-medium text-muted-foreground">Datum</th>
                        <th className="text-left py-3 font-medium text-muted-foreground">Notiz</th>
                        <th className="text-left py-3 font-medium text-muted-foreground">Status</th>
                        <th className="text-right py-3 font-medium text-muted-foreground">Aktion</th>
                      </tr>
                    </thead>
                    <tbody>
                      {whitelist.map(w => (
                        <tr key={w.id} className="border-b">
                          <td className="py-3">{w.email}</td>
                          <td className="py-3 text-muted-foreground">{new Date(w.added_at).toLocaleDateString('de-DE')}</td>
                          <td className="py-3 text-muted-foreground">{w.note || '—'}</td>
                          <td className="py-3">
                            {isRegistered(w.email) ? (
                              <Badge className="bg-green-500 text-white text-xs">✓ Registriert</Badge>
                            ) : (
                              <Badge variant="secondary" className="text-xs">○ Ausstehend</Badge>
                            )}
                          </td>
                          <td className="py-3 text-right">
                            <Button variant="ghost" size="sm" onClick={() => removeWhitelist.mutate(w.id)} className="text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {isSuperAdmin && (
          <TabsContent value="admins" className="space-y-4">
            <Card>
              <CardHeader><CardTitle className="text-base">Admin Zugänge</CardTitle></CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 font-medium text-muted-foreground">Name</th>
                        <th className="text-left py-3 font-medium text-muted-foreground">E-Mail</th>
                        <th className="text-left py-3 font-medium text-muted-foreground">Rolle</th>
                        <th className="text-left py-3 font-medium text-muted-foreground">Letzter Login</th>
                        <th className="text-left py-3 font-medium text-muted-foreground">Status</th>
                        <th className="text-right py-3 font-medium text-muted-foreground">Aktionen</th>
                      </tr>
                    </thead>
                    <tbody>
                      {admins.map(a => (
                        <tr key={a.id} className="border-b">
                          <td className="py-3 font-medium">{a.name}</td>
                          <td className="py-3">{a.email}</td>
                          <td className="py-3">
                            {a.id === adminUser?.id ? (
                              <Badge>{a.role === 'super_admin' ? 'Super Admin' : a.role}</Badge>
                            ) : (
                              <Select value={a.role} onValueChange={v => updateAdminRole.mutate({ id: a.id, role: v })}>
                                <SelectTrigger className="w-36 h-8"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="super_admin">Super Admin</SelectItem>
                                  <SelectItem value="redakteur">Redakteur</SelectItem>
                                  <SelectItem value="betrachter">Betrachter</SelectItem>
                                </SelectContent>
                              </Select>
                            )}
                          </td>
                          <td className="py-3 text-muted-foreground">
                            {a.last_login ? new Date(a.last_login).toLocaleDateString('de-DE') : '—'}
                          </td>
                          <td className="py-3">
                            <Badge variant={a.is_active ? 'default' : 'destructive'}>
                              {a.is_active ? 'Aktiv' : 'Deaktiviert'}
                            </Badge>
                          </td>
                          <td className="py-3 text-right">
                            {a.id !== adminUser?.id && (
                              <Button variant="ghost" size="sm" onClick={() => toggleAdminActive.mutate({ id: a.id, is_active: !a.is_active })}>
                                {a.is_active ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {isSuperAdmin && (
          <TabsContent value="log" className="space-y-4">
            <Card>
              <CardHeader><CardTitle className="text-base">Aktivitätslog</CardTitle></CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 font-medium text-muted-foreground">Admin</th>
                        <th className="text-left py-3 font-medium text-muted-foreground">Aktion</th>
                        <th className="text-left py-3 font-medium text-muted-foreground">Betrifft</th>
                        <th className="text-left py-3 font-medium text-muted-foreground">Zeitpunkt</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activityLog.map(l => (
                        <tr key={l.id} className="border-b">
                          <td className="py-3">{l.admin_name || '—'}</td>
                          <td className="py-3">{l.action_type}</td>
                          <td className="py-3 text-muted-foreground">{l.affected_item || '—'}</td>
                          <td className="py-3 text-muted-foreground">{new Date(l.timestamp).toLocaleString('de-DE')}</td>
                        </tr>
                      ))}
                      {activityLog.length === 0 && (
                        <tr><td colSpan={4} className="py-8 text-center text-muted-foreground">Keine Aktivitäten</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {isSuperAdmin && (
          <TabsContent value="export" className="space-y-4">
            <Card>
              <CardHeader><CardTitle className="text-base">Daten Export</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" onClick={async () => {
                  const { data } = await supabase.from('beratungsanfragen').select('*');
                  if (data) exportCSV(data, 'anfragen.csv');
                }}>
                  <Download className="h-4 w-4 mr-2" />Alle Anfragen exportieren (CSV)
                </Button>
                <Button variant="outline" onClick={async () => {
                  const { data } = await supabase.from('bewertungen').select('*');
                  if (data) exportCSV(data, 'bewertungen.csv');
                }}>
                  <Download className="h-4 w-4 mr-2" />Alle Bewertungen exportieren (CSV)
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
