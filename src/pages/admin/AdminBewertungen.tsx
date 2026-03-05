import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Star, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const standorte = ['Erfurt', 'Weimar', 'Jena', 'Gotha', 'Arnstadt'];

export default function AdminBewertungen() {
  const { canEdit } = useAuth();
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);

  const { data: bewertungen = [] } = useQuery({
    queryKey: ['admin-bewertungen'],
    queryFn: async () => {
      const { data } = await supabase.from('bewertungen').select('*').order('sort_order', { ascending: true });
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
        const { error } = await supabase.from('bewertungen').update(d).eq('id', id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('bewertungen').insert(d);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-bewertungen'] });
      setIsOpen(false);
      toast.success('Bewertung gespeichert');
    },
    onError: (e: any) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('bewertungen').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-bewertungen'] });
      toast.success('Bewertung gelöscht');
    },
  });

  const toggleVisibility = useMutation({
    mutationFn: async ({ id, show }: { id: string; show: boolean }) => {
      const { error } = await supabase.from('bewertungen').update({ show_on_website: show }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-bewertungen'] }),
  });

  const avgStars = bewertungen.length ? (bewertungen.reduce((s, b) => s + b.stars, 0) / bewertungen.length).toFixed(1) : '0.0';
  const featured = bewertungen.filter(b => b.is_featured);
  const visible = bewertungen.filter(b => b.show_on_website);

  const starDistribution = [1, 2, 3, 4, 5].map(s => ({
    name: `${s} ⭐`,
    value: bewertungen.filter(b => b.stars === s).length,
  }));

  const standortStats = standorte.map(s => ({
    name: s,
    bewertungen: bewertungen.filter(b => b.standort === s).length,
  }));

  const COLORS = ['hsl(var(--destructive))', 'hsl(var(--destructive))', '#f59e0b', '#22c55e', 'hsl(var(--primary))'];

  const openNew = () => {
    setEditing({ reviewer_name: '', stars: 5, text: '', date: new Date().toISOString().split('T')[0], standort: '', show_on_website: false, is_featured: false, sort_order: 0 });
    setIsOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Bewertungsmanager</h2>
        {canEdit && <Button onClick={openNew} className="bg-primary"><Plus className="h-4 w-4 mr-2" />Neue Bewertung</Button>}
      </div>

      {/* Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-1 text-3xl font-bold">
              <Star className="h-8 w-8 text-yellow-500 fill-yellow-500" />
              {avgStars}
            </div>
            <p className="text-sm text-muted-foreground mt-1">{bewertungen.length} Bewertungen</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-3xl font-bold">{visible.length}/6</p>
            <p className="text-sm text-muted-foreground mt-1">Auf Website angezeigt</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-3xl font-bold">{featured.length}</p>
            <p className="text-sm text-muted-foreground mt-1">Featured</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-base">Sterne-Verteilung</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={starDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label>
                  {starDistribution.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Bewertungen pro Standort</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={standortStats}>
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="bewertungen" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bewertungen List */}
      <div className="space-y-3">
        {bewertungen.map(b => (
          <Card key={b.id}>
            <CardContent className="p-4 flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{b.reviewer_name}</span>
                  <div className="flex">{Array.from({ length: b.stars }).map((_, i) => <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />)}</div>
                  {b.standort && <Badge variant="outline" className="text-xs">{b.standort}</Badge>}
                </div>
                <p className="text-sm text-muted-foreground mt-1">{b.text}</p>
                <p className="text-xs text-muted-foreground mt-1">{new Date(b.date).toLocaleDateString('de-DE')}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                {canEdit && (
                  <>
                    <div className="flex items-center gap-2">
                      <Switch checked={b.show_on_website} onCheckedChange={v => toggleVisibility.mutate({ id: b.id, show: v })} />
                      <span className="text-xs text-muted-foreground">Sichtbar</span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => deleteMutation.mutate(b.id)} className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        {bewertungen.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">Keine Bewertungen vorhanden</div>
        )}
      </div>

      {/* Add Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Neue Bewertung</DialogTitle></DialogHeader>
          {editing && (
            <div className="space-y-4">
              <div><Label>Name</Label><Input value={editing.reviewer_name} onChange={e => setEditing({ ...editing, reviewer_name: e.target.value })} className="mt-1" /></div>
              <div>
                <Label>Sterne</Label>
                <div className="flex gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map(s => (
                    <button key={s} onClick={() => setEditing({ ...editing, stars: s })}>
                      <Star className={`h-6 w-6 ${s <= editing.stars ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}`} />
                    </button>
                  ))}
                </div>
              </div>
              <div><Label>Text</Label><Textarea value={editing.text || ''} onChange={e => setEditing({ ...editing, text: e.target.value })} className="mt-1" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Datum</Label><Input type="date" value={editing.date} onChange={e => setEditing({ ...editing, date: e.target.value })} className="mt-1" /></div>
                <div>
                  <Label>Standort</Label>
                  <Select value={editing.standort || ''} onValueChange={v => setEditing({ ...editing, standort: v })}>
                    <SelectTrigger className="mt-1"><SelectValue placeholder="Standort" /></SelectTrigger>
                    <SelectContent>{standorte.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
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
