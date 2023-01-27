function usarAPI() {
  fetch('https://reqres.in/api/users?delay=3')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // Almacenar los datos en LocalStorage
      localStorage.setItem("datosUsuarios", JSON.stringify(data.data));
      // Mostrar los datos en la tabla
      mostrarDatos();
      // Eliminar los datos de LocalStorage después de un minuto
      setTimeout(() => {
        localStorage.removeItem("datosUsuarios");
        console.log("Datos eliminados de LocalStorage");
      }, 60000);
    });
}

function mostrarDatos() {
  var datos = JSON.parse(localStorage.getItem("datosUsuarios"));
  var tabla = document.getElementById("tablaDatos").getElementsByTagName('tbody')[0];
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
avatar.innerHTML = "<img src='" + datos[i].avatar + "' alt='Avatar' width='50' height='50'>";



  }
}