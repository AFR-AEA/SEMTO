// Aquí puedes poner funciones para carrusel, favoritos, etc.
console.log("Página lista");

// Ejemplo: alerta al hacer clic en receta
document.querySelectorAll('.receta').forEach(el => {
  el.addEventListener('click', () => {
    alert('Receta seleccionada');
  });
});

// Seleccionamos la lista visual de recetas guardadas
const listaVisual = document.getElementById("lista-guardadas");

// Añadir evento a cada "receta" para simular que se guarda
document.querySelectorAll(".receta").forEach((el, index) => {
  el.addEventListener("click", () => {
    const nombre = `Receta ${index + 1}`;
    
    // Creamos el elemento de lista
    const li = document.createElement("li");
    li.textContent = nombre;

    // Evita agregar duplicados
    if (![...listaVisual.children].some(item => item.textContent === nombre)) {
      listaVisual.appendChild(li);
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const recetasGuardadas = [];
  const listaRecetas = document.getElementById("lista-recetas");
  const panelRecetas = document.getElementById("panel-recetas");
  const botonToggleRecetas = document.getElementById("mostrar-recetas");

  // Mostrar/ocultar lista de recetas guardadas
  botonToggleRecetas.addEventListener("click", () => {
    if (recetasGuardadas.length > 0) {
      panelRecetas.style.display = panelRecetas.style.display === "none" ? "block" : "none";
    } else {
      alert("Aún no has guardado ninguna receta 😊");
    }
  });

  // Detectar clic en cada receta para guardarla
  document.querySelectorAll(".receta").forEach((elementoReceta) => {
    elementoReceta.addEventListener("click", () => {
      const nombreReceta = elementoReceta.dataset.name || elementoReceta.textContent.trim();

      // Evitar duplicados
      if (!recetasGuardadas.some(item => item.nombre === nombreReceta)) {
        recetasGuardadas.push({ nombre: nombreReceta });
        actualizarListaRecetas();
      }
    });
  });

  // Función para actualizar la lista visual de recetas
  function actualizarListaRecetas() {
    listaRecetas.innerHTML = "";

    recetasGuardadas.forEach((item, indice) => {
      const li = document.createElement("li");
      li.textContent = item.nombre;

      const botonEliminar = document.createElement("button");
      botonEliminar.textContent = "Eliminar";
      botonEliminar.addEventListener("click", () => {
        recetasGuardadas.splice(indice, 1);
        actualizarListaRecetas();

        if (recetasGuardadas.length === 0) {
          panelRecetas.style.display = "none";
        }
      });

      li.appendChild(botonEliminar);
      listaRecetas.appendChild(li);
    });
  }
});
