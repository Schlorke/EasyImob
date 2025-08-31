'use client';

import { useQuery } from '@tanstack/react-query';

export interface SalesByMonthItem {
  mes: string;
  total: number;
  quantidade: number;
}

export interface SalesByMonthResponse {
  series: SalesByMonthItem[];
}

export interface SalesShareByTypeItem {
  tipo_imovel: string;
  percentual: number;
  quantidade: number;
}

export interface SalesShareResponse {
  share: SalesShareByTypeItem[];
  total: number;
}

async function fetchSalesByMonth(): Promise<SalesByMonthResponse> {
  const response = await fetch('http://localhost:3000/analytics/sales-by-month');
  if (!response.ok) {
    throw new Error('Failed to fetch sales by month');
  }
  return response.json();
}

async function fetchSalesShare(): Promise<SalesShareResponse> {
  const response = await fetch('http://localhost:3000/analytics/sales-share-by-type');
  if (!response.ok) {
    throw new Error('Failed to fetch sales share');
  }
  return response.json();
}

export function useSalesByMonth() {
  return useQuery({
    queryKey: ['sales-by-month'],
    queryFn: fetchSalesByMonth,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useSalesShare() {
  return useQuery({
    queryKey: ['sales-share'],
    queryFn: fetchSalesShare,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
