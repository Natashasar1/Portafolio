let btnAgregar = document.getElementById("btnAgregar");
let btnClear = document.getElementById("btnClear");
let txtNombre = document.getElementById("Name");
let txtNumber = document.getElementById("Number");

let alertValidaciones = document.getElementById("alertValidaciones");
let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
let tablaListaCompras = document.getElementById("tablaListaCompras");
let cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);


let contadorProductos = document.getElementById("contadorProductos");
let productosTotal = document.getElementById("productosTotal");
let precioTotal = document.getElementById("precioTotal");

let precio = 0;
let isValid = true;
let contador = 0;

let costoTotal = 0;
let totalEnProductos = 0;

let datos = new Array();

//LIMPIAR TODO BOTÓN CLEAR
btnClear.addEventListener("click", function (event) {
    event.preventDefault();
    txtNombre.value = "";
    txtNumber.value = "";
    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display = "none";
    txtNombre.style.border = "";
    txtNumber.style.border = "";
    contador = 0;
    costoTotal = 0;
    totalEnProductos = 0;
    contadorProductos.innerText = contador;
    productosTotal.innerText = totalEnProductos;
    precioTotal.innerText = `$ ${costoTotal.toFixed(2)}`;
    localStorage.setItem("contadorProductos", contador);
    localStorage.setItem("totalEnProductos", totalEnProductos);
    localStorage.setItem("costoTotal", costoTotal);
    localStorage.removeItem("datos");
    datos = new Array();
    cuerpoTabla.innerHTML = "";
    txtNombre.focus();
});//LIMPIAR TODO BOTÓN CLEAR


function validarCantidad() {

    if (txtNumber.value.length == 0) {
        console.log("length == 0");
        return false;
    }

    if (isNaN(txtNumber.value)) {

        return false;
    }

    if (Number(txtNumber.value) <= 0) {
        return false;
    }

    return true;
}

function getPrecio() {
    return parseInt((Math.random() * 75) * 100) / 100

}
//BOTÓN AGREGAR
btnAgregar.addEventListener("click", function (event) {
    event.preventDefault();
    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display = "none";
    txtNombre.style.border = "";
    txtNumber.style.border = "";
    isValid = true;
    txtNombre.value = txtNombre.value.trim();//TRIM SIRVE PARA EVITAR VALIDACIONES CON ESPACIOS
    txtNumber.value = txtNumber.value.trim();
    //BOTÓN AGREGAR

    //VALIDAR LONGITUD MAYOR QUE 3
    if (txtNombre.value.length < 3) {
        alertValidacionesTexto.insertAdjacentHTML("beforeend", `El <strong>nombre </strong> no es correcto <br/>`);
        alertValidaciones.style.display = "block";
        txtNombre.style.border = "solid red thin";
        isValid = false;
    }//VALIDAR LONGITUD MAYOR QUE 3

    //VALIDAR QUE SEA UN NÚMERO Y LA LONGITUD
    if (!validarCantidad()) {
        alertValidacionesTexto.insertAdjacentHTML("beforeend", `La <strong> cantidad </strong> no es correcta <br/>`);
        alertValidaciones.style.display = "block";
        txtNumber.style.border = "solid red thin";
        isValid = false;
    }//VALIDAR QUE SEA UN NÚMERO Y LA LONGITUD

    //AGREGAR ELEMENTOS A LA TABLA DE COMPRAS
    if (isValid) {
        contador++;
        precio = getPrecio();
        row = ` <tr>
        <td>${contador}</td>
        <td>${txtNombre.value}</td>
        <td>${txtNumber.value}</td>
        <td>${precio}</td>
        </tr>
        `;

        let elemento = `{"id" : ${contador},
                        "nombre" : "${txtNombre.value}",
                        "cantidad" : ${txtNumber.value},
                        "precio" : ${precio}

        }`;
        datos.push(JSON.parse(elemento));
        console.log(datos);
        localStorage.setItem("datos", JSON.stringify(datos));

        cuerpoTabla.insertAdjacentHTML("beforeend", row);
        //AGREGAR ELEMENTOS A LA TABLA DE COMPRAS ^
        contadorProductos.innerText = contador;
        //CONTADOR DE PRODUCTOS ^
        totalEnProductos += parseFloat(txtNumber.value);
        //SUMA DE PRODUCTOS ^
        productosTotal.innerText = totalEnProductos;
        //SUMA DE PRODUCTOS ^
        costoTotal += precio * parseFloat(txtNumber.value);
        precioTotal.innerText = `$ ${costoTotal.toFixed(2)}`;
        //SUMA DE PRECIOS ^ 
        txtNombre.value = "";
        txtNumber.value = "";
        txtNombre.focus();
        //VACIAR CAMPOS CUANDO SE AGREGAN PRODUCTOS ^

        localStorage.setItem("contadorProductos", contador);
        localStorage.setItem("totalEnProductos", totalEnProductos);
        localStorage.setItem("costoTotal", costoTotal);

        txtNombre.value = "";
        txtNumber.value = "";
        txtNombre.focus();
    }//if isValid
});//btnAgregar

//MANTENER LOCALSTORAGE
window.addEventListener("load", function (event) {
    event.preventDefault();
    if (this.localStorage.getItem("contadorProductos") != null) {
        contador = Number(this.localStorage.getItem("contadorProductos"));
        totalEnProductos = Number(this.localStorage.getItem("totalEnProductos"));
        costoTotal = Number(this.localStorage.getItem("costoTotal"));

        contadorProductos.innerText = contador;
        productosTotal.innerText = totalEnProductos;
        precioTotal.innerText = `$ ${costoTotal.toFixed(2)}`;
    } //if !=null

    if (this.localStorage.getItem("datos") != null) {
        datos = JSON.parse(this.localStorage.getItem("datos"));
        datos.forEach((r) => { //función anonima del tipo flecha
            let row = `<tr>
            <td>${r.id}</td>  
            <td>${r.nombre}</td>
            <td>${r.cantidad}</td>
            <td>${r.precio}</td>
            </tr>`; //cada uno lo vamos a llamar a r 
            cuerpoTabla.insertAdjacentHTML("beforeend", row); //esto hace que se vean los objetos en la tabla al cerrar y abrir la ventana
        }); //foreach
    }//datos !null
});//window load
