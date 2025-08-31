'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { useSalesByMonth } from '@/hooks/use-sales';

export function SalesByMonthChart() {
  const { data, isLoading, error } = useSalesByMonth();

  if (isLoading) {
    return <div className="h-80 bg-muted animate-pulse rounded" />;
  }

  if (error) {
    return (
      <div className="h-80 flex items-center justify-center text-muted-foreground">
        Erro ao carregar dados
      </div>
    );
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const chartData = data?.series || [];

  return (
    <ResponsiveContainer width="100%" height={320}>
      <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis dataKey="mes" className="text-xs fill-muted-foreground" tick={{ fontSize: 12 }} />
        <YAxis
          yAxisId="left"
          className="text-xs fill-muted-foreground"
          tick={{ fontSize: 12 }}
          tickFormatter={formatCurrency}
        />
        <YAxis
          yAxisId="right"
          orientation="right"
          className="text-xs fill-muted-foreground"
          tick={{ fontSize: 12 }}
        />
        <Tooltip
          formatter={(value: number, name: string) => [
            name === 'total' ? formatCurrency(value) : value,
            name === 'total' ? 'Valor' : 'Quantidade',
          ]}
          contentStyle={{
            backgroundColor: 'hsl(var(--card))',
            border: '1px solid hsl(var(--border))',
            borderRadius: '6px',
          }}
        />
        <Legend />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="total"
          stroke="hsl(var(--primary))"
          strokeWidth={3}
          dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
          name="Valor (R$)"
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="quantidade"
          stroke="hsl(var(--chart-2))"
          strokeWidth={3}
          dot={{ fill: 'hsl(var(--chart-2))', strokeWidth: 2, r: 4 }}
          name="Quantidade"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
