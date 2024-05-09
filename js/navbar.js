function mostrarMenu(){
    let ul = document.querySelector('#menu'),
        html = '';
        //Datos del usuario
        var datos = JSON.parse(sessionStorage.getItem('datosUsu'));
        
        if(sessionStorage['datosUsu']){
            html += '<li><a href="index.html"><span class="icon-home"></span><span>Inicio</span></a></li>';
            html += '<li><a href="buscar.html"><span class="icon-search"></span><span>Buscar</span></a></li>';
            html += '<li><a href="nueva.html"><span class="icon-doc-new"></span><span>Nueva Receta</span></a></li>';
            html += '<li><a href="./"onclick="hacerLogout(event);"><span class="icon-logout"></span><span>Logout '+ datos.LOGIN +'</span></a></li>';
        }else{
            html += '<li><a href="index.html"><span class="icon-home"></span><span>Inicio</span></a></li>';
            html += '<li><a href="buscar.html"><span class="icon-search"></span><span>Buscar</span></a></li>';
            html += '<li><a href="login.html"><span class="icon-login"></span><span>Login</span></a></li>';
            html += '<li><a href="registro.html"><span class="icon-user-plus"></span><span>Registro</span></a></li>';
        }

        ul.innerHTML = html;
}

function hacerLogout(evt){
    evt.preventDefault();
    let url = 'api/usuarios/logout',
        xhr = new XMLHttpRequest(),
        usu = JSON.parse(sessionStorage['datosUsu']),
        token;

    token = usu.LOGIN + ':' + usu.TOKEN;
    xhr.open('POST', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
        let r = xhr.response;

        if(r.RESULTADO == 'OK'){
            sessionStorage.removeItem('datosUsu');
            location.href = './';
        }
    }

    xhr.setRequestHeader('Authorization', token);
    xhr.send();

}

function comprobarLogin(){
    //Guardamos la página actual en la cual nos encontramos
    let pathname = window.location.pathname;

    //Si ha iniciado sesion
    if(sessionStorage['datosUsu']){
        if(pathname == '/PCW-2324/Practica2/login.html' || pathname == '/PCW-2324/Practica2/registro,html'){
            window.location.href = 'index.html'; 
        }

    //Si no ha iniciado sesion
    }else{
        if(pathname == '/PCW-2324/Practica2/nueva.html'){
            window.location.href = 'index.html'; 
        }
    }
}