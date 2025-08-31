'use client';

import { Building, DollarSign, TrendingUp, Star } from 'lucide-react';
import { KPICard } from './kpi-card';
import { usePaymentsByProperty } from '@/hooks/use-payments';
import { useSalesByMonth } from '@/hooks/use-sales';

export function KPIGrid() {
  const { data: paymentsByProperty, isLoading: paymentsLoading } = usePaymentsByProperty();
  const { data: salesByMonth, isLoading: salesLoading } = useSalesByMonth();

  // Calculate KPIs from data
  const totalProperties = paymentsByProperty?.length || 0;
  const totalSales = paymentsByProperty?.reduce((sum, item) => sum + item.total_pagamentos, 0) || 0;
  const topProperty = paymentsByProperty?.[0];

  // Current month sales (last month in the series)
  const currentMonthSales = salesByMonth?.series?.[salesByMonth.series.length - 1]?.total || 0;
  const previousMonthSales = salesByMonth?.series?.[salesByMonth.series.length - 2]?.total || 0;
  const salesTrend =
    previousMonthSales > 0
      ? ((currentMonthSales - previousMonthSales) / previousMonthSales) * 100
      : 0;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  if (paymentsLoading || salesLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-32 bg-muted animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <KPICard title="Total de Imóveis" value={totalProperties} icon={Building} />
      <KPICard title="Valor Total de Vendas" value={formatCurrency(totalSales)} icon={DollarSign} />
      <KPICard
        title="Vendas Este Mês"
        value={formatCurrency(currentMonthSales)}
        icon={TrendingUp}
        trend={{
          value: Math.round(salesTrend),
          isPositive: salesTrend >= 0,
        }}
      />
      <KPICard
        title="Propriedade Top"
        value={topProperty ? `${topProperty.codigo_imovel}` : 'N/A'}
        icon={Star}
      />
    </div>
  );
}
