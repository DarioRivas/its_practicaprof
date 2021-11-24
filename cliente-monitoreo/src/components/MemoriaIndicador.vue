<template>
  <div class="card bg-fondo">
    <div class="card-header text-center p-3">
      <div class="row">
        <div class="col">
          <div class="text-start"><h3>MEMORIA</h3></div>
        </div>
        <div class="col">
          <div class="text-end"><i class="h3 bi bi-stack"></i></div>
        </div>
      </div>
    </div>
    <div class="card-body text-center">
      <div class="bg-fondo">
        <div class="row">
          <div class="col-3">
            <div class="card text-center">
              <div class="card-header">Equipo de {{ clienteRazon }}</div>
              <div class="card-body">
                <h5 class="card-title">{{ direccion_ip }}</h5>
                <p class="card-text">Estado de Memoria del equipo</p>
                <a href="cliente" class="btn btn-primary">Seleccionar otro equipo</a>
              </div>
              <div class="card-footer text-muted">Refresh 1000ms</div>
            </div>
          </div>
          <div class="col-9 back_imagen img-fluid"></div>
        </div>
        <div class="row mb-5">
          <div class="col-3">
            <div class="card mt-5">
              <div class="card-header text-center">
                <h5>{{ memTotalDescripcion }}</h5>
              </div>
              <div class="card-body text-center">
                <h4>{{ memTotalValor }}</h4>
              </div>
            </div>
          </div>
          <div class="col-3">
            <div class="card mt-5">
              <div class="card-header text-center">
                <h5>{{ memFreeDescripcion }}</h5>
              </div>
              <div class="card-body text-center">
                <h4>{{ memFreeValor }}</h4>
              </div>
            </div>
          </div>
          <div class="col-3">
            <div class="card mt-5">
              <div class="card-header text-center">
                <h5>{{ memUsedDescripcion }}</h5>
              </div>
              <div class="card-body text-center">
                <h4>{{ memUsedValor }}</h4>
              </div>
            </div>
          </div>
          <div class="col-3">
            <div class="card mt-5">
              <div class="card-header text-center">
                <h5>{{ memFreePDescripcion }}</h5>
              </div>
              <div class="card-body text-center">
                <h4>{{ memFreePValor }}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.back_imagen {
  background-image: url(../assets/ram.png);
}
.bg-fondo {
  background-color: #111111;
}
</style>
<script>
import io from "socket.io-client";
export default {
  name: "Memoria",
  data() {
    return {
      direccion_ip: "",
      clienteIp: "",
      clienteRazon: "",
      memFreeValor: "",
      memFreeDescripcion: "",
      memFreePValor: "",
      memFreePDescripcion: "",
      memUsedValor: "",
      memUsedDescripcion: "",
      memTotalValor: "",
      memTotalDescripcion: "",
    };
  },
  methods: {
    obtenerDatos() {
      this.clienteIp =
        //"http://" + localStorage.getItem("localClienteIp") + ":3000";
        "http://" + localStorage.getItem("localClienteIp");
      this.direccion_ip = localStorage.getItem("localClienteIp");
      this.clienteRazon = localStorage.getItem("localClienteRazon");
    },
    addIndicadores() {
      const socket = io(this.clienteIp);
      socket.on("mem-info", (objeto) => {
        this.memFreeValor = objeto.dataLibre;
        this.memFreeDescripcion = objeto.descLibre;
        this.memUsedValor = objeto.dataUtil;
        this.memUsedDescripcion = objeto.descUtil;
        this.memTotalValor = objeto.dataTotal;
        this.memTotalDescripcion = objeto.descTotal;
        this.memFreePValor = objeto.dataPorc;
        this.memFreePDescripcion = objeto.descPorc;
      });
    },
  },
  mounted() {
    this.obtenerDatos();
    this.addIndicadores();
  },
};
</script>




