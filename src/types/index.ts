// Types for HOW VII - EasyImob Backend

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
  data_do_pagamento: string; // DATE as string in YYYY-MM-DD format
  valor_do_pagamento: number;
}

// JOIN result type - exactly the 6 columns required
export interface PaymentData {
  id_venda: number;
  data_do_pagamento: string;
  valor_do_pagamento: number;
  codigo_imovel: number;
  descricao_imovel: string;
  tipo_imovel: string;
}

// Analytics response types
export interface PaymentsByPropertyItem {
  codigo_imovel: number;
  descricao_imovel: string;
  tipo_imovel: string;
  total_pagamentos: number;
}

export interface SalesByMonthItem {
  mes: string; // Format: MM/YYYY
  total: number;
  quantidade: number;
}

export interface SalesByMonthResponse {
  series: SalesByMonthItem[];
}

export interface SalesShareByTypeItem {
  tipo_imovel: string;
  percentual: number; // Two decimal places
  quantidade: number;
}

export interface SalesShareByTypeResponse {
  share: SalesShareByTypeItem[];
  total: number;
}

// Health check response
export interface HealthResponse {
  status: 'ok';
}

// Database connection config
export interface DatabaseConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}
