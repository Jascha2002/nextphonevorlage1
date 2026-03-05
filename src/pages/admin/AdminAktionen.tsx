import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Pencil, Trash2, Copy, X } from 'lucide-react';
import { toast } from 'sonner';

const providers = ['Telekom', 'Vodafone', 'o2', '1&1', 'congstar', 'freenet', 'yourfone', 'Sky', 'Thüringer Netkom', 'PYUR', 'ay yildiz', 'Wertgarantie', 'Sonstige'];
const badges = ['NEU', 'BESTSELLER', 'TIPP', 'AKTION', 'EXKLUSIV'];

export default function AdminAktionen() {
  const { canEdit } = useAuth();
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);

  const { data: aktionen = [] } = useQuery({
    queryKey: ['admin-aktionen'],
    queryFn: async () => {
      const { data } = await supabase.from('aktionen').select('*').order('created_at', { ascending: false });
      return data || [];
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (item: any) => {
      const d = { ...item };
      const id = d.id;
      delete d.id;
      delete d.created_at;
      if (id) {
        const { error } = await supabase.from('aktionen').update(d).eq('id', id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('aktionen').insert(d);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-aktionen'] });
      setIsOpen(false);
      toast.success('Aktion gespeichert');
    },
    onError: (e: any) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('aktionen').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-aktionen'] });
      toast.success('Aktion gelöscht');
    },
  });

  const openNew = () => {
    setEditing({ provider: '', title: '', subheadline: '', corner_badge: 'NEU', startpreis: '', bullets: [''], valid_from: '', valid_until: '', show_homepage: false, show_aktionen_page: false, status: 'aktiv' });
    setIsOpen(true);
  };

  const duplicate = (item: any) => {
    setEditing({ ...item, id: undefined, title: item.title + ' (Kopie)' });
    setIsOpen(true);
  };

  const statusColor = (s: string) => s === 'aktiv' ? 'bg-green-500 text-white' : s === 'abgelaufen' ? 'bg-muted-foreground text-white' : 'bg-yellow-500 text-white';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Aktionen Manager</h2>
        {canEdit && <Button onClick={openNew} className="bg-primary"><Plus className="h-4 w-4 mr-2" />Neue Aktion</Button>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {aktionen.map(a => (
          <Card key={a.id} className="relative overflow-hidden">
            {a.corner_badge && (
              <div className="absolute top-3 right-3">
                <Badge className="bg-primary text-primary-foreground text-xs">{a.corner_badge}</Badge>
              </div>
            )}
            <CardContent className="p-5">
              <p className="text-xs text-muted-foreground font-medium">{a.provider}</p>
              <h3 className="font-bold text-lg mt-1">{a.title}</h3>
              {a.subheadline && <p className="text-sm text-muted-foreground mt-1">{a.subheadline}</p>}
              {a.startpreis && <p className="text-primary font-bold mt-2">{a.startpreis}</p>}
              <div className="flex items-center gap-2 mt-3">
                <Badge className={statusColor(a.status)}>{a.status}</Badge>
                {a.show_homepage && <Badge variant="outline" className="text-xs">Homepage</Badge>}
              </div>
              {a.valid_until && <p className="text-xs text-muted-foreground mt-2">Gültig bis: {new Date(a.valid_until).toLocaleDateString('de-DE')}</p>}
              {canEdit && (
                <div className="flex gap-1 mt-3">
                  <Button variant="ghost" size="sm" onClick={() => { setEditing({ ...a }); setIsOpen(true); }}><Pencil className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="sm" onClick={() => duplicate(a)}><Copy className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="sm" onClick={() => deleteMutation.mutate(a.id)} className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
        {aktionen.length === 0 && (
          <div className="col-span-3 text-center py-12 text-muted-foreground">Keine Aktionen vorhanden</div>
        )}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing?.id ? 'Aktion bearbeiten' : 'Neue Aktion'}</DialogTitle></DialogHeader>
          {editing && (
            <div className="space-y-4">
              <div>
                <Label>Provider</Label>
                <Select value={editing.provider} onValueChange={v => setEditing({ ...editing, provider: v })}>
                  <SelectTrigger className="mt-1"><SelectValue placeholder="Provider wählen" /></SelectTrigger>
                  <SelectContent>{providers.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Titel</Label><Input value={editing.title} onChange={e => setEditing({ ...editing, title: e.target.value })} className="mt-1" /></div>
                <div><Label>Subheadline</Label><Input value={editing.subheadline || ''} onChange={e => setEditing({ ...editing, subheadline: e.target.value })} className="mt-1" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Corner Badge</Label>
                  <Select value={editing.corner_badge || ''} onValueChange={v => setEditing({ ...editing, corner_badge: v })}>
                    <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>{badges.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div><Label>Startpreis</Label><Input value={editing.startpreis || ''} onChange={e => setEditing({ ...editing, startpreis: e.target.value })} className="mt-1" placeholder="Ab 29,99€ / Monat" /></div>
              </div>

              <div>
                <Label>Bullet Points</Label>
                <div className="space-y-2 mt-1">
                  {(editing.bullets || ['']).map((b: string, i: number) => (
                    <div key={i} className="flex gap-2">
                      <Input value={b} onChange={e => {
                        const bullets = [...(editing.bullets || [''])];
                        bullets[i] = e.target.value;
                        setEditing({ ...editing, bullets });
                      }} placeholder={`Punkt ${i + 1}`} />
                      {(editing.bullets || []).length > 1 && (
                        <Button variant="ghost" size="sm" onClick={() => {
                          const bullets = editing.bullets.filter((_: any, idx: number) => idx !== i);
                          setEditing({ ...editing, bullets });
                        }}><X className="h-4 w-4" /></Button>
                      )}
                    </div>
                  ))}
                  {(editing.bullets || []).length < 5 && (
                    <Button variant="outline" size="sm" onClick={() => setEditing({ ...editing, bullets: [...(editing.bullets || []), ''] })}>
                      <Plus className="h-3 w-3 mr-1" />Punkt hinzufügen
                    </Button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div><Label>Gültig von</Label><Input type="date" value={editing.valid_from || ''} onChange={e => setEditing({ ...editing, valid_from: e.target.value })} className="mt-1" /></div>
                <div><Label>Gültig bis</Label><Input type="date" value={editing.valid_until || ''} onChange={e => setEditing({ ...editing, valid_until: e.target.value })} className="mt-1" /></div>
              </div>

              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <Switch checked={editing.show_homepage} onCheckedChange={v => setEditing({ ...editing, show_homepage: v })} />
                  <Label>Auf Homepage</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={editing.show_aktionen_page} onCheckedChange={v => setEditing({ ...editing, show_aktionen_page: v })} />
                  <Label>Auf Aktionen-Seite</Label>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsOpen(false)} className="flex-1">Abbrechen</Button>
                <Button onClick={() => saveMutation.mutate(editing)} className="flex-1 bg-primary" disabled={saveMutation.isPending}>
                  {saveMutation.isPending ? 'Speichern...' : 'Speichern'}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
