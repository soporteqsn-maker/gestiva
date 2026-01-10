<?php
session_start();
header('Content-Type: application/json');

require_once __DIR__ . '/../../../gestiva/config/database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['error' => 'Método no permitido']);
  exit;
}

$input = json_decode(file_get_contents('php://input'), true);

$user = trim($input['usuario'] ?? '');
$pass = trim($input['password'] ?? '');

if ($user === '' || $pass === '') {
  http_response_code(400);
  echo json_encode(['error' => 'Usuario y contraseña requeridos']);
  exit;
}

try {

  $stmt = $pdo->prepare("
    SELECT id, usuario, password, empresa, FechaIni, FechaFin
    FROM Usuarios
    WHERE usuario = ?
    LIMIT 1
  ");

  $stmt->execute([$user]);
  $row = $stmt->fetch();

  if (!$row || !password_verify($pass, $row['password'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Credenciales inválidas']);
    exit;
  }

  // Validar vigencia
  $hoy = date('Y-m-d');
  if ($hoy < $row['FechaIni'] || $hoy > $row['FechaFin']) {
    http_response_code(403);
    echo json_encode(['error' => 'Licencia vencida']);
    exit;
  }

  // Crear sesión
  $_SESSION['gestiva'] = [
    'id'      => $row['id'],
    'usuario' => $row['usuario'],
    'empresa' => $row['empresa']
  ];

  echo json_encode([
    'ok' => true,
    'usuario' => $row['usuario'],
    'empresa' => $row['empresa']
  ]);

} catch (Exception $e) {
  http_response_code(500);
  echo json_encode(['error' => 'Error del servidor']);
}
