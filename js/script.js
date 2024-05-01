document.addEventListener('DOMContentLoaded', function() {
    //Objeto campos formulario
    const contacto = {
        nombre: '',
        telefono: '',
        email: '',
        mensaje: '',
    }
    
    
    // Seleccionar los elementos de la interfaz
    const inputNombre = document.querySelector('#nombre');
    const inputTelefono = document.querySelector('#telefono');
    const inputEmail = document.querySelector('#email');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');

    //Asignando Eventos
    inputNombre.addEventListener('blur', validar);
    inputTelefono.addEventListener('blur', validar);
    inputEmail.addEventListener('blur', validar);
    inputMensaje.addEventListener('blur', validar);

    formulario.addEventListener('submit', enviarContacto);

    //Resetear formulario
    btnReset.addEventListener('click', function(e) {
    e.preventDefault();
    resetFormulario();
    });

    //Funcion para enviar datos de contacto
    function enviarContacto(e) {
        e.preventDefault();
        
        spinner.classList.add('flex');
        spinner.classList.remove('hidden');


        setTimeout(() => {
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');

        resetFormulario();  

        //Crear una alerta de envio
        const alertaExito = document.createElement('P');
        alertaExito.classList.add('exito');
        alertaExito.textContent = 'Mensaje enviado correctamente';

        formulario.appendChild(alertaExito);

        setTimeout(() => {
            alertaExito.remove();
        }, 3000);

        }, 3000);
    }


    //Funcion validar campos 
    function validar(e) {
             
        if(e.target.value.trim() === '') {
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            contacto[e.target.id] = ''; //hace q si se borra algo del campo reinicia btnEnviar 
            comprobarContacto();
            return;
        }   
        //Validando direccion de email
        if(e.target.id === 'email' && !validarEmail(e.target.value)) {
            mostrarAlerta('El email no es valido', e.target.parentElement);
            contacto[e.target.id] = '';//Se reinicia el campo
            comprobarContacto();
            return;
        }
        limpiarAlerta(e.target.parentElement);

        //Asignar los valores
        contacto[e.target.id] = e.target.value.trim().toLowerCase();

        //Comprobar el objeto contacto
        comprobarContacto();      
    }


    //Funcion para mostrar alertas
    function mostrarAlerta(mensaje, referencia) {
        limpiarAlerta(referencia);
        
        //Generar alerta de error
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('error');
        //Inyectar error al formulario
        referencia.appendChild(error);
    }
    
    
    //Funcion limpia alerta
    function limpiarAlerta(referencia) {
        //Cmprueba si ya existe una alerta
        const alerta = referencia.querySelector('.error');
        if(alerta) {
            alerta.remove();
        }   
    }
    //Funcion para validar email correcto
    function validarEmail(email) {
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);
        return resultado;
    }
    
    //Funcion para habilitar boton
    function comprobarContacto() {
        if(Object.values(contacto).includes('')) {
            btnSubmit.classList.add('boton-Enviar', 'opacity-50')
            btnSubmit.disabled = true;
            return
        }
        btnSubmit.classList.remove('opacity-50')
        btnSubmit.disabled = false; 
    }
    //Funcion para limpiar formulario
    function resetFormulario() {
        //Reiniciar el objeto
        nombre.nombre = '';
        telefono.telefono = '';
        email.email = '';
        mensaje.mensaje= '';

        formulario.reset();
        comprobarContacto();
    }
});



///Para crear la funcion validar, primero creo la funcion mostrar alerta. Ya cree la funcion de mostrar alerta creando una variable q muestre el error como un parrafo y con el textcontent muestro el mensaje que escribi en la funcion validadr. luego le agrego la clase css error q ya configure con estilos y como segundo parametro(referencia) dentro de la funcion mostrar alerta, pongo e.target.parentElement, para que se muestre la alerta debajo de cada campo.

