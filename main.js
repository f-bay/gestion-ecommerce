class Producto {
    constructor(nombre, descripcion, marca, precio, stock) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.marca = marca;
        this.precio = precio;
        this.stock = stock;
    }

    sumarIva() {
        return this.precio * 1.21;
    }

    venderProducto(cantidad) {
        if (this.stock > cantidad) {
            alert(
                `Felicitaciones, vendió ${cantidad} ${
                    this.nombre
                }s. Le quedan ${this.stock - cantidad} unidades!`
            );
            return this.stock - cantidad;
        } else {
            alert("Lo sentimos, no tenemos stock suficiente");
            return false;
        }
    }
}

let arrayProductos = [];
let agregarProducto;
let productoAVender;

alert(`Bienvenido al simulador de gestion de ecommerce, ¿que operacion desea realizar?`);

const realizarOperacion = () => {    
    let operacion = parseInt(prompt(
        `
        Ingrese 1 para ingresar un producto.
        Ingrese 2 para mostrar los productos.
        Ingrese 3 para vender un producto.
        Ingrese 0 para salir del programa.
        `
    ));
    verificarOperacion(operacion);
}

function verificarOperacion(operacion) {
    if(operacion === 1) {
        ingresarProducto();
        mostrarProducto();
        realizarOperacion();
    } else if (operacion === 2) {
        mostrarProducto();
        realizarOperacion();
    } else if (operacion === 3) {
        buscarProducto();
        realizarVenta();
        realizarOperacion();
    } else if (operacion === 0) {
        alert("Gracias por confiar en nosotros!");
        return false;
    } else {
        alert("Pruebe ingresando 1, 2 o 3"); 
        realizarOperacion();
    }
}

function ingresarProducto() {

    do {
        agregarProducto = parseInt(
            prompt("Ingrese 1 para ingresar un producto o 2 para finalizar")
        );
        if (agregarProducto === 2) {
            break;
        } else if (agregarProducto === 1) {
            let nombreProducto = prompt(
                "Ingrese el nombre del producto:"
            ).toLowerCase();
            let descripcionProducto = prompt(
                "Ingrese la descripcion del producto:"
            ).toLowerCase();
            let marcaProducto = prompt(
                "Ingrese la marca del producto"
            ).toLowerCase();
            let precioProducto = parseFloat(
                prompt("Ingrese el precio del producto")
            );
            let stockProducto = parseInt(prompt("Ingrese el stock del producto:"));
            arrayProductos.push(
                new Producto(
                    nombreProducto,
                    descripcionProducto,
                    marcaProducto,
                    precioProducto,
                    stockProducto
                )
            );
        } else {
            alert("Pruebe ingresando 1 o 2");
        }
    } while (agregarProducto != 2);
}


function mostrarProducto() {
    if(arrayProductos.length > 0) {
        arrayProductos.forEach((producto) => {
            alert(`
            Usted ingreso el siguiente producto: 
                Nombre: ${producto.nombre.toUpperCase()} 
                Descripcion: ${producto.descripcion.toUpperCase()}
                Marca: ${producto.marca.toUpperCase()} 
                Precio: $${producto.precio}
                Stock: ${producto.stock} unidades`);
        });
    } else {
        alert("No hay productos que mostrar.")
        realizarOperacion();
    }
};


function buscarProducto() {
    if(arrayProductos.length > 0) {
        productoAVender = arrayProductos.find(producto => producto.nombre === prompt("Ingrese el nombre del producto a vender:").toLowerCase());
    
        if(productoAVender === undefined) {
            alert("Intente ingresando un producto válido.");
            buscarProducto();
        } else {
            alert(`
            Usted desea vender: 
                Nombre: ${productoAVender.nombre.toUpperCase()}
                Descripcion: ${productoAVender.descripcion.toUpperCase()}
                Marca: ${productoAVender.marca.toUpperCase()}
                Precio: $${productoAVender.precio}
                Stock: ${productoAVender.stock} unidad/es
            `);
        }
    } else {
        alert("Intente agregar un producto primero.");
        realizarOperacion();
    }
};

function realizarVenta() {
    let cantidad = parseInt(prompt(`Ingrese la cantidad de ${productoAVender.nombre} a vender:`));
    let productoConIVA = productoAVender.sumarIva();
    
    if(productoAVender.venderProducto(cantidad)) {
        alert(`El precio de lista es: $${productoAVender.precio * cantidad}`);
        alert(`El monto total con IVA incluido es de $${productoConIVA * cantidad}`);
    } else {
        return false;
    }
}


realizarOperacion();
