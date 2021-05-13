function mostrar() {
    let info = {
        nombre: 'Dario',
        apellido: 'Rivas',
        direccion: {
            calle: 'Patagonia Argentina',
            altura: '151',
            ciudad: 'Cinco Saltos'
        }
    }
    console.log(`
    Nombre: ${info.nombre}
    Apellido: ${info.apellido}
    Direccion: ${info.direccion.calle} ${info.direccion.altura}
    Ciudad: ${info.direccion.ciudad}
    `);
}

const mostrar2 = () => {
    let info = {
        nombre: 'Dario',
        apellido: 'Rivas',
        direccion: {
            calle: 'Patagonia Argentina',
            altura: '151',
            ciudad: 'Cinco Saltos'
        }
    }
    console.log(`
    Nombre: ${info.nombre}
    Apellido: ${info.apellido}
    Direccion: ${info.direccion.calle} ${info.direccion.altura}
    Ciudad: ${info.direccion.ciudad}
    `);
}

const boton_1 = document.querySelector("#boton_1");
boton_1.addEventListener("click", mostrar2);


//Mostrar Arreglo
const mostrar_elementos_arreglo = () => {
    let valores = [10, 20, 30, 40];
    console.log(valores[2])
}

const boton_2 = document.querySelector("#boton_2");
boton_2.addEventListener("click", mostrar_elementos_arreglo);

//Mostrar Arreglo de Objetos
const mostrar_array_objetos = () => {
    let arreglo_objetos = [{
            taller: 'Programacion 1',
            anio: '5to',
            escuela: 'CET30'
        },
        {
            taller: 'WEB 2',
            anio: '5to',
            escuela: 'CET30'
        },
        {
            taller: 'Sistemas',
            anio: '5to',
            escuela: 'CET30'
        }
    ];
    let totalidad_filas = [];
    arreglo_objetos.forEach(element => {
        /*console.log(`
        Escuela: ${element.escuela}
        Taller: ${element.taller}
        Año: ${element.anio}
        `)      */
        let fila = `
        <tr>
        <td>${element.escuela}</td><td>${element.taller}</td><td>${element.anio}</td>
        </tr>
        `;
        totalidad_filas.push(fila);
    });
    document.querySelector('#tb_datos').innerHTML = totalidad_filas.join("");
}
const boton_3 = document.querySelector("#boton_3");
boton_3.addEventListener("click", mostrar_array_objetos);
