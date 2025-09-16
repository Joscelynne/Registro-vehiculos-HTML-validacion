document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");

  // Inputs
  const rut = document.getElementById("rut");
  const nombres = document.getElementById("nombres");
  const apellidoPaterno = document.getElementById("apellidoPaterno");
  const apellidoMaterno = document.getElementById("apellidoMaterno");
  const fechaNacimiento = document.getElementById("fechaNacimiento");
  const telefono = document.getElementById("telefono");
  const email = document.getElementById("email");
  const patente = document.getElementById("patente");
  const anio = document.getElementById("anio");

  // Errores
  const errorRut = document.getElementById("error-rut");
  const errorNombres = document.getElementById("error-nombres");
  const errorApellidoPaterno = document.getElementById("error-apellidoPaterno");
  const errorApellidoMaterno = document.getElementById("error-apellidoMaterno");
  const errorFechaNacimiento = document.getElementById("error-fechaNacimiento");
  const errorTelefono = document.getElementById("error-telefono");
  const errorEmail = document.getElementById("error-email");
  const errorPatente = document.getElementById("error-patente");
  const errorAnio = document.getElementById("error-anio");

  // === FUNCIONES ===
  function validarRut() {
    let valor = rut.value.replace(/\./g, "").replace("-", "").toUpperCase();
    if (!/^[0-9]+[0-9K]$/.test(valor)) {
      errorRut.textContent = "Formato de RUT inválido";
      return false;
    }
    let cuerpo = valor.slice(0, -1);
    let dv = valor.slice(-1);
    let suma = 0, multiplo = 2;
    for (let i = cuerpo.length - 1; i >= 0; i--) {
      suma += multiplo * parseInt(cuerpo[i]);
      multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }
    let dvEsperado = 11 - (suma % 11);
    dvEsperado = dvEsperado === 11 ? "0" : dvEsperado === 10 ? "K" : dvEsperado.toString();

    if (dv !== dvEsperado) {
      errorRut.textContent = "Dígito verificador incorrecto";
      return false;
    }
    errorRut.textContent = "";
    return true;
  }

  function validarTexto(input, errorDiv, campo) {
    const regex = /^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]{2,}$/;
    if (!regex.test(input.value.trim())) {
      errorDiv.textContent = `${campo} debe tener mínimo 2 letras y solo caracteres válidos`;
      return false;
    }
    errorDiv.textContent = "";
    return true;
  }

  function validarFechaNacimiento() {
    if (!fechaNacimiento.value) {
      errorFechaNacimiento.textContent = "Debe ingresar su fecha de nacimiento";
      return false;
    }
    let hoy = new Date();
    let nacimiento = new Date(fechaNacimiento.value);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    let mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    if (edad < 18) {
      errorFechaNacimiento.textContent = "Debe ser mayor de 18 años";
      return false;
    }
    errorFechaNacimiento.textContent = "";
    return true;
  }

  function validarTelefono() {
    const regex = /^\+56 9 \d{4} \d{4}$/;
    if (!regex.test(telefono.value.trim())) {
      errorTelefono.textContent = "Formato válido: +56 9 XXXX XXXX";
      return false;
    }
    errorTelefono.textContent = "";
    return true;
  }

  function validarEmail() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email.value.trim())) {
      errorEmail.textContent = "Formato de email inválido";
      return false;
    }
    errorEmail.textContent = "";
    return true;
  }

  function validarPatente() {
    const regex = /^([A-Z]{2}\d{4}|[A-Z]{4}\d{2})$/;
    let val = patente.value.trim().toUpperCase();
    patente.value = val;
    if (!regex.test(val)) {
      errorPatente.textContent = "Formato válido: AB1234 o ABCD12";
      return false;
    }
    errorPatente.textContent = "";
    return true;
  }

  function validarAnio() {
    let actual = new Date().getFullYear();
    let val = parseInt(anio.value);
    if (isNaN(val) || val < 1990 || val > actual + 1) {
      errorAnio.textContent = `El año debe estar entre 1990 y ${actual + 1}`;
      return false;
    }
    errorAnio.textContent = "";
    return true;
  }

  // === SUBMIT ===
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const rutValido = validarRut();
    const nombreValido = validarTexto(nombres, errorNombres, "Nombre");
    const apellidoPValido = validarTexto(apellidoPaterno, errorApellidoPaterno, "Apellido Paterno");
    const apellidoMValido = validarTexto(apellidoMaterno, errorApellidoMaterno, "Apellido Materno");
    const fechaValida = validarFechaNacimiento();
    const telValido = validarTelefono();
    const emailValido = validarEmail();
    const patenteValida = validarPatente();
    const anioValido = validarAnio();

    if (rutValido && nombreValido && apellidoPValido && apellidoMValido &&
        fechaValida && telValido && emailValido && patenteValida && anioValido) {
      alert("Formulario enviado correctamente ✅");
      form.reset();
      document.querySelectorAll(".text-danger").forEach(div => div.textContent = "");
    } else {
      alert("Por favor, corrija los errores ❌");
    }
  });
});
