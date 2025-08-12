-- Portfolio Database Setup
-- Execute este arquivo no seu MySQL/MariaDB

-- Criar banco de dados
CREATE DATABASE IF NOT EXISTS portfolio_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Usar o banco de dados
USE portfolio_db;

-- Criar tabela de contatos
CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45),
    user_agent TEXT,
    status ENUM('new', 'read', 'replied') DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Criar índices para melhor performance
CREATE INDEX idx_email ON contacts(email);
CREATE INDEX idx_timestamp ON contacts(timestamp);
CREATE INDEX idx_status ON contacts(status);

-- Inserir alguns dados de exemplo (opcional)
INSERT INTO contacts (name, email, message, ip_address, user_agent) VALUES
('João Silva', 'joao@example.com', 'Gostei muito do seu portfolio! Parabéns pelo trabalho.', '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'),
('Maria Santos', 'maria@example.com', 'Excelente trabalho com React! Gostaria de conversar sobre um projeto.', '127.0.0.1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'),
('Pedro Costa', 'pedro@example.com', 'Muito profissional! Suas habilidades em TypeScript são impressionantes.', '127.0.0.1', 'Mozilla/5.0 (X11; Linux x86_64)');

-- Criar usuário para administração (opcional)
-- CREATE USER 'portfolio_admin'@'localhost' IDENTIFIED BY 'sua_senha_aqui';
-- GRANT ALL PRIVILEGES ON portfolio_db.* TO 'portfolio_admin'@'localhost';
-- FLUSH PRIVILEGES;

-- Verificar se tudo foi criado corretamente
SELECT 'Database setup completed successfully!' as status;
SELECT COUNT(*) as total_contacts FROM contacts;
