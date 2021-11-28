<template>
  <div class="card bg-fondo">
    <div class="card-header text-center p-3">
      <div class="row">
        <div class="col">
          <div class="text-start"><h3>SISTEMA</h3></div>
        </div>
        <div class="col">
          <div class="text-end">
            <i class="h3 bi bi-chat-square-dots-fill"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="card-body">
      <div class="bg-fondo">
        <div class="row">
          <div class="col-3">
            <div class="card text-center">
              <div class="card-header">Equipo de {{ clienteRazon }}</div>
              <div class="card-body">
                <h5 class="card-title">{{ direccion_ip }}</h5>
                <p class="card-text">Datos del Sistema</p>
                <a href="#/cliente" class="btn btn-primary"
                  >Seleccionar otro equipo</a
                >
              </div>
            </div>
          </div>
          <div class="col-9">
            <div class="card">
              <div class="card-header text-primary"><b>{{ version }}</b></div>
              <div class="card-body">
                <div class="row">
                  <div class="col">
                    <h6 class="d-flex flex-row">
                      Sistema Operativo: &nbsp;<strong class="text-primary">
                        {{ tipo }}</strong
                      >
                    </h6>
                    <h6 class="d-flex flex-row">
                      Arquitectura: &nbsp;<strong class="text-primary">
                        {{ arch }}</strong
                      >
                    </h6>
                    <h6 class="d-flex flex-row">
                      Plataforma: &nbsp;<strong class="text-primary">
                        {{ plat }}</strong
                      >
                    </h6>
                    <h6 class="d-flex flex-row">
                      Release: &nbsp;<strong class="text-primary">
                        {{ release }}</strong
                      >
                    </h6>
                    <h6 class="d-flex flex-row">
                      Hostname: &nbsp;<strong class="text-primary">
                        {{ host }}</strong
                      >
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import io from "socket.io-client";
export default {
  name: "Os",
  data() {
    return {
      direccion_ip: "",
      clienteIp: "",
      clienteRazon: "",
      host: "",
      tipo: "",
      arch: "",
      plat: "",
      release: "",
      version: "",
    };
  },
  methods: {
    obtenerDatos() {
      this.clienteIp =
        "http://" + localStorage.getItem("localClienteIp");
      this.direccion_ip = localStorage.getItem("localClienteIp");
      this.clienteRazon = localStorage.getItem("localClienteRazon");
    },
    addIndicadores() {
      const socket = io(this.clienteIp);
      socket.on("datosSistema", (objeto) => {
        this.host = objeto.host;
        this.tipo = objeto.tipo;
        this.arch = objeto.arch;
        this.plat = objeto.plat;
        this.release = objeto.release;
        this.version = objeto.version;
      });
    },
  },
  mounted() {
    this.obtenerDatos();
    this.addIndicadores();
  },
};
</script>