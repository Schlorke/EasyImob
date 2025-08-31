import { Request, Response } from 'express';
import { PaymentsRepository } from '@/repositories/payments.repository';
import { HealthResponse } from '@/types';
export declare class HealthController {
    private paymentsRepository;
    constructor(paymentsRepository: PaymentsRepository);
    getHealth(_req: Request, res: Response<HealthResponse>): Promise<void>;
}
export declare const createHealthController: (paymentsRepository: PaymentsRepository) => HealthController;
//# sourceMappingURL=health.controller.d.ts.map