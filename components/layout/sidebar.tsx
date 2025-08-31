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
          'flex h-full flex-col bg-[#1C3D35] text-white shadow-xl transition-all duration-300 ease-in-out',
          collapsed ? 'w-20' : 'w-64'
        )}
      >
        {/* Logo Section */}
        <div
          className={cn(
            'flex items-center border-b border-white/10',
            collapsed ? 'justify-center p-2' : 'justify-start p-4'
          )}
        >
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#22C55E] to-[#16A34A] flex items-center justify-center shadow-lg">
            <Building className="h-6 w-6 text-white" />
          </div>

          {!collapsed && (
            <div className="ml-3">
              <h1 className="text-lg font-bold text-white">EasyImob</h1>
              <p className="text-xs text-white/70">Gestão Imobiliária</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className={cn('flex-1 py-4 space-y-1', collapsed ? 'px-2' : 'px-4')}>
          {navigation.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'group flex items-center text-sm font-medium transition-all duration-200 rounded-xl',
                  collapsed ? 'justify-center p-3' : 'px-4 py-3',
                  isActive
                    ? 'bg-[#22C55E] text-white shadow-lg'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                )}
                title={collapsed ? item.name : undefined}
              >
                <item.icon className="h-6 w-6 flex-shrink-0" />
                {!collapsed && <span className="ml-3 truncate font-medium">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        <div className={cn('border-t border-white/10 p-4', collapsed ? 'flex justify-center' : '')}>
          <div
            className={cn(
              'flex items-center rounded-xl hover:bg-white/5 transition-colors cursor-pointer',
              collapsed ? 'p-2' : 'p-3 space-x-3'
            )}
          >
            <div className="relative">
              <div
                className={cn(
                  'rounded-full bg-gradient-to-br from-[#22C55E] to-[#16A34A] flex items-center justify-center',
                  collapsed ? 'h-8 w-8' : 'h-10 w-10'
                )}
              >
                <User className="h-4 w-4 text-white" />
              </div>
              <div
                className={cn(
                  'absolute -bottom-0.5 -right-0.5 bg-green-400 rounded-full border-2 border-[#1C3D35]',
                  collapsed ? 'h-2.5 w-2.5' : 'h-3 w-3'
                )}
              ></div>
            </div>

            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">João Silva</p>
                <p className="text-xs text-white/70 truncate">Administrador</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Toggle Button */}
      {onToggle && (
        <button
          onClick={onToggle}
          className="absolute top-1/2 -translate-y-1/2 -right-4 z-30 flex items-center justify-center h-8 w-8 rounded-full bg-[#22C55E] hover:bg-[#16A34A] shadow-lg hover:shadow-xl text-white transition-all duration-300 ease-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#22C55E]/50"
          aria-label={collapsed ? 'Expandir sidebar' : 'Recolher sidebar'}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      )}
    </div>
  );
}
