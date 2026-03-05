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
import { Plus, Pencil, Trash2, FileText } from 'lucide-react';
import { toast } from 'sonner';

const statusColors: Record<string, string> = {
  entwurf: 'bg-yellow-500',
  'veröffentlicht': 'bg-green-500',
  geplant: 'bg-blue-500',
  archiviert: 'bg-muted-foreground',
};

const categories = ['Tarife', 'Smartphones', 'Tipps & Tricks', 'Aktionen', 'News', 'Unternehmen'];

const blogTemplates = [
  {
    title: '5 Zeichen dass du deinen Handyvertrag wechseln solltest',
    category: 'Tipps & Tricks',
    content: `Viele Kunden zahlen monatlich zu viel — ohne es zu wissen. Wir zeigen dir die 5 häufigsten Anzeichen dass dein aktueller Tarif nicht mehr passt und wie du in wenigen Schritten wechselst.

## 1. Dein Datenvolumen reicht nicht mehr
Du bist ständig im mobilen Netz unterwegs, aber dein Datenvolumen ist schon zur Monatsmitte aufgebraucht? Dann passt dein Tarif nicht mehr zu deinem Nutzungsverhalten.

## 2. Du zahlst mehr als 30€ für wenig Leistung
Viele Altverträge sind überteuert. Vergleiche mal deinen aktuellen Tarif mit den neuesten Angeboten — du wirst überrascht sein.

## 3. Dein Netz ist oft schwach oder weg
Wenn du regelmäßig Empfangsprobleme hast, könnte ein Netzwechsel die Lösung sein. Verschiedene Anbieter haben unterschiedliche Netzabdeckungen.

## 4. Dein Vertrag läuft seit über 24 Monaten
Nach Ablauf der Mindestlaufzeit zahlst du oft den vollen Preis ohne Gegenleistung. Ein Wechsel lohnt sich fast immer.

## 5. Du kennst deinen Tarif nicht mehr genau
Wenn du nicht weißt, was dein Tarif beinhaltet, ist es höchste Zeit für eine Überprüfung.

## Fazit
Lass dich kostenlos beraten — in einem unserer 5 Standorte in Thüringen.

[Jetzt Beratung sichern](/beratung)`,
    meta_description: 'Zahlst du zu viel für deinen Handyvertrag? 5 klare Anzeichen, dass ein Wechsel sich lohnt — und wie NextPhones dir dabei hilft.',
  },
  {
    title: 'Telekom MagentaMobil — jetzt mit 100€ Wechselbonus sichern',
    category: 'Aktionen',
    content: `Die Telekom belohnt Neukunden aktuell mit einem attraktiven Wechselbonus. Wir erklären wer profitiert und wie der Wechsel reibungslos klappt.

## Was ist der Wechselbonus?
Die Telekom bietet aktuell einen Bonus von 100€ für alle Neukunden, die von einem anderen Anbieter zu MagentaMobil wechseln.

## Wer bekommt ihn?
Jeder, der aktuell bei einem anderen Mobilfunkanbieter ist und zu einem MagentaMobil Tarif wechselt. Der Bonus wird nach Aktivierung gutgeschrieben.

## Was ist im Tarif enthalten?
MagentaMobil Tarife bieten StreamOn, EU-Roaming ohne Aufpreis und das beste Telekom-Netz Deutschlands.

## So wechselst du mit NextPhones
Komm einfach in eine unserer Filialen — wir kümmern uns um alles: Rufnummernmitnahme, Kündigung beim alten Anbieter und die Einrichtung deines neuen Tarifs.

[Aktion sichern](/beratung)`,
    meta_description: 'Telekom MagentaMobil mit 100€ Wechselbonus — jetzt bei NextPhones in Thüringen sichern. Persönliche Beratung inklusive.',
  },
  {
    title: 'Samsung Galaxy S25 — lohnt sich das Upgrade vom S23?',
    category: 'Smartphones',
    content: `Das neue Galaxy S25 ist da — aber lohnt sich das Upgrade wirklich? Wir vergleichen die wichtigsten Unterschiede für dich.

## Display & Design Vergleich
Das S25 kommt mit einem helleren, energieeffizienteren Display und einem noch schlankeren Rahmen. Die Verbesserungen sind sichtbar, aber nicht revolutionär.

## Kamera Verbesserungen
Die Hauptkamera bleibt bei 50MP, aber der neue Bildprozessor liefert deutlich bessere Nachtaufnahmen und schärfere Zoom-Fotos.

## Akku & Performance
Der neue Snapdragon Prozessor ist bis zu 30% schneller bei gleichzeitig besserem Energieverbrauch. Die Akkulaufzeit ist spürbar besser.

## Unser Fazit
Wenn du ein S23 hast und zufrieden bist, ist ein Upgrade nice-to-have aber kein Muss. Kommst du von einem S21 oder älter, lohnt sich der Sprung definitiv.

[Jetzt beraten lassen](/beratung)`,
    meta_description: 'Samsung Galaxy S25 vs S23 Vergleich — lohnt sich das Upgrade? NextPhones zeigt dir die wichtigsten Unterschiede.',
  },
  {
    title: 'WLAN zu langsam? Diese 6 Fehler machst du wahrscheinlich',
    category: 'Tipps & Tricks',
    content: `Langsames WLAN nervt — aber oft liegt es nicht am Anbieter. Wir zeigen dir die häufigsten Fehler und wie du sie in Minuten behebst.

## 1. Router steht am falschen Ort
Der Router gehört zentral in die Wohnung, nicht in die hinterste Ecke. Dicke Wände und Möbel schwächen das Signal.

## 2. Veraltete Router-Firmware
Updates bringen nicht nur Sicherheit, sondern oft auch bessere Performance. Prüfe regelmäßig auf neue Firmware.

## 3. Zu viele Geräte im Netz
Smart-TV, Laptop, Tablets, Smartphones — jedes Gerät teilt die Bandbreite. Trenne Geräte, die du nicht aktiv nutzt.

## 4. Falsches WLAN-Band gewählt
5 GHz ist schneller, 2,4 GHz hat mehr Reichweite. Nutze das passende Band für deine Situation.

## 5. Nachbarn nutzen deinen Kanal
In Mehrfamilienhäusern funken viele Router auf dem gleichen Kanal. Ein Kanalwechsel kann Wunder wirken.

## 6. Router ist einfach zu alt
Ältere Router unterstützen keine modernen Standards wie Wi-Fi 6. Ein neuer Router kann die Geschwindigkeit verdoppeln.

[WLAN Einrichtung buchen](/beratung)`,
    meta_description: 'WLAN zu langsam? Die 6 häufigsten Fehler und wie du sie schnell behebst. NextPhones hilft bei der WLAN-Einrichtung.',
  },
  {
    title: 'NextPhones feiert 15 Jahre — danke Thüringen!',
    category: 'Unternehmen',
    content: `15 Jahre NextPhones bedeuten 15 Jahre Vertrauen, Beratung und gemeinsame Erlebnisse mit über 17.500 Kunden in Thüringen. Ein Blick zurück — und nach vorne.

## Wie alles begann
Was als kleiner Shop in Erfurt begann, ist heute ein Netzwerk aus 5 Filialen in ganz Thüringen. Unser Antrieb war von Anfang an: persönliche Beratung statt anonymer Hotlines.

## Was wir gelernt haben
In 15 Jahren haben wir eines gelernt: Technik verändert sich ständig, aber der Wunsch nach ehrlicher Beratung bleibt. Das treibt uns jeden Tag an.

## Was unsere Kunden sagen
Über 17.500 zufriedene Kunden und eine durchschnittliche Bewertung von 4,8 Sternen sprechen für sich. Danke für euer Vertrauen!

## Was als nächstes kommt
Wir arbeiten an noch mehr Services, erweiterten Öffnungszeiten und neuen Partnerschaften — immer mit dem Ziel, euch den besten Service in Thüringen zu bieten.

[Besuche uns in deiner Filiale](/standorte)`,
    meta_description: 'NextPhones feiert 15 Jahre in Thüringen — über 17.500 zufriedene Kunden. Danke für euer Vertrauen!',
  },
];

