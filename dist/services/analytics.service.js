"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAnalyticsService = exports.AnalyticsService = void 0;
class AnalyticsService {
    calculatePaymentsByProperty(data) {
        const groupedByProperty = data.reduce((acc, payment) => {
            const key = payment.codigo_imovel;
            if (!acc[key]) {
                acc[key] = {
                    codigo_imovel: payment.codigo_imovel,
                    descricao_imovel: payment.descricao_imovel,
                    tipo_imovel: payment.tipo_imovel,
                    total_pagamentos: 0,
                };
            }
            acc[key].total_pagamentos += payment.valor_do_pagamento;
            return acc;
        }, {});
        return Object.values(groupedByProperty)
            .map(item => ({
            ...item,
            total_pagamentos: this.roundToTwoDecimals(item.total_pagamentos),
        }))
            .sort((a, b) => b.total_pagamentos - a.total_pagamentos);
    }
    calculateSalesByMonth(data) {
        const groupedByMonth = data.reduce((acc, payment) => {
            const monthYear = this.formatToMonthYear(payment.data_do_pagamento);
            if (!acc[monthYear]) {
                acc[monthYear] = {
                    mes: monthYear,
                    total: 0,
                    quantidade: 0,
                };
            }
            acc[monthYear].total += payment.valor_do_pagamento;
            acc[monthYear].quantidade += 1;
            return acc;
        }, {});
        const series = Object.values(groupedByMonth)
            .map(item => ({
            ...item,
            total: this.roundToTwoDecimals(item.total),
        }))
            .sort((a, b) => this.compareDateStrings(a.mes, b.mes));
        return { series };
    }
    calculateSalesShareByType(data) {
        const total = data.length;
        const countByType = data.reduce((acc, payment) => {
            const type = payment.tipo_imovel;
            acc[type] = (acc[type] || 0) + 1;
            return acc;
        }, {});
        const share = Object.entries(countByType)
            .map(([tipo_imovel, quantidade]) => ({
            tipo_imovel,
            percentual: this.roundToTwoDecimals((quantidade / total) * 100),
            quantidade,
        }))
            .sort((a, b) => b.percentual - a.percentual);
        return { share, total };
    }
    formatToMonthYear(dateString) {
        const [year, month] = dateString.split('-');
        return `${month}/${year}`;
    }
    compareDateStrings(a, b) {
        const [monthA, yearA] = a.split('/').map(Number);
        const [monthB, yearB] = b.split('/').map(Number);
        if (yearA !== yearB) {
            return yearA - yearB;
        }
        return monthA - monthB;
    }
    roundToTwoDecimals(value) {
        return Math.round((value + Number.EPSILON) * 100) / 100;
    }
}
exports.AnalyticsService = AnalyticsService;
const createAnalyticsService = () => {
    return new AnalyticsService();
};
exports.createAnalyticsService = createAnalyticsService;
//# sourceMappingURL=analytics.service.js.map