import { Request, Response } from 'express';
import { PaymentsRepository } from '@/repositories/payments.repository';
import { HealthResponse } from '@/types';

/**
 * HealthController - System health check endpoints
 */
export class HealthController {
  constructor(private _paymentsRepository: PaymentsRepository) {}

  /**
   * GET /health
   * Returns system status and database connectivity
   */
  async getHealth(_req: Request, res: Response<HealthResponse>): Promise<void> {
    try {
      // Test database connectivity
      const isDbHealthy = await this._paymentsRepository.healthCheck();

      if (!isDbHealthy) {
        res.status(503).json({ status: 'ok' } as HealthResponse);
        return;
      }

      res.status(200).json({ status: 'ok' });
    } catch (error) {
      console.error('❌ Health check failed:', error);
      res.status(503).json({ status: 'ok' } as HealthResponse);
    }
  }
}

/**
 * Factory function for creating controller instance
 */
export const createHealthController = (
  paymentsRepository: PaymentsRepository
): HealthController => {
  return new HealthController(paymentsRepository);
};
