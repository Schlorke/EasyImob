import {
  PaymentData,
  PaymentsByPropertyItem,
  SalesByMonthItem,
  SalesByMonthResponse,
  SalesShareByTypeItem,
  SalesShareByTypeResponse,
} from '@/types';

/**
 * AnalyticsService - Pure functional programming approach
 * All calculations done in memory using map/filter/reduce/forEach
 * No database aggregations (WHERE/GROUP BY) - only raw data processing
 */
export class AnalyticsService {
  /**
   * Calculates total payments by property using pure functional programming
   * Uses reduce to accumulate payments by codigo_imovel
   */
  calculatePaymentsByProperty(data: PaymentData[]): PaymentsByPropertyItem[] {
    // Step 1: Group by codigo_imovel using reduce (immutable)
    const groupedByProperty = data.reduce(
      (acc, payment) => {
        const key = payment.codigo_imovel;

        if (!acc[key]) {
          acc[key] = {
            codigo_imovel: payment.codigo_imovel,
            descricao_imovel: payment.descricao_imovel,
            tipo_imovel: payment.tipo_imovel,
            total_pagamentos: 0,
          };
        }

        // Accumulate payment values
        acc[key].total_pagamentos += payment.valor_do_pagamento;

        return acc;
      },
      {} as Record<number, PaymentsByPropertyItem>
    );

    // Step 2: Convert to array and sort by total descending
    return Object.values(groupedByProperty)
      .map((item: PaymentsByPropertyItem) => ({
        ...item,
        total_pagamentos: this.roundToTwoDecimals(item.total_pagamentos),
      }))
      .sort((a, b) => b.total_pagamentos - a.total_pagamentos);
  }

  /**
   * Calculates sales by month/year using functional programming
   * Groups by MM/YYYY format and calculates both total amount and quantity
   */
  calculateSalesByMonth(data: PaymentData[]): SalesByMonthResponse {
    // Step 1: Transform dates to MM/YYYY format and group using reduce
    const groupedByMonth = data.reduce(
      (acc, payment) => {
        const monthYear = this.formatToMonthYear(payment.data_do_pagamento);

        if (!acc[monthYear]) {
          acc[monthYear] = {
            mes: monthYear,
            total: 0,
            quantidade: 0,
          };
        }

        // Accumulate values and count
        acc[monthYear].total += payment.valor_do_pagamento;
        acc[monthYear].quantidade += 1;

        return acc;
      },
      {} as Record<string, SalesByMonthItem>
    );

    // Step 2: Convert to array, round values, and sort by date ascending
    const series = Object.values(groupedByMonth)
      .map((item: SalesByMonthItem) => ({
        ...item,
        total: this.roundToTwoDecimals(item.total),
      }))
      .sort((a, b) => this.compareDateStrings(a.mes, b.mes));

    return { series };
  }

  /**
   * Calculates sales share by property type as percentages
   * Uses functional programming to count and calculate percentages
   */
  calculateSalesShareByType(data: PaymentData[]): SalesShareByTypeResponse {
    const total = data.length;

    // Step 1: Count occurrences by tipo_imovel using reduce
    const countByType = data.reduce(
      (acc, payment) => {
        const type = payment.tipo_imovel;
        acc[type] = (acc[type] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    // Step 2: Convert to percentages using map
    const share: SalesShareByTypeItem[] = Object.entries(countByType)
      .map(([tipo_imovel, quantidade]) => ({
        tipo_imovel,
        percentual: this.roundToTwoDecimals(((quantidade as number) / total) * 100),
        quantidade,
      }))
      .sort((a, b) => b.percentual - a.percentual); // Sort by percentage descending

    return { share, total };
  }

  /**
   * Pure utility functions for data transformation
   */

  /**
   * Converts YYYY-MM-DD to MM/YYYY format
   */
  private formatToMonthYear(dateString: string): string {
    const [year, month] = dateString.split('-');
    return `${month}/${year}`;
  }

  /**
   * Compares MM/YYYY date strings for sorting
   */
  private compareDateStrings(a: string, b: string): number {
    const [monthA, yearA] = a.split('/').map(Number);
    const [monthB, yearB] = b.split('/').map(Number);

    // Type guards to ensure values are defined
    const validYearA = yearA ?? 0;
    const validYearB = yearB ?? 0;
    const validMonthA = monthA ?? 0;
    const validMonthB = monthB ?? 0;

    if (validYearA !== validYearB) {
      return validYearA - validYearB;
    }
    return validMonthA - validMonthB;
  }

  /**
   * Rounds number to exactly 2 decimal places
   */
  private roundToTwoDecimals(value: number): number {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  }
}

/**
 * Factory function for creating service instance
 */
export const createAnalyticsService = (): AnalyticsService => {
  return new AnalyticsService();
};
