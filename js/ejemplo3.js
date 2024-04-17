function anyadirIngrediente(){
    let ingrediente = document.querySelector('#ingr').value; //Cogemos el valor del id

    let li = document.createElement('li');
    li.innerHTML = '<span>' + ingrediente + '</span><button onClick="eliminarIngr(this);">X</button>'; //hacer el onclick del boton para eliminar la etiqueta

    document.querySelector('#ingredientes').appendChild( li );


}

function eliminarIngr (btn) {
    btn.parentElement.remove();
}

//Para guardar todos los ingredientes al enviar el formulario
function crear(){
    let lista = document.querySelectorAll('#ingredientes > li');

    lista.forEach(function(li, idx) {
        let texto;

        texto = li.querySelector('span').textContent;
        console.log(texto);
    });

}

function anyadirFoto(evt) {
    evt.preventDefault(); //Para no enviar el formulario


    let div = document.createElement('div').html;

    html = '<img src = " alt = "Foto">';
    html += '<input type="file" name"fotos[]">';

    div.innerHTML = html; //aplicar css para que no ocuoen espacio
    div.classList.add('foto'); //css
    document.querySelector('#fotos').appendChild( div );
}