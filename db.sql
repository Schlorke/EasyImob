-- HOW VII - EasyImob Database Schema
-- MySQL 8.0+ Compatible

-- Create database
CREATE DATABASE IF NOT EXISTS how7_easyimob;
USE how7_easyimob;

-- Drop tables if they exist (for clean reinstall)
DROP TABLE IF EXISTS venda_pagamento;
DROP TABLE IF EXISTS imovel;
DROP TABLE IF EXISTS tipo_imovel;

-- Create tipo_imovel table
CREATE TABLE tipo_imovel (
    id_tipo INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL UNIQUE
);

-- Create imovel table
CREATE TABLE imovel (
    codigo_imovel INT PRIMARY KEY AUTO_INCREMENT,
    descricao_imovel VARCHAR(200) NOT NULL,
    id_tipo INT NOT NULL,
    FOREIGN KEY (id_tipo) REFERENCES tipo_imovel(id_tipo)
);

-- Create venda_pagamento table
CREATE TABLE venda_pagamento (
    id_venda INT PRIMARY KEY AUTO_INCREMENT,
    codigo_imovel INT NOT NULL,
    data_do_pagamento DATE NOT NULL,
    valor_do_pagamento DECIMAL(12,2) NOT NULL,
    FOREIGN KEY (codigo_imovel) REFERENCES imovel(codigo_imovel)
);

-- Insert property types
INSERT INTO tipo_imovel (nome) VALUES 
('Apartamento'),
('Casa'),
('Sala Comercial'),
('Galpão'),
('Terreno');

-- Insert properties (≥ 8 imóveis)
INSERT INTO imovel (descricao_imovel, id_tipo) VALUES 
('Apartamento 3 quartos, 90m² - Centro', 1),
('Apartamento 2 quartos, 65m² - Bairro Nobre', 1),
('Casa 4 quartos, 180m² - Residencial Jardins', 2),
('Casa 3 quartos, 120m² - Vila Nova', 2),
('Sala Comercial 45m² - Edifício Corporate', 3),
('Sala Comercial 120m² - Centro Empresarial', 3),
('Galpão 500m² - Distrito Industrial', 4),
('Galpão 800m² - Zona Sul', 4),
('Terreno 300m² - Loteamento Primavera', 5),
('Terreno 450m² - Condomínio Fechado', 5);

-- Insert payments (≥ 30 pagamentos, ≥ 5 meses distintos)
-- Fevereiro 2025
INSERT INTO venda_pagamento (codigo_imovel, data_do_pagamento, valor_do_pagamento) VALUES 
(1, '2025-02-05', 1800.00),
(2, '2025-02-08', 1500.00),
(3, '2025-02-12', 2800.00),
(4, '2025-02-15', 2100.00),
(5, '2025-02-20', 1200.00),
(6, '2025-02-25', 3400.00);

-- Março 2025
INSERT INTO venda_pagamento (codigo_imovel, data_do_pagamento, valor_do_pagamento) VALUES 
(1, '2025-03-05', 1800.00),
(2, '2025-03-08', 1500.00),
(3, '2025-03-12', 2800.00),
(7, '2025-03-15', 4500.00),
(8, '2025-03-18', 6000.00),
(9, '2025-03-22', 800.00),
(10, '2025-03-28', 1200.00);

-- Abril 2025
INSERT INTO venda_pagamento (codigo_imovel, data_do_pagamento, valor_do_pagamento) VALUES 
(4, '2025-04-03', 2100.00),
(5, '2025-04-07', 1200.00),
(6, '2025-04-10', 3400.00),
(7, '2025-04-14', 4500.00),
(1, '2025-04-18', 1800.00),
(2, '2025-04-22', 1500.00);

-- Maio 2025  
INSERT INTO venda_pagamento (codigo_imovel, data_do_pagamento, valor_do_pagamento) VALUES 
(3, '2025-05-02', 2800.00),
(8, '2025-05-06', 6000.00),
(9, '2025-05-10', 800.00),
(10, '2025-05-15', 1200.00),
(1, '2025-05-20', 1800.00),
(4, '2025-05-25', 2100.00);

-- Junho 2025
INSERT INTO venda_pagamento (codigo_imovel, data_do_pagamento, valor_do_pagamento) VALUES 
(2, '2025-06-03', 1500.00),
(5, '2025-06-08', 1200.00),
(6, '2025-06-12', 3400.00),
(7, '2025-06-18', 4500.00),
(8, '2025-06-22', 6000.00),
(3, '2025-06-28', 2800.00);

-- Julho 2025 (bônus - mais 1 mês)
INSERT INTO venda_pagamento (codigo_imovel, data_do_pagamento, valor_do_pagamento) VALUES 
(9, '2025-07-05', 800.00),
(10, '2025-07-10', 1200.00),
(1, '2025-07-15', 1800.00);

-- Consulta JOIN principal (base para os endpoints)
-- Retorna exatamente: id_venda, data_do_pagamento, valor_do_pagamento, codigo_imovel, descricao_imovel, tipo_imovel
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
ORDER BY vp.data_do_pagamento, vp.id_venda;
