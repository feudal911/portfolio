# Sistema de Contato - Portfolio Caio Marani

## 🚀 Funcionalidades Implementadas

### ✅ **Modal de Contato**
- Formulário elegante com campos: Nome, Email e Mensagem
- Validação de campos obrigatórios
- Design responsivo e moderno
- Animações suaves

### ✅ **Sistema de Banco de Dados**
- **Backend PHP** para processamento
- **MySQL/MariaDB** para armazenamento
- **Fallback localStorage** se o backend falhar
- Validação e sanitização de dados

### ✅ **Notificações**
- Mensagens de sucesso (verde)
- Mensagens de erro (vermelho)
- Animações de entrada/saída
- Auto-remoção após 3 segundos

## 📁 Arquivos Criados/Modificados

### **Frontend (HTML/CSS/JS)**
- `index.html` - Modal de contato adicionado
- `css/style.css` - Estilos do modal e notificações
- `js/script.js` - Lógica do sistema de contato

### **Backend (PHP)**
- `contact-handler.php` - Processador de formulários
- `database.sql` - Script de criação do banco

## 🗄️ Configuração do Banco de Dados

### **1. Criar Banco de Dados**
```sql
-- Execute no MySQL/MariaDB
source database.sql
```

### **2. Configurar PHP**
Edite `contact-handler.php` com suas credenciais:
```php
$host = 'localhost';
$dbname = 'portfolio_db';
$username = 'seu_usuario';
$password = 'sua_senha';
```

### **3. Configurar Email**
Edite o email de destino:
```php
$to = "seu-email@exemplo.com";
```

## 🔧 Como Usar

### **Para Usuários Finais:**
1. Clique em "Get In Touch" na seção de contato
2. Preencha o formulário com nome, email e mensagem
3. Clique em "Enviar Mensagem"
4. Receba confirmação de sucesso

### **Para Desenvolvedores:**
1. **Sistema Híbrido**: Tenta enviar para PHP primeiro, fallback para localStorage
2. **Dados Salvos**: Nome, email, mensagem, timestamp, IP e User-Agent
3. **Validação**: Campos obrigatórios e formato de email
4. **Segurança**: Sanitização de inputs e prepared statements

## 📊 Estrutura do Banco de Dados

```sql
CREATE TABLE contacts (
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
```

## 🎨 Personalização

### **Cores das Notificações:**
```css
.success-notification .notification-content {
    background: linear-gradient(135deg, #10b981, #059669);
}

.error-notification .notification-content {
    background: linear-gradient(135deg, #ef4444, #dc2626);
}
```

### **Estilo do Modal:**
```css
.contact-modal {
    max-width: 500px;
}
```

## 🚨 Solução de Problemas

### **Modal não abre:**
- Verifique se o ID `contactButton` existe no HTML
- Console do navegador para erros JavaScript

### **Formulário não envia:**
- Verifique se o PHP está funcionando
- Verifique conexão com banco de dados
- Fallback para localStorage deve funcionar

### **Banco não conecta:**
- Verifique credenciais no `contact-handler.php`
- Verifique se o MySQL está rodando
- Execute `database.sql` para criar estrutura

## 🔒 Segurança

- **Validação**: Campos obrigatórios e formato de email
- **Sanitização**: HTML entities e filtros de email
- **Prepared Statements**: Prevenção de SQL injection
- **Rate Limiting**: Implementar se necessário

## 📱 Responsividade

- Modal se adapta a diferentes tamanhos de tela
- Formulário otimizado para mobile
- Touch-friendly em dispositivos móveis

## 🎯 Próximos Passos (Opcionais)

1. **Dashboard Admin**: Visualizar mensagens recebidas
2. **Sistema de Status**: Marcar como lida/respondida
3. **Filtros**: Por data, status, email
4. **Exportação**: CSV/PDF das mensagens
5. **Notificações Push**: Para novas mensagens

---

## 📞 Suporte

Para dúvidas ou problemas:
- Verifique o console do navegador
- Verifique logs do PHP
- Teste a conexão com banco de dados
- Verifique permissões de arquivo

**Sistema funcionando perfeitamente! 🎉**
