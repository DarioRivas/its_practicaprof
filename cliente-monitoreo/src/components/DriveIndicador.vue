<template>
  <div class="card bg-fondo">
    <div class="card-header p-3">
      <div class="row">
        <div class="col">
          <div class="text-start"><h3>ALMACENAMIENTO</h3></div>
        </div>
        <div class="col">
          <div class="text-end"><i class="h3 bi bi-bar-chart-fill"></i></div>
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
                <p class="card-text">Medios de Almacenamiento</p>
                <a href="#/cliente" class="btn btn-primary"
                  >Seleccionar otro equipo</a
                >
              </div>
              <div class="card-footer text-muted">Refresh 1000ms</div>
            </div>
          </div>
          <div class="col-9 text-left">
            <table class="table table-borderless table-striped table-hover">
              <thead>
                <tr>
                  <th>Montado</th>
                  <th>Filesystem</th>
                  <th>Bloques</th>
                  <th>Usado</th>
                  <th>Disponible</th>
                  <th>% Utilizado</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="disk of datosDisco" v-bind:key="disk._mounted">
                  <td>{{ disk._mounted }}</td>
                  <td>{{ disk._filesystem }}</td>
                  <td>{{ disk._blocks }}</td>
                  <td>{{ disk._used }}</td>
                  <td>{{ disk._available }}</td>
                  <td>{{ disk._capacity }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="row mb-5"></div>
      </div>
    </div>
  </div>
  <br />
</template>
<script>
import io from "socket.io-client";
export default {
  name: "Drive",
  data() {
    return {
      direccion_ip: "",
      clienteIp: "",
      clienteRazon: "",
      filesystem: "",
      totalGb: "",
      usedGb: "",
      freeGb: "",
      montado: "",
      blocks: "",
      datosDisco: [],
    };
  },
  methods: {
    obtenerDatos() {
      this.clienteIp = "http://" + localStorage.getItem("localClienteIp");
      this.direccion_ip = localStorage.getItem("localClienteIp");
      this.clienteRazon = localStorage.getItem("localClienteRazon");
    },
    addIndicadores() {
      const socket = io(this.clienteIp);
      socket.on("drive-info", (objeto) => {
        /* for (const disks of objeto) {
          this.fileSystem = disks.filesystem;
          this.blocks = disks.blocks;
          this.usedGb = disks.used;
          this.freeGb = disks.available;
          this.totalGb = disks.capacity;
          this.montado = disks.mounted;
        }*/
        this.datosDisco = objeto.infoDiscos;
        console.log(this.datosDisco);
      });
    },
  },
  mounted() {
    this.obtenerDatos();
    this.addIndicadores();
  },
};
</script>