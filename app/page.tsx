import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { KPIGrid } from "@/components/dashboard/kpi-grid"
import { ChartsSection } from "@/components/dashboard/charts-section"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Análise completa de vendas imobiliárias - UNIVALI HOW VII</p>
        </div>

        <KPIGrid />
        <ChartsSection />
      </div>
    </DashboardLayout>
  )
}
