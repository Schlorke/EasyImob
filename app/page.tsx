import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { KPIGrid } from "@/components/dashboard/kpi-grid"
import { ChartsSection } from "@/components/dashboard/charts-section"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-luxury text-balance bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Analytics Dashboard
              </h1>
              <p className="text-lg text-muted-foreground font-elegant mt-2">
                Análise completa de vendas imobiliárias - UNIVALI HOW VII
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="glass-effect px-4 py-2 rounded-lg">
                <span className="text-sm font-medium text-primary">● Online</span>
              </div>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
        </div>

        <KPIGrid />
        <ChartsSection />
      </div>
    </DashboardLayout>
  )
}
