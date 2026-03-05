import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Pencil, Trash2, Eye } from 'lucide-react';
import { toast } from 'sonner';

const statusColors: Record<string, string> = {
  entwurf: 'bg-yellow-500',
  'veröffentlicht': 'bg-green-500',
  geplant: 'bg-blue-500',
  archiviert: 'bg-muted-foreground',
};

const categories = ['Tarife', 'Smartphones', 'Tipps & Tricks', 'Aktionen', 'News'];

export default function AdminBlog() {
  const { adminUser, canEdit } = useAuth();
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState('alle');
  const [editingPost, setEditingPost] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: posts = [] } = useQuery({
    queryKey: ['admin-blog-posts'],
    queryFn: async () => {
      const { data } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
      return data || [];
    },
  });

  const filteredPosts = filter === 'alle' ? posts : posts.filter(p => p.status === filter);

  const saveMutation = useMutation({
    mutationFn: async (post: any) => {
      const slug = post.slug || post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
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

  const openNew = () => {
    setEditingPost({ title: '', slug: '', content: '', category: '', status: 'entwurf', meta_title: '', meta_description: '', cover_image: '', tags: [] });
    setIsDialogOpen(true);
  };

  const openEdit = (post: any) => {
    setEditingPost({ ...post });
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Blog Manager</h2>
        {canEdit && <Button onClick={openNew} className="bg-primary"><Plus className="h-4 w-4 mr-2" />Neuer Artikel</Button>}
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {['alle', 'entwurf', 'veröffentlicht', 'geplant', 'archiviert'].map(s => (
          <Button key={s} variant={filter === s ? 'default' : 'outline'} size="sm" onClick={() => setFilter(s)} className="capitalize">
            {s === 'alle' ? 'Alle' : s.charAt(0).toUpperCase() + s.slice(1)} ({s === 'alle' ? posts.length : posts.filter(p => p.status === s).length})
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
                        <span className={`inline-block w-2 h-2 rounded-full mr-1.5 ${statusColors[post.status]}`} />
                        {post.status}
                      </Badge>
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
                  <tr><td colSpan={5} className="p-8 text-center text-muted-foreground">Keine Artikel gefunden</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

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
