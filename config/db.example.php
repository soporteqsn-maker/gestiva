<?php
$host = 'HOST_DB';
$db   = 'NOMBRE_DB';
$user = 'USUARIO_DB';
$pass = 'PASSWORD_DB';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
  PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
  PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

try {
  $pdo = new PDO($dsn, $user, $pass, $options);
} catch (PDOException $e) {
  die('Error de conexión a la base de datos');
}
