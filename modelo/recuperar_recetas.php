<?php
// recuperar_recetas.php
$conn = new mysqli("localhost", "usuario", "clave", "nombre_bd");

$sql = "SELECT nombre FROM recetas_guardadas";
$resultado = $conn->query($sql);

$recetas = [];
while ($fila = $resultado->fetch_assoc()) {
  $recetas[] = $fila['nombre'];
}

header('Content-Type: application/json');
echo json_encode($recetas);
?>
