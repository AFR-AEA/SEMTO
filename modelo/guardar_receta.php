<?php
// guardar_receta.php
$conn = new mysqli("localhost", "usuario", "clave", "nombre_bd");

$nombre = $_POST['nombre'] ?? '';
if ($nombre) {
  $stmt = $conn->prepare("INSERT INTO recetas_guardadas (nombre) VALUES (?)");
  $stmt->bind_param("s", $nombre);
  $stmt->execute();
  echo "OK";
} else {
  echo "Error";
}
?>
