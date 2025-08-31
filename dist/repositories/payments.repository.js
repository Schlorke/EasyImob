"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsRepository = void 0;
const connection_1 = require("@/db/connection");
class PaymentsRepository {
    async getAllPaymentsData() {
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
            const [rows] = await connection_1.pool.execute(query);
            return rows.map((row) => ({
                id_venda: row.id_venda,
                data_do_pagamento: this.formatDate(row.data_do_pagamento),
                valor_do_pagamento: Number(row.valor_do_pagamento),
                codigo_imovel: row.codigo_imovel,
                descricao_imovel: row.descricao_imovel,
                tipo_imovel: row.tipo_imovel,
            }));
        }
        catch (error) {
            console.error('❌ Error executing getAllPaymentsData query:', error);
            throw new Error('Failed to fetch payments data from database');
        }
    }
    formatDate(date) {
        return date.toISOString().split('T')[0] || '';
    }
    async healthCheck() {
        try {
            const [rows] = await connection_1.pool.execute('SELECT 1 as health');
            return Array.isArray(rows) && rows.length > 0 && rows[0]?.health === 1;
        }
        catch {
            return false;
        }
    }
}
exports.PaymentsRepository = PaymentsRepository;
//# sourceMappingURL=payments.repository.js.map