//Script para BUSCAR
function buscarReceta(evt){
    evt.preventDefault(); //Para formularios
    let parametros = 0;
    let xhr = new XMLHttpRequest(),
        frm = evt.currentTarget, //Formulario
        fd = new FormData(frm);

    let url='api/recetas?';

    if(fd.get('autor') != ''){
        url += 'a=' + fd.get('autor');
        parametros++;
    }

    if(fd.get('cont') != ''){
        if(parametros >= 1){
            url += '&t=' + fd.get('cont');
        }else{
            url += 't=' + fd.get('cont');
        }
        parametros++;
    }

    if(fd.get('ingre') != ''){
        if(parametros >= 1){
            url += '&i=' + fd.get('ingre');
        }else{
            url += 'i=' + fd.get('ingre');
        }
        parametros++;
    }

    if(fd.get('eti') != ''){
        if(parametros >= 1){
            url += '&e=' + fd.get('eti');
        }else{
            url += 'e=' + fd.get('eti');
        }
        parametros++;
    }

    if(fd.get('dificultad') != '' && fd.get('dificultad') != 'Cualquiera'){
        if(parametros >= 1){
            if(fd.get('dificultad') == 'Baja'){
                url += '&d=1';
            }

            if(fd.get('dificultad') == 'Media'){
                url += '&d=2';
            }

            if(fd.get('dificultad') == 'Alta'){
                url += '&d=3';
            }
            
            
        }else{
            if(fd.get('dificultad') == 'Baja'){
                url += 'd=1';
            }

            if(fd.get('dificultad') == 'Media'){
                url += 'd=2';
            }

            if(fd.get('dificultad') == 'Alta'){
                url += 'd=3';
            }
        }
        parametros++;
    }

    console.log(url);
    
    
    //Hacemos la peticion GET
    xhr.open('GET', url, true);
    xhr.responseType='json';

    xhr.onload = function () {
        let r = xhr.response;
        console.log(r);
        if(r.RESULTADO == 'OK'){
            let html = '';  //Creo una variable que será el html que voy a insertar, `` para pasar cadena de texto.
          
            r.FILAS.forEach(function(receta, idx) { //Bucle para cada fila, hago una funcion para cada indice.
                html += `<article>
                            <a href="receta.html?id=${receta.id}"><img src="fotos/${receta.imagen}" alt="Foto"></a>
                            <a href="receta.html?id=${receta.id}"><h4>${receta.nombre}</h4></a>
                            <footer>
                                <span class="icon-users"></span><span>${receta.personas} personas</span>`;
                for (let i = 0; i < receta.dificultad; i++) {
                    html += `<span class="icon-star"></span>`;
                }

                for(let i = 3; i > receta.dificultad; i--){
                    html += `<span class="icon-star-empty"></span>`;
                }

                html += `<span> Dificultad</span>
                        <span class="icon-clock"></span><span> ${receta.tiempo} min</span>
                        </footer>
                        </article> `;
                
            });

            document.querySelector('#recetas').innerHTML = html;
            
        }
    }

    xhr.send(fd);

}

