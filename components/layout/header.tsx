"use client"

import { cn } from "@/lib/utils"

import { Building2, Wifi, WifiOff } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useHealth } from "@/hooks/use-health"

export function Header() {
  const { data: health, isLoading } = useHealth()
  const isOnline = health?.status === "ok"

  return (
    <header className="border-b border-border/50 glass-effect luxury-shadow">
      <div className="flex h-20 items-center px-8">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Building2 className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-luxury text-balance bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                EasyImob
              </h1>
              <p className="text-sm text-muted-foreground font-elegant">Analytics Dashboard - UNIVALI HOW VII</p>
            </div>
          </div>
        </div>

        <div className="ml-auto flex items-center space-x-6">
          <Badge
            variant={isOnline ? "default" : "destructive"}
            className={cn(
              "flex items-center space-x-2 px-4 py-2 rounded-full font-elegant",
              isOnline
                ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-800"
                : "bg-red-50 text-red-700 border-red-200 dark:bg-red-950/50 dark:text-red-400 dark:border-red-800",
            )}
          >
            {isLoading ? (
              <div className="h-2 w-2 rounded-full bg-current animate-pulse" />
            ) : isOnline ? (
              <Wifi className="h-4 w-4" />
            ) : (
              <WifiOff className="h-4 w-4" />
            )}
            <span className="text-sm font-medium">
              {isLoading ? "Verificando..." : isOnline ? "Online" : "Offline"}
            </span>
          </Badge>
        </div>
      </div>
    </header>
  )
}
