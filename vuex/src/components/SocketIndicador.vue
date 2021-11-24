<template>
  <h4>Recibiendo datos</h4>
  <div class="row mt-5">
    <div class="col-3">
      <select @change="capturar_random()" v-model="equipo" class="form-select">
        <option value="http://localhost:3000" selected>MI PC</option>
        <option value="http://172.16.8.167:3000">PC Nacho</option>
        <option value="http://172.16.8.254:3000">PC Flavia</option>
        <option value="http://172.16.9.231:3000">PC Lautaro</option>
      </select>
    </div>
  </div>
  <div class="row mt-5">
    <div class="col-3">
      <div class="card">
        <div class="card-header text-center">
          <h3>
            <b>{{ nombre }}</b>
          </h3>
        </div>
        <div class="card-body">
          <h3>{{ valor_recibido }}</h3>
        </div>
        <div class="card-footer">
          <h4>{{ estado }}</h4>
        </div>
      </div>
    </div>
    <div class="col-3">
      <div class="card">
        <div class="card-header text-center">
          <h3>{{ descripcion_cpu_free }}</h3>
        </div>
        <div class="card-body">
          <h3>{{ valor_cpu_free }}</h3>
        </div>
        <div class="card-footer">
          <h4>{{ estado_cpu_free }}</h4>
        </div>
      </div>
    </div>
     <div class="col-3">
      <div class="card">
        <div class="card-header text-center">
          <h3>{{ descripcion_mem_free }}</h3>
        </div>
        <div class="card-body">
          <h3>{{ valor_mem_free }}</h3>
        </div>
        <div class="card-footer">
          <h4>{{ estado_mem_free }}</h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
export default {
  name: "SocketIndicador",
  data() {
    return {
      valor_recibido: null,
      nombre: "HOST",
      estado: "",
      euipo: "",
      valor_cpu_free: null,
      descripcion_cpu_free: "CPU",
      estado_cpu_free: "",
      valor_mem_free: null,
      descripcion_mem_free: "MEMORIA",
      estado_mem_free: "",
    };
  },
  methods: {
    capturar_random() {
      //Tenemos que conectarnos y/o vincular nuestro cliente con el servidor//
      const socket = io(this.equipo);
      socket.on("dato-socket", (valor) => {
        this.valor_recibido = valor.dato.toFixed(2);
        this.nombre = valor.nombre;
        if (this.valor_recibido > 0.7) {
          this.estado = "Valor Excedido";
        } else {
          this.estado = "Valor Normal";
        }
      });
      socket.on("datos-cpu", (objeto) => {
        this.valor_cpu_free = objeto.data;
        this.descripcion_cpu_free = objeto.descripcion;
        if (this.valor_cpu_free < 20) {
          this.estado_cpu_free = "Valor Excedido";
        } else {
          this.estado_cpu_free = "Valor Normal";
        }
      });
      socket.on("datos-mem", (objeto) => {
        this.valor_mem_free = objeto.data;
        this.descripcion_mem_free = objeto.descripcion;
        if (this.valor_mem_free < 1024) {
          this.estado_mem_free = "Valor Excedido";
        } else {
          this.estado_mem_free = "Valor Normal";
        }
      });

    },
  },
  mounted() {
    //this.capturar_random();
  },
};

</script>