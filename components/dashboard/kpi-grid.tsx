'use client';

import { Building, DollarSign, TrendingUp, Home } from 'lucide-react';
import { KPICard } from './kpi-card';
import { usePaymentsByProperty } from '@/hooks/use-payments';
import { useSalesByMonth } from '@/hooks/use-sales';

export function KPIGrid() {
  const { data: paymentsByProperty, isLoading: paymentsLoading } = usePaymentsByProperty();
  const { data: salesByMonth, isLoading: salesLoading } = useSalesByMonth();

  // Calculate KPIs from data
  const totalSales = paymentsByProperty?.reduce((sum, item) => sum + item.total_pagamentos, 0) || 0;

  // Current month sales (last month in the series)
  const currentMonthSales = salesByMonth?.series?.[salesByMonth.series.length - 1]?.total || 0;
  const previousMonthSales = salesByMonth?.series?.[salesByMonth.series.length - 2]?.total || 0;
  const salesTrend =
    previousMonthSales > 0
      ? ((currentMonthSales - previousMonthSales) / previousMonthSales) * 100
      : 0;

  // Simulated data for additional metrics
  const activeRentals = 24;
  const profitTrend = 12.5;
  const availableProperties = 8;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  if (paymentsLoading || salesLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-40 bg-gray-100 animate-pulse rounded-2xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <KPICard
        title="Total de Vendas"
        value={formatCurrency(totalSales)}
        icon={DollarSign}
        color="green"
        trend={{
          value: Math.round(salesTrend),
          isPositive: salesTrend >= 0,
        }}
      />

      <KPICard
        title="Aluguéis Ativos"
        value={activeRentals}
        icon={Home}
        color="blue"
        trend={{
          value: 8,
          isPositive: true,
        }}
      />

      <KPICard
        title="Lucro Mensal"
        value={formatCurrency(totalSales * 0.15)}
        icon={TrendingUp}
        color="purple"
        trend={{
          value: Math.round(profitTrend),
          isPositive: profitTrend >= 0,
        }}
      />

      <KPICard
        title="Imóveis Disponíveis"
        value={availableProperties}
        icon={Building}
        color="orange"
        trend={{
          value: -3,
          isPositive: false,
        }}
      />
    </div>
  );
}
