const propiedadesAPP = {
    data() {
        return {
            datosGenerales: [],

        }
    },
    methods: {
        async Datos() {
            const dolar = await fetch(
                "https://www.dolarsi.com/api/api.php?type=valoresprincipales");
            this.datosGenerales = await dolar.json();
        }
    },
    mounted() {
        //this.Datos();
    },
}
Vue.createApp(propiedadesAPP).mount("#app")

//const btnMoneda = document.querySelector("#btn_moneda");
//btnMoneda.addEventListener("click", Datos);

var dt = new Date();
var DD = ("0" + dt.getDate()).slice(-2);
var MM = ("0" + (dt.getMonth() + 1)).slice(-2);
var YYYY = dt.getFullYear();
var hh = ("0" + dt.getHours()).slice(-2);
var mm = ("0" + dt.getMinutes()).slice(-2);
var ss = ("0" + dt.getSeconds()).slice(-2);
var date_string = DD +  " de " + MM +  " del " + YYYY + " | Hora:  " + hh + ":" + mm + ":" + ss;

document.getElementById('time').innerHTML = moment().format('LLLL');