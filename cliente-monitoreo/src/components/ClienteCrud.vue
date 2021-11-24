<template>
    <div class="card">
      <div class="card-header text-center bg-fondo p-3">
        <h5>CLIENTE</h5>
      </div>
      <div class="card-body">
        <div class="row mb-3">
          <form id="clienteCargar">
            <div class="row">
              <div class="col-6">
                <div class="mb-3">
                  <label class="form-label" for="">Razon Social</label>
                  <input
                    v-model="razon_social"
                    class="form-control"
                    type="text"
                    placeholder="Nombre del Cliente"
                    name="razon_social"
                    id="razon_social"
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label" for="">Email</label>
                  <input
                    v-model="correo_electronico"
                    class="form-control"
                    type="text"
                    placeholder="Correo Electronico"
                    name="correo_electronico"
                    id="correo_electronico"
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label" for="">Localidad</label>
                  <input
                    v-model="localidad"
                    class="form-control"
                    type="text"
                    placeholder="Localidad"
                    name="localidad"
                    id="localidad"
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label" for="">IP:Puerto</label>
                  <input
                    v-model="direccion_ip"
                    class="form-control"
                    type="text"
                    placeholder="Direccion de IP"
                    name="direccion_ip"
                    id="direccion_ip"
                  />
                </div>
              </div>
              <div class="col-6">
                <div class="mb-3">
                  <label class="form-label" for="">Telefono</label>
                  <input
                    v-model="telefono_contacto"
                    class="form-control"
                    type="text"
                    placeholder="Numero de Telefono"
                    name="telefono_contacto"
                    id="telefono_contacto"
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label" for="">Direccion</label>
                  <input
                    v-model="direccion"
                    class="form-control"
                    type="text"
                    placeholder="Direccion"
                    name="direccion"
                    id="direccion"
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label" for=""
                    >Descripcion del Equipo</label
                  >
                  <input
                    v-model="equipo_descripcion"
                    class="form-control"
                    type="text"
                    placeholder="Descripcion del equipo"
                    name="equipo_descripcion"
                    id="equipo_descripcion"
                  />
                </div>
                <div class="mb-3">
                  <label class="form-label" for="">Sistema Operativo</label>
                  <input
                    v-model="sistema_operativo"
                    class="form-control"
                    type="text"
                    placeholder="Sistema Operativo"
                    name="sistema_operativo"
                    id="sistema_operativo"
                  />
                </div>
                <input
                  type="hidden"
                  v-model="idcliente"
                  class="form-control"
                  name="idcliente"
                  id="idcliente"
                />
              </div>
            </div>
            <div class="d-flex flex-row-reverse">
              <div>
                <button
                  @click="vaciarCliente()"
                  class="btn btn-danger btn-lg"
                  style="margin-left: 20px"
                >
                  Vaciar Datos
                </button>
              </div>
              <div v-if="estado == 0">
                <button
                  @click="guardarCliente()"
                  class="btn btn-lg btn-success"
                >
                  <i class="bi bi-person-plus"></i> Guardar Cliente
                </button>
              </div>
              <div v-if="estado == 1">
                <button
                  @click="actualizarCliente()"
                  class="btn btn-lg btn-primary"
                >
                  Actualizar ID: {{ idcliente }}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="card mt-3">
      <div class="card-header text-center p-3 bg-fondo">
        <h5>LISTA</h5>
      </div>
      <div class="card-body m-0 p-0">
        <div class="row m-0 p-0">
          <table
            class="table table-borderless table-striped table-hover"
            id="tablaClientes"
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Razon Social</th>
                <th>email</th>
                <th>Descripcion</th>
                <th>IP</th>
                <th>Sistema Operativo</th>
                <th>Seleccionar</th>
                <th><i class="bi bi-trash"></i></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cliente of lista" v-bind:key="cliente.idcliente">
                <td>{{ cliente.idcliente }}</td>
                <td>{{ cliente.razon_social }}</td>
                <td>{{ cliente.correo_electronico }}</td>
                <td>{{ cliente.equipo_descripcion }}</td>
                <td>{{ cliente.direccion_ip }}</td>
                <td>{{ cliente.sistema_operativo }}</td>
                <td>
                  <button
                    @click="seleccionarCliente(cliente)"
                    class="btn btn-success btn-sm mr-3"
                  >
                    <i class="bi bi-person-check"></i> Seleccionar
                  </button>
                </td>
                <td>
                  <button
                    @click="eliminarCliente(cliente.idcliente)"
                    class="btn btn-danger btn-sm ml-3"
                  >
                    <i class="bi bi-person-dash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  name: "ClienteCrud",
  data() {
    return {
      lista: [],
      idcliente: null,
      razon_social: "",
      telefono_contacto: "",
      correo_electronico: "",
      direccion: "",
      localidad: "",
      equipo_descripcion: "",
      direccion_ip: "",
      sistema_operativo: "",
      estado: 0,
    };
  },
  methods: {
    listarClientes() {
      this.axios.get("http://localhost:3000/cliente").then((result) => {
        this.lista = result.data;
      });
    },
    guardarIP(unCliente) {
      localStorage.setItem("cliente", unCliente);
    },
    seleccionarCliente(unCliente) {
      this.estado = 1;
      (this.razon_social = unCliente.razon_social),
        (this.telefono_contacto = unCliente.telefono_contacto),
        (this.correo_electronico = unCliente.correo_electronico),
        (this.direccion = unCliente.direccion),
        (this.localidad = unCliente.localidad),
        (this.equipo_descripcion = unCliente.equipo_descripcion),
        (this.direccion_ip = unCliente.direccion_ip),
        (this.sistema_operativo = unCliente.sistema_operativo),
        (this.idcliente = unCliente.idcliente);
      localStorage.setItem("localClienteIp", this.direccion_ip);
      localStorage.setItem("localClienteRazon", this.razon_social);
    },
    guardarCliente() {
      const cli = {
        razon_social: this.razon_social,
        telefono_contacto: this.telefono_contacto,
        correo_electronico: this.correo_electronico,
        direccion: this.direccion,
        localidad: this.localidad,
        equipo_descripcion: this.equipo_descripcion,
        direccion_ip: this.direccion_ip,
        sistema_operativo: this.sistema_operativo,
      };
      this.axios.post("http://localhost:3000/cliente", cli).then((result) => {
        alert(result.data);
        this.vaciarCliente();
        this.listarClientes();
      });
    },
    eliminarCliente(idcliente) {
      this.axios
        .delete("http://localhost:3000/cliente/" + idcliente)
        .then((result) => {
          alert(result.data);
          this.listarClientes();
        });
    },
    vaciarCliente() {
      (this.idcliente = ""),
        (this.razon_social = ""),
        (this.telefono_contacto = ""),
        (this.correo_electronico = ""),
        (this.direccion = ""),
        (this.localidad = ""),
        (this.equipo_descripcion = ""),
        (this.direccion_ip = ""),
        (this.sistema_operativo = ""),
        (this.estado = 0);
    },
    actualizarCliente() {
      const clientemodificado = {
        idcliente: this.idcliente,
        razon_social: this.razon_social,
        telefono_contacto: this.telefono_contacto,
        correo_electronico: this.correo_electronico,
        direccion: this.direccion,
        localidad: this.localidad,
        equipo_descripcion: this.equipo_descripcion,
        direccion_ip: this.direccion_ip,
        sistema_operativo: this.sistema_operativo,
      };
      this.axios
        .put(
          "http://localhost:3000/cliente/" + this.idcliente,
          clientemodificado
        )
        .then((result) => {
          alert(result.data);
          this.listarClientes();
        });
    },
  },
  mounted() {
    this.listarClientes();
  },
};
</script>
<style>
.bg-fondo {
  background-color: #161616;
}
</style>