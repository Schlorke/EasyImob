#!/usr/bin/env node

/**
 * 🤖 Agent CMD - AI Documentation Validator
 * 
 * Script para orientar Agentes de IA a lerem a documentação
 * antes de implementar qualquer código no projeto EasyImob.
 * 
 * Uso:
 *   node scripts/agent-cmd.js
 *   npm run agent:docs
 */

const fs = require('fs');
const path = require('path');

// Cores para output no terminal
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

// Documentos obrigatórios em ordem de leitura
const REQUIRED_DOCS = [
  {
    file: 'docs/ARCHITECTURE.md',
    title: 'Arquitetura do Sistema',
    description: 'Entender a estrutura Clean Architecture e fluxo de dados',
    critical: true
  },
  {
    file: 'docs/DEVELOPMENT-GUIDE.md', 
    title: 'Guia de Desenvolvimento',
    description: 'Padrões de código, convenções e regras críticas',
    critical: true
  },
  {
    file: 'CHANGELOG.md',
    title: 'Histórico de Mudanças',
    description: 'O que já foi implementado e decisões técnicas',
    critical: true
  },
  {
    file: '.cursorrules',
    title: 'Regras do Cursor AI',
    description: 'Instruções específicas para agentes Cursor',
    critical: false
  },
  {
    file: '.github/copilot-instructions.md',
    title: 'Instruções do Copilot',
    description: 'Orientações para GitHub Copilot',
    critical: false
  },
  {
    file: 'README.md',
    title: 'Visão Geral do Projeto',
    description: 'Contexto geral e instruções de uso',
    critical: false
  }
];

// Verificações de contexto críticas
const CONTEXT_CHECKS = [
  {
    check: 'Programação Funcional',
    question: 'Você entende que DEVE usar APENAS map/filter/reduce/forEach?',
    docs: ['docs/DEVELOPMENT-GUIDE.md', '.cursorrules']
  },
  {
    check: 'Restrição SQL',
    question: 'Você entende que NÃO pode usar WHERE/GROUP BY nas consultas finais?',
    docs: ['docs/ARCHITECTURE.md', 'docs/DEVELOPMENT-GUIDE.md']
  },
  {
    check: 'Clean Architecture',
    question: 'Você entende a separação Repository → Service → Controller?',
    docs: ['docs/ARCHITECTURE.md']
  },
  {
    check: 'Requisitos HOW VII',
    question: 'Você entende que este é um projeto acadêmico com restrições específicas?',
    docs: ['README.md', 'CHANGELOG.md']
  }
];

function printHeader() {
  console.log('\n' + colors.cyan + colors.bright + '🤖 AGENT CMD - AI Documentation Validator' + colors.reset);
  console.log(colors.cyan + '=' + '='.repeat(50) + colors.reset);
  console.log(colors.yellow + '⚠️  CRITICAL: Read ALL documentation before implementing!' + colors.reset);
  console.log('');
}

function checkFileExists(filePath) {
  try {
    return fs.existsSync(filePath);
  } catch {
    return false;
  }
}

function getFileSize(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats.size;
  } catch {
    return 0;
  }
}

function getLastModified(filePath) {
  try {
    const stats = fs.statSync(filePath);
    return stats.mtime.toISOString().split('T')[0];
  } catch {
    return 'Unknown';
  }
}

function validateDocumentation() {
  console.log(colors.blue + colors.bright + '📚 Validando Documentação Disponível...' + colors.reset);
  console.log('');

  let allCriticalDocsExist = true;
  let totalDocs = 0;
  let existingDocs = 0;

  REQUIRED_DOCS.forEach((doc, index) => {
    const exists = checkFileExists(doc.file);
    const size = exists ? getFileSize(doc.file) : 0;
    const modified = exists ? getLastModified(doc.file) : 'N/A';
    
    totalDocs++;
    if (exists) existingDocs++;

    const status = exists ? colors.green + '✅' : colors.red + '❌';
    const critical = doc.critical ? colors.yellow + '[CRÍTICO]' : '[OPCIONAL]';
    
    console.log(`${index + 1}. ${status} ${colors.bright}${doc.title}${colors.reset}`);
    console.log(`   📁 ${doc.file}`);
    console.log(`   📝 ${doc.description}`);
    console.log(`   🏷️  ${critical} ${exists ? `| 📊 ${Math.round(size/1024)}KB | 📅 ${modified}` : '| ❌ ARQUIVO NÃO ENCONTRADO'}${colors.reset}`);
    console.log('');

    if (doc.critical && !exists) {
      allCriticalDocsExist = false;
    }
  });

  return { allCriticalDocsExist, totalDocs, existingDocs };
}

