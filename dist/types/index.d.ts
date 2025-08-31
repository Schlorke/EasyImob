export interface TipoImovel {
    id_tipo: number;
    nome: string;
}
export interface Imovel {
    codigo_imovel: number;
    descricao_imovel: string;
    id_tipo: number;
}
export interface VendaPagamento {
    id_venda: number;
    codigo_imovel: number;
    data_do_pagamento: string;
    valor_do_pagamento: number;
}
export interface PaymentData {
    id_venda: number;
    data_do_pagamento: string;
    valor_do_pagamento: number;
    codigo_imovel: number;
    descricao_imovel: string;
    tipo_imovel: string;
}
export interface PaymentsByPropertyItem {
    codigo_imovel: number;
    descricao_imovel: string;
    tipo_imovel: string;
    total_pagamentos: number;
}
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
export interface SalesShareByTypeResponse {
    share: SalesShareByTypeItem[];
    total: number;
}
export interface HealthResponse {
    status: 'ok';
}
export interface DatabaseConfig {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
}
//# sourceMappingURL=index.d.ts.map