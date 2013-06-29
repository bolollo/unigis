function hacer_suma(){
    //obtener el valor del campo numero1
    var numero_1 = document.getElementById('numero1').value;
    //obtener el valor del campo numero2
    var numero_2 = document.getElementById('numero2').value;
    //llamar a la función suma
    var resultado_suma = suma(numero_1,numero_2);
    //mostrar el mensaje con el resultado de la suma
    alert(resultado_suma);
}

function suma(a, b){
    //definimos la variable resultado.
    var resultado;
    //calculamos la suma
    resultado = parseInt(a) + parseInt(b);
    //retornamos el resultado de la suma
    return resultado;
}
