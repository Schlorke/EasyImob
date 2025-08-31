# 🤖 GitHub Copilot Instructions - EasyImob Project

## 🎯 Project Context for AI

You are assisting with **EasyImob**, an academic backend project for **HOW VII (UNIVALI)**. This is a Node.js + TypeScript REST API for real estate analytics with specific academic constraints.

## 📚 MANDATORY: Read Before Coding

Before suggesting any code, you MUST understand:

1. **`docs/ARCHITECTURE.md`** - System structure and patterns
2. **`docs/DEVELOPMENT-GUIDE.md`** - Coding standards and rules
3. **`CHANGELOG.md`** - What's already implemented
4. **`.cursorrules`** - Cursor-specific rules (apply same logic)

## 🎓 Academic Requirements (CRITICAL)

### HOW VII Constraints
- **NO SQL Aggregations**: No `WHERE`, `GROUP BY`, `COUNT()`, `SUM()` in final queries
- **Functional Programming ONLY**: Use `map()`, `filter()`, `reduce()`, `forEach()`
- **Single JOIN Query**: Repository returns raw data, services process in memory
- **Clean Architecture**: Strict layer separation

### ⚠️ Violation = Academic Penalty
Any suggestion that breaks these rules could cause the student to fail. Be extremely careful.

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────┐
│  Controllers (HTTP only)               │
├─────────────────────────────────────────┤
│  Services (Functional Programming)     │
├─────────────────────────────────────────┤
│  Repositories (Single JOIN only)       │
├─────────────────────────────────────────┤
│  Database (MySQL)                      │
└─────────────────────────────────────────┘
```

### Current Data Flow
1. **Controller** receives HTTP request
2. **Repository** executes single JOIN query (6 columns)
3. **Service** processes raw data with functional programming
4. **Controller** returns JSON response

## 🔧 Code Suggestion Rules

### ✅ ALWAYS Suggest These Patterns

```typescript
// ✅ Functional data processing
const processPayments = (data: PaymentData[]): Result[] =>
  data
    .filter(payment => payment.valor_do_pagamento > 0)
    .map(payment => ({
      ...payment,
      formatted_value: formatCurrency(payment.valor_do_pagamento)
    }))
    .reduce((acc, payment) => {
      acc[payment.codigo_imovel] = (acc[payment.codigo_imovel] || 0) + payment.valor_do_pagamento;
      return acc;
    }, {} as Record<number, number>);

// ✅ Immutable updates
const newArray = [...oldArray, newItem];
const newObject = { ...oldObject, newField: value };

// ✅ Pure functions
const calculatePercentage = (value: number, total: number): number =>
  Math.round((value / total) * 100 * 100) / 100; // 2 decimal places

// ✅ Type-safe interfaces
interface PaymentsByPropertyItem {
  codigo_imovel: number;
  descricao_imovel: string;
  tipo_imovel: string;
  total_pagamentos: number;
}
```

### ❌ NEVER Suggest These Patterns

```typescript
// ❌ SQL aggregations (violates HOW VII)
SELECT codigo_imovel, SUM(valor_do_pagamento) 
FROM venda_pagamento 
GROUP BY codigo_imovel;

// ❌ Imperative loops (use functional instead)
for (let i = 0; i < array.length; i++) {
  result += array[i].value;
}

// ❌ Mutations (use immutable patterns)
array.push(newItem);
object.property = newValue;

// ❌ Business logic in controllers
if (payment.value > 1000) { // Move to service
  // business logic here
}

// ❌ Any types (use specific types)
function process(data: any): any { }
```

## 📊 Current Endpoints (Don't Break)

| Endpoint | Purpose | Processing |
|----------|---------|------------|
| `GET /health` | Health check | None |
| `GET /raw/payments` | Raw JOIN data | None |
| `GET /analytics/payments-by-property` | Group by property | `reduce()` |
| `GET /analytics/sales-by-month` | Group by month | `reduce()` + date formatting |
| `GET /analytics/sales-share-by-type` | Calculate percentages | `reduce()` + percentage calc |

## 🎯 When Suggesting New Features

### 1. Follow This Pattern
```typescript
// Step 1: Define types in src/types/index.ts
interface NewAnalyticsResult {
  metric_name: string;
  value: number;
  calculated_at: string;
}

// Step 2: Add service method (functional only)
class AnalyticsService {
  calculateNewMetric(data: PaymentData[]): NewAnalyticsResult[] {
    return data
      .filter(/* business logic */)
      .map(/* transformation */)
      .reduce(/* aggregation */, []);
  }
}

