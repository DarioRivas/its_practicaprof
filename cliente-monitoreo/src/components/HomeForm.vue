<template>
  <div class="card bg-fondo container-fluid">
    <div class="card-header p-3">
      <div class="row">
        <div class="col">
          <div class="text-start"><h4>App Monitoreo de Sistema</h4></div>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="bg-fondo">
        <div class="row">
          <div class="col-6">
            <div class="row align-middle">
              <p>Servidor y Puerto</p>
              <div class="col">
                <input
                  v-model="servidorSrc"
                  class="form-control"
                  type="text"
                  :placeholder= servidorSrc
                  name="servidor"
                  id="servidor"
                />
              </div>
              <div class="col">
                <button
                  @click="guardarServidor(servidorSrc)"
                  class="btn btn-success"
                >
                  <i class="bi bi-save-fill"> Guardar</i>
                </button>
              </div>
            </div>
          </div>
          <div class="col-6">
            <div>
              <p>Opciones de la App</p>
              <div class="list-group list-group-flush">
                <a
                  class="list-group-item h6 bi bi-person-workspace"
                  href="#/cliente"
                >
                  Carga y seleccion de clientes</a
                >
                <a class="list-group-item h6 bi bi-bar-chart-fill" href="#/cpu">
                  Datos del procesador</a
                >
                <a class="list-group-item h6 bi bi-hdd" href="#/drive">
                  Datos de medios de almacenamiento</a
                >
                <a class="list-group-item h6 bi bi-stack" href="#/memoria">
                  Datos de memoria RAM</a
                >
                <a
                  class="list-group-item h6 bi bi-diagram-3-fill"
                  href="#/netstat"
                >
                  Conectividad y Redes</a
                >
                <a
                  class="list-group-item h6 bi bi-chat-square-dots-fill"
                  href="#/os"
                >
                  Informacion del sistema operativo
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Home",
  data() {
    return {
      servidorSrc: "",
    };
  },
  methods: {
    guardarServidor(servidor) {
      localStorage.setItem("servidor", servidor);
      this.servidorSrc=servidor
    },
    obtenerServidor(){
    this.servidorSrc = localStorage.getItem('servidor')
    },
  },
  mounted() {
    this.obtenerServidor();
  },
};
</script>