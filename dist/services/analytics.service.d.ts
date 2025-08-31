import { PaymentData, PaymentsByPropertyItem, SalesByMonthResponse, SalesShareByTypeResponse } from '@/types';
export declare class AnalyticsService {
    calculatePaymentsByProperty(data: PaymentData[]): PaymentsByPropertyItem[];
    calculateSalesByMonth(data: PaymentData[]): SalesByMonthResponse;
    calculateSalesShareByType(data: PaymentData[]): SalesShareByTypeResponse;
    private formatToMonthYear;
    private compareDateStrings;
    private roundToTwoDecimals;
}
export declare const createAnalyticsService: () => AnalyticsService;
//# sourceMappingURL=analytics.service.d.ts.map