// Step 3: Add controller method (HTTP only)
class AnalyticsController {
  async getNewMetric(req: Request, res: Response): Promise<void> {
    const data = await this.repository.getAllPaymentsData(); // Same JOIN
    const result = this.service.calculateNewMetric(data); // Functional processing
    res.json(result);
  }
}

// Step 4: Register route
router.get('/analytics/new-metric', controller.getNewMetric);
```

### 2. Always Include Tests
```typescript
describe('calculateNewMetric', () => {
  it('should process data correctly using functional programming', () => {
    const mockData: PaymentData[] = [/* test data */];
    const result = service.calculateNewMetric(mockData);
    expect(result).toEqual(/* expected result */);
  });
});
```

## 🧪 Testing Suggestions

### Unit Tests for Services
- Test with controlled synthetic data
- Verify functional programming patterns
- Check immutability (original data unchanged)
- Test edge cases (empty arrays, null values)

### Integration Tests for Endpoints
- Mock repository to return controlled data
- Test complete request/response cycle
- Verify JSON structure matches interfaces
- Test error handling

## 🔍 Code Review Checklist

When suggesting code, ensure:
- [ ] Uses functional programming (`map/filter/reduce/forEach`)
- [ ] No mutations of input data
- [ ] Type-safe with explicit interfaces
- [ ] Follows layer separation (Controller → Service → Repository)
- [ ] No SQL aggregations in repository
- [ ] Includes error handling
- [ ] Has corresponding tests

## 📈 Performance Considerations

Since all processing is in-memory (HOW VII requirement):
- Suggest efficient functional patterns
- Avoid nested loops when possible
- Use built-in array methods (optimized)
- Consider early returns with `filter()`

```typescript
// ✅ Efficient functional pattern
const result = data
  .filter(payment => payment.valor_do_pagamento > minValue) // Early filtering
  .map(payment => transformPayment(payment))              // Transform
  .reduce(aggregateLogic, initialValue);                  // Final aggregation

// ❌ Inefficient nested processing
const result = data.map(payment => 
  data.filter(p => p.codigo_imovel === payment.codigo_imovel) // Nested loop
);
```

## 🎨 Naming Convention Guidance

```typescript
// Interfaces - PascalCase
interface PaymentAnalyticsResult { }

// Classes - PascalCase  
class PaymentProcessor { }

// Methods/variables - camelCase
calculateMonthlyTotals()
const processedData = [];

// Constants - UPPER_SNAKE_CASE
const MAX_PAYMENT_VALUE = 100000;

// Files - kebab-case
payment-analytics.service.ts
```

## 🚨 Error Handling Patterns

```typescript
// ✅ Structured error handling
try {
  const data = await repository.getAllPaymentsData();
  const result = service.processData(data);
  res.status(200).json(result);
} catch (error) {
  console.error('Analytics processing failed:', {
    error: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString()
  });
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Processing failed'
  });
}
```

## 🎯 Contextual Suggestions

### When you see functional programming needed:
```typescript
// Instead of suggesting:
let total = 0;
for (const payment of payments) {
  total += payment.value;
}

// Suggest:
const total = payments.reduce((sum, payment) => sum + payment.value, 0);
```

### When you see data transformation needed:
```typescript
// Instead of suggesting:
const result = [];
for (const payment of payments) {
  result.push({ ...payment, processed: true });
}

// Suggest:
const result = payments.map(payment => ({ ...payment, processed: true }));
```

### When you see filtering needed:
```typescript
// Instead of suggesting:
const valid = [];
for (const payment of payments) {
  if (payment.value > 0) {
    valid.push(payment);
  }
}

// Suggest:
const valid = payments.filter(payment => payment.value > 0);
```

## 📝 Documentation Updates

When suggesting code that adds new features:
1. Update relevant interfaces in `src/types/`
2. Add method documentation with JSDoc
3. Include usage examples
4. Update `CHANGELOG.md` if significant

## 🤖 AI Assistant Guidelines

Remember, you're helping with:
- **Academic work** (will be graded by professors)
- **Specific constraints** (functional programming required)
- **Real deadline pressure** (student needs working solution)

**Priority Order**:
1. ✅ **Correctness** (meets HOW VII requirements)
2. ✅ **Compliance** (functional programming, clean architecture)
3. ✅ **Type Safety** (explicit TypeScript types)
4. ✅ **Testability** (pure functions, clear interfaces)
5. ✅ **Performance** (efficient algorithms within constraints)

**When unsure**: Always choose the more explicit, type-safe, functional approach. Academic projects value correctness and compliance over clever optimizations.

---

*This file guides GitHub Copilot to provide contextually appropriate suggestions for the EasyImob academic project. All suggestions should align with HOW VII requirements and functional programming principles.*
