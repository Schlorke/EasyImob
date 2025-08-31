import { describe, it, expect, beforeEach } from 'vitest';
import { AnalyticsService } from '@/services/analytics.service';
import { PaymentData, SalesByMonthItem, SalesShareByTypeItem } from '@/types';

describe('AnalyticsService', () => {
  let analyticsService: AnalyticsService;
  let mockData: PaymentData[];

  beforeEach(() => {
    analyticsService = new AnalyticsService();

    // Mock data for testing (small synthetic dataset)
    mockData = [
      {
        id_venda: 1,
        data_do_pagamento: '2025-02-05',
        valor_do_pagamento: 1800.0,
        codigo_imovel: 101,
        descricao_imovel: 'Apartamento 3 quartos',
        tipo_imovel: 'Apartamento',
      },
      {
        id_venda: 2,
        data_do_pagamento: '2025-02-10',
        valor_do_pagamento: 1500.0,
        codigo_imovel: 102,
        descricao_imovel: 'Casa 2 quartos',
        tipo_imovel: 'Casa',
      },
      {
        id_venda: 3,
        data_do_pagamento: '2025-03-05',
        valor_do_pagamento: 1800.0,
        codigo_imovel: 101,
        descricao_imovel: 'Apartamento 3 quartos',
        tipo_imovel: 'Apartamento',
      },
      {
        id_venda: 4,
        data_do_pagamento: '2025-03-10',
        valor_do_pagamento: 2000.0,
        codigo_imovel: 103,
        descricao_imovel: 'Sala Comercial',
        tipo_imovel: 'Sala Comercial',
      },
    ];
  });

  describe('calculatePaymentsByProperty', () => {
    it('should calculate total payments per property correctly', () => {
      const result = analyticsService.calculatePaymentsByProperty(mockData);

      expect(result).toHaveLength(3);
      expect(result[0]).toEqual({
        codigo_imovel: 101,
        descricao_imovel: 'Apartamento 3 quartos',
        tipo_imovel: 'Apartamento',
        total_pagamentos: 3600.0, // 1800 + 1800
      });
    });

    it('should sort results by total descending', () => {
      const result = analyticsService.calculatePaymentsByProperty(mockData);

      expect(result[0].total_pagamentos).toBeGreaterThanOrEqual(result[1].total_pagamentos);
      expect(result[1].total_pagamentos).toBeGreaterThanOrEqual(result[2].total_pagamentos);
    });

    it('should handle empty data', () => {
      const result = analyticsService.calculatePaymentsByProperty([]);
      expect(result).toEqual([]);
    });

    it('should round values to 2 decimal places', () => {
      const dataWithDecimals: PaymentData[] = [
        {
          ...mockData[0],
          valor_do_pagamento: 1800.555,
        },
      ];

      const result = analyticsService.calculatePaymentsByProperty(dataWithDecimals);
      expect(result[0].total_pagamentos).toBe(1800.56);
    });
  });

  describe('calculateSalesByMonth', () => {
    it('should group payments by month/year correctly', () => {
      const result = analyticsService.calculateSalesByMonth(mockData);

      expect(result.series).toHaveLength(2);

      const feb2025 = result.series.find((item: SalesByMonthItem) => item.mes === '02/2025');
      expect(feb2025).toEqual({
        mes: '02/2025',
        total: 3300.0, // 1800 + 1500
        quantidade: 2,
      });

      const mar2025 = result.series.find((item: SalesByMonthItem) => item.mes === '03/2025');
      expect(mar2025).toEqual({
        mes: '03/2025',
        total: 3800.0, // 1800 + 2000
        quantidade: 2,
      });
    });

    it('should sort results by date ascending', () => {
      const result = analyticsService.calculateSalesByMonth(mockData);

      expect(result.series[0].mes).toBe('02/2025');
      expect(result.series[1].mes).toBe('03/2025');
    });

    it('should handle empty data', () => {
      const result = analyticsService.calculateSalesByMonth([]);
      expect(result).toEqual({ series: [] });
    });

    it('should handle single month', () => {
      const singleMonthData = [mockData[0]];
      const result = analyticsService.calculateSalesByMonth(singleMonthData);

      expect(result.series).toHaveLength(1);
      expect(result.series[0]).toEqual({
        mes: '02/2025',
        total: 1800.0,
        quantidade: 1,
      });
    });
  });

  describe('calculateSalesShareByType', () => {
    it('should calculate percentages correctly', () => {
      const result = analyticsService.calculateSalesShareByType(mockData);

      expect(result.total).toBe(4);
      expect(result.share).toHaveLength(3);

      const apartamento = result.share.find(
        (item: SalesShareByTypeItem) => item.tipo_imovel === 'Apartamento'
      );
      expect(apartamento).toEqual({
        tipo_imovel: 'Apartamento',
        percentual: 50.0, // 2 out of 4 = 50%
        quantidade: 2,
      });

      const casa = result.share.find((item: SalesShareByTypeItem) => item.tipo_imovel === 'Casa');
      expect(casa).toEqual({
        tipo_imovel: 'Casa',
        percentual: 25.0, // 1 out of 4 = 25%
        quantidade: 1,
      });
    });

    it('should sort results by percentage descending', () => {
      const result = analyticsService.calculateSalesShareByType(mockData);

      expect(result.share[0].percentual).toBeGreaterThanOrEqual(result.share[1].percentual);
      expect(result.share[1].percentual).toBeGreaterThanOrEqual(result.share[2].percentual);
    });

    it('should handle empty data', () => {
      const result = analyticsService.calculateSalesShareByType([]);
      expect(result).toEqual({ share: [], total: 0 });
    });

    it('should handle 100% single type', () => {
      const singleTypeData = [mockData[0], mockData[2]]; // Both Apartamento
      const result = analyticsService.calculateSalesShareByType(singleTypeData);

      expect(result.total).toBe(2);
      expect(result.share).toHaveLength(1);
      expect(result.share[0]).toEqual({
        tipo_imovel: 'Apartamento',
        percentual: 100.0,
        quantidade: 2,
      });
    });

    it('should round percentages to 2 decimal places', () => {
      // Create data that would result in non-round percentages
      const trickyData = Array(3)
        .fill(null)
        .map((_, i) => ({
          ...mockData[0],
          id_venda: i + 1,
          tipo_imovel: i === 0 ? 'Type1' : 'Type2',
        }));

      const result = analyticsService.calculateSalesShareByType(trickyData);

      // 1 out of 3 = 33.33%, 2 out of 3 = 66.67%
      expect(result.share[0].percentual).toBe(66.67);
      expect(result.share[1].percentual).toBe(33.33);
    });
  });
});
