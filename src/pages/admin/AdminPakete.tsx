import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Pencil, Trash2, Eye, EyeOff, X } from 'lucide-react';
import { toast } from 'sonner';

const statusColors: Record<string, string> = {
  neu: 'bg-yellow-500',
  in_bearbeitung: 'bg-blue-500',
  erledigt: 'bg-green-500',
  abgesagt: 'bg-destructive',
};
const statusLabels: Record<string, string> = {
  neu: 'Neu',
  in_bearbeitung: 'In Bearbeitung',
  erledigt: 'Erledigt',
  abgesagt: 'Abgesagt',
};

interface PaketRow {
  id: string;
  slug: string;
  badge: string;
  badge_color: string | null;
  title: string;
  subtitle: string;
  core_services: string[];
  optional_services: string[];
  price: string;
  price_note: string;
  detail_description: string;
  detail_example: string;
  detail_notes: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

const emptyPaket: Omit<PaketRow, 'id' | 'created_at'> = {
  slug: '',
  badge: '',
  badge_color: null,
  title: '',
  subtitle: '',
  core_services: [''],
  optional_services: [''],
  price: '',
  price_note: '',
  detail_description: '',
  detail_example: '',
  detail_notes: '',
  is_active: true,
  sort_order: 0,
};

export default function AdminPakete() {
  const { canEdit } = useAuth();
  const queryClient = useQueryClient();
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState<Omit<PaketRow, 'id' | 'created_at'> & { id?: string }>(emptyPaket);

  const { data: paketeList = [] } = useQuery({
    queryKey: ['admin-pakete'],
    queryFn: async () => {
      const { data } = await supabase.from('pakete').select('*').order('sort_order');
      return (data || []) as PaketRow[];
    },
  });

  const { data: anfragen = [] } = useQuery({
    queryKey: ['paket-anfragen'],
    queryFn: async () => {
      const { data } = await supabase.from('paket_anfragen').select('*').order('created_at', { ascending: false });
      return data || [];
    },
  });

  const savePaket = useMutation({
    mutationFn: async (p: Omit<PaketRow, 'id' | 'created_at'> & { id?: string }) => {
      if (!canEdit) { toast.warning("Demo-Modus – keine Änderungen möglich"); return; }
      const { id, ...rest } = p;
      // Clean empty strings from arrays
      const clean = {
        ...rest,
        core_services: rest.core_services.filter(s => s.trim()),
        optional_services: rest.optional_services.filter(s => s.trim()),
      };
      if (id) {
        const { error } = await supabase.from('pakete').update(clean).eq('id', id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('pakete').insert(clean);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-pakete'] });
      toast.success('Paket gespeichert');
      setEditOpen(false);
    },
    onError: () => toast.error('Fehler beim Speichern'),
  });

  const toggleActive = useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      if (!canEdit) { toast.warning("Demo-Modus – keine Änderungen möglich"); return; }
      const { error } = await supabase.from('pakete').update({ is_active }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-pakete'] });
      toast.success('Status aktualisiert');
    },
  });

  const deletePaket = useMutation({
    mutationFn: async (id: string) => {
      if (!canEdit) { toast.warning("Demo-Modus – keine Änderungen möglich"); return; }
      const { error } = await supabase.from('pakete').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-pakete'] });
      toast.success('Paket gelöscht');
    },
  });

  const updateAnfragenStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      if (!canEdit) { toast.warning("Demo-Modus – keine Änderungen möglich"); return; }
      const { error } = await supabase.from('paket_anfragen').update({ status }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['paket-anfragen'] });
      toast.success('Status aktualisiert');
    },
  });

  const openNew = () => {
    setEditData({ ...emptyPaket, sort_order: paketeList.length });
    setEditOpen(true);
  };

  const openEdit = (p: PaketRow) => {
    setEditData({
      id: p.id,
      slug: p.slug,
      badge: p.badge,
      badge_color: p.badge_color,
      title: p.title,
      subtitle: p.subtitle,
      core_services: p.core_services.length ? p.core_services : [''],
      optional_services: p.optional_services.length ? p.optional_services : [''],
      price: p.price,
      price_note: p.price_note,
      detail_description: p.detail_description,
      detail_example: p.detail_example,
      detail_notes: p.detail_notes,
      is_active: p.is_active,
      sort_order: p.sort_order,
    });
    setEditOpen(true);
  };

  const weekAnfragen = (paketName: string) => {
    const week = 7 * 24 * 60 * 60 * 1000;
    return anfragen.filter((a: any) => a.paket === paketName && (Date.now() - new Date(a.created_at).getTime()) < week).length;
  };

  const updateArrayField = (field: 'core_services' | 'optional_services', index: number, value: string) => {
    setEditData(prev => {
      const arr = [...prev[field]];
      arr[index] = value;
      return { ...prev, [field]: arr };
    });
  };

  const addArrayItem = (field: 'core_services' | 'optional_services') => {
    setEditData(prev => ({ ...prev, [field]: [...prev[field], ''] }));
  };

  const removeArrayItem = (field: 'core_services' | 'optional_services', index: number) => {
    setEditData(prev => ({ ...prev, [field]: prev[field].filter((_, i) => i !== index) }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Pakete Manager</h2>
        <Button onClick={openNew} size="sm">
          <Plus className="h-4 w-4 mr-1.5" /> Neues Paket
        </Button>
      </div>

      <Tabs defaultValue="pakete">
        <TabsList>
          <TabsTrigger value="pakete">Pakete ({paketeList.length})</TabsTrigger>
          <TabsTrigger value="anfragen">Anfragen ({anfragen.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="pakete" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paketeList.map(p => (
              <Card key={p.id} className={!p.is_active ? 'opacity-60' : ''}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant="secondary">{p.badge}</Badge>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={p.is_active}
                        onCheckedChange={(checked) => toggleActive.mutate({ id: p.id, is_active: checked })}
                        aria-label="Paket aktiv"
                      />
                      {p.is_active ? <Eye className="h-4 w-4 text-green-500" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}
                    </div>
                  </div>
                  <h3 className="font-bold text-lg">{p.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{p.subtitle}</p>
                  <p className="text-primary font-bold mb-2">{p.price}</p>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" className="text-xs">
                      {weekAnfragen(p.title)} Anfragen diese Woche
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => openEdit(p)}>
                      <Pencil className="h-3.5 w-3.5 mr-1" /> Bearbeiten
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-destructive hover:bg-destructive/10"
                      onClick={() => {
                        if (confirm('Paket wirklich löschen?')) deletePaket.mutate(p.id);
                      }}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="anfragen" className="mt-6">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium text-muted-foreground">Name</th>
                      <th className="text-left p-3 font-medium text-muted-foreground">Paket</th>
                      <th className="text-left p-3 font-medium text-muted-foreground">Komponenten</th>
                      <th className="text-left p-3 font-medium text-muted-foreground">Standort</th>
                      <th className="text-left p-3 font-medium text-muted-foreground">Datum</th>
                      <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
                      <th className="text-left p-3 font-medium text-muted-foreground">Aktion</th>
                    </tr>
                  </thead>
                  <tbody>
                    {anfragen.map((a: any) => (
                      <tr key={a.id} className="border-b hover:bg-muted/50">
                        <td className="p-3">{a.vorname} {a.nachname}</td>
                        <td className="p-3">{a.paket}</td>
                        <td className="p-3">
                          <div className="flex flex-wrap gap-1">
                            {(a.komponenten || []).map((k: string) => (
                              <Badge key={k} variant="outline" className="text-xs">{k}</Badge>
                            ))}
                          </div>
                        </td>
                        <td className="p-3">{a.standort || '—'}</td>
                        <td className="p-3">{new Date(a.created_at).toLocaleDateString('de-DE')}</td>
                        <td className="p-3">
                          <Badge variant="secondary" className="text-xs">
                            <span className={`inline-block w-2 h-2 rounded-full mr-1.5 ${statusColors[a.status]}`} />
                            {statusLabels[a.status] || a.status}
                          </Badge>
                        </td>
                        <td className="p-3">
                          <select
                            value={a.status}
                            onChange={e => updateAnfragenStatus.mutate({ id: a.id, status: e.target.value })}
                            className="text-xs border border-border rounded px-2 py-1 bg-card text-card-foreground"
                          >
                            <option value="neu">Neu</option>
                            <option value="in_bearbeitung">In Bearbeitung</option>
                            <option value="erledigt">Erledigt</option>
                            <option value="abgesagt">Abgesagt</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                    {anfragen.length === 0 && (
                      <tr><td colSpan={7} className="p-8 text-center text-muted-foreground">Keine Paket-Anfragen vorhanden</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit / Create Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editData.id ? 'Paket bearbeiten' : 'Neues Paket erstellen'}</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={e => {
              e.preventDefault();
              savePaket.mutate(editData);
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Titel *</Label>
                <Input value={editData.title} onChange={e => setEditData(p => ({ ...p, title: e.target.value }))} required />
              </div>
              <div>
                <Label>Slug *</Label>
                <Input
                  value={editData.slug}
                  onChange={e => setEditData(p => ({ ...p, slug: e.target.value }))}
                  placeholder="z.B. neu-hier"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Badge</Label>
                <Input value={editData.badge} onChange={e => setEditData(p => ({ ...p, badge: e.target.value }))} placeholder="z.B. Beliebt" />
              </div>
              <div>
                <Label>Badge-Farbe (CSS-Klasse)</Label>
                <Input value={editData.badge_color || ''} onChange={e => setEditData(p => ({ ...p, badge_color: e.target.value || null }))} placeholder="z.B. bg-orange-500" />
              </div>
            </div>

            <div>
              <Label>Untertitel</Label>
              <Input value={editData.subtitle} onChange={e => setEditData(p => ({ ...p, subtitle: e.target.value }))} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Preis</Label>
                <Input value={editData.price} onChange={e => setEditData(p => ({ ...p, price: e.target.value }))} placeholder="Ab 59€ / Monat" />
              </div>
              <div>
                <Label>Preishinweis</Label>
                <Input value={editData.price_note} onChange={e => setEditData(p => ({ ...p, price_note: e.target.value }))} />
              </div>
            </div>

            <div>
              <Label>Kern-Leistungen</Label>
              {editData.core_services.map((s, i) => (
                <div key={i} className="flex gap-2 mt-1">
                  <Input value={s} onChange={e => updateArrayField('core_services', i, e.target.value)} />
                  <Button type="button" variant="ghost" size="icon" onClick={() => removeArrayItem('core_services', i)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => addArrayItem('core_services')}>
                <Plus className="h-3.5 w-3.5 mr-1" /> Hinzufügen
              </Button>
            </div>

            <div>
              <Label>Optionale Leistungen</Label>
              {editData.optional_services.map((s, i) => (
                <div key={i} className="flex gap-2 mt-1">
                  <Input value={s} onChange={e => updateArrayField('optional_services', i, e.target.value)} />
                  <Button type="button" variant="ghost" size="icon" onClick={() => removeArrayItem('optional_services', i)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => addArrayItem('optional_services')}>
                <Plus className="h-3.5 w-3.5 mr-1" /> Hinzufügen
              </Button>
            </div>

            <div>
              <Label>Detail-Beschreibung</Label>
              <Textarea value={editData.detail_description} onChange={e => setEditData(p => ({ ...p, detail_description: e.target.value }))} rows={3} />
            </div>

            <div>
              <Label>Beispielkonfiguration</Label>
              <Textarea value={editData.detail_example} onChange={e => setEditData(p => ({ ...p, detail_example: e.target.value }))} rows={2} />
            </div>

            <div>
              <Label>Wichtige Hinweise</Label>
              <Textarea value={editData.detail_notes} onChange={e => setEditData(p => ({ ...p, detail_notes: e.target.value }))} rows={2} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Sortierung</Label>
                <Input type="number" value={editData.sort_order} onChange={e => setEditData(p => ({ ...p, sort_order: parseInt(e.target.value) || 0 }))} />
              </div>
              <div className="flex items-center gap-3 pt-6">
                <Switch checked={editData.is_active} onCheckedChange={v => setEditData(p => ({ ...p, is_active: v }))} />
                <Label>Aktiv (auf Website sichtbar)</Label>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="outline" onClick={() => setEditOpen(false)}>Abbrechen</Button>
              <Button type="submit" disabled={savePaket.isPending}>
                {savePaket.isPending ? 'Speichert…' : 'Speichern'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
