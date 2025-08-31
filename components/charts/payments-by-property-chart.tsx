"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { usePaymentsByProperty } from "@/hooks/use-payments"

export function PaymentsByPropertyChart() {
  const { data, isLoading, error } = usePaymentsByProperty()

  if (isLoading) {
    return <div className="h-80 bg-muted animate-pulse rounded" />
  }

  if (error) {
    return <div className="h-80 flex items-center justify-center text-muted-foreground">Erro ao carregar dados</div>
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 0,
    }).format(value)
  }

  const chartData =
    data?.map((item) => ({
      ...item,
      name: `Imóvel ${item.codigo_imovel}`,
      value: item.total_pagamentos,
    })) || []

  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis dataKey="name" className="text-xs fill-muted-foreground" tick={{ fontSize: 12 }} />
        <YAxis className="text-xs fill-muted-foreground" tick={{ fontSize: 12 }} tickFormatter={formatCurrency} />
        <Tooltip
          formatter={(value: number) => [formatCurrency(value), "Total"]}
          labelFormatter={(label) => `${label}`}
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "6px",
          }}
        />
        <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
