'use client';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Property {
  id: number;
  name: string;
  code: string;
  value: number;
  status: 'occupied' | 'available' | 'maintenance';
  type: string;
  location: string;
}

const mockProperties: Property[] = [
  {
    id: 101,
    name: 'Apartamento Vista Mar',
    code: 'APT-001',
    value: 2500,
    status: 'occupied',
    type: 'Apartamento',
    location: 'Centro',
  },
  {
    id: 102,
    name: 'Casa Residencial Premium',
    code: 'CSA-002',
    value: 3200,
    status: 'occupied',
    type: 'Casa',
    location: 'Bairro Nobre',
  },
  {
    id: 103,
    name: 'Loft Moderno',
    code: 'LFT-003',
    value: 1800,
    status: 'available',
    type: 'Loft',
    location: 'Centro',
  },
  {
    id: 104,
    name: 'Cobertura Duplex',
    code: 'COB-004',
    value: 4500,
    status: 'maintenance',
    type: 'Cobertura',
    location: 'Praia',
  },
  {
    id: 105,
    name: 'Studio Compacto',
    code: 'STD-005',
    value: 1200,
    status: 'occupied',
    type: 'Studio',
    location: 'Universitário',
  },
];

export function PropertiesTable() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const getStatusBadge = (status: Property['status']) => {
    const statusConfig = {
      occupied: {
        label: 'Ocupado',
        className: 'bg-green-100 text-green-800 border-green-200',
      },
      available: {
        label: 'Disponível',
        className: 'bg-blue-100 text-blue-800 border-blue-200',
      },
      maintenance: {
        label: 'Manutenção',
        className: 'bg-orange-100 text-orange-800 border-orange-200',
      },
    };

    const config = statusConfig[status];
    return (
      <Badge className={cn('px-3 py-1 text-xs font-medium rounded-full border', config.className)}>
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900">Imóveis Mais Alugados</h3>
        <p className="text-sm text-gray-500 mt-1">Propriedades com maior retorno financeiro</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Imóvel
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Código
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Valor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Localização
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {mockProperties.map((property, index) => (
              <tr key={property.id} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#22C55E] to-[#16A34A] flex items-center justify-center">
                        <span className="text-white font-medium text-sm">{index + 1}</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{property.name}</div>
                      <div className="text-sm text-gray-500">{property.type}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-mono text-gray-900 bg-gray-100 px-2 py-1 rounded">
                    {property.code}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-semibold text-gray-900">
                    {formatCurrency(property.value)}
                  </div>
                  <div className="text-xs text-gray-500">por mês</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(property.status)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {property.location}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
        <div className="text-xs text-gray-500 text-center">
          Mostrando {mockProperties.length} imóveis de um total de {mockProperties.length + 15}
        </div>
      </div>
    </div>
  );
}
