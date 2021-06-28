const mispropiedades = {
    data() {
        return {
            nombre: '',
            apellido: '',
            dni: '',
            cuota: '',
            correo: '',
            importe: '',
            fecha: '',
            listaPagos: []
        }
    },
    methods: {
        guardarPago() {
            const nuevoPago = {
                nombre: this.nombre,
                apellido: this.apellido,
                dni: this.dni,
                cuota: this.cuota,
                correo: this.correo,
                importe: this.importe,
                fecha: this.fecha
            }
            if ("tareas" in localStorage) {
                this.listaPagos = JSON.parse(localStorage.getItem("pagos"));
                this.listaPagos.push(nuevoPago);
                localStorage.setItem("pagos", JSON.stringify(this.listaPagos));
            } else {
                this.listaPagos.push(nuevoPago);
                localStorage.setItem("pagos", JSON.stringify(this.listaPagos));
            }
            this.nombre = '';
            this.apellido = '';
            this.dni = '';
            this.cuota = '';
            this.correo = '';
            this.importe = '';
            this.fecha = '';
        },
        listarPagos() {
            if ("pagos" in localStorage) {
                this.listaPagos = JSON.parse(localStorage.getItem("pagos"));
            } else {
                this.listaPagos = [];
            }
        },
        eliminarPago(index) {
            this.listaPagos.splice(index, 1);
            localStorage.setItem("pagos", JSON.stringify(this.listaPagos));
        },
        vaciarLocal() {
            localStorage.removeItem("pagos");
            this.listarPagos();
        }
    },
    mounted() {
        this.listarPagos();

    }
}
Vue.createApp(mispropiedades).mount("#app");