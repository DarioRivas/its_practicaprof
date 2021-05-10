//CALCULAR RESISTENCIA
const calcular_resistencia = () => {
    const res1 = document.querySelector("#r_intensidad").value;
    const res2 = document.querySelector("#r_voltaje").value;
    const rres = res2 / res1; 
    document.querySelector("#r_resistencia").value = rres.toFixed(2) + 'ohm';
}

const btn_resistencia = document.querySelector("#btn_resistencia");
btn_resistencia.addEventListener("click", calcular_resistencia);


//CALCULAR INTENSIDAD
const calcular_intensidad = () => {
    const int1 = document.querySelector("#i_resistencia").value;
    const int2 = document.querySelector("#i_voltaje").value;
    const rint = int2 / int1;
    document.querySelector("#i_intensidad").value = rint.toFixed(2) + 'A';
}

const btn_intensidad = document.querySelector("#btn_intensidad");
btn_intensidad.addEventListener("click", calcular_intensidad);


//CALCULAR VOLTAJE
const calcular_voltaje = () => {
    const vol1 = document.querySelector("#v_intensidad").value;
    const vol2 = document.querySelector("#v_resistencia").value;
    const rvol = vol1 * vol2;
    document.querySelector("#v_voltaje").value = rvol.toFixed(2) + 'V';
}

const btn_voltaje = document.querySelector("#btn_voltaje");
btn_voltaje.addEventListener("click", calcular_voltaje);


//BORRAR VALORES
const borrar_valores = () => {
    document.getElementById("form_resistencia").reset();
    document.getElementById("form_voltaje").reset();
    document.getElementById("form_intensidad").reset();
    /*document.querySelector("#v_intensidad").value = "";
    document.querySelector("#v_resistencia").value = "";
    document.querySelector("#v_voltaje").value = "";
    document.querySelector("#i_voltaje").value = "";
    document.querySelector("#i_resistencia").value = "";
    document.querySelector("#i_intensidad").value = "";
    document.querySelector("#r_voltaje").value = "";
    document.querySelector("#r_intensidad").value = "";
    document.querySelector("#r_resistencia").value = "";*/
}



const btn_borrar = document.querySelector("#btn_borrar");
btn_borrar.addEventListener("click", borrar_valores);