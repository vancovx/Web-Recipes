function pedirReceta(){
    let url = 'api/recetas',
        xhr = new XMLHttpRequest();

        url+='?reg=0&cant=6&t=a'; //para que aparezca una cantidad de recetas (reg=donde empieza, cant= cantidad, t=texto, e=etiqueta) //&e=pasta

    xhr.open('GET', url, true);

    xhr.responseType = 'json'; //para que devuelva la respuesta en json

    xhr.onload = function(){ //Cuando se produzca el evento load (se completa la petición), ocurre la funcion
        let r = xhr.response;

        console.log( r );
        if(r.RESULTADO == 'OK'){
            let html = '';

            r.FILAS.forEach(function(e /*elemento de la fila*/, idx /*Numero de la fila */) {
                html += `<li>${e.nombre}</li>`;
            });
            document.querySelector('#listaRecetas').
            innerHTML = html;
        }
    }
    xhr.send();
}

function hacerLogin(evt){
    evt.preventDefault(); //evita el comportamiento por defecto, por lo que no recarga la pagina

    let url='api/usuarios/login',
        xhr = new XMLHttpRequest(),
        frm = evt.currentTarget, //formulario
        fd = new FormData( frm );//asi se captan los campos del formulario

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

function dejarComentario(){ //se hace igual que el login practicamente, falta el frm, pero vamos a añadirlo a mano
    let url = 'api/recetas/1/comentarios',
        xhr = new XMLHttpRequest(),
        fd = new FormData(),
        usu, //datos del usuario
        auth; // autorizacion

    if(sessionStorage['datosUsu'] ){
        usu = JSON.parse(sessionStorage['datosUsu']);
        
        auth = usu.LOGIN + ':' + usu.TOKEN;

        xhr.open('POST' , url, true);
        xhr.responseType = 'json';
        xhr.onload = function () {
            let r = xhr.response;

            console.log(r);
        }

        fd.append('titulo', 'Titulo del comentario');
        fd.append('texto', 'texto del comentario');

        xhr.setRequestHeader('Authorization', auth);
        xhr.send(fd);
    }

}