document.addEventListener('DOMContentLoaded', () => {
    // Elementos
    const form = document.getElementById('formulario');
    const rut = document.getElementById('rut');
    const errorRut = document.getElementById('error-rut');
    const email = document.getElementById('email');
    const errorEmail = document.getElementById('error-email');
    const telefono = document.getElementById('telefono');
    const errorTelefono = document.getElementById('error-telefono');
    const patente = document.getElementById('patente');
    const errorPatente = document.getElementById('error-patente');
    const nombre = document.getElementById('nombre');
    const errorNombre = document.getElementById('error-nombre');
    const apellidoPaterno = document.getElementById('apellido-paterno');
    const errorApellidoPaterno = document.getElementById('error-apellido-paterno');
    const apellidoMaterno = document.getElementById('apellido-materno');
    const errorApellidoMaterno = document.getElementById('error-apellido-materno');
    const region = document.getElementById('region');
    const errorRegion = document.getElementById('error-region');
    const comuna = document.getElementById('comuna');
    const errorComuna = document.getElementById('error-comuna');
    const direccion = document.getElementById('direccion');
    const errorDireccion = document.getElementById('error-direccion');
    const marca = document.getElementById('marca');
    const errorMarca = document.getElementById('error-marca');
    const modelo = document.getElementById('modelo');
    const errorModelo = document.getElementById('error-modelo');
    const anioVehiculo = document.getElementById('anio-vehiculo');
    const errorAnioVehiculo = document.getElementById('error-anio-vehiculo');
    const tipoVehiculo = document.getElementById('tipo-vehiculo');
    const errorTipoVehiculo = document.getElementById('error-tipo-vehiculo');
    const combustible = document.getElementById('combustible');
    const errorCombustible = document.getElementById('error-combustible');
    const terminos = document.getElementById('terminos');
    const errorTerminos = document.getElementById('error-terminos');
    const mensajeExito = document.getElementById('mensaje-exito');

    // Utilidades
    function scrollToError(element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // RUT
    function formateaRut(valor) {
        valor = valor.replace(/[^\dkK]/gi, '').toUpperCase();
        if (valor.length > 1) {
            let cuerpo = valor.slice(0, -1);
            let dv = valor.slice(-1);
            cuerpo = cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
            return `${cuerpo}-${dv}`;
        }
        return valor;
    }
    function validaRut(rutCompleto) {
        if (rut.value.trim() === "") {
            errorRut.textContent = '🔴 RUT es obligatorio';
            rut.style.borderColor = 'red';
            return false;
        }
        rutCompleto = rutCompleto.replace(/\./g, '').replace('-', '').toUpperCase();
        if (!/^(\d{7,8})([0-9K])$/.test(rutCompleto)) {
            errorRut.textContent = '🔴 RUT inválido';
            rut.style.borderColor = 'red';
            return false;
        }
        let rutNum = rutCompleto.slice(0, -1);
        let dv = rutCompleto.slice(-1);
        let suma = 0, multiplo = 2;
        for (let i = rutNum.length - 1; i >= 0; i--) {
            suma += parseInt(rutNum.charAt(i)) * multiplo;
            multiplo = multiplo < 7 ? multiplo + 1 : 2;
        }
        let dvEsperado = 11 - (suma % 11);
        dvEsperado = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();
        if (dv !== dvEsperado) {
            errorRut.textContent = '🔴 RUT inválido';
            rut.style.borderColor = 'red';
            return false;
        }
        errorRut.textContent = '🟢 RUT válido';
        rut.style.borderColor = 'green';
        return true;
    }
    rut.addEventListener('input', () => {
        rut.value = formateaRut(rut.value);
        validaRut(rut.value);
    });

    // Email
    function validarEmail() {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.value.trim() === "") {
            errorEmail.textContent = '🔴 Email es obligatorio';
            email.style.borderColor = 'red';
            return false;
        } else if (!regex.test(email.value.trim())) {
            errorEmail.textContent = '🔴 Formato de email inválido';
            email.style.borderColor = 'red';
            return false;
        } else {
            errorEmail.textContent = '🟢 Email válido';
            email.style.borderColor = 'green';
            return true;
        }
    }
    email.addEventListener('blur', validarEmail);

    // Teléfono
    function formateaTelefono(valor) {
        valor = valor.replace(/\D/g, '');
        if (valor.startsWith('569')) valor = valor.slice(2);
        if (valor.length > 8) valor = valor.slice(0, 8);
        return '+56 9 ' + valor.replace(/(\d{4})(\d{0,4})/, '$1 $2').trim();
    }
    function validarTelefono() {
        if (telefono.value.trim() === "") {
            errorTelefono.textContent = '🔴 Teléfono es obligatorio';
            telefono.style.borderColor = 'red';
            return false;
        }
        let valor = telefono.value.replace(/\D/g, '');
        if (valor.length !== 9 || !valor.startsWith('9')) {
            errorTelefono.textContent = '🔴 Teléfono chileno móvil inválido';
            telefono.style.borderColor = 'red';
            return false;
        }
        errorTelefono.textContent = '🟢 Teléfono válido';
        telefono.style.borderColor = 'green';
        return true;
    }
    telefono.addEventListener('input', () => {
        telefono.value = formateaTelefono(telefono.value);
    });
    telefono.addEventListener('blur', validarTelefono);

    // Patente
    function validarPatente() {
        if (patente.value.trim() === "") {
            errorPatente.textContent = '🔴 Patente es obligatorio';
            patente.style.borderColor = 'red';
            return false;
        }
        let valor = patente.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6);
        patente.value = valor;
        let regexNuevo = /^[A-Z]{4}\d{2}$/;
        let regexAntiguo = /^[A-Z]{2}\d{4}$/;
        if (valor.length !== 6 || (!regexNuevo.test(valor) && !regexAntiguo.test(valor))) {
            errorPatente.textContent = '🔴 Patente chilena inválida';
            patente.style.borderColor = 'red';
            return false;
        }
        errorPatente.textContent = '🟢 Patente válida';
        patente.style.borderColor = 'green';
        return true;
    }
    patente.addEventListener('input', validarPatente);

    // Nombres
    function filtraTexto(valor) {
        return valor.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/g, '');
    }
    function validarNombre() {
        nombre.value = filtraTexto(nombre.value);
        if (nombre.value.trim() === "") {
            errorNombre.textContent = '🔴 Nombres es obligatorio';
            nombre.style.borderColor = 'red';
            return false;
        }
        if (nombre.value.trim().length < 2) {
            errorNombre.textContent = '🔴 Mínimo 2 letras';
            nombre.style.borderColor = 'red';
            return false;
        }
        errorNombre.textContent = '🟢 Nombre válido';
        nombre.style.borderColor = 'green';
        return true;
    }
    nombre.addEventListener('input', validarNombre);

    // Apellido Paterno
    function validarApellidoPaterno() {
        apellidoPaterno.value = filtraTexto(apellidoPaterno.value);
        if (apellidoPaterno.value.trim() === "") {
            errorApellidoPaterno.textContent = '🔴 Apellido Paterno es obligatorio';
            apellidoPaterno.style.borderColor = 'red';
            return false;
        }
        if (apellidoPaterno.value.trim().length < 2) {
            errorApellidoPaterno.textContent = '🔴 Mínimo 2 letras';
            apellidoPaterno.style.borderColor = 'red';
            return false;
        }
        errorApellidoPaterno.textContent = '🟢 Apellido válido';
        apellidoPaterno.style.borderColor = 'green';
        return true;
    }
    apellidoPaterno.addEventListener('input', validarApellidoPaterno);

    // Apellido Materno
    function validarApellidoMaterno() {
        apellidoMaterno.value = filtraTexto(apellidoMaterno.value);
        if (apellidoMaterno.value.trim() === "") {
            errorApellidoMaterno.textContent = '🔴 Apellido Materno es obligatorio';
            apellidoMaterno.style.borderColor = 'red';
            return false;
        }
        if (apellidoMaterno.value.trim().length < 2) {
            errorApellidoMaterno.textContent = '🔴 Mínimo 2 letras';
            apellidoMaterno.style.borderColor = 'red';
            return false;
        }
        errorApellidoMaterno.textContent = '🟢 Apellido válido';
        apellidoMaterno.style.borderColor = 'green';
        return true;
    }
    apellidoMaterno.addEventListener('input', validarApellidoMaterno);

    // Región
    function validarRegion() {
        if (region.value.trim() === "") {
            errorRegion.textContent = '🔴 Región es obligatorio';
            region.style.borderColor = 'red';
            return false;
        }
        errorRegion.textContent = '';
        region.style.borderColor = 'green';
        return true;
    }
    region.addEventListener('blur', validarRegion);

    // Comuna
    function validarComuna() {
        if (comuna.value.trim() === "") {
            errorComuna.textContent = '🔴 Comuna es obligatorio';
            comuna.style.borderColor = 'red';
            return false;
        }
        errorComuna.textContent = '';
        comuna.style.borderColor = 'green';
        return true;
    }
    comuna.addEventListener('blur', validarComuna);

    // Dirección
    function validarDireccion() {
        if (direccion.value.trim() === "") {
            errorDireccion.textContent = '🔴 Dirección es obligatorio';
            direccion.style.borderColor = 'red';
            return false;
        }
        errorDireccion.textContent = '';
        direccion.style.borderColor = 'green';
        return true;
    }
    direccion.addEventListener('blur', validarDireccion);

    // Marca
    function validarMarca() {
        if (marca.value.trim() === "") {
            errorMarca.textContent = '🔴 Marca es obligatorio';
            marca.style.borderColor = 'red';
            return false;
        }
        errorMarca.textContent = '';
        marca.style.borderColor = 'green';
        return true;
    }
    marca.addEventListener('blur', validarMarca);

    // Modelo
    function validarModelo() {
        if (modelo.value.trim() === "") {
            errorModelo.textContent = '🔴 Modelo es obligatorio';
            modelo.style.borderColor = 'red';
            return false;
        }
        errorModelo.textContent = '';
        modelo.style.borderColor = 'green';
        return true;
    }
    modelo.addEventListener('blur', validarModelo);

    // Año del vehículo
    function validarAnioVehiculo() {
        if (anioVehiculo.value.trim() === "") {
            errorAnioVehiculo.textContent = '🔴 Año es obligatorio';
            anioVehiculo.style.borderColor = 'red';
            return false;
        }
        let valor = parseInt(anioVehiculo.value, 10);
        let actual = new Date().getFullYear() + 1;
        if (isNaN(valor) || valor < 1990 || valor > actual) {
            errorAnioVehiculo.textContent = `🔴 Año entre 1990 y ${actual}`;
            anioVehiculo.style.borderColor = 'red';
            return false;
        }
        errorAnioVehiculo.textContent = '🟢 Año válido';
        anioVehiculo.style.borderColor = 'green';
        return true;
    }
    anioVehiculo.addEventListener('blur', validarAnioVehiculo);

    // Tipo de Vehículo
    function validarTipoVehiculo() {
        if (tipoVehiculo.value.trim() === "") {
            errorTipoVehiculo.textContent = '🔴 Tipo de Vehículo es obligatorio';
            tipoVehiculo.style.borderColor = 'red';
            return false;
        }
        errorTipoVehiculo.textContent = '';
        tipoVehiculo.style.borderColor = 'green';
        return true;
    }
    tipoVehiculo.addEventListener('blur', validarTipoVehiculo);

    // Combustible
    function validarCombustible() {
        if (combustible.value.trim() === "") {
            errorCombustible.textContent = '🔴 Combustible es obligatorio';
            combustible.style.borderColor = 'red';
            return false;
        }
        errorCombustible.textContent = '';
        combustible.style.borderColor = 'green';
        return true;
    }
    combustible.addEventListener('blur', validarCombustible);

    // Términos
    function validarTerminos() {
        if (!terminos.checked) {
            errorTerminos.textContent = '🔴 Debes aceptar los términos';
            return false;
        }
        errorTerminos.textContent = '';
        return true;
    }
    terminos.addEventListener('change', validarTerminos);

    // Validación general
    function validarFormulario() {
        let validaciones = [
            { fn: () => validaRut(rut.value), error: errorRut },
            { fn: validarNombre, error: errorNombre },
            { fn: validarApellidoPaterno, error: errorApellidoPaterno },
            { fn: validarApellidoMaterno, error: errorApellidoMaterno },
            { fn: validarTelefono, error: errorTelefono },
            { fn: validarEmail, error: errorEmail },
            { fn: validarRegion, error: errorRegion },
            { fn: validarComuna, error: errorComuna },
            { fn: validarDireccion, error: errorDireccion },
            { fn: validarPatente, error: errorPatente },
            { fn: validarMarca, error: errorMarca },
            { fn: validarModelo, error: errorModelo },
            { fn: validarAnioVehiculo, error: errorAnioVehiculo },
            { fn: validarTipoVehiculo, error: errorTipoVehiculo },
            { fn: validarCombustible, error: errorCombustible },
            { fn: validarTerminos, error: errorTerminos }
        ];
        for (let v of validaciones) {
            if (!v.fn()) {
                scrollToError(v.error);
                return false;
            }
        }
        return true;
    }

    // Submit
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        mensajeExito.textContent = '';
        if (validarFormulario()) {
            mensajeExito.textContent = '🟢 Formulario enviado correctamente';
            form.reset();
            // Limpiar bordes y mensajes
            [
                rut, email, telefono, patente, nombre, apellidoPaterno, apellidoMaterno,
                region, comuna, direccion, marca, modelo, anioVehiculo, tipoVehiculo, combustible
            ].forEach(el => el.style.borderColor = '');
            [
                errorRut, errorEmail, errorTelefono, errorPatente, errorNombre, errorApellidoPaterno, errorApellidoMaterno,
                errorRegion, errorComuna, errorDireccion, errorMarca, errorModelo, errorAnioVehiculo, errorTipoVehiculo, errorCombustible, errorTerminos
            ].forEach(el => el.textContent = '');
        } else {
            mensajeExito.textContent = '🔴 Corrige los errores antes de enviar';
        }
    });
});
