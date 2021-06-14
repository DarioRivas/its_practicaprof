const mispropiedades = {
    data() {
        return {
            titulo: '',
            url: '',
            lista_imagenes: []
        }
    },
    methods: {
        guardarImagen() {
            let unaImagen = {
                tituloImagen: this.titulo,
                urlImagen: this.url,
            }
            this.lista_imagenes.push(unaImagen);
            this.titulo = '',
            this.url = ''
        }
    },
    mounted() {


    }
}
Vue.createApp(mispropiedades).mount("#app");
