# 🏠 API de Gestão Imobiliária

Sistema completo de gestão imobiliária com processamento de dados em memória usando **map**, **filter**, **reduce** e **forEach**.

**Regra importante**: Sem uso de `WHERE` nem `GROUP BY` no MySQL - todo processamento é feito em JavaScript.

## 📋 Características

- ✅ **Node.js + Express** para backend
- ✅ **MySQL2** para conexão com banco
- ✅ **Processamento em memória** (map/filter/reduce/forEach)
- ✅ **Sem WHERE/GROUP BY** no SQL
- ✅ **4 endpoints** para diferentes tipos de gráficos
- ✅ **Código comentado** e bem estruturado

## 🗄️ Banco de Dados

### Tabelas Criadas

```sql
-- Tabela de imóveis
imovel (
    id_imovel INT PK,
    codigo_imovel VARCHAR,
    descricao_imovel TEXT,
    tipo_imovel VARCHAR
)

-- Tabela de pagamentos
pagamento (
    id_pagamento INT PK,
    id_imovel FK → imovel,
    data_pagamento DATE,
    valor_pagamento DECIMAL
)
```

### Dados Inseridos

- **10 imóveis** diferentes (Apartamentos, Casas, Comerciais, Cobertura, Studio)
- **36 pagamentos** distribuídos em **6 meses** (Jan-Jun 2024)
- **Todos os imóveis** têm pelo menos 1 pagamento

## 🚀 Instalação e Execução

### 1. Clonar e Instalar

```bash
# Instalar dependências
npm install

# Copiar arquivo de configuração
cp env.example .env
```

### 2. Configurar Banco de Dados

Edite o arquivo `.env` com suas credenciais:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=gestao_imobiliaria
PORT=3000
```

### 3. Executar Script SQL

Execute o arquivo `database.sql` no seu MySQL para criar as tabelas e inserir os dados.

### 4. Iniciar Aplicação

```bash
# Modo desenvolvimento (com nodemon)
npm run dev

# Modo produção
npm start
```

## 📊 Endpoints da API

### 🔍 GET `/` - Informações da API

Retorna informações básicas sobre a API e endpoints disponíveis.

**Resposta:**

```json
{
  "success": true,
  "message": "API de Gestão Imobiliária - Funcionando!",
  "endpoints": {
    "dados_brutos": "GET /dados",
    "grafico_barras": "GET /grafico-barras",
    "grafico_linhas": "GET /grafico-linhas",
    "grafico_pizza": "GET /grafico-pizza"
  }
}
```

### 📋 GET `/dados` - Dados Brutos

Retorna todos os dados do JOIN sem processamento.

**Processamento:** Nenhum - dados diretos do banco
**Query SQL:** `SELECT * FROM pagamento p INNER JOIN imovel i ON p.id_imovel = i.id_imovel`

**Resposta:**

```json
{
  "success": true,
  "total_registros": 36,
  "dados": [
    {
      "id_pagamento": 1,
      "data_pagamento": "2024-01-05",
      "valor_pagamento": 1800.0,
      "codigo_imovel": "APT001",
      "descricao_imovel": "Apartamento 2 quartos...",
      "tipo_imovel": "Apartamento"
    }
  ]
}
```

### 📊 GET `/grafico-barras` - Gráfico de Barras

Agrupa dados por imóvel e soma os valores.

**Processamento:** `reduce()` para agrupar + `map()` para formatar + `sort()` para ordenar
**Lógica:** Para cada imóvel, somar todos os pagamentos

**Resposta:**

```json
{
  "success": true,
  "tipo_grafico": "barras",
  "dados": [
    {
      "codigo_imovel": "COBERTURA001",
      "descricao_imovel": "Cobertura duplex...",
      "tipo_imovel": "Cobertura",
      "total_pagamentos": 13500.0,
      "quantidade_pagamentos": 3
    }
  ]
}
```

### 📈 GET `/grafico-linhas` - Gráfico de Linhas

Agrupa dados por mês/ano e soma os valores.

**Processamento:** `reduce()` para agrupar por data + `map()` para formatar datas
**Lógica:** Para cada mês, somar todos os pagamentos

**Resposta:**

```json
{
  "success": true,
  "tipo_grafico": "linhas",
  "dados": [
    {
      "mes_ano": "2024-01",
      "mes_ano_formatado": "Jan/2024",
      "total_pagamentos": 11800.0,
      "quantidade_pagamentos": 5
    }
  ]
}
```

### 🥧 GET `/grafico-pizza` - Gráfico de Pizza

Calcula percentuais por tipo de imóvel.

**Processamento:** `reduce()` para calcular total + `reduce()` para agrupar + `map()` para calcular %
**Lógica:** Para cada tipo, calcular percentual sobre o total geral

**Resposta:**

```json
{
  "success": true,
  "tipo_grafico": "pizza",
  "total_geral": 75600.0,
  "dados": [
    {
      "tipo_imovel": "Casa",
      "total_pagamentos": 27000.0,
      "quantidade_pagamentos": 12,
      "percentual": 35.71
    }
  ]
}
```

## 🧠 Processamento em Memória

### Técnicas Utilizadas

#### 1. **reduce()** - Agrupamento e Soma

```javascript
// Agrupar por imóvel
const agrupado = dados.reduce((acc, item) => {
  if (!acc[item.codigo_imovel]) {
    acc[item.codigo_imovel] = { total: 0 };
  }
  acc[item.codigo_imovel].total += item.valor_pagamento;
  return acc;
}, {});
```

#### 2. **map()** - Transformação de Dados

```javascript
// Formatar valores e datas
const formatado = dados.map((item) => ({
  ...item,
  valor_formatado: parseFloat(item.valor.toFixed(2)),
  data_formatada: formatarData(item.data),
}));
```

#### 3. **filter()** - Filtragem (quando necessário)

```javascript
// Filtrar por critérios específicos
const filtrado = dados.filter((item) => item.valor_pagamento > 1000);
```

#### 4. **sort()** - Ordenação

```javascript
// Ordenar por valor (maior primeiro)
const ordenado = dados.sort((a, b) => b.total_pagamentos - a.total_pagamentos);
```

## 📁 Estrutura do Projeto

```
📦 gestao-imobiliaria-api/
├── 📄 database.sql              # Script de criação do banco
├── 📄 package.json              # Dependências e scripts
├── 📄 env.example               # Exemplo de configuração
├── 📄 README.md                 # Esta documentação
└── 📁 src/
    ├── 📄 app.js                # Aplicação principal
    ├── 📁 config/
    │   └── 📄 db.js             # Configuração do MySQL
    ├── 📁 controllers/
    │   └── 📄 dataController.js # Lógica de processamento
    └── 📁 routes/
        └── 📄 index.js          # Definição das rotas
