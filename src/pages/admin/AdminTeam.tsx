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
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Pencil, Trash2, GripVertical } from 'lucide-react';
import { toast } from 'sonner';

const standorte = ['Erfurt', 'Weimar', 'Jena', 'Gotha', 'Arnstadt'];

export default function AdminTeam() {
  const { canEdit } = useAuth();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);

  const { data: members = [] } = useQuery({
    queryKey: ['admin-team'],
    queryFn: async () => {
      const { data } = await supabase.from('team_members').select('*').order('sort_order', { ascending: true });
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
        const { error } = await supabase.from('team_members').update(d).eq('id', id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('team_members').insert(d);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-team'] });
      setIsOpen(false);
      toast.success('Teammitglied gespeichert');
    },
    onError: (e: any) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('team_members').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-team'] });
      toast.success('Teammitglied gelöscht');
    },
  });

  const openNew = () => {
    setEditing({ name: '', position: '', standort: '', since_year: new Date().getFullYear(), description: '', photo_url: '', show_on_website: true, sort_order: members.length });
    setIsOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Team Manager</h2>
        {canEdit && <Button onClick={openNew} className="bg-primary"><Plus className="h-4 w-4 mr-2" />Mitglied hinzufügen</Button>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map(m => (
          <Card key={m.id}>
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center text-2xl font-bold text-muted-foreground shrink-0 overflow-hidden">
                  {m.photo_url ? <img src={m.photo_url} alt={m.name} className="h-full w-full object-cover" /> : m.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">{m.name}</h3>
                  <p className="text-sm text-muted-foreground">{m.position}</p>
                  <div className="flex gap-2 mt-1">
                    {m.standort && <Badge variant="outline" className="text-xs">{m.standort}</Badge>}
                    {m.since_year && <span className="text-xs text-muted-foreground">Seit {m.since_year}</span>}
                  </div>
                  {!m.show_on_website && <Badge variant="secondary" className="text-xs mt-2">Ausgeblendet</Badge>}
                </div>
              </div>
              {canEdit && (
                <div className="flex gap-1 mt-3 border-t pt-3">
                  <Button variant="ghost" size="sm" onClick={() => { setEditing({ ...m }); setIsOpen(true); }}><Pencil className="h-4 w-4" /></Button>
                  <Button variant="ghost" size="sm" onClick={() => deleteMutation.mutate(m.id)} className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
        {members.length === 0 && (
          <div className="col-span-3 text-center py-12 text-muted-foreground">Keine Teammitglieder vorhanden</div>
        )}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing?.id ? 'Mitglied bearbeiten' : 'Neues Mitglied'}</DialogTitle></DialogHeader>
          {editing && (
            <div className="space-y-4">
              <div><Label>Name</Label><Input value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })} className="mt-1" /></div>
              <div><Label>Position</Label><Input value={editing.position} onChange={e => setEditing({ ...editing, position: e.target.value })} className="mt-1" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Standort</Label>
                  <Select value={editing.standort || ''} onValueChange={v => setEditing({ ...editing, standort: v })}>
                    <SelectTrigger className="mt-1"><SelectValue placeholder="Standort" /></SelectTrigger>
                    <SelectContent>{standorte.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div><Label>Dabei seit (Jahr)</Label><Input type="number" value={editing.since_year || ''} onChange={e => setEditing({ ...editing, since_year: parseInt(e.target.value) })} className="mt-1" /></div>
              </div>
              <div><Label>Kurzbeschreibung</Label><Textarea value={editing.description || ''} onChange={e => setEditing({ ...editing, description: e.target.value })} className="mt-1" /></div>
              <div><Label>Foto URL</Label><Input value={editing.photo_url || ''} onChange={e => setEditing({ ...editing, photo_url: e.target.value })} className="mt-1" /></div>
              <div className="flex items-center gap-2">
                <Switch checked={editing.show_on_website} onCheckedChange={v => setEditing({ ...editing, show_on_website: v })} />
                <Label>Auf Website anzeigen</Label>
              </div>
              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsOpen(false)} className="flex-1">Abbrechen</Button>
                <Button onClick={() => saveMutation.mutate(editing)} className="flex-1 bg-primary" disabled={saveMutation.isPending}>Speichern</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
