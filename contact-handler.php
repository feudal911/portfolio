<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Database configuration
$host = 'localhost';
$dbname = 'portfolio_db';
$username = 'root';
$password = '';

try {
    // Create PDO connection
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Create contacts table if it doesn't exist
    $createTable = "CREATE TABLE IF NOT EXISTS contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
        ip_address VARCHAR(45),
        user_agent TEXT
    )";
    $pdo->exec($createTable);
    
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        // Get POST data
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!$input) {
            $input = $_POST;
        }
        
        // Validate required fields
        if (empty($input['name']) || empty($input['email']) || empty($input['message'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Todos os campos são obrigatórios']);
            exit;
        }
        
        // Validate email
        if (!filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            echo json_encode(['error' => 'Email inválido']);
            exit;
        }
        
        // Sanitize inputs
        $name = htmlspecialchars(trim($input['name']), ENT_QUOTES, 'UTF-8');
        $email = filter_var(trim($input['email']), FILTER_SANITIZE_EMAIL);
        $message = htmlspecialchars(trim($input['message']), ENT_QUOTES, 'UTF-8');
        $ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
        $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? 'unknown';
        
        // Insert into database
        $stmt = $pdo->prepare("INSERT INTO contacts (name, email, message, ip_address, user_agent) VALUES (?, ?, ?, ?, ?)");
        $stmt->execute([$name, $email, $message, $ip, $userAgent]);
        
        // Send email notification (optional)
        $to = "caio.marani@example.com"; // Change to your email
        $subject = "Nova mensagem do Portfolio - $name";
        $emailBody = "Nome: $name\n";
        $emailBody .= "Email: $email\n";
        $emailBody .= "Mensagem:\n$message\n\n";
        $emailBody .= "IP: $ip\n";
        $emailBody .= "Data: " . date('Y-m-d H:i:s');
        
        $headers = "From: $email\r\n";
        $headers .= "Reply-To: $email\r\n";
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
        
        mail($to, $subject, $emailBody, $headers);
        
        // Return success response
        echo json_encode([
            'success' => true,
            'message' => 'Mensagem enviada com sucesso!',
            'contact_id' => $pdo->lastInsertId()
        ]);
        
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Erro interno do servidor: ' . $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Método não permitido']);
}
?>
