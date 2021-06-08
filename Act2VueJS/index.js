const mispropiedades = {
    data() {
        return {
            nombre: '',
            apellido: '',
            dni: null,
            lista_empleados:[]
        }
    },
    methods: {
        guardarEmpleado(){
            let unEmpleado = {
                nombreEmpleado:this.nombre,
                apellidoEmpleado:this.apellido,
                dniEmpleado:this.dni 
            }
            this.lista_empleados.push(unEmpleado);
            this.nombre='',
            this.apellido='',
            this.dni=null
        },
        eliminarEmpleado(index){
            this.lista_empleados.splice(index,1)
        }
    },
    mounted() {

    }
}
Vue.createApp(mispropiedades).mount("#app");