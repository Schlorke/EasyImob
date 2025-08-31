# 🚀 EasyImob - Guia de Desenvolvimento

## 🎯 Para Desenvolvedores e Agentes de IA

Este documento orienta desenvolvedores humanos e agentes de IA (ChatGPT, Claude, Copilot) no desenvolvimento contínuo do projeto EasyImob.

## 📋 Pré-requisitos para Implementação

### 🤖 Para Agentes de IA: LEIA SEMPRE ANTES DE IMPLEMENTAR

**CRITICAL**: Antes de qualquer implementação, você DEVE:

1. **Ler ARCHITECTURE.md** para entender a estrutura
2. **Ler CHANGELOG.md** para conhecer o histórico
3. **Verificar .cursorrules** para padrões específicos
4. **Consultar este guia** para convenções

### 📚 Documentação Obrigatória

\`\`\`bash

# Ordem de leitura recomendada para contexto completo:

1. docs/ARCHITECTURE.md # Entender a arquitetura
2. docs/DEVELOPMENT-GUIDE.md # Este arquivo
3. CHANGELOG.md # Histórico de mudanças
4. README.md # Visão geral do projeto
5. .cursorrules # Regras específicas do Cursor
   \`\`\`

## 🏗️ Convenções de Código

### 📁 Estrutura de Arquivos

\`\`\`
src/
├── types/ # Tipos TypeScript - SEMPRE definir aqui primeiro
├── db/ # Conexão e configuração de banco
├── repositories/ # APENAS SELECT JOIN - sem WHERE/GROUP BY
├── services/ # Lógica de negócio - FUNCTIONAL PROGRAMMING APENAS
├── controllers/ # HTTP handlers - delegar para services
├── routes/ # Definição de endpoints
├── app.ts # Configuração Express
└── server.ts # Bootstrap da aplicação
\`\`\`

### 🎨 Padrões de Nomenclatura

\`\`\`typescript
// Interfaces e Types - PascalCase
interface PaymentData {}
type AnalyticsResponse = {};

// Classes - PascalCase
class AnalyticsService {}
class PaymentsRepository {}

// Métodos e variáveis - camelCase
calculatePaymentsByProperty();
const monthlyData = [];

// Constantes - UPPER_SNAKE_CASE
const BASE_URL = 'http://localhost:3000';
const DEFAULT_LIMIT = 100;

// Arquivos - kebab-case
analytics.service.ts
payments.repository.ts
development-guide.md

\`\`\``

### 🔧 Convenções TypeScript

