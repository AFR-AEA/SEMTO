document.addEventListener("DOMContentLoaded", () => {
  console.log("Página lista");

  const recetasGuardadas = [];
  const listaRecetas = document.getElementById("lista-recetas");
  const panelRecetas = document.getElementById("panel-recetas");
  const botonToggleRecetas = document.getElementById("mostrar-recetas");

  const botonLogin = document.getElementById("boton-login");
  if (botonLogin) {
    botonLogin.addEventListener("click", () => {
      window.location.href = "login.php"; // cambia según tu estructura
    });
  }

  // Mostrar/ocultar panel
  botonToggleRecetas.addEventListener("click", () => {
    if (recetasGuardadas.length > 0) {
      panelRecetas.style.display = panelRecetas.style.display === "none" ? "block" : "none";
    } else {
      alert("Aún no has guardado ninguna receta 😊");
    }
  });

  // Click en cada receta
  document.querySelectorAll(".receta").forEach((elementoReceta) => {
    elementoReceta.addEventListener("click", () => {
      const nombreReceta = elementoReceta.dataset.name || elementoReceta.textContent.trim();

      if (!recetasGuardadas.some(r => r.nombre === nombreReceta)) {
        recetasGuardadas.push({ nombre: nombreReceta });
        actualizarListaRecetas();
        guardarRecetaEnBD(nombreReceta);
      }
    });
  });

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

  function guardarRecetaEnBD(nombre) {
    fetch("guardar_receta.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `nombre=${encodeURIComponent(nombre)}`
    })
    .then(res => res.text())
    .then(data => {
      if (data === "OK") {
        console.log("Guardada en BD");
      } else {
        console.error("Error BD");
      }
    });
  }
  // Al cargar la página, recuperar recetas guardadas desde la BD
fetch("recuperar_recetas.php")
.then(res => res.json())
.then(data => {
  data.forEach(nombre => {
    if (!recetasGuardadas.some(r => r.nombre === nombre)) {
      recetasGuardadas.push({ nombre });
    }
  });
  actualizarListaRecetas();
});

});
