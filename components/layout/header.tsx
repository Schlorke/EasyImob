'use client';

import { Search, Bell, Settings, User, Wifi, WifiOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useHealth } from '@/hooks/use-health';
import { useEffect, useState } from 'react';

export function Header() {
  const { data: health, isLoading } = useHealth();
  const [mounted, setMounted] = useState(false);
  const isOnline = health?.status === 'ok';

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="h-20 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex h-full items-center justify-between px-8">
        {/* Search Section */}
        <div className="flex items-center space-x-6 flex-1">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar imóveis, vendas, relatórios..."
              className="pl-10 pr-4 py-2 w-full rounded-xl border-gray-200 focus:border-[#22C55E] focus:ring-[#22C55E]"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Status Badge */}
          {mounted && (
            <Badge
              variant={isOnline ? 'default' : 'destructive'}
              className={cn(
                'flex items-center space-x-1 px-3 py-1 rounded-full',
                isOnline
                  ? 'bg-green-100 text-green-800 hover:bg-green-200'
                  : 'bg-red-100 text-red-800 hover:bg-red-200'
              )}
            >
              {isOnline ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
              <span className="text-xs font-medium">
                {isLoading ? 'Conectando...' : isOnline ? 'Online' : 'Offline'}
              </span>
            </Badge>
          )}

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative p-2 rounded-xl hover:bg-gray-100">
            <Bell className="h-5 w-5 text-gray-600" />
            <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></div>
          </Button>

          {/* Settings */}
          <Button variant="ghost" size="sm" className="p-2 rounded-xl hover:bg-gray-100">
            <Settings className="h-5 w-5 text-gray-600" />
          </Button>

          {/* User Profile */}
          <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">João Silva</p>
              <p className="text-xs text-gray-500">Administrador</p>
            </div>
            <div className="relative">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#22C55E] to-[#16A34A] flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              {/* Online status */}
              <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
