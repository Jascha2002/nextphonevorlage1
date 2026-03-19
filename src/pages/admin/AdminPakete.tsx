import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { pakete } from '@/data/paketeData';
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

export default function AdminPakete() {
  const { canEdit } = useAuth();
  const queryClient = useQueryClient();

  const { data: anfragen = [] } = useQuery({
    queryKey: ['paket-anfragen'],
    queryFn: async () => {
      const { data } = await supabase.from('paket_anfragen').select('*').order('created_at', { ascending: false });
      return data || [];
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from('paket_anfragen').update({ status }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['paket-anfragen'] });
      toast({ title: 'Status aktualisiert' });
    },
  });

  const weekAnfragen = (paketName: string) => {
    const week = 7 * 24 * 60 * 60 * 1000;
    return anfragen.filter(a => a.paket === paketName && (Date.now() - new Date(a.created_at).getTime()) < week).length;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Pakete Manager</h2>

      <Tabs defaultValue="pakete">
        <TabsList>
          <TabsTrigger value="pakete">Pakete ({pakete.length})</TabsTrigger>
          <TabsTrigger value="anfragen">Anfragen ({anfragen.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="pakete" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pakete.map(p => (
              <Card key={p.id}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant="secondary">{p.badge}</Badge>
                  </div>
                  <h3 className="font-bold text-lg">{p.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{p.subtitle}</p>
                  <p className="text-primary font-bold mb-2">{p.price}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {weekAnfragen(p.title)} Anfragen diese Woche
                    </Badge>
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
                    {anfragen.map(a => (
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
                            onChange={e => updateStatus.mutate({ id: a.id, status: e.target.value })}
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
    </div>
  );
}