export default function AdminBlog() {
  const { adminUser, canEdit } = useAuth();
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState('alle');
  const [editingPost, setEditingPost] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isTemplateOpen, setIsTemplateOpen] = useState(false);

  const { data: posts = [] } = useQuery({
    queryKey: ['admin-blog-posts'],
    queryFn: async () => {
      const { data } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
      return data || [];
    },
  });

  const filteredPosts = filter === 'alle'
    ? posts
    : filter === 'versteckt'
      ? posts.filter(p => p.show_on_website === false)
      : posts.filter(p => p.status === filter);

  const saveMutation = useMutation({
    mutationFn: async (post: any) => {
      const slug = post.slug || post.title.toLowerCase().replace(/[^a-z0-9äöüß]+/g, '-').replace(/(^-|-$)/g, '');
      const readingTime = Math.ceil((post.content?.split(' ').length || 0) / 200);
      const data = {
        ...post,
        slug,
        reading_time: readingTime,
        author_id: adminUser?.id,
        published_at: post.status === 'veröffentlicht' ? new Date().toISOString() : post.published_at,
      };
      delete data.id;
      delete data.created_at;
      delete data.updated_at;

      if (editingPost?.id) {
        const { error } = await supabase.from('blog_posts').update(data).eq('id', editingPost.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('blog_posts').insert(data);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blog-posts'] });
      setIsDialogOpen(false);
      setEditingPost(null);
      toast.success('Artikel gespeichert');
    },
    onError: (e: any) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('blog_posts').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blog-posts'] });
      toast.success('Artikel gelöscht');
    },
  });

  const toggleVisibility = useMutation({
    mutationFn: async ({ id, show }: { id: string; show: boolean }) => {
      const { error } = await supabase.from('blog_posts').update({ show_on_website: show }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blog-posts'] });
    },
  });

  const openNew = () => {
    setEditingPost({ title: '', slug: '', content: '', category: '', status: 'entwurf', meta_title: '', meta_description: '', cover_image: '', tags: [], show_on_website: true });
    setIsDialogOpen(true);
  };

  const openEdit = (post: any) => {
    setEditingPost({ ...post });
    setIsDialogOpen(true);
  };

  const applyTemplate = (template: typeof blogTemplates[0]) => {
    setEditingPost({
      title: template.title,
      slug: '',
      content: template.content,
      category: template.category,
      status: 'entwurf',
      meta_title: template.title.slice(0, 60),
      meta_description: template.meta_description,
      cover_image: '',
      tags: [],
      show_on_website: true,
    });
    setIsTemplateOpen(false);
    setIsDialogOpen(true);
  };

  const filterTabs = [
    { key: 'alle', label: 'Alle' },
    { key: 'veröffentlicht', label: 'Veröffentlicht' },
    { key: 'entwurf', label: 'Entwurf' },
    { key: 'geplant', label: 'Geplant' },
    { key: 'archiviert', label: 'Archiviert' },
    { key: 'versteckt', label: 'Versteckt' },
  ];

  const getCount = (key: string) => {
    if (key === 'alle') return posts.length;
    if (key === 'versteckt') return posts.filter(p => p.show_on_website === false).length;
    return posts.filter(p => p.status === key).length;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-2xl font-bold">Blog Manager</h2>
        <div className="flex gap-2">
          {canEdit && (
            <Button variant="outline" onClick={() => setIsTemplateOpen(true)}>
              <FileText className="h-4 w-4 mr-2" />Vorlagen verwenden
            </Button>
          )}
          {canEdit && <Button onClick={openNew} className="bg-primary"><Plus className="h-4 w-4 mr-2" />Neuer Artikel</Button>}
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {filterTabs.map(t => (
          <Button key={t.key} variant={filter === t.key ? 'default' : 'outline'} size="sm" onClick={() => setFilter(t.key)}>
            {t.label} ({getCount(t.key)})
          </Button>
        ))}
      </div>

      {/* Posts Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-medium text-muted-foreground">Titel</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Kategorie</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Sichtbar</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Datum</th>
                  <th className="text-right p-4 font-medium text-muted-foreground">Aktionen</th>
                </tr>
              </thead>
              <tbody>
                {filteredPosts.map(post => (
                  <tr key={post.id} className="border-b hover:bg-muted/50">
                    <td className="p-4 font-medium">{post.title}</td>
                    <td className="p-4">{post.category || '—'}</td>
                    <td className="p-4">
                      <Badge variant="secondary" className="text-xs">
                        <span className={`inline-block w-2 h-2 rounded-full mr-1.5 ${statusColors[post.status] || 'bg-muted-foreground'}`} />
                        {post.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Switch
                        checked={post.show_on_website !== false}
                        onCheckedChange={v => toggleVisibility.mutate({ id: post.id, show: v })}
                        disabled={!canEdit}
                      />
                    </td>
                    <td className="p-4 text-muted-foreground">{new Date(post.created_at).toLocaleDateString('de-DE')}</td>
                    <td className="p-4 text-right">
                      <div className="flex gap-1 justify-end">
                        {canEdit && (
                          <Button variant="ghost" size="sm" onClick={() => openEdit(post)}><Pencil className="h-4 w-4" /></Button>
                        )}
                        {canEdit && (
                          <Button variant="ghost" size="sm" onClick={() => deleteMutation.mutate(post.id)} className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredPosts.length === 0 && (
                  <tr><td colSpan={6} className="p-8 text-center text-muted-foreground">Keine Artikel gefunden</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Templates Modal */}
      <Dialog open={isTemplateOpen} onOpenChange={setIsTemplateOpen}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>📋 Artikel-Vorlagen</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground mb-4">Wähle eine Vorlage als Ausgangspunkt für deinen neuen Artikel. Du kannst den Inhalt danach frei anpassen.</p>
          <div className="space-y-3">
            {blogTemplates.map((tpl, i) => (
              <div key={i} className="border rounded-lg p-4 flex items-start justify-between gap-4 hover:bg-muted/50 transition-colors">
                <div className="flex-1 min-w-0">
                  <Badge variant="secondary" className="text-xs mb-2">{tpl.category}</Badge>
                  <h4 className="font-semibold text-sm">{tpl.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{tpl.meta_description}</p>
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
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingPost?.id ? 'Artikel bearbeiten' : 'Neuer Artikel'}</DialogTitle>
          </DialogHeader>
          {editingPost && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <div>
                  <Label>Titel</Label>
                  <Input value={editingPost.title} onChange={e => setEditingPost({ ...editingPost, title: e.target.value })} className="mt-1 text-lg font-semibold" />
                </div>
                <div>
                  <Label>URL Slug</Label>
                  <Input value={editingPost.slug} onChange={e => setEditingPost({ ...editingPost, slug: e.target.value })} className="mt-1" placeholder="auto-generiert" />
                </div>
                <div>
                  <Label>Kategorie</Label>
                  <Select value={editingPost.category || ''} onValueChange={v => setEditingPost({ ...editingPost, category: v })}>
                    <SelectTrigger className="mt-1"><SelectValue placeholder="Kategorie wählen" /></SelectTrigger>
                    <SelectContent>{categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Inhalt</Label>
                  <Textarea value={editingPost.content || ''} onChange={e => setEditingPost({ ...editingPost, content: e.target.value })} className="mt-1 min-h-[300px]" />
                </div>
                <div className="border rounded-lg p-4 space-y-3">
                  <h4 className="font-medium text-sm">SEO</h4>
                  <div>
                    <Label className="text-xs">Meta Title ({(editingPost.meta_title || '').length}/60)</Label>
                    <Input value={editingPost.meta_title || ''} onChange={e => setEditingPost({ ...editingPost, meta_title: e.target.value })} className="mt-1" maxLength={60} />
                  </div>
                  <div>
                    <Label className="text-xs">Meta Description ({(editingPost.meta_description || '').length}/160)</Label>
                    <Textarea value={editingPost.meta_description || ''} onChange={e => setEditingPost({ ...editingPost, meta_description: e.target.value })} className="mt-1" maxLength={160} />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Status</Label>
                  <Select value={editingPost.status} onValueChange={v => setEditingPost({ ...editingPost, status: v })}>
                    <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="entwurf">Entwurf</SelectItem>
                      <SelectItem value="veröffentlicht">Veröffentlicht</SelectItem>
                      <SelectItem value="geplant">Geplant</SelectItem>
                      <SelectItem value="archiviert">Archiviert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Beitragsbild URL</Label>
                  <Input value={editingPost.cover_image || ''} onChange={e => setEditingPost({ ...editingPost, cover_image: e.target.value })} className="mt-1" />
                </div>

                <div className="flex items-center justify-between border rounded-lg p-3">
                  <Label>Auf Website anzeigen</Label>
                  <Switch checked={editingPost.show_on_website !== false} onCheckedChange={v => setEditingPost({ ...editingPost, show_on_website: v })} />
                </div>

                <div className="flex gap-2 pt-4">
                  <Button variant="outline" onClick={() => { setEditingPost({ ...editingPost, status: 'entwurf' }); saveMutation.mutate(editingPost); }} className="flex-1">
                    Entwurf
                  </Button>
                  <Button onClick={() => saveMutation.mutate(editingPost)} className="flex-1 bg-primary" disabled={saveMutation.isPending}>
                    {saveMutation.isPending ? 'Speichern...' : editingPost.status === 'veröffentlicht' ? 'Veröffentlichen' : 'Speichern'}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
