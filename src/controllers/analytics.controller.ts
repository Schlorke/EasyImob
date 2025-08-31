import { Request, Response } from 'express';
import { PaymentsRepository } from '@/repositories/payments.repository';
import { AnalyticsService } from '@/services/analytics.service';
import {
  PaymentData,
  PaymentsByPropertyItem,
  SalesByMonthResponse,
  SalesShareByTypeResponse,
} from '@/types';

/**
 * AnalyticsController - Handles all analytics and raw data endpoints
 * Orchestrates data fetching and processing using functional programming
 */
export class AnalyticsController {
  constructor(
    private paymentsRepository: PaymentsRepository,
    private analyticsService: AnalyticsService
  ) {}

  /**
   * GET /raw/payments
   * Returns raw JOIN data with exactly 6 columns as specified
   */
  async getRawPayments(_req: Request, res: Response<PaymentData[]>): Promise<void> {
    try {
      const data = await this.paymentsRepository.getAllPaymentsData();
      res.status(200).json(data);
    } catch (error) {
      console.error('❌ Error in getRawPayments:', error);
      res.status(500).json([] as PaymentData[]);
    }
  }

  /**
   * GET /analytics/payments-by-property
   * Returns total accumulated payments per property
   * Processing done in memory using reduce (no SQL GROUP BY)
   */
  async getPaymentsByProperty(
    _req: Request,
    res: Response<PaymentsByPropertyItem[]>
  ): Promise<void> {
    try {
      // Fetch raw data from single JOIN query
      const rawData = await this.paymentsRepository.getAllPaymentsData();

      // Process in memory using functional programming
      const result = this.analyticsService.calculatePaymentsByProperty(rawData);

      res.status(200).json(result);
    } catch (error) {
      console.error('❌ Error in getPaymentsByProperty:', error);
      res.status(500).json([] as PaymentsByPropertyItem[]);
    }
  }

  /**
   * GET /analytics/sales-by-month
   * Returns monetary total and quantity by month/year
   * Processing done in memory using reduce/map (no SQL GROUP BY)
   */
  async getSalesByMonth(_req: Request, res: Response<SalesByMonthResponse>): Promise<void> {
    try {
      // Fetch raw data from single JOIN query
      const rawData = await this.paymentsRepository.getAllPaymentsData();

      // Process in memory using functional programming
      const result = this.analyticsService.calculateSalesByMonth(rawData);

      res.status(200).json(result);
    } catch (error) {
      console.error('❌ Error in getSalesByMonth:', error);
      res.status(500).json({ series: [] } as SalesByMonthResponse);
    }
  }

  /**
   * GET /analytics/sales-share-by-type
   * Returns quantitative percentage share by property type
   * Processing done in memory using reduce/map (no SQL GROUP BY)
   */
  async getSalesShareByType(_req: Request, res: Response<SalesShareByTypeResponse>): Promise<void> {
    try {
      // Fetch raw data from single JOIN query
      const rawData = await this.paymentsRepository.getAllPaymentsData();

      // Process in memory using functional programming
      const result = this.analyticsService.calculateSalesShareByType(rawData);

      res.status(200).json(result);
    } catch (error) {
      console.error('❌ Error in getSalesShareByType:', error);
      res.status(500).json({ share: [], total: 0 } as SalesShareByTypeResponse);
    }
  }
}

/**
 * Factory function for creating controller instance
 */
export const createAnalyticsController = (
  paymentsRepository: PaymentsRepository,
  analyticsService: AnalyticsService
): AnalyticsController => {
  return new AnalyticsController(paymentsRepository, analyticsService);
};
