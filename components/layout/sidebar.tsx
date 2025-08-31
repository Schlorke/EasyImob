import { Building, TrendingUp, FileText, Home } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/", icon: Home, current: true },
  { name: "Imóveis", href: "/properties", icon: Building, current: false },
  { name: "Vendas", href: "/sales", icon: TrendingUp, current: false },
  { name: "Relatórios", href: "/reports", icon: FileText, current: false },
]

export function Sidebar() {
  return (
    <div className="flex h-full w-64 flex-col bg-sidebar border-r">
      <div className="flex flex-1 flex-col pt-5 pb-4 overflow-y-auto">
        <nav className="mt-5 flex-1 px-2 space-y-1">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={cn(
                item.current
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
              )}
            >
              <item.icon
                className={cn(
                  item.current ? "text-sidebar-accent-foreground" : "text-sidebar-foreground",
                  "mr-3 flex-shrink-0 h-5 w-5",
                )}
                aria-hidden="true"
              />
              {item.name}
            </a>
          ))}
        </nav>
      </div>
    </div>
  )
}
