import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { CalendarDays, ClipboardList, Star, Eye, Plus, TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useState } from 'react';

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

export default function AdminDashboard() {
  const { adminUser } = useAuth();
  const [chartRange, setChartRange] = useState<7 | 30 | 90>(30);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Guten Morgen' : hour < 18 ? 'Guten Tag' : 'Guten Abend';

  const { data: anfragen = [] } = useQuery({
    queryKey: ['anfragen'],
    queryFn: async () => {
      const { data } = await supabase.from('beratungsanfragen').select('*').order('created_at', { ascending: false }).limit(10);
      return data || [];
    },
  });

  const { data: bewertungen = [] } = useQuery({
    queryKey: ['bewertungen-count'],
    queryFn: async () => {
      const { data } = await supabase.from('bewertungen').select('*');
      return data || [];
    },
  });

  const todayAnfragen = anfragen.filter(a => new Date(a.created_at).toDateString() === new Date().toDateString()).length;
  const offeneAnfragen = anfragen.filter(a => a.status === 'neu' || a.status === 'in_bearbeitung').length;
  const weekBewertungen = bewertungen.filter(b => {
    const d = new Date(b.created_at);
    const now = new Date();
    return (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24) <= 7;
  }).length;

  // Mock chart data
  const chartData = Array.from({ length: chartRange }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (chartRange - 1 - i));
    return {
      date: date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' }),
      anfragen: Math.floor(Math.random() * 10) + 1,
    };
  });

  const standortData = [
    { name: 'Erfurt', anfragen: 45 },
    { name: 'Weimar', anfragen: 32 },
    { name: 'Jena', anfragen: 28 },
    { name: 'Gotha', anfragen: 18 },
    { name: 'Arnstadt', anfragen: 12 },
  ];

  const stats = [
    { label: 'Neue Anfragen heute', value: todayAnfragen, icon: CalendarDays, change: '+2' },
    { label: 'Offene Anfragen', value: offeneAnfragen, icon: ClipboardList, change: '-1' },
    { label: 'Neue Bewertungen (Woche)', value: weekBewertungen, icon: Star, change: '+3' },
    { label: 'Website Besucher heute', value: 247, icon: Eye, change: '+12%' },
  ];

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div>
        <h2 className="text-2xl font-bold">{greeting}, {adminUser?.name?.split(' ')[0]} 👋</h2>
        <p className="text-muted-foreground">{new Date().toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                  <p className="text-3xl font-bold mt-1">{s.value}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {s.change.startsWith('+') ? <TrendingUp className="h-3 w-3 text-green-500" /> : <TrendingDown className="h-3 w-3 text-destructive" />}
                    <span className={`text-xs ${s.change.startsWith('+') ? 'text-green-500' : 'text-destructive'}`}>{s.change}</span>
                  </div>
                </div>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <s.icon className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Anfragen</CardTitle>
            <div className="flex gap-1">
              {([7, 30, 90] as const).map(r => (
                <Button key={r} variant={chartRange === r ? 'default' : 'ghost'} size="sm" onClick={() => setChartRange(r)}>
                  {r}T
                </Button>
              ))}
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip />
                <Line type="monotone" dataKey="anfragen" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-base">Anfragen pro Standort</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={standortData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip />
                <Bar dataKey="anfragen" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Anfragen */}
      <Card>
        <CardHeader><CardTitle className="text-base">Letzte Anfragen</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 font-medium text-muted-foreground">Name</th>
                  <th className="text-left py-3 font-medium text-muted-foreground">Standort</th>
                  <th className="text-left py-3 font-medium text-muted-foreground">Anliegen</th>
                  <th className="text-left py-3 font-medium text-muted-foreground">Datum</th>
                  <th className="text-left py-3 font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {anfragen.slice(0, 10).map(a => (
                  <tr key={a.id} className="border-b hover:bg-muted/50">
                    <td className="py-3">{a.name}</td>
                    <td className="py-3">{a.standort || '—'}</td>
                    <td className="py-3">{a.anliegen || '—'}</td>
                    <td className="py-3">{new Date(a.created_at).toLocaleDateString('de-DE')}</td>
                    <td className="py-3">
                      <Badge variant="secondary" className="text-xs">
                        <span className={`inline-block w-2 h-2 rounded-full mr-1.5 ${statusColors[a.status]}`} />
                        {statusLabels[a.status] || a.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
                {anfragen.length === 0 && (
                  <tr><td colSpan={5} className="py-8 text-center text-muted-foreground">Keine Anfragen vorhanden</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link to="/admin/blog"><Button variant="outline" className="w-full"><Plus className="h-4 w-4 mr-2" />Neuer Blog Artikel</Button></Link>
        <Link to="/admin/aktionen"><Button variant="outline" className="w-full"><Plus className="h-4 w-4 mr-2" />Neue Aktion</Button></Link>
        <Link to="/admin/bewertungen"><Button variant="outline" className="w-full"><Star className="h-4 w-4 mr-2" />Bewertungen prüfen</Button></Link>
        <Link to="/admin/standorte"><Button variant="outline" className="w-full"><ClipboardList className="h-4 w-4 mr-2" />Anfragen ansehen</Button></Link>
      </div>
    </div>
  );
}
