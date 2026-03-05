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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { MapPin, Phone, Mail, Clock, AlertTriangle, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';

const dayNames = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];

export default function AdminStandorte() {
  const { canEdit } = useAuth();
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [sonderOpen, setSonderOpen] = useState(false);
  const [sonderStandortId, setSonderStandortId] = useState<string | null>(null);
  const [sonderForm, setSonderForm] = useState({ date: '', is_open: false, open_time: '', close_time: '', reason: '' });

  const { data: standorte = [] } = useQuery({
    queryKey: ['admin-standorte'],
    queryFn: async () => {
      const { data } = await supabase.from('standort_settings').select('*').order('standort_name');
      return data || [];
    },
  });

  const { data: oeffnungszeiten = [] } = useQuery({
    queryKey: ['admin-oeffnungszeiten'],
    queryFn: async () => {
      const { data } = await supabase.from('oeffnungszeiten').select('*');
      return data || [];
    },
  });

  const { data: sonderzeiten = [] } = useQuery({
    queryKey: ['admin-sonderzeiten'],
    queryFn: async () => {
      const { data } = await supabase.from('sonder_oeffnungszeiten').select('*').order('date');
      return data || [];
    },
  });

  const updateStandort = useMutation({
    mutationFn: async (item: any) => {
      const { error } = await supabase.from('standort_settings').update({
        telefon: item.telefon,
        email: item.email,
        google_maps_link: item.google_maps_link,
        temp_closed: item.temp_closed,
        temp_closed_message: item.temp_closed_message,
      }).eq('id', item.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-standorte'] });
      toast.success('Standort gespeichert');
    },
    onError: (e: any) => toast.error(e.message),
  });

  const updateOeffnung = useMutation({
    mutationFn: async (item: any) => {
      const { error } = await supabase.from('oeffnungszeiten').update({
        is_open: item.is_open,
        open_time: item.open_time,
        close_time: item.close_time,
      }).eq('id', item.id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-oeffnungszeiten'] }),
  });

  const addSonderzeit = useMutation({
    mutationFn: async (item: any) => {
      const { error } = await supabase.from('sonder_oeffnungszeiten').insert(item);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-sonderzeiten'] });
      setSonderOpen(false);
      toast.success('Sonderöffnungszeit gespeichert');
    },
    onError: (e: any) => toast.error(e.message),
  });

  const deleteSonderzeit = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('sonder_oeffnungszeiten').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-sonderzeiten'] });
      toast.success('Sonderöffnungszeit gelöscht');
    },
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Standorte & Öffnungszeiten</h2>

      <div className="space-y-6">
        {standorte.map(s => {
          const isEditing = editingId === s.id;
          const zeiten = oeffnungszeiten.filter(o => o.standort_id === s.id).sort((a, b) => a.day_of_week - b.day_of_week);
          const sonder = sonderzeiten.filter(sz => sz.standort_id === s.id);

          return (
            <Card key={s.id} className={s.temp_closed ? 'border-destructive' : ''}>
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{s.standort_name}</CardTitle>
                  {s.temp_closed && <Badge variant="destructive">Temporär geschlossen</Badge>}
                </div>
                {canEdit && (
                  <Button variant="outline" size="sm" onClick={() => setEditingId(isEditing ? null : s.id)}>
                    {isEditing ? 'Schließen' : 'Bearbeiten'}
                  </Button>
                )}
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    {isEditing ? (
                      <Input value={s.telefon || ''} onChange={e => {
                        const updated = { ...s, telefon: e.target.value };
                        queryClient.setQueryData(['admin-standorte'], standorte.map(st => st.id === s.id ? updated : st));
                      }} className="h-8" />
                    ) : (
                      <span>{s.telefon || '—'}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    {isEditing ? (
                      <Input value={s.email || ''} onChange={e => {
                        const updated = { ...s, email: e.target.value };
                        queryClient.setQueryData(['admin-standorte'], standorte.map(st => st.id === s.id ? updated : st));
                      }} className="h-8" />
                    ) : (
                      <span>{s.email || '—'}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">{s.adresse}</div>
                </div>

                {/* Öffnungszeiten */}
                <div>
                  <h4 className="font-medium text-sm mb-2 flex items-center gap-2"><Clock className="h-4 w-4" />Öffnungszeiten</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {zeiten.map(z => (
                      <div key={z.id} className="flex items-center gap-3 text-sm">
                        <span className="w-24 font-medium">{dayNames[z.day_of_week]}</span>
                        {isEditing ? (
                          <>
                            <Switch checked={z.is_open} onCheckedChange={v => updateOeffnung.mutate({ ...z, is_open: v })} />
                            {z.is_open && (
                              <>
                                <Input type="time" value={z.open_time || ''} onChange={e => updateOeffnung.mutate({ ...z, open_time: e.target.value })} className="h-8 w-28" />
                                <span>–</span>
                                <Input type="time" value={z.close_time || ''} onChange={e => updateOeffnung.mutate({ ...z, close_time: e.target.value })} className="h-8 w-28" />
                              </>
                            )}
                          </>
                        ) : (
                          <span className={z.is_open ? '' : 'text-muted-foreground'}>
                            {z.is_open ? `${z.open_time} – ${z.close_time}` : 'Geschlossen'}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Temp closed */}
                {isEditing && (
                  <div className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-4 w-4 text-destructive" />
                      <Label>Temporär geschlossen</Label>
                      <Switch checked={s.temp_closed} onCheckedChange={v => {
                        const updated = { ...s, temp_closed: v };
                        queryClient.setQueryData(['admin-standorte'], standorte.map(st => st.id === s.id ? updated : st));
                      }} />
                    </div>
                    {s.temp_closed && (
                      <Textarea value={s.temp_closed_message || ''} onChange={e => {
                        const updated = { ...s, temp_closed_message: e.target.value };
                        queryClient.setQueryData(['admin-standorte'], standorte.map(st => st.id === s.id ? updated : st));
                      }} placeholder="Nachricht für Besucher..." />
                    )}
                  </div>
                )}

                {/* Sonderöffnungszeiten */}
                {sonder.length > 0 && (
                  <div>
                    <h4 className="font-medium text-sm mb-2">Sonderöffnungszeiten</h4>
                    {sonder.map(sz => (
                      <div key={sz.id} className="flex items-center gap-3 text-sm py-1">
                        <span className="font-medium">{new Date(sz.date).toLocaleDateString('de-DE')}</span>
                        <span>{sz.is_open ? `${sz.open_time} – ${sz.close_time}` : 'Geschlossen'}</span>
                        {sz.reason && <Badge variant="outline" className="text-xs">{sz.reason}</Badge>}
                        {canEdit && <Button variant="ghost" size="sm" onClick={() => deleteSonderzeit.mutate(sz.id)}><Trash2 className="h-3 w-3" /></Button>}
                      </div>
                    ))}
                  </div>
                )}

                {isEditing && (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => {
                      setSonderStandortId(s.id);
                      setSonderForm({ date: '', is_open: false, open_time: '', close_time: '', reason: '' });
                      setSonderOpen(true);
                    }}>
                      <Plus className="h-3 w-3 mr-1" />Sonderöffnungszeit
                    </Button>
                    <Button size="sm" className="bg-primary" onClick={() => {
                      updateStandort.mutate(s);
                      setEditingId(null);
                    }}>
                      Speichern
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Dialog open={sonderOpen} onOpenChange={setSonderOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Sonderöffnungszeit hinzufügen</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>Datum</Label><Input type="date" value={sonderForm.date} onChange={e => setSonderForm({ ...sonderForm, date: e.target.value })} className="mt-1" /></div>
            <div className="flex items-center gap-2">
              <Switch checked={sonderForm.is_open} onCheckedChange={v => setSonderForm({ ...sonderForm, is_open: v })} />
              <Label>{sonderForm.is_open ? 'Geöffnet' : 'Geschlossen'}</Label>
            </div>
            {sonderForm.is_open && (
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Von</Label><Input type="time" value={sonderForm.open_time} onChange={e => setSonderForm({ ...sonderForm, open_time: e.target.value })} className="mt-1" /></div>
                <div><Label>Bis</Label><Input type="time" value={sonderForm.close_time} onChange={e => setSonderForm({ ...sonderForm, close_time: e.target.value })} className="mt-1" /></div>
              </div>
            )}
            <div><Label>Grund</Label><Input value={sonderForm.reason} onChange={e => setSonderForm({ ...sonderForm, reason: e.target.value })} className="mt-1" placeholder="z.B. Feiertag" /></div>
            <Button className="w-full bg-primary" onClick={() => {
              if (!sonderStandortId || !sonderForm.date) return;
              addSonderzeit.mutate({ standort_id: sonderStandortId, ...sonderForm });
            }}>Speichern</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
