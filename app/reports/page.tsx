import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { SalesShareChart } from '@/components/charts/sales-share-chart';
import { KPIGrid } from '@/components/dashboard/kpi-grid';

export default function ReportsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Relatórios</h1>
              <p className="text-lg text-gray-600">Relatórios detalhados e análises avançadas</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-6 py-3 rounded-xl font-medium transition-colors">
                Gerar PDF
              </button>
              <button className="bg-[#22C55E] hover:bg-[#16A34A] text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-lg">
                Novo Relatório
              </button>
            </div>
          </div>
        </div>

        <KPIGrid />

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Distribuição por Tipo de Imóvel</h3>
            <p className="text-sm text-gray-500 mt-1">
              Análise detalhada da participação de cada tipo
            </p>
          </div>
          <div className="p-6">
            <SalesShareChart />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
