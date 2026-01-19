import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Settings,
  Users,
  Activity,
  ChevronLeft,
  ChevronRight,
  Building2,
  Shield,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'დეშბორდი', path: '/' },
  { icon: FileText, label: 'განაცხადები', path: '/applications' },
  { icon: Settings, label: 'Rule Engine', path: '/rules' },
  { icon: Activity, label: 'მონიტორინგი', path: '/monitoring' },
  { icon: Users, label: 'მომხმარებლები', path: '/users' },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen bg-sidebar transition-all duration-300 flex flex-col',
        collapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-sidebar-border">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-sidebar-primary">
          <Building2 className="w-6 h-6 text-sidebar-primary-foreground" />
        </div>
        {!collapsed && (
          <div className="animate-fade-in">
            <h1 className="text-lg font-bold text-sidebar-foreground">LoanFlow</h1>
            <p className="text-xs text-sidebar-foreground/60">სესხების მართვა</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn('nav-item', isActive && 'nav-item-active')}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && (
                <span className="animate-fade-in whitespace-nowrap">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Security Badge */}
      <div className={cn('px-4 py-4 border-t border-sidebar-border', collapsed && 'px-3')}>
        <div
          className={cn(
            'flex items-center gap-3 px-4 py-3 rounded-lg bg-sidebar-accent/50',
            collapsed && 'justify-center px-2'
          )}
        >
          <Shield className="w-5 h-5 text-success flex-shrink-0" />
          {!collapsed && (
            <div className="animate-fade-in">
              <p className="text-xs font-medium text-sidebar-foreground">დაცული კავშირი</p>
              <p className="text-[10px] text-sidebar-foreground/60">SSL/TLS Encrypted</p>
            </div>
          )}
        </div>
      </div>

      {/* Collapse Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground shadow-md hover:bg-primary/90 transition-colors"
      >
        {collapsed ? (
          <ChevronRight className="w-4 h-4" />
        ) : (
          <ChevronLeft className="w-4 h-4" />
        )}
      </button>
    </aside>
  );
}
