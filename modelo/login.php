<?php
session_start();
$conexion = new mysqli("localhost", "root", "", "recipe_book");

if ($conexion->connect_error) {
    die("Conexión fallida: " . $conexion->connect_error);
}

$username_or_email = $_POST['username_or_email'];
$password = $_POST['password'];

$sql = "SELECT * FROM users WHERE username = ? OR email = ?";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("ss", $username_or_email, $username_or_email);
$stmt->execute();
$resultado = $stmt->get_result();

if ($resultado->num_rows === 1) {
    $usuario = $resultado->fetch_assoc();
    if (password_verify($password, $usuario['password_hash'])) {
        $_SESSION['usuario_id'] = $usuario['id'];
        $_SESSION['usuario_nombre'] = $usuario['username'];
        header("Location: index.html");
        exit();
    } else {
        echo "Contraseña incorrecta.";
    }
} else {
    echo "Usuario no encontrado.";
}
?>
