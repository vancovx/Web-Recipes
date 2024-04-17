function mostrarMenu(){
    let ul = document.querySelector('#menu'),
        pagina = document.body.getAttribute('data-pagina'),
        html = '';
        
        if (pagina != 'index'){
            html += '<li><a href = "./buscar.html">Buscar<a/></li>';
        }

        if (pagina != 'buscar'){
            html += '<li><a href = "./buscar.html">Buscar<a/></li>';
        }

        //location.href = 'login.html'; //para hacer logout
        if (sessionStorage['datos_usuario']){
            html += '<li><a href="./"onclick="hacerLogout(event);">Logout</a></li>';

            if (pagina != 'nueva'){
                html += '<li><a href = "./nueva.html">Nueva<a/></li>';
            }
            else{
                if (pagina != 'login'){
                    html += '<li><a href = "./login.html">Login<a/></li>';
                }

                if (pagina != 'registro'){
                    html += '<li><a href = "./registro.html">Registro<a/></li>';
                }
            }
        }
        ul.innerHTML = html;
}

function hacerLogout(evt){
    evt.preventDefault();
    let url = 'api/usuarios/logout',
        xhr = new XMLHttpRequest(),
        usu = JSON.parse( sessionStorage['datos_usuario']),
        token;

    token = usu.LOGIN + ':' + usu.TOKEN;
    xhr.open('POST', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
        let r = xhr.response;

        if(r.RESULTADO == 'OK'){
            sessionStorage.removeItem('datos_usuario');
            location.href = './';
        }
    }

    xhr.setRequestHeader('Authorization', token);
    xhr.send();

    location.href='./'; //Te lleva a la raiz
}

function pedirFormulario(){
    let url= 'formulario.html',
        xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);
    xhr.onload = function(){
        let html = xhr.responseText;
        
        document.querySelector('#formulario').innerHTML = html;
    }

    xhr.send();
}

function comprobarLogin( inp){
    console.log(inp.value);
    let url = 'api/usuarios/' + inp.value;
}

function crearReceta( evt ){
    evt.preventDefault;

    let url = 'api/recetas',
        xhr = new XMLHttpRequest(),
        fd = new FormData(evt.currentTarget),
        usu = JSON.parse(sessionStorage('datos_usuario')),
        auth;

        auth = usu.LOGIN + ':' + usu.TOKEN;
        xhr.open('POST', url, true);
        xhr.responseType = 'json';
        xhr.onload = function(){
            let r = xhr.response;
            if(r.RESULTADO == 'OK'){

            }
        }

        xhr.setRequestHeader('Authorization', auth);
            xhr.send();
}