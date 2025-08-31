import { pool } from '@/db/connection';
import { PaymentData } from '@/types';
import { RowDataPacket } from 'mysql2';

/**
 * PaymentsRepository - Handles raw data access
 * Implements the core JOIN query without WHERE/GROUP BY filters
 */
export class PaymentsRepository {
  /**
   * Executes the main JOIN query returning exactly the 6 required columns:
   * id_venda, data_do_pagamento, valor_do_pagamento, codigo_imovel, descricao_imovel, tipo_imovel
   * 
   * This is the ONLY SQL query consumed by the analytics endpoints.
   * No WHERE/GROUP BY clauses - all filtering/aggregation done in memory.
   */
  async getAllPaymentsData(): Promise<PaymentData[]> {
    const query = `
      SELECT 
        vp.id_venda,
        vp.data_do_pagamento,
        vp.valor_do_pagamento,
        vp.codigo_imovel,
        i.descricao_imovel,
        ti.nome as tipo_imovel
      FROM venda_pagamento vp
      JOIN imovel i ON vp.codigo_imovel = i.codigo_imovel
      JOIN tipo_imovel ti ON i.id_tipo = ti.id_tipo
      ORDER BY vp.data_do_pagamento, vp.id_venda
    `;

    try {
      const [rows] = await pool.execute<RowDataPacket[]>(query);
      
      // Transform database rows to PaymentData type
      return rows.map((row) => ({
        id_venda: row.id_venda as number,
        data_do_pagamento: this.formatDate(row.data_do_pagamento as Date),
        valor_do_pagamento: Number(row.valor_do_pagamento),
        codigo_imovel: row.codigo_imovel as number,
        descricao_imovel: row.descricao_imovel as string,
        tipo_imovel: row.tipo_imovel as string,
      }));
    } catch (error) {
      console.error('❌ Error executing getAllPaymentsData query:', error);
      throw new Error('Failed to fetch payments data from database');
    }
  }

  /**
   * Formats MySQL DATE to string in YYYY-MM-DD format
   */
  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0] || '';
  }

  /**
   * Health check method to verify database connectivity
   */
  async healthCheck(): Promise<boolean> {
    try {
      const [rows] = await pool.execute<RowDataPacket[]>('SELECT 1 as health');
      return Array.isArray(rows) && rows.length > 0 && rows[0]?.health === 1;
    } catch {
      return false;
    }
  }
}