function displayReadingOrder() {
  console.log(colors.blue + colors.bright + '📖 Ordem de Leitura Recomendada para IA:' + colors.reset);
  console.log('');

  const criticalDocs = REQUIRED_DOCS.filter(doc => doc.critical);
  const optionalDocs = REQUIRED_DOCS.filter(doc => !doc.critical);

  console.log(colors.yellow + '🔥 DOCUMENTOS CRÍTICOS (LEIA PRIMEIRO):' + colors.reset);
  criticalDocs.forEach((doc, index) => {
    console.log(`   ${index + 1}. ${colors.bright}${doc.file}${colors.reset}`);
    console.log(`      ${doc.description}`);
  });

  console.log('');
  console.log(colors.cyan + '📋 DOCUMENTOS COMPLEMENTARES:' + colors.reset);
  optionalDocs.forEach((doc, index) => {
    console.log(`   ${criticalDocs.length + index + 1}. ${colors.bright}${doc.file}${colors.reset}`);
    console.log(`      ${doc.description}`);
  });
  console.log('');
}

function runContextChecks() {
  console.log(colors.blue + colors.bright + '🧠 Verificação de Contexto AI:' + colors.reset);
  console.log('');
  console.log(colors.yellow + '⚠️  Antes de implementar, certifique-se de entender:' + colors.reset);
  console.log('');

  CONTEXT_CHECKS.forEach((check, index) => {
    console.log(`${index + 1}. ${colors.bright}${check.check}${colors.reset}`);
    console.log(`   ❓ ${check.question}`);
    console.log(`   📚 Documentação relevante: ${colors.cyan}${check.docs.join(', ')}${colors.reset}`);
    console.log('');
  });
}

function displayProjectStatus() {
  console.log(colors.blue + colors.bright + '📊 Status do Projeto EasyImob:' + colors.reset);
  console.log('');

  const status = {
    'Endpoints Implementados': '5/5 (health, raw, 3 analytics)',
    'Testes': 'Unit + Integration (>85% coverage)',
    'Arquitetura': 'Clean Architecture com TypeScript',
    'Banco de Dados': 'MySQL com 33 pagamentos, 10 imóveis',
    'Programação': 'Funcional (map/filter/reduce apenas)',
    'Conformidade HOW VII': 'Completa - sem WHERE/GROUP BY',
    'Qualidade': 'ESLint + Prettier + Spell Check',
    'Documentação': 'Completa para IA e desenvolvedores'
  };

  Object.entries(status).forEach(([key, value]) => {
    console.log(`   ${colors.green}✅${colors.reset} ${colors.bright}${key}:${colors.reset} ${value}`);
  });
  console.log('');
}

function showImplementationGuidelines() {
  console.log(colors.blue + colors.bright + '🎯 Diretrizes de Implementação:' + colors.reset);
  console.log('');

  const guidelines = [
    '📚 SEMPRE ler documentação antes de implementar',
    '🎨 Seguir Clean Architecture (Repository → Service → Controller)',
    '🔧 Usar APENAS programação funcional nos Services',
    '🚫 NUNCA usar WHERE/GROUP BY nas consultas consumidas',
    '💎 Manter imutabilidade de dados (sem mutations)',
    '🧪 Escrever testes para toda nova funcionalidade',
    '📝 Atualizar documentação para mudanças arquiteturais',
    '🔍 Usar TypeScript estrito com tipos explícitos'
  ];

  guidelines.forEach(guideline => {
    console.log(`   ${guideline}`);
  });
  console.log('');
}

function displayCommands() {
  console.log(colors.blue + colors.bright + '🛠️  Comandos Úteis:' + colors.reset);
  console.log('');

  const commands = [
    ['npm run dev', 'Iniciar servidor desenvolvimento'],
    ['npm run test', 'Executar todos os testes'],
    ['npm run lint', 'Verificar qualidade do código'],
    ['npm run spell:check', 'Verificar ortografia'],
    ['npm run agent:docs', 'Executar este validador'],
    ['npm run evidence:generate', 'Gerar evidências para PDF']
  ];

  commands.forEach(([cmd, desc]) => {
    console.log(`   ${colors.cyan}${cmd.padEnd(25)}${colors.reset} ${desc}`);
  });
  console.log('');
}

function main() {
  printHeader();
  
  const { allCriticalDocsExist, totalDocs, existingDocs } = validateDocumentation();
  
  if (!allCriticalDocsExist) {
    console.log(colors.red + colors.bright + '❌ ERRO: Documentação crítica não encontrada!' + colors.reset);
    console.log(colors.red + '   Agentes de IA NÃO devem implementar sem ler a documentação completa.' + colors.reset);
    console.log('');
    process.exit(1);
  }

  console.log(colors.green + colors.bright + `✅ Documentação validada: ${existingDocs}/${totalDocs} arquivos encontrados` + colors.reset);
  console.log('');

  displayReadingOrder();
  runContextChecks();
  displayProjectStatus();
  showImplementationGuidelines();
  displayCommands();

  console.log(colors.green + colors.bright + '🎉 Sistema pronto para desenvolvimento com IA!' + colors.reset);
  console.log(colors.yellow + '⚠️  Lembre-se: Sempre consulte a documentação antes de implementar.' + colors.reset);
  console.log('');
}

// Executar apenas se chamado diretamente
if (require.main === module) {
  main();
}

module.exports = {
  validateDocumentation,
  REQUIRED_DOCS,
  CONTEXT_CHECKS
};
