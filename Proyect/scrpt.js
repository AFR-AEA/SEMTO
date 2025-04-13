// Aquí puedes poner funciones para carrusel, favoritos, etc.
console.log("Página lista");

// Ejemplo: alerta al hacer clic en receta
document.querySelectorAll('.receta').forEach(el => {
  el.addEventListener('click', () => {
    alert('Receta seleccionada');
  });
});
