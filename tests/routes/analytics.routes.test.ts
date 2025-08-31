import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import { createApp } from '@/app';
import { PaymentsRepository } from '@/repositories/payments.repository';
import { PaymentData } from '@/types';

// Mock the entire payments repository module
vi.mock('@/repositories/payments.repository');

describe('Analytics Routes Integration Tests', () => {
  const app = createApp();
  
  const mockPaymentData: PaymentData[] = [
    {
      id_venda: 1,
      data_do_pagamento: '2025-02-05',
      valor_do_pagamento: 1800.00,
      codigo_imovel: 101,
      descricao_imovel: 'Apartamento 3 quartos',
      tipo_imovel: 'Apartamento',
    },
    {
      id_venda: 2,
      data_do_pagamento: '2025-02-10',
      valor_do_pagamento: 1500.00,
      codigo_imovel: 102,
      descricao_imovel: 'Casa 2 quartos',
      tipo_imovel: 'Casa',
    },
    {
      id_venda: 3,
      data_do_pagamento: '2025-03-05',
      valor_do_pagamento: 1800.00,
      codigo_imovel: 101,
      descricao_imovel: 'Apartamento 3 quartos',
      tipo_imovel: 'Apartamento',
    },
  ];

  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();
    
    // Mock the getAllPaymentsData method
    vi.mocked(PaymentsRepository.prototype.getAllPaymentsData).mockResolvedValue(mockPaymentData);
    vi.mocked(PaymentsRepository.prototype.healthCheck).mockResolvedValue(true);
  });

  describe('GET /health', () => {
    it('should return 200 with status ok', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body).toEqual({ status: 'ok' });
    });

    it('should return 503 when database is unhealthy', async () => {
      vi.mocked(PaymentsRepository.prototype.healthCheck).mockResolvedValue(false);

      const response = await request(app)
        .get('/health')
        .expect(503);

      expect(response.body).toEqual({ status: 'ok' });
    });
  });

  describe('GET /raw/payments', () => {
    it('should return raw payment data with correct structure', async () => {
      const response = await request(app)
        .get('/raw/payments')
        .expect(200);

      expect(response.body).toEqual(mockPaymentData);
      expect(Array.isArray(response.body)).toBe(true);
      
      // Verify each item has the required 6 columns
      response.body.forEach((item: PaymentData) => {
        expect(item).toHaveProperty('id_venda');
        expect(item).toHaveProperty('data_do_pagamento');
        expect(item).toHaveProperty('valor_do_pagamento');
        expect(item).toHaveProperty('codigo_imovel');
        expect(item).toHaveProperty('descricao_imovel');
        expect(item).toHaveProperty('tipo_imovel');
      });
    });

    it('should handle repository errors gracefully', async () => {
      vi.mocked(PaymentsRepository.prototype.getAllPaymentsData).mockRejectedValue(
        new Error('Database connection failed')
      );

      const response = await request(app)
        .get('/raw/payments')
        .expect(500);

      expect(response.body).toEqual([]);
    });
  });

  describe('GET /analytics/payments-by-property', () => {
    it('should return payments grouped by property', async () => {
      const response = await request(app)
        .get('/analytics/payments-by-property')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body).toHaveLength(2);

      // Check structure and ordering (should be sorted by total descending)
      const firstItem = response.body[0];
      expect(firstItem).toHaveProperty('codigo_imovel');
      expect(firstItem).toHaveProperty('descricao_imovel');
      expect(firstItem).toHaveProperty('tipo_imovel');
      expect(firstItem).toHaveProperty('total_pagamentos');

      // Verify the calculation (property 101 has 2 payments of 1800 each)
      const property101 = response.body.find((item: any) => item.codigo_imovel === 101);
      expect(property101.total_pagamentos).toBe(3600.00);
    });

    it('should handle repository errors gracefully', async () => {
      vi.mocked(PaymentsRepository.prototype.getAllPaymentsData).mockRejectedValue(
        new Error('Database error')
      );

      const response = await request(app)
        .get('/analytics/payments-by-property')
        .expect(500);

      expect(response.body).toEqual([]);
    });
  });

  describe('GET /analytics/sales-by-month', () => {
    it('should return sales grouped by month with correct structure', async () => {
      const response = await request(app)
        .get('/analytics/sales-by-month')
        .expect(200);

      expect(response.body).toHaveProperty('series');
      expect(Array.isArray(response.body.series)).toBe(true);
      expect(response.body.series).toHaveLength(2); // Feb and Mar 2025

      // Check structure
      response.body.series.forEach((item: any) => {
        expect(item).toHaveProperty('mes');
        expect(item).toHaveProperty('total');
        expect(item).toHaveProperty('quantidade');
        expect(item.mes).toMatch(/^\d{2}\/\d{4}$/); // MM/YYYY format
      });

      // Verify calculations
      const feb2025 = response.body.series.find((item: any) => item.mes === '02/2025');
      expect(feb2025.total).toBe(3300.00); // 1800 + 1500
      expect(feb2025.quantidade).toBe(2);
    });

    it('should handle repository errors gracefully', async () => {
      vi.mocked(PaymentsRepository.prototype.getAllPaymentsData).mockRejectedValue(
        new Error('Database error')
      );

      const response = await request(app)
        .get('/analytics/sales-by-month')
        .expect(500);

      expect(response.body).toEqual({ series: [] });
    });
  });

  describe('GET /analytics/sales-share-by-type', () => {
    it('should return percentage share by property type', async () => {
      const response = await request(app)
        .get('/analytics/sales-share-by-type')
        .expect(200);

      expect(response.body).toHaveProperty('share');
      expect(response.body).toHaveProperty('total');
      expect(Array.isArray(response.body.share)).toBe(true);
      expect(response.body.total).toBe(3);

      // Check structure
      response.body.share.forEach((item: any) => {
        expect(item).toHaveProperty('tipo_imovel');
        expect(item).toHaveProperty('percentual');
        expect(item).toHaveProperty('quantidade');
        expect(typeof item.percentual).toBe('number');
        expect(item.percentual).toBeGreaterThanOrEqual(0);
        expect(item.percentual).toBeLessThanOrEqual(100);
      });

      // Verify calculations (2 Apartamento out of 3 total = 66.67%)
      const apartamento = response.body.share.find((item: any) => item.tipo_imovel === 'Apartamento');
      expect(apartamento.percentual).toBe(66.67);
      expect(apartamento.quantidade).toBe(2);
    });

    it('should handle repository errors gracefully', async () => {
      vi.mocked(PaymentsRepository.prototype.getAllPaymentsData).mockRejectedValue(
        new Error('Database error')
      );

      const response = await request(app)
        .get('/analytics/sales-share-by-type')
        .expect(500);

      expect(response.body).toEqual({ share: [], total: 0 });
    });
  });

  describe('404 handler', () => {
    it('should return 404 for non-existent routes', async () => {
      const response = await request(app)
        .get('/non-existent-route')
        .expect(404);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Route not found');
    });
  });
});
