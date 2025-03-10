//Script para INDEX
function pedirReceta() {
    let url = 'api/recetas',  //Declaramos ruta de la api
        xhr = new XMLHttpRequest();  //Creamos el objeto para hacer peticiones
        url += '?reg=0&cant=4'; //Muestra 4 recetas a partir de la 0 que contengan 'a' y la etiqueta 'pasta', (reg=donde empieza, cant= cantidad, t=texto, e=etiqueta)

    xhr.open('GET', url, true);  //xhr es un tipo de dato "request", y aqui le doy los valores: 
    //Get es el tipo de peticion, url es el string que me lleva a donde quiero realizar la accion y true indica que quiero que sea asincrona la peticion

    xhr.responseType = 'json';

    xhr.onload = function() {  //Cuando la request termine (onload) se ejecuta una función.
        let r = xhr.response;

        console.log(r);  //Muestra en la consola la respuesta

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

            document.querySelector('#recetas').innerHTML  = html; //Insertamos en el html buscando por id, clase...

            actualizarPie();
        }
    }

    xhr.send();
}

function MostrarMas() {
    let url = 'api/recetas',  //Declaramos ruta de la api
        xhr = new XMLHttpRequest(), //Creamos el objeto para hacer peticiones
        numRecetas = 0;
        url += '?reg=0&cant=4'; //Muestra 4 recetas a partir de la 0 que contengan 'a' y la etiqueta 'pasta', (reg=donde empieza, cant= cantidad, t=texto, e=etiqueta)

    xhr.open('GET', url, true);  //xhr es un tipo de dato "request", y aqui le doy los valores: 
    //Get es el tipo de peticion, url es el string que me lleva a donde quiero realizar la accion y true indica que quiero que sea asincrona la peticion

    xhr.responseType = 'json';

    xhr.onload = function() {  //Cuando la request termine (onload) se ejecuta una función.
        let r = xhr.response;

        console.log(r);  //Muestra en la consola la respuesta

        if(r.RESULTADO == 'OK'){ 
            let html = '';  //Creo una variable que será el html que voy a insertar, `` para pasar cadena de texto.
          
            r.FILAS.forEach(function(receta, idx) { //Bucle para cada fila, hago una funcion para cada indice.
                html += `<article>
                            <a href="receta.html"><img src="fotos/${receta.imagen}" alt="Foto"></a>
                            <a href="receta.html"><h4>${receta.nombre}</h4></a>
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
                
                numRecetas++;
            });

            document.querySelector('#recetas').innerHTML += html; //Insertamos en el html buscando por id, clase...

            // Actualizar el pie de recetas
            actualizarPie(numRecetas); // Llama a una función que actualiza la información del pie de página

        }
    }

    xhr.send();
}


function actualizarPie(numRecetas) {
    let infoPie = '';
    let existeInfo = document.querySelector('#numRecetas p'); // Verifica si ya hay un párrafo dentro del elemento #numRecetas

    if(!existeInfo){
        //Si no existe la primera vez se muestran solamente 4 recetas
        infoPie = `<p> Mostrando 4 resultados de 36 </p>`; // Actualiza el texto del pie de página
        document.querySelector('#numRecetas').insertAdjacentHTML("afterbegin", infoPie); 
    
    }else{
        //Si existe se modifica el elemento infoPie
        infoPie = document.querySelector('#numRecetas p');
        infoPie.textContent = `Mostrando 8 resultados de 36`; // Actualiza el texto del pie de página
    }

    
}

