# 📝 Configuração de Spell Checking

## Overview

O projeto está configurado para verificação ortográfica em **português brasileiro** e **inglês** usando o **Code Spell Checker**.

## 🛠️ Configuração

### Extensões VS Code Necessárias

- `streetsidesoftware.code-spell-checker` - Verificador ortográfico principal
- `streetsidesoftware.code-spell-checker-portuguese-brazilian` - Dicionário PT-BR

### Arquivos de Configuração

#### `.vscode/settings.json`

\`\`\`json
{
  "cSpell.enabled": true,
  "cSpell.language": "en,pt_BR"
}
\`\`\`

#### `cspell.json` (Raiz do projeto)

\`\`\`json
{
  "language": "en,pt_BR",
  "words": ["EasyImob", "UNIVALI", "analytics", ...]
}
\`\`\`

## 📋 Comandos Disponíveis

\`\`\`bash
# Verificar ortografia de todos os arquivos
npm run spell:check

# Verificação silenciosa (apenas erros)
npm run spell:check-silent

# Verificar arquivo específico
npx cspell README.md
\`\`\`

## 📚 Dicionários Customizados

### Palavras Técnicas Adicionadas

- **Projeto**: EasyImob, UNIVALI, analytics
- **Português**: imovel, pagamento, vendas, apartamento, galpao
- **Tech Stack**: mysql, postgresql, typescript, eslint, vitest
- **Arquitetura**: middleware, endpoint, schema, repository

### Adicionar Novas Palavras

#### Método 1: Via cspell.json

\`\`\`json
{
  "words": ["nova-palavra", "outro-termo"]
}
\`\`\`

#### Método 2: Via comentário no código

\`\`\`typescript
// cspell:words minhapalavra outrotermos
const minhapalavra = 'exemplo';
\`\`\`

#### Método 3: Ignorar linha específica

\`\`\`typescript
// cspell:disable-next-line
const termIncorreto = 'naoexiste';
\`\`\`

## 🚫 Arquivos Ignorados

O spell checker **não verifica**:

- `node_modules/`
- `dist/`
- `coverage/`
- `*.log`
- `package-lock.json`
- `evidences/`

## ⚙️ Tipos de Arquivo Verificados

- TypeScript (`.ts`)
- JavaScript (`.js`)
- Markdown (`.md`)
- JSON (`.json`)
- SQL (`.sql`)
- YAML/YML

## 🔧 Troubleshooting

### Falsos Positivos

Se uma palavra técnica válida está sendo marcada como erro:

1. **Adicione ao cspell.json** (recomendado para termos do projeto)
2. **Use comentário cspell** (para casos específicos)
3. **Configure no VS Code** (preferências pessoais)

### Exemplo de Falso Positivo

\`\`\`typescript
// ANTES: 'pagamento' sendo marcado como erro
const pagamento = data.valor_do_pagamento;

// DEPOIS: Palavra adicionada ao dicionário customizado
// Agora 'pagamento' é reconhecido automaticamente
\`\`\`

### Configuração Regional

O projeto usa:

- **Inglês americano** (`en_US`) - Termos técnicos
- **Português brasileiro** (`pt_BR`) - Documentação e código

## 📈 Integração CI/CD

Adicione ao pipeline de qualidade:

\`\`\`yaml
# .github/workflows/quality.yml
- name: Spell Check
  run: npm run spell:check-silent
\`\`\`

## 🎯 Boas Práticas

1. **Execute spell check** antes de commits importantes
2. **Adicione palavras técnicas** ao dicionário do projeto (não pessoal)
3. **Use inglês** para código/variáveis quando possível
4. **Use português** para comentários explicativos e documentação
5. **Ignore apenas quando necessário** - prefira adicionar ao dicionário

## 📝 Exemplos de Uso

### Código Misto (Recomendado)

\`\`\`typescript
/**
 * Serviço para análise de vendas imobiliárias
 * Analytics service for real estate sales
 */
export class AnalyticsService {
  // Calcula pagamentos por imóvel
  calculatePaymentsByProperty(data: PaymentData[]): PaymentsByPropertyItem[] {
    return data.reduce((acc, pagamento) => {
      // lógica de agregação...
    }, {});
  }
}
\`\`\`

### Documentação Bilíngue

\`\`\`markdown
# Analytics Endpoints

## GET /analytics/payments-by-property

Retorna total de pagamentos agrupados por imóvel.

Returns payment totals grouped by property.
\`\`\`

---

**💡 O spell checking ajuda a manter a qualidade da documentação e reduzir erros de digitação no código.**
