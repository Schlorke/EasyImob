'use client';

import { usePathname } from 'next/navigation';
import {
  Building,
  TrendingUp,
  FileText,
  Home,
  ChevronLeft,
  ChevronRight,
  User,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Imóveis', href: '/properties', icon: Building },
  { name: 'Vendas', href: '/sales', icon: TrendingUp },
  { name: 'Relatórios', href: '/reports', icon: FileText },
];

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

export function Sidebar({ collapsed = false, onToggle }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className="relative">
      <aside
        className={cn(
          'flex h-full flex-col bg-[#1C3D35] text-white shadow-xl transition-[width] duration-300 ease-in-out',
          collapsed ? 'w-20' : 'w-64'
        )}
      >
        {/* Logo Section */}
        <div
          className={cn(
            'flex items-center border-b border-white/10 sidebar-logo-container',
            collapsed ? 'justify-center p-4' : 'justify-start p-4'
          )}
        >
          <div className=" p-4 rounded-xl bg-gradient-to-br from-[#22C55E] to-[#16A34A] flex items-center justify-center shadow-lg flex-shrink-0">
            <Building className="h-5 w-5 text-white flex-shrink-0" />
          </div>

          {!collapsed && (
            <div className="ml-3 sidebar-text-fade">
              <h1 className="text-lg font-bold text-white">EasyImob</h1>
              <p className="text-xs text-white/70">Gestão Imobiliária</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className={cn('flex-1 py-4 space-y-1 sidebar-nav', collapsed ? 'px-2' : 'px-4')}>
          {navigation.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'group flex items-center text-sm font-medium rounded-xl sidebar-nav-item',
                  collapsed ? 'justify-center p-0' : 'px-4 py-3',
                  !collapsed && isActive
                    ? 'bg-[#22C55E] text-white shadow-lg'
                    : !collapsed
                      ? 'text-white/80 hover:bg-white/10 hover:text-white'
                      : 'text-white/80'
                )}
                title={collapsed ? item.name : undefined}
              >
                {collapsed ? (
                  /* Container com lógica de página selecionada */
                  <div
                    className={cn(
                      'p-4 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0',
                      isActive
                        ? 'bg-gradient-to-br from-[#22C55E] to-[#16A34A]'
                        : 'bg-white/10 hover:bg-white/20'
                    )}
                  >
                    <item.icon className="h-5 w-5 text-white flex-shrink-0" />
                  </div>
                ) : (
                  /* Container para quando expandido */
                  <>
                    <div className="h-8 w-8 flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                    </div>
                    <span className="ml-3 truncate font-medium sidebar-text-fade">{item.name}</span>
                  </>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        <div className={cn('border-t border-white/10 p-4', collapsed ? 'flex justify-center' : '')}>
          <div
            className={cn(
              'flex items-center rounded-xl hover:bg-white/5 cursor-pointer sidebar-user-container',
              collapsed ? 'justify-center p-3' : 'p-3 space-x-3'
            )}
          >
            {collapsed ? (
              /* Avatar redondo bonito quando colapsado */
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#22C55E] to-[#16A34A] flex items-center justify-center shadow-lg flex-shrink-0">
                  <User className="h-5 w-5 text-white flex-shrink-0" />
                </div>
                <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-400 rounded-full border-2 border-[#1C3D35] shadow-sm"></div>
              </div>
            ) : (
              /* Layout expandido */
              <>
                <div className="relative flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#22C55E] to-[#16A34A] flex items-center justify-center shadow-lg">
                    <User className="h-5 w-5 text-white flex-shrink-0" />
                  </div>
                  <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-400 rounded-full border-2 border-[#1C3D35] shadow-sm"></div>
                </div>
                <div className="flex-1 min-w-0 sidebar-text-fade">
                  <p className="text-sm font-medium text-white truncate">João Silva</p>
                  <p className="text-xs text-white/70 truncate">Administrador</p>
                </div>
              </>
            )}
          </div>
        </div>
      </aside>

      {/* Toggle Button */}
      {onToggle && (
        <button
          onClick={onToggle}
          className="absolute top-1/2 -translate-y-1/2 -right-4 z-30 flex items-center justify-center h-8 w-8 rounded-full bg-[#22C55E] hover:bg-[#16A34A] shadow-lg hover:shadow-xl text-white focus:outline-none focus:ring-2 focus:ring-[#22C55E]/50 sidebar-toggle-btn"
          aria-label={collapsed ? 'Expandir sidebar' : 'Recolher sidebar'}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4 flex-shrink-0" />
          ) : (
            <ChevronLeft className="h-4 w-4 flex-shrink-0" />
          )}
        </button>
      )}
    </div>
  );
}
