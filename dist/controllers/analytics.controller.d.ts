import { Request, Response } from 'express';
import { PaymentsRepository } from '@/repositories/payments.repository';
import { AnalyticsService } from '@/services/analytics.service';
import { PaymentData, PaymentsByPropertyItem, SalesByMonthResponse, SalesShareByTypeResponse } from '@/types';
export declare class AnalyticsController {
    private paymentsRepository;
    private analyticsService;
    constructor(paymentsRepository: PaymentsRepository, analyticsService: AnalyticsService);
    getRawPayments(_req: Request, res: Response<PaymentData[]>): Promise<void>;
    getPaymentsByProperty(_req: Request, res: Response<PaymentsByPropertyItem[]>): Promise<void>;
    getSalesByMonth(_req: Request, res: Response<SalesByMonthResponse>): Promise<void>;
    getSalesShareByType(_req: Request, res: Response<SalesShareByTypeResponse>): Promise<void>;
}
export declare const createAnalyticsController: (paymentsRepository: PaymentsRepository, analyticsService: AnalyticsService) => AnalyticsController;
//# sourceMappingURL=analytics.controller.d.ts.map