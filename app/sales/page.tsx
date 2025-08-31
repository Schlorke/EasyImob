import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { SalesByMonthChart } from '@/components/charts/sales-by-month-chart';
import { PaymentsByPropertyChart } from '@/components/charts/payments-by-property-chart';

export default function SalesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Vendas</h1>
              <p className="text-lg text-gray-600">Análise detalhada de vendas e transações</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-6 py-3 rounded-xl font-medium transition-colors">
                Exportar Dados
              </button>
              <button className="bg-[#22C55E] hover:bg-[#16A34A] text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-lg">
                + Nova Venda
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">Vendas Mensais</h3>
              <p className="text-sm text-gray-500 mt-1">Evolução das vendas ao longo do tempo</p>
            </div>
            <div className="p-6">
              <SalesByMonthChart />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">Performance por Imóvel</h3>
              <p className="text-sm text-gray-500 mt-1">Vendas individuais por propriedade</p>
            </div>
            <div className="p-6">
              <PaymentsByPropertyChart />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
