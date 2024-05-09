//Script para RECETA
function mostrarReceta(){
    // URL que contiene los parámetros de búsqueda
    let url_parametro = window.location.search;
    if (url_parametro === '') {
        // Redirigir a index.html
        window.location.href = 'index.html';
    }

    //Si la url tiene id, obtenemos el id de la receta para hacer la peticion GET
    url_parametro = url_parametro.substring(1);
    let pares = url_parametro.split('&');
    let primerPar = pares[0];
    let [valor, id] = primerPar.split('=');

    //Hacemos la peticion
    let xhr = new XMLHttpRequest();
    let url = 'api/recetas/'+ id;

    xhr.open('GET', url, true);
    xhr.responseType='json';

    xhr.onload = function () {
        let r = xhr.response;
        console.log(r);
        if(r.RESULTADO == 'OK'){
                //Si obtenemos la receta, podemos mostrar los datos.
                //1º Obtenemos las etiquetas.
                let xhr_etiquetas = new XMLHttpRequest();
                let url_etiquetas = 'api/recetas/'+ id + '/etiquetas';
                xhr_etiquetas.open('GET', url_etiquetas, true);
                xhr_etiquetas.responseType='json';
                xhr_etiquetas.onload = function () {
                    let r = xhr_etiquetas.response;
                    console.log(r);
                    if(r.RESULTADO == 'OK'){
                        let html = '<h3 class="Secciones"> Etiquetas </h3>';
                        r.FILAS.forEach(function(etiqueta, idx) { //Bucle para cada fila, hago una funcion para cada indice.
                            html += `<a href="buscar.html?e=${etiqueta.nombre}"> ${etiqueta.nombre} </a>`;
                        });
                        document.querySelector('#etiquetas').innerHTML = html;   
                    }
                }
                xhr_etiquetas.send();

                //2º Obtenemos los ingredientes
                let xhr_ingredientes = new XMLHttpRequest();
                let url_ingredientes = 'api/recetas/'+ id + '/ingredientes';
                xhr_ingredientes.open('GET', url_ingredientes, true);
                xhr_ingredientes.responseType='json';
                xhr_ingredientes.onload = function () {
                    let r = xhr_ingredientes.response;
                    console.log(r);
                    if(r.RESULTADO == 'OK'){
                        let html = '<h3 class="Secciones"> Ingredientes </h3> <ul>';
                        r.FILAS.forEach(function(ingrediente, idx) { //Bucle para cada fila, hago una funcion para cada indice.
                            html += `<li> ${ingrediente.texto} </li>`;
                        });
                        html += '</ul>'
                        document.querySelector('#ingredientes').innerHTML = html;   
                    }
                }
                xhr_ingredientes.send();

                //3º Obtenemos los comentarios
                let xhr_comentarios = new XMLHttpRequest();
                let url_comentarios = 'api/recetas/'+ id + '/comentarios';
                xhr_comentarios.open('GET', url_comentarios, true);
                xhr_comentarios.responseType='json';
                xhr_comentarios.onload = function () {
                    let r = xhr_comentarios.response;
                    console.log(r);
                    if(r.RESULTADO == 'OK'){
                        let html = '';
                        r.FILAS.forEach(function(comentario, idx) { //Bucle para cada fila, hago una funcion para cada indice.
                            html += `<article>
                                        <h4> ${comentario.titulo} </h4>
                                        <p>¡${comentario.texto}</p>
                                        <footer>
                                        <p> <time datetime="28/04/2024 11:36"> ${comentario.fechaHora} </time></p>
                                        <p> por <a href="buscar.html?a=${comentario.login}"> ${comentario.login} </a></p>
                                        </footer>
                                    </article>`;
                        });
                        document.querySelector('#comentarios').innerHTML = html;   
                    }
                }
                xhr_comentarios.send();

                //4º Mostramos la elaboracion
                let html='';
                html += `<h3 class="Secciones"> Elaboración </h3> <p>${r.FILAS[0].elaboracion}</p>`
                document.querySelector('#elaboracion').innerHTML = html;  

                //5º Mostramos las fotos
                let xhr_fotos = new XMLHttpRequest();
                let url_fotos = 'api/recetas/'+ id + '/fotos';
                xhr_fotos.open('GET', url_fotos, true);
                xhr_fotos.responseType='json';
                xhr_fotos.onload = function () {
                    let r = xhr_fotos.response;
                    console.log(r);
                    if(r.RESULTADO == 'OK'){
                        let num_foto = 0;
                        let html = '<h3 class="Secciones"> Fotos </h3>';
                        html += `<a href="receta.html"><img src="fotos/${r.FILAS[0].archivo}" alt="Foto"></a>
                                    <p class="Descripción"> ${r.FILAS[0].descripcion}</p>`;
                        
                        document.querySelector('#fotos').innerHTML = html;   
                    }
                }
                xhr_fotos.send();

                
                
        }
    }
    
    xhr.send();
}