\`\`\`typescript
// ✅ SEMPRE usar tipos explícitos
function calculateTotal(payments: PaymentData[]): number {
  return payments.reduce((sum, payment) => sum + payment.valor_do_pagamento, 0);
}

// ✅ Interfaces para contratos
interface ServiceInterface {
  calculate(data: PaymentData[]): AnalyticsResult;
}

// ✅ Enums para constantes
enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

// ❌ NUNCA usar any
function badFunction(data: any): any {} // FORBIDDEN

// ✅ Usar unknown quando tipo é incerto
function safeFunction(data: unknown): ParsedData {
  // Type guards aqui
}
\`\`\`

## 🧩 Padrões de Implementação

### 🎯 Regra #1: Programação Funcional nos Services

\`\`\`typescript
// ✅ CORRETO - Functional Programming
class AnalyticsService {
  calculateMetrics(data: PaymentData[]): MetricsResult {
    return data
      .filter((payment) => payment.valor_do_pagamento > 0) // Filtragem pura
      .map((payment) => this.transformPayment(payment)) // Transformação pura
      .reduce(this.aggregateData, {}); // Agregação pura
  }

  private transformPayment(payment: PaymentData): TransformedPayment {
    // Função pura - mesmo input, mesmo output
    return {
      ...payment,
      formatted_value: this.formatCurrency(payment.valor_do_pagamento),
    };
  }
}

// ❌ INCORRETO - Imperativo/Mutável
class BadService {
  calculateMetrics(data: PaymentData[]): MetricsResult {
    let result = {};
    for (let i = 0; i < data.length; i++) {
      // FORBIDDEN
      result[data[i].id] = data[i].value; // FORBIDDEN - mutação
    }
    return result;
  }
}
\`\`\`

### 🎯 Regra #2: Repository Apenas SELECT JOIN

\`\`\`typescript
// ✅ CORRETO - Apenas JOIN, sem agregações
class PaymentsRepository {
  async getAllPaymentsData(): Promise<PaymentData[]> {
    const query = `
      SELECT vp.id_venda, vp.data_do_pagamento, vp.valor_do_pagamento,
             vp.codigo_imovel, i.descricao_imovel, ti.nome as tipo_imovel
      FROM venda_pagamento vp
      JOIN imovel i ON vp.codigo_imovel = i.codigo_imovel
      JOIN tipo_imovel ti ON i.id_tipo = ti.id_tipo
      ORDER BY vp.data_do_pagamento
    `;
    return this.executeQuery(query);
  }
}

// ❌ INCORRETO - Agregações no SQL
class BadRepository {
  async getAggregatedData(): Promise<any> {
    const query = `
      SELECT codigo_imovel, SUM(valor_do_pagamento) as total  -- FORBIDDEN
      FROM venda_pagamento
      WHERE data_do_pagamento > '2024-01-01'                  -- FORBIDDEN
      GROUP BY codigo_imovel                                  -- FORBIDDEN
    `;
    return this.executeQuery(query);
  }
}
\`\`\`

### 🎯 Regra #3: Controllers como HTTP Handlers

\`\`\`typescript
// ✅ CORRETO - Delegar para service
export class AnalyticsController {
  constructor(
    private repository: PaymentsRepository,
    private service: AnalyticsService
  ) {}

  async getPaymentsByProperty(req: Request, res: Response): Promise<void> {
    try {
      // 1. Buscar dados brutos
      const rawData = await this.repository.getAllPaymentsData();

      // 2. Processar com service (functional)
      const result = this.service.calculatePaymentsByProperty(rawData);

      // 3. Retornar JSON
      res.status(200).json(result);
    } catch (error) {
      console.error('Error in getPaymentsByProperty:', error);
      res.status(500).json([]);
    }
  }
}

// ❌ INCORRETO - Lógica no controller
export class BadController {
  async getPaymentsByProperty(req: Request, res: Response): Promise<void> {
    const data = await this.repository.getAllPaymentsData();

    // FORBIDDEN - Lógica de negócio no controller
    let grouped = {};
    for (let payment of data) {
      if (!grouped[payment.codigo_imovel]) {
        grouped[payment.codigo_imovel] = 0;
      }
      grouped[payment.codigo_imovel] += payment.valor_do_pagamento;
    }

    res.json(grouped);
  }
}
\`\`\`

## 🧪 Padrões de Testes

### Unit Tests para Services

\`\`\`typescript
// ✅ Teste focado em lógica pura
describe('AnalyticsService', () => {
  let service: AnalyticsService;

  beforeEach(() => {
    service = new AnalyticsService();
  });

  it('should calculate payments by property correctly', () => {
    // Arrange - dados sintéticos controlados
    const mockData: PaymentData[] = [
      {
        id_venda: 1,
        codigo_imovel: 101,
        valor_do_pagamento: 1500.0,
        // ... outros campos
      },
      {
        id_venda: 2,
        codigo_imovel: 101,
        valor_do_pagamento: 1500.0,
        // ... outros campos
      },
    ];

    // Act - executar função pura
    const result = service.calculatePaymentsByProperty(mockData);

    // Assert - verificar resultado determinístico
    expect(result).toHaveLength(1);
    expect(result[0].codigo_imovel).toBe(101);
    expect(result[0].total_pagamentos).toBe(3000.0);
  });
});
\`\`\`

### Integration Tests para Controllers

\`\`\`typescript
// ✅ Teste end-to-end com mocks
describe('Analytics Routes', () => {
  const app = createApp();

  beforeEach(() => {
    // Mock repository para dados controlados
    vi.mocked(PaymentsRepository.prototype.getAllPaymentsData).mockResolvedValue(mockPaymentData);
  });

  it('should return payments by property', async () => {
    const response = await request(app).get('/analytics/payments-by-property').expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0]).toHaveProperty('codigo_imovel');
    expect(response.body[0]).toHaveProperty('total_pagamentos');
  });
});
\`\`\`

## 🔄 Fluxo de Desenvolvimento

### 1. Análise de Requisitos

\`\`\`markdown
## Para implementar nova feature:

1. **Entender o requisito**
   - Que dados são necessários?
   - Qual processamento deve ser feito?
   - Qual formato de saída?

2. **Verificar arquitetura existente**
   - Posso reutilizar o JOIN existente?
   - Precisa de novos tipos?
   - Qual service method implementar?

3. **Implementar seguindo as camadas**
   - Types → Repository → Service → Controller → Routes
\`\`\`

### 2. Implementação Step-by-Step

\`\`\`typescript
// STEP 1: Definir tipos em src/types/index.ts
export interface NewMetricItem {
  property_id: number;
  metric_value: number;
  calculated_at: string;
}

export interface NewMetricResponse {
  data: NewMetricItem[];
  total: number;
}

// STEP 2: Implementar lógica no service
class AnalyticsService {
  calculateNewMetric(data: PaymentData[]): NewMetricResponse {
    const processed = data
      .filter(/* critério específico */)
      .map(/* transformação necessária */)
      .reduce(/* agregação funcional */, []);

    return {
      data: processed,
      total: processed.length
    };
  }
}

// STEP 3: Adicionar método no controller
class AnalyticsController {
  async getNewMetric(req: Request, res: Response): Promise<void> {
    try {
      const rawData = await this.repository.getAllPaymentsData();
      const result = this.service.calculateNewMetric(rawData);
      res.status(200).json(result);
    } catch (error) {
      console.error('Error in getNewMetric:', error);
      res.status(500).json({ data: [], total: 0 });
    }
  }
}

// STEP 4: Registrar rota
router.get('/analytics/new-metric', (req, res) => {
  void analyticsController.getNewMetric(req, res);
});

// STEP 5: Escrever testes
describe('calculateNewMetric', () => {
  it('should process data correctly', () => {
    // Arrange, Act, Assert
  });
});
\`\`\`

## 🚨 Regras Críticas para IA

### ⛔ NUNCA FAZER

\`\`\`typescript
// ❌ Quebrar programação funcional
for (let item of array) { } // Use map/filter/reduce instead

// ❌ Mutar objetos existentes
data.push(newItem); // Use [...data, newItem]
object.field = value; // Use { ...object, field: value }

// ❌ Agregações SQL
SELECT COUNT(*), SUM() FROM table GROUP BY field;

// ❌ Lógica de negócio em controllers
if (business_logic) { } // Move to service

// ❌ Usar any type
function process(data: any): any { }

// ❌ Console.log em produção sem contexto
console.log(data); // Use structured logging
\`\`\`

### ✅ SEMPRE FAZER

\`\`\`typescript
// ✅ Programação funcional
const result = data
  .filter((item) => item.isValid)
  .map((item) => transform(item))
  .reduce(aggregate, initialValue);

// ✅ Imutabilidade
const newArray = [...oldArray, newItem];
const newObject = { ...oldObject, newField: value };

// ✅ Tipos explícitos
function process(data: PaymentData[]): ProcessedResult {
  return data.map((item) => ({ ...item, processed: true }));
}

// ✅ Separação de responsabilidades
// Repository: apenas dados
// Service: apenas lógica
// Controller: apenas HTTP
\`\`\`

## 🔍 Debugging e Troubleshooting

### Logs Estruturados

\`\`\`typescript
// ✅ Logs informativos com contexto
console.log('📊 Processing analytics data', {
  recordCount: data.length,
  operation: 'calculatePaymentsByProperty',
  timestamp: new Date().toISOString(),
});

// ✅ Error logging com stack trace
console.error('❌ Error in analytics calculation:', {
  error: error.message,
  stack: error.stack,
  input: { dataLength: data.length },
});
\`\`\`

### Performance Monitoring

\`\`\`typescript
// ✅ Timing para operações críticas
const startTime = performance.now();
const result = this.heavyCalculation(data);
const endTime = performance.now();

console.log(`⏱️ Calculation completed in ${endTime - startTime}ms`, {
  inputSize: data.length,
  outputSize: result.length,
});
\`\`\`

## 📊 Métricas de Qualidade

### Code Quality Checklist

- [ ] TypeScript strict mode ativado
- [ ] ESLint sem warnings
- [ ] Prettier formatação aplicada
- [ ] Spell check (PT-BR + EN) passou
- [ ] Testes com coverage > 80%
- [ ] Documentação atualizada

### Performance Benchmarks

- [ ] Endpoints respondem < 500ms
- [ ] Processamento 1000 registros < 100ms
- [ ] Memória não excede 100MB
- [ ] Sem memory leaks em testes

## 🎯 Próximos Passos Recomendados

### Para Desenvolvedores

1. Implementar cache em memória para dados frequentes
2. Adicionar validação de entrada com Zod
3. Implementar rate limiting
4. Adicionar métricas com Prometheus

### Para IA Agents

1. Sempre verificar CHANGELOG.md antes de implementar
2. Seguir exatamente os padrões funcionais
3. Testar mudanças com dados sintéticos
4. Documentar decisões técnicas

---

**🤖 LEMBRETE PARA AGENTES DE IA**: Este projeto segue padrões acadêmicos específicos (HOW VII). Qualquer desvio das regras de programação funcional ou estrutura de camadas pode invalidar o trabalho. Sempre priorize conformidade com os requisitos sobre otimizações prematuras.
\`\`\``
