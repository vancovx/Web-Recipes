//Funcion para comprobar si el usuario esta logueado y que no entre a la página desde el navegador
/*function comprobarLogin ( inp ){
    let valor = inp.value; //document.querySelectos('#login').value  -> usarlo para contraseñas

    //Comprobamos que el login esta diposnible o no
    //Creamos de forma dinamicamenet con DOM, esta en el javasript pero no en el html
    if(inp.parentElement.querySelector('p.error')){
        inp.parentElement.querySelector('p.error').remove();
    }

    if( inp.value == 'hola'){
        let p = document.createElement('p');

        p.innerHTML = 'El login <b> NO </b> está disponible' //p.textContent -> diferencia el innerHTML lo parsea como HTML, con textContent no se pueden poner funciones de HTML porque no se parsea
        p.classList.add('error'); //un css con un .error donde se pone el estilo que queramos

        //Lo tenemos que añadir en el html accediendo al padre div donde queremos que entre al final.

        this.parentElement.appendChild(p); //padre del inp, appendChild lo añade al final //insertBefore(p, inp); --> antes del elemento inp

    }
    
}*/

/*/Funcion para comprobar si el usuario esta logueado y que no entre a la página desde el navegador
function verificarLogin(){
    if (!sessionStorage.getItem('usuarioLogueado')) {
        window.location.href = 'index.html';
    }
}
*/

function hacerLogin(evt){
    evt.preventDefault(); //Evita el comportamiento por defecto, por lo que no recarga la pagina

    let url='api/usuarios/login',
        xhr = new XMLHttpRequest(),
        frm = evt.currentTarget, //formulario
        fd = new FormData( frm );//Asi se captan los campos del formulario

    xhr.open('POST', url, true);
    xhr.responseType='json';

    xhr.onload = function () {
        let r = xhr.response;
        console.log(r);
        if(r.RESULTADO == 'OK'){
            sessionStorage['datosUsu'] = JSON.stringify(r);
        }
    }
    
    xhr.send(fd);
}

function mostrarModal(modalId, lastLoginDate) {
    const modal = document.getElementById(modalId);
    modal.showModal();
    console.log(modalId);
    console.log(lastLoginDate);

    //aniado la fecha al modal
    document.getElementById('fecha_ultimo_inicio').innerHTML = <p id="fecha_ultimo_inicio">Último inicio de sesión: ${lastLoginDate}</p>

    if (modalId == 'errorModal') {
        modal.style.display = "block";
        // Configurar el temporizador para que el modal se desvanezca después de 3 segundos
        setTimeout(function () {
            modal.style.opacity = "0";
            // Opcionalmente, podrías ocultar completamente el modal después del desvanecimiento
            setTimeout(function () {
                modal.style.display = "none";
            }, 500); // Tiempo adicional para asegurar que la animación de desvanecimiento termine antes de ocultar el modal
        }, 3000); // 3 segundos

        // Enfocar el primer campo del formulario después de que termine la animación de desvanecimiento
        modal.addEventListener('animationend', function () {
            document.getElementById("usu").focus();
        });

        modal.close();

    }
    else {
        const closeModalBtn = document.getElementById('close' + modalId);
        closeModalBtn.addEventListener('click', function () {
            modal.close();
            window.location.href = 'index.html';
        });
    }

}