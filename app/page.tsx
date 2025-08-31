import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { KPIGrid } from '@/components/dashboard/kpi-grid';
import { ChartsSection } from '@/components/dashboard/charts-section';

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
              <p className="text-lg text-gray-600">Gestão Imobiliária - Visão Geral</p>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-200">
                <span className="text-sm font-medium text-[#22C55E] flex items-center">
                  <div className="w-2 h-2 bg-[#22C55E] rounded-full mr-2"></div>
                  Sistema Online
                </span>
              </div>
            </div>
          </div>
        </div>

        <KPIGrid />
        <ChartsSection />
      </div>
    </DashboardLayout>
  );
}
