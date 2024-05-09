//Script para REGISTRO
function comprobar_registro(evt){
    evt.preventDefault(); //Evita el comportamiento por defecto, para hacer peticion AJAX

    let xhr = new XMLHttpRequest(),
        frm = evt.currentTarget, //Formulario
        fd = new FormData( frm );//Asi se captan los campos del formulario
    
    let url='api/usuarios/' + fd.get('usu');

    let html = '';
    let html2 = '';

    xhr.open('GET', url, true);
    xhr.responseType='json';

    xhr.onload = function () {
        let r = xhr.response;
        console.log(r);
        if(r.DISPONIBLE == true){
            //Usuario disponible para registrarlo
            document.querySelector('#usuario_registro').innerHTML = html;
            document.querySelector('#usuario_contra').innerHTML = html2;
            //Comprobamos contraseñas
            if(fd.get('pwd') != fd.get('pwd2')){
                html2 += `<p> Las contraseñas no coinciden </p>`;
                document.querySelector('#usuario_contra').innerHTML = html2; 

            }else{
                //Usuario correcto para poder registrarse.
                registrar(fd);
            }
            
        }else{
            //Usuario registrado
            console.log("USUARIO REGISTRADO");
            html += `<p> Usuario ya registrado </p>`;
            document.querySelector('#usuario_registro').innerHTML = html; 
        }
    }
    
    xhr.send(fd);
}

function registrar(fd){
    let xhr = new XMLHttpRequest(),
        url='api/usuarios/registro';

    xhr.open('POST', url, true);
    xhr.responseType='json';

    xhr.onload = function () {
        let r = xhr.response;
        console.log(r);
        if(r.RESULTADO == 'OK'){
            //Mostramos modal
            showModal("Usuario registrado correctamente", r.RESULTADO); 
            
        }else{
            //Mostramos modal de error
            showModal("ERROR EN EL REGISTRO", r.RESULTADO);
        }
    }

    xhr.send(fd);
}

function showModal(message, resultado) {
    //Accedemos a los elementos del HTML modal
    const modal = document.getElementById('errorModal');
    const span = document.getElementsByClassName("close")[0];
    document.getElementById('errorMessage').textContent = message;

    modal.style.display = "block";
    span.onclick = function() {
        modal.style.display = "none";
        document.getElementById("usu").focus();
        //Si se inicia sesion correctamente redirigimos
        if (resultado == 'OK'){
            window.location.href = 'login.html'; 
        }
    }
    //Si clicamos fuera del cuadro se cierra el modal
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            document.getElementById("usu").focus();
        }
    }
}
