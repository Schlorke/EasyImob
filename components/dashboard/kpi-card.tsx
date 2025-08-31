import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface KPICardProps {
  title: string
  value: string | number
  icon: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
  className?: string
}

export function KPICard({ title, value, icon: Icon, trend, className }: KPICardProps) {
  return (
    <Card
      className={cn(
        "luxury-shadow-lg hover:luxury-shadow-xl transition-all duration-300 border-0 glass-effect",
        className,
      )}
    >
      <CardContent className="p-8">
        <div className="flex items-center justify-between">
          <div className="space-y-3">
            <p className="text-sm font-elegant font-medium text-muted-foreground uppercase tracking-wide">{title}</p>
            <p className="text-3xl font-luxury text-foreground bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {value}
            </p>
            {trend && (
              <div
                className={cn(
                  "flex items-center text-sm font-elegant font-medium px-3 py-1 rounded-full",
                  trend.isPositive
                    ? "text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/50"
                    : "text-red-700 bg-red-50 dark:text-red-400 dark:bg-red-950/50",
                )}
              >
                <span>
                  {trend.isPositive ? "+" : ""}
                  {trend.value}%
                </span>
                <span className="ml-2 text-muted-foreground">vs mês anterior</span>
              </div>
            )}
          </div>
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center backdrop-blur-sm border border-primary/20">
            <Icon className="h-8 w-8 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
