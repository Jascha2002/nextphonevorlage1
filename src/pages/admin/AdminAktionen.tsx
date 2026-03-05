import { useState, useMemo } from 'react';
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
import { Plus, Pencil, Trash2, Copy, X, GripVertical, FileText, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

const providers = ['Telekom', 'Vodafone', 'o2', '1&1', 'congstar', 'freenet', 'yourfone', 'Sky', 'Thüringer Netkom', 'PYUR', 'ay yildiz', 'Wertgarantie', 'Sonstige'];
const badgeOptions = ['NEU', 'BESTSELLER', 'TIPP', 'AKTION', 'EXKLUSIV', 'GÜNSTIG', 'FAMILIE', 'REGIONAL', 'FLEXIBEL'];

const aktionenTemplates = [
  {
    provider: 'congstar',
    corner_badge: 'GÜNSTIG',
    title: 'congstar Allnet Flat — einfach und fair',
    subheadline: '',
    bullets: ['Allnet & SMS Flat', 'Im Telekom Netz', 'Monatlich kündbar', 'Ohne Schufa-Auskunft'],
    startpreis: 'Ab 15,00€ / Monat',
  },
  {
    provider: '1&1',
    corner_badge: 'NEU',
    title: '1&1 5G Tarif — jetzt im stärksten Netz',
    subheadline: '',
    bullets: ['Echtes 5G', 'Bis zu 50GB Datenvolumen', 'EU-Roaming inklusive', '24 Monate Laufzeit'],
    startpreis: 'Ab 24,99€ / Monat',
  },
  {
    provider: 'Vodafone',
    corner_badge: 'FAMILIE',
    title: 'Vodafone FamilyCard — spare mit deiner Familie',
    subheadline: '',
    bullets: ['Bis zu 4 Zusatzkarten', 'Jede Karte günstiger', 'Gemeinsames Datenvolumen', 'Eine Rechnung für alle'],
    startpreis: 'Ab 19,99€ / Karte',
  },
  {
    provider: 'Thüringer Netkom',
    corner_badge: 'REGIONAL',
    title: 'Thüringer Netkom Glasfaser — Heimvorteil nutzen',
    subheadline: '',
    bullets: ['Bis zu 1 Gbit/s', 'Regionaler Anbieter', 'Persönlicher Service', 'Installation inklusive'],
    startpreis: 'Ab 39,99€ / Monat',
  },
  {
    provider: 'freenet',
    corner_badge: 'FLEXIBEL',
    title: 'freenet FLEX — ohne Vertrag, ohne Stress',
    subheadline: '',
    bullets: ['Monatlich kündbar', 'Keine Mindestlaufzeit', 'Datenvolumen wählbar', 'Alle Netze verfügbar'],
    startpreis: 'Ab 9,99€ / Monat',
  },
];

export default function AdminAktionen() {
  const { canEdit } = useAuth();
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isTemplateOpen, setIsTemplateOpen] = useState(false);
  const [filter, setFilter] = useState('alle');
  const [dragItem, setDragItem] = useState<number | null>(null);

  const { data: aktionen = [] } = useQuery({
    queryKey: ['admin-aktionen'],
    queryFn: async () => {
      const { data } = await supabase.from('aktionen').select('*').order('sort_order', { ascending: true });
      return data || [];
    },
  });

  const homepageCount = useMemo(() => aktionen.filter(a => a.show_homepage && a.status === 'aktiv').length, [aktionen]);

  const filteredAktionen = useMemo(() => {
    const now = new Date().toISOString().split('T')[0];
    switch (filter) {
      case 'aktiv': return aktionen.filter(a => a.status === 'aktiv');
      case 'homepage': return aktionen.filter(a => a.show_homepage);
      case 'aktionsseite': return aktionen.filter(a => a.show_aktionen_page);
      case 'versteckt': return aktionen.filter(a => !a.show_homepage && !a.show_aktionen_page);
      case 'abgelaufen': return aktionen.filter(a => a.valid_until && a.valid_until < now);
      default: return aktionen;
    }
  }, [aktionen, filter]);

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
        d.sort_order = aktionen.length;
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

  const toggleMutation = useMutation({
    mutationFn: async ({ id, field, value }: { id: string; field: string; value: boolean }) => {
      const { error } = await supabase.from('aktionen').update({ [field]: value } as any).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-aktionen'] }),
  });

  const reorderMutation = useMutation({
    mutationFn: async (ordered: { id: string; sort_order: number }[]) => {
      for (const item of ordered) {
        await supabase.from('aktionen').update({ sort_order: item.sort_order }).eq('id', item.id);
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-aktionen'] }),
  });

  const openNew = () => {
    setEditing({ provider: '', title: '', subheadline: '', corner_badge: 'NEU', startpreis: '', bullets: [''], valid_from: '', valid_until: '', show_homepage: false, show_aktionen_page: false, status: 'aktiv' });
    setIsOpen(true);
  };

  const duplicate = (item: any) => {
    setEditing({ ...item, id: undefined, title: item.title + ' (Kopie)' });
    setIsOpen(true);
  };

  const applyTemplate = (tpl: typeof aktionenTemplates[0]) => {
    setEditing({
      ...tpl,
      valid_from: '',
      valid_until: '',
      show_homepage: false,
      show_aktionen_page: false,
      status: 'aktiv',
    });
    setIsTemplateOpen(false);
    setIsOpen(true);
  };

  const handleDragStart = (index: number) => setDragItem(index);
  const handleDragOver = (e: React.DragEvent) => e.preventDefault();
  const handleDrop = (targetIndex: number) => {
    if (dragItem === null || dragItem === targetIndex) return;
    const items = [...filteredAktionen];
    const [moved] = items.splice(dragItem, 1);
    items.splice(targetIndex, 0, moved);
    const ordered = items.map((item, i) => ({ id: item.id, sort_order: i }));
    reorderMutation.mutate(ordered);
    setDragItem(null);
  };

  const statusColor = (s: string) => s === 'aktiv' ? 'bg-green-500 text-white' : s === 'abgelaufen' ? 'bg-muted-foreground text-white' : 'bg-yellow-500 text-white';

  const filterTabs = [
    { key: 'alle', label: 'Alle' },
    { key: 'aktiv', label: 'Aktiv' },
    { key: 'homepage', label: 'Nur Homepage' },
    { key: 'aktionsseite', label: 'Nur Aktionsseite' },
    { key: 'versteckt', label: 'Versteckt' },
    { key: 'abgelaufen', label: 'Abgelaufen' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-2xl font-bold">Aktionen Manager</h2>
        <div className="flex gap-2">
          {canEdit && (
            <Button variant="outline" onClick={() => setIsTemplateOpen(true)}>
              <FileText className="h-4 w-4 mr-2" />Aktions-Vorlagen
            </Button>
          )}
          {canEdit && <Button onClick={openNew} className="bg-primary"><Plus className="h-4 w-4 mr-2" />Neue Aktion</Button>}
        </div>
      </div>

      {/* Homepage Warning */}
      {homepageCount > 3 && (
        <div className="flex items-start gap-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
          <AlertTriangle className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-sm">⚠️ Es sind {homepageCount} Aktionen für die Homepage aktiviert — nur die ersten 3 werden angezeigt.</p>
            <p className="text-xs text-muted-foreground mt-1">Sortiere per Drag & Drop um die Reihenfolge festzulegen.</p>
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex gap-2 flex-wrap">
        {filterTabs.map(t => (
          <Button key={t.key} variant={filter === t.key ? 'default' : 'outline'} size="sm" onClick={() => setFilter(t.key)}>
            {t.label}
          </Button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAktionen.map((a, index) => (
          <Card
            key={a.id}
            className="relative overflow-hidden"
            draggable={canEdit}
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(index)}
          >
            {canEdit && (
              <div className="absolute top-3 left-3 cursor-grab text-muted-foreground hover:text-foreground">
                <GripVertical className="h-4 w-4" />
              </div>
            )}
            {a.corner_badge && (
              <div className="absolute top-3 right-3">
                <Badge className="bg-primary text-primary-foreground text-xs">{a.corner_badge}</Badge>
              </div>
            )}
            <CardContent className="p-5 pl-9">
              <p className="text-xs text-muted-foreground font-medium">{a.provider}</p>
              <h3 className="font-bold text-lg mt-1">{a.title}</h3>
              {a.subheadline && <p className="text-sm text-muted-foreground mt-1">{a.subheadline}</p>}
              {a.startpreis && <p className="text-primary font-bold mt-2">{a.startpreis}</p>}

              <div className="flex items-center gap-2 mt-3">
                <Badge className={statusColor(a.status)}>{a.status}</Badge>
              </div>

              {/* Visibility Toggles */}
              <div className="flex flex-col gap-2 mt-3 border-t pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Homepage</span>
                  <Switch
                    checked={a.show_homepage}
                    onCheckedChange={v => toggleMutation.mutate({ id: a.id, field: 'show_homepage', value: v })}
                    disabled={!canEdit}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Aktionsseite</span>
                  <Switch
                    checked={a.show_aktionen_page}
                    onCheckedChange={v => toggleMutation.mutate({ id: a.id, field: 'show_aktionen_page', value: v })}
                    disabled={!canEdit}
                  />
                </div>
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
        {filteredAktionen.length === 0 && (
          <div className="col-span-3 text-center py-12 text-muted-foreground">Keine Aktionen gefunden</div>
        )}
      </div>

      {/* Templates Modal */}
      <Dialog open={isTemplateOpen} onOpenChange={setIsTemplateOpen}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>📋 Aktions-Vorlagen</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground mb-4">Wähle eine Vorlage als Ausgangspunkt. Homepage & Aktionsseite sind standardmäßig deaktiviert — du entscheidest, wann sie sichtbar werden.</p>
          <div className="space-y-3">
            {aktionenTemplates.map((tpl, i) => (
              <div key={i} className="border rounded-lg p-4 flex items-start justify-between gap-4 hover:bg-muted/50 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="secondary" className="text-xs">{tpl.provider}</Badge>
                    <Badge className="bg-primary text-primary-foreground text-xs">{tpl.corner_badge}</Badge>
                  </div>
                  <h4 className="font-semibold text-sm">{tpl.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{tpl.startpreis}</p>
                </div>
                <Button size="sm" onClick={() => applyTemplate(tpl)} className="shrink-0 bg-primary">
                  Übernehmen
                </Button>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Editor Dialog */}
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
                    <SelectContent>{badgeOptions.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent>
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
