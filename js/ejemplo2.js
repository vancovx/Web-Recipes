function hacerLogin ( evt ){
    evt.preventDefault();

    let frm = evt.currentTarget;

    if(frm.querySelector('p.error')){
        console.log('NO PUEDO MÁS');

    }else{
        console.log('ENVIAR');
    }

}


function comprobarLogin ( inp ){
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
    
}