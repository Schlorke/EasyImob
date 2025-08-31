"use client"

import { useQuery } from "@tanstack/react-query"

export interface PaymentsByPropertyItem {
  codigo_imovel: number
  descricao_imovel: string
  tipo_imovel: string
  total_pagamentos: number
}

async function fetchPaymentsByProperty(): Promise<PaymentsByPropertyItem[]> {
  const response = await fetch("http://localhost:3000/analytics/payments-by-property")
  if (!response.ok) {
    throw new Error("Failed to fetch payments by property")
  }
  return response.json()
}

export function usePaymentsByProperty() {
  return useQuery({
    queryKey: ["payments-by-property"],
    queryFn: fetchPaymentsByProperty,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}
