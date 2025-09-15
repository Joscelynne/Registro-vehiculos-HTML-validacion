// Función para validar RUT chileno
        function validarRUT(rut) {
            rut = rut.replace(/[^0-9kK]/g, '');
            if (rut.length < 2) return false;
            
            const cuerpo = rut.slice(0, -1);
            const dv = rut.slice(-1).toLowerCase();
            
            let suma = 0;
            let multiplicador = 2;
            
            for (let i = cuerpo.length - 1; i >= 0; i--) {
                suma += parseInt(cuerpo[i]) * multiplicador;
                multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
            }
            
            const dvCalculado = 11 - (suma % 11);
            const dvFinal = dvCalculado === 11 ? '0' : dvCalculado === 10 ? 'k' : dvCalculado.toString();
            
            return dv === dvFinal;
        }

        // Función para mostrar errores
        function mostrarError(input, mensaje) {
            const errorDiv = input.parentNode.querySelector('.error-message');
            if (errorDiv) errorDiv.remove();
            
            const error = document.createElement('div');
            error.className = 'error-message text-red-600 text-sm mt-1 flex items-center';
            error.innerHTML = `<svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>${mensaje}`;
            input.parentNode.appendChild(error);
            input.classList.add('border-red-500', 'focus:ring-red-500');
        }

        // Función para limpiar errores
        function limpiarError(input) {
            const errorDiv = input.parentNode.querySelector('.error-message');
            if (errorDiv) errorDiv.remove();
            input.classList.remove('border-red-500', 'focus:ring-red-500');
        }

        // Validación de RUT en tiempo real
        const rutInput = document.querySelector('input[placeholder="12.345.678-9"]');
        rutInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/[^0-9kK]/g, '');
            if (value.length > 1) {
                value = value.slice(0, -1).replace(/\B(?=(\d{3})+(?!\d))/g, '.') + '-' + value.slice(-1);
            }
            e.target.value = value;
            
            if (value.length >= 9) {
                if (validarRUT(value)) {
                    limpiarError(e.target);
                    e.target.classList.add('border-green-500', 'focus:ring-green-500');
                } else {
                    mostrarError(e.target, 'RUT inválido');
                }
            } else {
                limpiarError(e.target);
            }
        });

        // Validación de email
        const emailInput = document.querySelector('input[type="email"]');
        emailInput.addEventListener('blur', function(e) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (e.target.value && !emailRegex.test(e.target.value)) {
                mostrarError(e.target, 'Formato de email inválido');
            } else {
                limpiarError(e.target);
            }
        });

        // Validación de teléfono chileno
        const telefonoInput = document.querySelector('input[type="tel"]');
        telefonoInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/[^0-9+]/g, '');
            if (value.startsWith('56')) {
                value = '+' + value;
            } else if (value.startsWith('9') && value.length <= 9) {
                value = '+56 ' + value;
            }
            e.target.value = value;
        });

        telefonoInput.addEventListener('blur', function(e) {
            const telefonoRegex = /^\+56\s?9\s?\d{4}\s?\d{4}$/;
            if (e.target.value && !telefonoRegex.test(e.target.value.replace(/\s/g, ''))) {
                mostrarError(e.target, 'Formato: +56 9 1234 5678');
            } else {
                limpiarError(e.target);
            }
        });

        // Validación de patente chilena
        const patenteInput = document.querySelector('input[placeholder="ABCD12"]');
        patenteInput.addEventListener('input', function(e) {
            e.target.value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
            if (e.target.value.length > 6) {
                e.target.value = e.target.value.substring(0, 6);
            }
        });

        patenteInput.addEventListener('blur', function(e) {
            const patenteRegex = /^[A-Z]{4}[0-9]{2}$|^[A-Z]{2}[0-9]{4}$/;
            if (e.target.value && !patenteRegex.test(e.target.value)) {
                mostrarError(e.target, 'Formato: ABCD12 o AB1234');
            } else {
                limpiarError(e.target);
            }
        });

        // Validación de año del vehículo
        const añoInput = document.querySelector('input[type="number"]');
        añoInput.addEventListener('blur', function(e) {
            const año = parseInt(e.target.value);
            const añoActual = new Date().getFullYear();
            if (año && (año < 1990 || año > añoActual + 1)) {
                mostrarError('e.target, Año debe estar entre 1990 y ${añoActual + 1}');
            } else {
                limpiarError(e.target);
            }
        });

        // Validación de nombres (solo letras y espacios)
        const nombresInputs = [
            document.querySelector('input[placeholder="Juan Carlos"]'),
            document.querySelector('input[placeholder="González"]'),
            document.querySelector('input[placeholder="Pérez"]')
        ];

        nombresInputs.forEach(input => {
            input.addEventListener('input', function(e) {
                e.target.value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
            });
            
            input.addEventListener('blur', function(e) {
                if (e.target.value && e.target.value.length < 2) {
                    mostrarError(e.target, 'Mínimo 2 caracteres');
                } else {
                    limpiarError(e.target);
                }
            });
        });

        // Validación de edad mínima (18 años)
        const fechaNacInput = document.querySelector('input[type="date"]');
        fechaNacInput.addEventListener('blur', function(e) {
            if (e.target.value) {
                const fechaNac = new Date(e.target.value);
                const hoy = new Date();
                const edad = hoy.getFullYear() - fechaNac.getFullYear();
                const mesActual = hoy.getMonth();
                const mesNac = fechaNac.getMonth();
                
                let edadFinal = edad;
                if (mesActual < mesNac || (mesActual === mesNac && hoy.getDate() < fechaNac.getDate())) {
                    edadFinal--;
                }
                
                if (edadFinal < 18) {
                    mostrarError(e.target, 'Debe ser mayor de 18 años');
                } else {
                    limpiarError(e.target);
                }
            }
        });

        // Validación completa del formulario
        function validarFormulario() {
            let esValido = true;
            const errores = [];

            // Campos obligatorios
            const camposObligatorios = [
                { input: rutInput, nombre: 'RUT' },
                { input: document.querySelector('input[placeholder="Juan Carlos"]'), nombre: 'Nombres' },
                { input: document.querySelector('input[placeholder="González"]'), nombre: 'Apellido Paterno' },
                { input: document.querySelector('input[placeholder="Pérez"]'), nombre: 'Apellido Materno' },
                { input: fechaNacInput, nombre: 'Fecha de Nacimiento' },
                { input: telefonoInput, nombre: 'Teléfono' },
                { input: emailInput, nombre: 'Email' },
                { input: document.querySelector('select').parentNode.querySelector('select'), nombre: 'Región' },
                { input: document.querySelectorAll('select')[1], nombre: 'Comuna' },
                { input: document.querySelector('input[placeholder*="Libertador"]'), nombre: 'Dirección' },
                { input: patenteInput, nombre: 'Patente' },
                { input: document.querySelectorAll('select')[2], nombre: 'Marca' },
                { input: document.querySelector('input[placeholder="Corolla"]'), nombre: 'Modelo' },
                { input: añoInput, nombre: 'Año' },
                { input: document.querySelectorAll('select')[3], nombre: 'Tipo de Vehículo' },
                { input: document.querySelectorAll('select')[4], nombre: 'Combustible' }
            ];

            camposObligatorios.forEach(campo => {
                if (!campo.input.value.trim()) {
                    mostrarError('campo.input, ${campo.nombre} es obligatorio');
                    esValido = false;
                }
            });

            // Verificar términos y condiciones
            const terminos = document.getElementById('terminos');
            if (!terminos.checked) {
                errores.push('Debe aceptar los términos y condiciones');
                esValido = false;
            }

            // Verificar que no hay errores existentes
            const erroresExistentes = document.querySelectorAll('.error-message');
            if (erroresExistentes.length > 0) {
                esValido = false;
            }

            return { esValido, errores };
        }

        // Manejar envío del formulario
        document.querySelector('form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const validacion = validarFormulario();
            
            if (validacion.esValido) {
                // Mostrar mensaje de éxito
                const mensaje = document.createElement('div');
                mensaje.className = 'fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50 flex items-center';
                mensaje.innerHTML = `
                    <svg class="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                    ¡Formulario enviado exitosamente! (Demo)
                `;
                document.body.appendChild(mensaje);
                
                setTimeout(() => {
                    mensaje.remove();
                }, 5000);
            } else {
                // Mostrar errores generales
                if (validacion.errores.length > 0) {
                    const mensajeError = document.createElement('div');
                    mensajeError.className = 'fixed top-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm';
                    mensajeError.innerHTML = `
                        <div class="flex items-start">
                            <svg class="w-6 h-6 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
                            </svg>
                            <div>
                                <p class="font-semibold">Errores en el formulario:</p>
                                <ul class="text-sm mt-1">
                                    ${validacion.errores.map(error => <li>• ${error}</li>).join('')}
                                </ul>
                            </div>
                        </div>
                    `;
                    document.body.appendChild(mensajeError);
                    
                    setTimeout(() => {
                        mensajeError.remove();
                    }, 8000);
                }
                
                // Scroll al primer error
                const primerError = document.querySelector('.error-message');
                if (primerError) {
                    primerError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });

        // Limpiar formulario
        document.querySelector('button[type="button"]').addEventListener('click', function() {
            if (confirm('¿Estás seguro de que quieres limpiar todos los campos?')) {
                document.querySelector('form').reset();
                // Limpiar todos los errores
                document.querySelectorAll('.error-message').forEach(error => error.remove());
                document.querySelectorAll('input, select').forEach(input => {
                    input.classList.remove('border-red-500', 'focus:ring-red-500', 'border-green-500', 'focus:ring-green-500');
                });
            }
        });