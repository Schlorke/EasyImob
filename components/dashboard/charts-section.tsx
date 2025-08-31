'use client';

import { PaymentsByPropertyChart } from '@/components/charts/payments-by-property-chart';
import { SalesByMonthChart } from '@/components/charts/sales-by-month-chart';
import { SalesShareChart } from '@/components/charts/sales-share-chart';
import { PropertiesTable } from './properties-table';

export function ChartsSection() {
  return (
    <div className="space-y-8">
      {/* Top row - Two column layout */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Evolução das Vendas</h3>
            <p className="text-sm text-gray-500 mt-1">Vendas mensais ao longo do tempo</p>
          </div>
          <div className="p-6">
            <SalesByMonthChart />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Participação por Tipo</h3>
            <p className="text-sm text-gray-500 mt-1">Distribuição de vendas por tipo de imóvel</p>
          </div>
          <div className="p-6">
            <SalesShareChart />
          </div>
        </div>
      </div>

      {/* Second row - Properties table and bar chart */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <PropertiesTable />
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Vendas por Imóvel</h3>
            <p className="text-sm text-gray-500 mt-1">Performance individual dos imóveis</p>
          </div>
          <div className="p-6">
            <PaymentsByPropertyChart />
          </div>
        </div>
      </div>
    </div>
  );
}
