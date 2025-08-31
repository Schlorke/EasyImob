import { DashboardLayout } from '@/components/dashboard/dashboard-layout';
import { PropertiesTable } from '@/components/dashboard/properties-table';

export default function PropertiesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Imóveis</h1>
              <p className="text-lg text-gray-600">Gestão completa de propriedades</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-[#22C55E] hover:bg-[#16A34A] text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-lg">
                + Novo Imóvel
              </button>
            </div>
          </div>
        </div>

        <PropertiesTable />
      </div>
    </DashboardLayout>
  );
}
