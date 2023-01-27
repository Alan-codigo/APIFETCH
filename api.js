function usarAPI() {
  mostrarIndicadorDeCarga();
  /*
    Fetch es una función de JavaScript que permite hacer peticiones HTTP
    (como GET y POST) a un servidor y obtener una respuesta en forma de promesa.
    Es una forma moderna y más fácil de realizar peticiones de red en comparación 
    con las funciones tradicionales como XMLHttpRequest. Fetch soporta tanto peticiones 
    síncronas como asíncronas y es compatible con la mayoría de los navegadores web modernos.
  */
  fetch('https://reqres.in/api/users?delay=3')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // Almacenar los datos en LocalStorage
      localStorage.setItem("datosUsuarios", JSON.stringify(data.data));
      // Mostrar los datos en la tabla
      ocultarIndicadorDeCarga();
      mostrarDatos();
      // Eliminar los datos de LocalStorage después de un minuto
      setTimeout(() => {
        localStorage.removeItem("datosUsuarios");

        var tabla = document.getElementById("tablaDatos").getElementsByTagName('tbody')[0];

        while (tabla.firstChild) {
          tabla.removeChild(tabla.firstChild);
        }

        /*
        La función while (tabla.firstChild) { tabla.removeChild(tabla.firstChild); }
        se utiliza para eliminar todos los elementos hijos de un elemento HTML
        específico, en este caso, el elemento con id "tablaDatos".

        La función utiliza un bucle while que se repite mientras el elemento "tabla" tenga al
        menos un elemento hijo (tabla.firstChild). Dentro del bucle, se utiliza el método
        removeChild(tabla.firstChild) para eliminar el primer hijo del elemento "tabla"
        en cada iteración. De esta manera, se eliminan todos los elementos hijos del elemento
        "tabla" hasta que no queden más hijos.
        */

        console.log("Datos eliminados de LocalStorage");
      }, 10000);
    });
}

function mostrarDatos() {
  var tabla = document.getElementById("tablaDatos").getElementsByTagName('tbody')[0];
  while (tabla.firstChild) {
    tabla.removeChild(tabla.firstChild);
  }
  var datos = JSON.parse(localStorage.getItem("datosUsuarios"));
  for (var i = 0; i < datos.length; i++) {
    var fila = tabla.insertRow(i);
    var celdaId = fila.insertCell(0);
    var celdaNombre = fila.insertCell(1);
    var celdaEmail = fila.insertCell(2);
    var email = fila.insertCell(3);
    var avatar = fila.insertCell(4);

    celdaId.innerHTML = datos[i].id;
    celdaNombre.innerHTML = datos[i].first_name + " " + datos[i].last_name;
    celdaEmail.innerHTML = datos[i].last_name;
    email.innerHTML = datos[i].email;
    avatar.innerHTML = "<img style='border-radius: 50%;' class='foto' src='" + datos[i].avatar + "' alt='Avatar' width='50' height='50'  >";
  }
}

function mostrarIndicadorDeCarga() {
  document.getElementById("loading-indicator").style.display = "block";
}

function ocultarIndicadorDeCarga() {
  document.getElementById("loading-indicator").style.display = "none";
}


/*
LOCALSTORAGE

Local Storage es una característica de HTML5 que permite almacenar datos
en el navegador del usuario de manera similar a como se almacenan cookies.
Los datos almacenados en Local Storage son persistentes, lo que significa
que no se eliminan cuando el usuario cierra el navegador, y son accesibles
sólo desde el origen (es decir, el dominio) que los almacenó. 
Los datos almacenados en Local Storage son accesibles desde cualquier
página de ese origen, lo que permite compartir información entre 
diferentes páginas de la aplicación.
El tamaño máximo de almacenamiento varía entre los navegadores.
*/