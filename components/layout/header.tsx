'use client';

import { Building2, Wifi, WifiOff } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useHealth } from '@/hooks/use-health';

export function Header() {
  const { data: health, isLoading } = useHealth();
  const isOnline = health?.status === 'ok';

  return (
    <header className="border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
      <div className="flex h-16 items-center px-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold text-foreground">EasyImob</h1>
              <p className="text-xs text-muted-foreground">Analytics Dashboard - UNIVALI HOW VII</p>
            </div>
          </div>
        </div>

        <div className="ml-auto flex items-center space-x-4">
          <Badge
            variant={isOnline ? 'default' : 'destructive'}
            className="flex items-center space-x-1"
          >
            {isLoading ? (
              <div className="h-2 w-2 rounded-full bg-current animate-pulse" />
            ) : isOnline ? (
              <Wifi className="h-3 w-3" />
            ) : (
              <WifiOff className="h-3 w-3" />
            )}
            <span className="text-xs">
              {isLoading ? 'Verificando...' : isOnline ? 'Online' : 'Offline'}
            </span>
          </Badge>
        </div>
      </div>
    </header>
  );
}
