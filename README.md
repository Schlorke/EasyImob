# EasyImob

🏠 **Sistema de Analytics para Vendas Imobiliárias**

Backend HTTP/REST completo desenvolvido para o Hands On Work VII (UNIVALI), implementando análises de vendas imobiliárias com programação funcional e consultas JOIN.

## 📚 Documentação Completa

**🤖 Para Agentes de IA**: Leia SEMPRE a documentação antes de implementar:

\`\`\`bash
npm run agent:docs  # Validador automático de documentação
\`\`\`

### 📋 Documentos Disponíveis

| Documento | Propósito | Audiência |
|-----------|-----------|-----------|
| **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** | Arquitetura e padrões do sistema | Desenvolvedores + IA |
| **[docs/DEVELOPMENT-GUIDE.md](docs/DEVELOPMENT-GUIDE.md)** | Convenções e regras de desenvolvimento | Desenvolvedores + IA |
| **[docs/PROJECT-OVERVIEW.md](docs/PROJECT-OVERVIEW.md)** | Visão executiva e valor de negócio | Stakeholders |
| **[CHANGELOG.md](CHANGELOG.md)** | Histórico completo de mudanças | Todos |
| **[.cursorrules](.cursorrules)** | Regras específicas para Cursor AI | Agentes Cursor |
| **[.github/copilot-instructions.md](.github/copilot-instructions.md)** | Instruções para GitHub Copilot | GitHub Copilot |

### 🚀 Quick Start

\`\`\`bash
# 1. Instalar dependências
npm install

# 2. Configurar banco de dados
mysql -u root -p < db.sql

# 3. Configurar variáveis (.env)
cp env.example .env
# Editar .env com suas configurações

# 4. Iniciar desenvolvimento
npm run dev

# 5. Testar endpoints
curl http://localhost:3000/health
curl http://localhost:3000/analytics/payments-by-property
\`\`\`

## 🎯 Características Principais

### ✅ Conformidade HOW VII
- **Consulta JOIN única** retornando exatamente 6 colunas
- **Processamento em memória** com programação funcional
- **Sem WHERE/GROUP BY** nas agregações dos endpoints
- **≥ 8 imóveis** e **≥ 30 pagamentos** distribuídos em **≥ 5 meses**

### 🏗️ Arquitetura
- **Clean Architecture** com separação de camadas
- **TypeScript** estrito com tipos fortes
- **Programação funcional** pura (map/filter/reduce/forEach)
- **Testes completos** (unit + integration)
- **Documentação de classe mundial** para IA e desenvolvedores

## 📊 Endpoints Disponíveis

| Endpoint | Descrição | Processamento |
|----------|-----------|---------------|
| `GET /health` | Health check | - |
| `GET /raw/payments` | Dados brutos do JOIN | - |
| `GET /analytics/payments-by-property` | Total por imóvel | `reduce()` |
| `GET /analytics/sales-by-month` | Vendas por mês/ano | `reduce()` + `map()` |
| `GET /analytics/sales-share-by-type` | Percentual por tipo | `reduce()` + percentuais |

## 🛠️ Comandos Principais

\`\`\`bash
# Desenvolvimento
npm run dev              # Servidor desenvolvimento
npm run build            # Build TypeScript
npm start               # Servidor produção

# Qualidade
npm run lint            # Verificar código
npm run test            # Executar testes
npm run spell:check     # Verificar ortografia

# Formatação
npm run format          # Formatar TypeScript
npm run format:md       # Formatar Markdown
npm run format:all      # Formatar todos os arquivos

# Utilitários
npm run agent:docs      # Validar documentação para IA
npm run evidence:generate # Gerar evidências JSON
\`\`\`

## 🎓 Projeto Acadêmico

**Instituição**: UNIVALI  
**Disciplina**: Hands On Work VII  
**Objetivo**: Demonstrar competências em arquitetura, programação funcional e APIs REST  

### Restrições Acadêmicas
- Programação funcional obrigatória nos services
- Processamento de dados em memória (sem SQL agregations)
- Clean Architecture com TypeScript
- Testes automatizados com alta cobertura

---

**📖 Para informações técnicas detalhadas, consulte a [documentação completa](docs/).**