```

## 🔧 Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **MySQL2** - Driver MySQL com Promises
- **dotenv** - Gerenciamento de variáveis de ambiente
- **cors** - Middleware para CORS

## 📝 Regras Implementadas

✅ **Sem WHERE nem GROUP BY** - Todo processamento em JavaScript  
✅ **Dados completos** - Sempre busca todos os registros do banco  
✅ **map/filter/reduce/forEach** - Usado para todo processamento  
✅ **8+ imóveis** - 10 imóveis cadastrados  
✅ **30+ pagamentos** - 36 pagamentos em 6 meses  
✅ **5+ meses** - Dados de Janeiro a Junho 2024  
✅ **Todos imóveis com pagamento** - Garantido na inserção

## 🧪 Testando a API

### Usando curl:

```bash
# Informações da API
curl http://localhost:3000/

# Dados brutos
curl http://localhost:3000/dados

# Gráfico de barras
curl http://localhost:3000/grafico-barras

# Gráfico de linhas
curl http://localhost:3000/grafico-linhas

# Gráfico de pizza
curl http://localhost:3000/grafico-pizza
```

### Usando navegador:

Acesse `http://localhost:3000` e navegue pelos endpoints.

## 🚨 Troubleshooting

### Erro de Conexão MySQL

```
❌ Erro ao conectar com o banco de dados
```

**Solução:** Verifique as credenciais no arquivo `.env`

### Erro "database.sql não executado"

```
❌ Table 'gestao_imobiliaria.imovel' doesn't exist
```

**Solução:** Execute o script `database.sql` no seu MySQL

### Porta já em uso

```
❌ Error: listen EADDRINUSE :::3000
```

**Solução:** Altere a porta no `.env` ou mate o processo na porta 3000

## 👨‍💻 Autor

Sistema desenvolvido seguindo as especificações de processamento em memória com JavaScript, sem uso de agregações SQL.

---

**🎯 Objetivo alcançado:** API funcional com processamento 100% em memória usando map/filter/reduce/forEach!
