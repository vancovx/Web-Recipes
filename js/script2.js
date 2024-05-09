//Script para LOGIN
function hacerLogin(evt){
    evt.preventDefault(); //Evita el comportamiento por defecto, por lo que no recarga la pagina

    let url='api/usuarios/login',
        xhr = new XMLHttpRequest(),
        frm = evt.currentTarget, //Formulario
        fd = new FormData( frm );//Asi se captan los campos del formulario

    xhr.open('POST', url, true);
    xhr.responseType='json';

    xhr.onload = function () {
        let r = xhr.response;
        console.log(r);
        if(r.RESULTADO == 'OK'){
            sessionStorage['datosUsu'] = JSON.stringify(r); //Guardamos los datos del usuario en el navegador
            //Forma de acceder a los datos guardados en el sessionStorage
            //var datos = JSON.parse(sessionStorage.getItem('datosUsu'));
            //Mostramos modal
            showModal("Último inicio de sesión: " + r.ULTIMO_ACCESO, r.RESULTADO); 
            
        }else{
            //Mostramos modal de error
            showModal("ERROR EN EL LOGIN: Usuario o Password incorrectos.", r.RESULTADO);
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
            window.location.href = 'index.html'; 
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