//Para evitar q se generen multiples mensajes de alerta, en mosrtarAlerta, creo una variable alerta y con document.querySelector('.error'); le estoy diciendo que la alerta es igual a esa clase que seleccione y con un if le digo que si existe esa alerta la elimine y no la deje duplicar. Para que se elimine el problema de q se sale de un campo y aun sin llenar se elimina la alerta, se hace asi:Se debe tener en cuenta q el document.querySelector('.error'); me esta buscando la alerta en todo el documento, para q solo sea en el campo q se esta presentando lo hago llamando a la referencia (referencia.querySelector('.error');)solo de ese div, lo que hace que se generen las alertas para cada campo y q no se quiten si me paso a otro campo.

//Ahora es necesario limpiar la alerta cuando la validacion es correcta, pero se le debe indicar que alerta limpiar y se hace con el e.target.parentElement pasandolo limpiaralerta dentro de la funcion validar. Ahora en el la funcion mostrarAlerta, llamamos tambien la funcion de limpiar la alerta para q se ejecute desde otras funciones limpiarAlerta(referencia);

//Validando direccion de email: Se creo una funcion q valida el email con una expresion regular, esta se almacena en una variable y en otra variable resulatdo se testea si esta es correcta o no.Luego se llama la funcion dentro de un if negandola y que valide su valor y haciendo uso de la funcion mostrar alerta se crea un mensaje que diga q no es valido el email y se le pasa como referencia e.target.parentElement para q seoa que va en el campo del email la alerta. Con esta linea e.target.id === 'email' && !validarEmail(e.target.value)) se le dice que valide si el id de ese campo esta lleno y que tambien revise si si corresponde a una direccion de correo correcta.

//Para activar el boton de enviar una vez esten todos los campos llenos, es necesario crear un objeto q contenga todos los valores de los campos los cuales se definen como vacios y luego se van llenando. El objeto se va llenando conforme pase la validacion, entonces nos ponemos en la funcion de validar donde vamos a asignar los valores una vez se vaya escribiendo en cada campo del formulario. Entonces, se llama al objeto y dentro de corchetes llamamos cada campo ya sea por su id o name contacto[e.target.name] y que este sea igual a e.target.value.trim().toLowerCase() para q los valores sean iguales, elimine espacios y sea en minuscula.

//Para comprobar que todos los campos esten llenos, se crea la funcion comprobarContacto y con Object.values(contacto).includes(''); me muestra los valores del objeto que cree y si hay uno o mas campos vacios me muestra true hasta que se llenen y muestre false. Esto seria asi:
/**
 * function comprobarContacto() {
    if(Object.values(contacto).includes('')){
        btnSubmit.classList.add('boton-Enviar')
        btnSubmit.disabled = true;
        return
    }
    btnSubmit.classList.remove('boton-Enviar:disabled')
    btnSubmit.disabled = false; 
}
 */
//Se ingresa en un if Object.values(contacto).includes(''); y esta indicando q mientras algun campo este vacio se le agregue al boton la clase css y q el boton este deshabilitado y q se detenga la ejecucion. Si los campos estan llenos removemos la clase css del boton y se habilita el boton de enviar. Ahora si se llenan todos los campos el boton se habilita, pero si borro algo del campo el boton sigue igual, para que el bton se reinicie al faltar algo, se ingresa esto contacto[e.target.id] = '';q indica que el objeto esta vacioq es lo q hace Object.values(contacto).includes('')) y q debe deshabilitarse el btn enviar.

//RESETEAR FORMULARIO: Resetear formulario y preguntar al usuario:Se llama al selector del boton y se le asigna un evento, se llama a cada una de las propiedades del objeto contacto y se asignan valores vacios para q simule que esta limpio.


//Para el envio de los datos se crea una funcion con unos spinner que se van a ir agregando y quitando a medida que se asignen y remuevan clases css en su ejecucion, cada 3 segundos desaparece la alerta, se crea una alerta y se le pasa una clase css ya configurada y se añade al formulario con appendChild.

































