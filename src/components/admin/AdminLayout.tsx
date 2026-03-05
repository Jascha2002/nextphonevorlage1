import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import {
  LayoutDashboard, FileText, Flame, Star, Users, MapPin,
  Bell, Settings, LogOut, ChevronLeft, ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
  { label: 'Blog Manager', icon: FileText, path: '/admin/blog' },
  { label: 'Aktionen Manager', icon: Flame, path: '/admin/aktionen' },
  { label: 'Bewertungsmanager', icon: Star, path: '/admin/bewertungen' },
  { label: 'Team Manager', icon: Users, path: '/admin/team' },
  { label: 'Standorte', icon: MapPin, path: '/admin/standorte' },
  { label: 'Benachrichtigungen', icon: Bell, path: '/admin/benachrichtigungen' },
  { label: 'Einstellungen', icon: Settings, path: '/admin/einstellungen' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { adminUser, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const roleLabel = adminUser?.role === 'super_admin' ? 'Super Admin' : adminUser?.role === 'redakteur' ? 'Redakteur' : 'Betrachter';
  const roleBadgeColor = adminUser?.role === 'super_admin' ? 'bg-primary text-primary-foreground' : adminUser?.role === 'redakteur' ? 'bg-blue-600 text-white' : 'bg-muted-foreground text-white';

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 h-full bg-[#1A1A1A] text-white flex flex-col z-50 transition-all duration-300",
        collapsed ? "w-16" : "w-[260px]"
      )}>
        {/* Logo */}
        <div className="p-4 flex items-center gap-3 border-b border-white/10">
          <img src="/images/nextphones-logo.png" alt="NextPhones" className="h-8 w-auto" />
          {!collapsed && (
            <Badge className="bg-primary text-primary-foreground text-xs">Admin</Badge>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {navItems.map(item => {
            const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 mx-2 rounded-lg transition-colors text-sm",
                  isActive
                    ? "bg-primary text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/10"
                )}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="border-t border-white/10 p-4">
          {!collapsed && adminUser && (
            <div className="mb-3">
              <p className="text-sm font-medium truncate">{adminUser.name}</p>
              <Badge className={cn("text-xs mt-1", roleBadgeColor)}>{roleLabel}</Badge>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSignOut}
            className="w-full justify-start text-gray-400 hover:text-white hover:bg-white/10"
          >
            <LogOut className="h-4 w-4 mr-2" />
            {!collapsed && "Abmelden"}
          </Button>
        </div>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 bg-[#1A1A1A] border border-white/20 rounded-full p-1 text-gray-400 hover:text-white"
        >
          {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
        </button>
      </aside>

      {/* Main */}
      <div className={cn("flex-1 transition-all duration-300", collapsed ? "ml-16" : "ml-[260px]")}>
        {/* Topbar */}
        <header className="sticky top-0 z-40 bg-background border-b h-16 flex items-center justify-between px-6">
          <h1 className="text-lg font-semibold">
            {navItems.find(i => location.pathname === i.path || (i.path !== '/admin' && location.pathname.startsWith(i.path)))?.label || 'Admin'}
          </h1>
          <div className="flex items-center gap-4">
            <Link to="/admin/benachrichtigungen" className="relative">
              <Bell className="h-5 w-5 text-muted-foreground" />
            </Link>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium">
                {adminUser?.name?.charAt(0) || 'A'}
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium">{adminUser?.name}</p>
                <p className="text-xs text-muted-foreground">{roleLabel}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
