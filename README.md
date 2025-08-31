# HOW VII - EasyImob Backend

🏠 **Sistema de Analytics para Vendas Imobiliárias**

Backend HTTP/REST completo desenvolvido para o Hands On Work VII (UNIVALI), implementando análises de vendas imobiliárias com programação funcional e consultas JOIN.

## 📋 Sumário

- [Características](#-características)
- [Requisitos](#-requisitos)
- [Instalação](#-instalação)
- [Configuração](#-configuração)
- [Execução](#-execução)
- [Endpoints API](#-endpoints-api)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Testes](#-testes)
- [Evidências](#-evidências)
- [Tecnologias](#-tecnologias)

## 🚀 Características

### ✅ Conformidade com HOW VII
- **Consulta JOIN única** retornando exatamente 6 colunas: `id_venda, data_do_pagamento, valor_do_pagamento, codigo_imovel, descricao_imovel, tipo_imovel`
- **Sem WHERE/GROUP BY** nas agregações dos endpoints - processamento em memória
- **Programação funcional** com `map/filter/reduce/forEach` + paradigma OO
- **≥ 8 imóveis** e **≥ 30 pagamentos** distribuídos em **≥ 5 meses**

### 🏗️ Arquitetura
- **Clean Architecture** com separação de camadas
- **TypeScript** estrito com tipos fortes
- **Dependency Injection** para testabilidade
- **Tratamento de erros** robusto
- **Graceful shutdown** do servidor

### 📊 Analytics Endpoints
1. `GET /analytics/payments-by-property` - Total acumulado por imóvel
2. `GET /analytics/sales-by-month` - Vendas por mês/ano (valor + quantidade)
3. `GET /analytics/sales-share-by-type` - Participação percentual por tipo

## 📋 Requisitos

### Sistema
- **Node.js** 20+ 
- **MySQL** 8.0+ 
- **npm** ou **yarn**

### Dependências Principais
- Express 5.0
- mysql2 (driver MySQL)
- TypeScript
- Vitest (testes)

## 🔧 Instalação

### 1. Clone e Setup
```bash
git clone <seu-repositorio>
cd how7-backend
npm install
```

### 2. Configuração do Banco (MySQL)

#### Opção A: MySQL Local
```bash
# Instalar MySQL 8.0+
# Criar banco usando o script fornecido
mysql -u root -p < db.sql
```

#### Opção B: MySQL via Docker
```bash
# Subir MySQL em container
docker run --name mysql-how7 \
  -e MYSQL_ROOT_PASSWORD=senha123 \
  -e MYSQL_DATABASE=how7_easyimob \
  -p 3306:3306 \
  -d mysql:8.0

# Aguardar inicialização (30-60s)
docker exec -i mysql-how7 mysql -u root -psenha123 < db.sql
```

## ⚙️ Configuração

### 1. Variáveis de Ambiente
```bash
# Copiar arquivo de exemplo
cp env.example .env

# Editar .env com suas configurações
```

### 2. Exemplo de .env
```env
# MySQL Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=senha123
DB_NAME=how7_easyimob

# Server Configuration  
PORT=3000
NODE_ENV=development
```

## 🚀 Execução

### Desenvolvimento
```bash
# Modo desenvolvimento (hot reload)
npm run dev
```

### Produção
```bash
# Build e execução
npm run build
npm start
```

### Verificação
```bash
# Verificar saúde do sistema
curl http://localhost:3000/health

# Deverá retornar: {"status":"ok"}
```

## 📡 Endpoints API

### Base URL
```
http://localhost:3000
```

### 1. Health Check
```bash
GET /health
```
**Resposta:**
```json
{"status": "ok"}
```

### 2. Dados Brutos (JOIN)
```bash
GET /raw/payments
```
**Descrição:** Retorna resultado da consulta JOIN com as 6 colunas exigidas.

### 3. Analytics - Pagamentos por Imóvel
```bash
GET /analytics/payments-by-property
```
**Descrição:** Total acumulado por `codigo_imovel`, ordenado por valor descrescente.

**Exemplo de Resposta:**
```json
[
  {
    "codigo_imovel": 8,
    "descricao_imovel": "Galpão 800m² - Zona Sul", 
    "tipo_imovel": "Galpão",
    "total_pagamentos": 18000.00
  },
  {
    "codigo_imovel": 7,
    "descricao_imovel": "Galpão 500m² - Distrito Industrial",
    "tipo_imovel": "Galpão", 
    "total_pagamentos": 13500.00
  }
]
```

### 4. Analytics - Vendas por Mês
```bash
GET /analytics/sales-by-month
```
**Descrição:** Vendas agrupadas por mês/ano com total monetário e quantidade.

**Exemplo de Resposta:**
```json
{
  "series": [
    {
      "mes": "02/2025",
      "total": 12600.00,
      "quantidade": 6
    },
    {
      "mes": "03/2025", 
      "total": 16800.00,
      "quantidade": 7
    }
  ]
}
```

### 5. Analytics - Participação por Tipo
```bash
GET /analytics/sales-share-by-type
```
**Descrição:** Percentual quantitativo por `tipo_imovel`.

**Exemplo de Resposta:**
```json
{
  "share": [
    {
      "tipo_imovel": "Apartamento",
      "percentual": 30.30,
      "quantidade": 10
    },
    {
      "tipo_imovel": "Casa", 
      "percentual": 24.24,
      "quantidade": 8
    }
  ],
  "total": 33
}
```

## 🏗️ Estrutura do Projeto

```
how7-backend/
├── src/
│   ├── types/           # Tipos TypeScript
│   ├── db/              # Conexão MySQL
│   ├── repositories/    # Acesso a dados (apenas JOIN)
│   ├── services/        # Lógica de negócio (programação funcional)
│   ├── controllers/     # Handlers Express
│   ├── routes/          # Definição de rotas
│   ├── app.ts           # Configuração Express
│   └── server.ts        # Bootstrap da aplicação
├── tests/               # Testes unitários e integração
├── evidences/           # Artefatos para PDF (gerados)
├── db.sql               # Schema + dados MySQL
├── package.json
├── tsconfig.json
└── README.md
```

## 🧪 Testes

### Executar Testes
```bash
# Todos os testes
npm test

# Com coverage
npm run test:coverage

# Lint
npm run lint
```

### Cobertura
- **Testes unitários:** Services (programação funcional)
- **Testes de integração:** Endpoints completos
- **Mocks:** Repository para isolar lógica de negócio

## 📊 Evidências

### Scripts de Teste
```bash
# Health check
curl -s http://localhost:3000/health | jq

# Dados brutos  
curl -s http://localhost:3000/raw/payments | jq

# Analytics endpoints
curl -s http://localhost:3000/analytics/payments-by-property | jq
curl -s http://localhost:3000/analytics/sales-by-month | jq  
curl -s http://localhost:3000/analytics/sales-share-by-type | jq
```

### Geração de Evidências
```bash
# Executar script de evidências
npm run evidence:generate

# Arquivos gerados em ./evidences/
# - raw-payments.json
# - payments-by-property.json  
# - sales-by-month.json
# - sales-share-by-type.json
```

### Capturas para PDF
1. **Terminal:** Output do `npm run dev` com logs de inicialização
2. **Database:** Schema das tabelas (`DESCRIBE venda_pagamento;`)
3. **Consulta JOIN:** Resultado da query principal
4. **JSON Responses:** Saída dos 4 endpoints principais
5. **Testes:** Output do `npm test` com coverage

## 🛠️ Tecnologias

### Core
- **Node.js 20+** - Runtime JavaScript
- **TypeScript** - Tipagem estática
- **Express 5** - Framework web

### Database
- **MySQL 8.0+** - Banco de dados relacional
- **mysql2** - Driver MySQL para Node.js

### Desenvolvimento
- **Vitest** - Framework de testes
- **ESLint** - Linting
- **Prettier** - Formatação
- **ts-node-dev** - Development server

### Arquitetura
- **Clean Architecture** - Separação de responsabilidades
- **Dependency Injection** - Inversão de controle
- **Functional Programming** - map/filter/reduce
- **Object-Oriented** - Classes e encapsulamento

## 📝 Comandos Importantes

```bash
# Desenvolvimento
npm run dev          # Servidor desenvolvimento
npm run build        # Build TypeScript
npm start            # Servidor produção

# Qualidade
npm run lint         # Verificar código
npm run lint:fix     # Corrigir lint
npm run format       # Formatar código
npm test             # Executar testes

# Database
mysql -u root -p < db.sql  # Criar schema + dados
```

## ✅ Checklist de Aceite

- [x] Estrutura de dados criada e populada (≥8 imóveis, ≥30 pagamentos, ≥5 meses)
- [x] Consulta JOIN retorna exatamente as 6 colunas especificadas
- [x] Endpoints REST respondendo JSON conforme especificação
- [x] Cálculos apenas no código usando programação funcional
- [x] Testes unitários e de integração passando
- [x] README com passo a passo completo
- [x] Scripts curl de exemplo funcionando
- [x] Evidências geradas para PDF

## 📹 Roteiro para Vídeo (3 min)

1. **Inicialização** (30s)
   - `npm run dev`
   - Mostrar logs de conexão com banco
   - Acessar `GET /health`

2. **Dados Brutos** (45s)
   - `GET /raw/payments`
   - Mostrar estrutura JSON com 6 colunas
   - Explicar consulta JOIN única

3. **Analytics** (90s)
   - `GET /analytics/payments-by-property` - destacar ordenação
   - `GET /analytics/sales-by-month` - mostrar agrupamento temporal
   - `GET /analytics/sales-share-by-type` - percentuais calculados

4. **Código + Testes** (15s)
   - Mostrar estrutura do projeto
   - `npm test` com cobertura

---

**Desenvolvido para HOW VII - UNIVALI**  
*Backend Analytics com Programação Funcional + MySQL*
