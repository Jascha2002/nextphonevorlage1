import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Star, FileText, Flame, AlertTriangle, UserPlus, Bell, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const typeIcons: Record<string, any> = {
  anfrage: CalendarDays,
  bewertung: Star,
  artikel: FileText,
  aktion_ablauf: Flame,
  aktion_abgelaufen: AlertTriangle,
  admin_registriert: UserPlus,
};

export default function AdminBenachrichtigungen() {
  const queryClient = useQueryClient();

  const { data: notifications = [] } = useQuery({
    queryKey: ['admin-notifications'],
    queryFn: async () => {
      const { data } = await supabase.from('benachrichtigungen').select('*').order('created_at', { ascending: false }).limit(100);
      return data || [];
    },
  });

  const markRead = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('benachrichtigungen').update({ is_read: true }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-notifications'] }),
  });

  const markAllRead = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from('benachrichtigungen').update({ is_read: true }).eq('is_read', false);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-notifications'] }),
  });

  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold">Benachrichtigungen</h2>
          {unreadCount > 0 && <Badge className="bg-primary text-primary-foreground">{unreadCount} neu</Badge>}
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={() => markAllRead.mutate()}>
            <Check className="h-4 w-4 mr-2" />Alle als gelesen markieren
          </Button>
        )}
      </div>

      <div className="space-y-2">
        {notifications.map(n => {
          const Icon = typeIcons[n.type] || Bell;
          return (
            <Card key={n.id} className={n.is_read ? 'opacity-60' : 'border-l-4 border-l-primary'}>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm">{n.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(n.created_at).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  {n.link && (
                    <Link to={n.link}>
                      <Button variant="outline" size="sm">Ansehen</Button>
                    </Link>
                  )}
                  {!n.is_read && (
                    <Button variant="ghost" size="sm" onClick={() => markRead.mutate(n.id)}>
                      <Check className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
        {notifications.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">Keine Benachrichtigungen vorhanden</div>
        )}
      </div>
    </div>
  );
}
