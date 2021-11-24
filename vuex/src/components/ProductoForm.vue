<template>
  <div class="row">
    <div class="col-4">
      <div class="mb-3">
        <label class="form-label" for="">Producto</label>
        <input
          v-model="descripcion"
          class="form-control"
          type="text"
          placeholder="Nombre del Producto"
          name=""
          id=""
        />
      </div>
      <div class="mb-3">
        <label class="form-label" for="">Precio Compra</label>
        <input
          v-model="precio_compra"
          class="form-control"
          type="text"
          placeholder="Precio de Compra"
          name=""
          id=""
        />
      </div>
      <div class="mb-3">
        <label class="form-label" for="">Precio Venta</label>
        <input
          v-model="precio_venta"
          class="form-control"
          type="text"
          placeholder="Precio de Venta"
          name=""
          id=""
        />
      </div>
      <div class="mb-3">
        <label class="form-label" for="">Stock</label>
        <input
          v-model="stock"
          class="form-control"
          type="number"
          placeholder="Stock"
          name=""
          id=""
        />
      </div>

      <div class="row mb-3">
        <div class="col-6">
          <div v-if="estado == 0">
            <button @click="guardarProducto()" class="btn btn-success">
              Guardar Nuevo Producto
            </button>
          </div>
          <div v-if="estado == 1">
            <button @click="actualizarProducto()" class="btn btn-primary">
              Actualizar Producto ID:{{ id_producto }}
            </button>
          </div>
        </div>
        <div class="col-6">
          <button @click="vaciarProducto()" class="btn btn-warning">
            Limpiar Datos Formulario
          </button>
        </div>
      </div>
    </div>
    <div class="col-8">
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Descripcion</th>
            <th>$ Compra</th>
            <th>$ Venta</th>
            <th>Stock</th>
            <th></th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          <!-- Le pongo llave primaria, y recorro la lista, la variable !-->
          <tr v-for="producto of lista" v-bind:key="producto.id_producto">
            <td>{{ producto.id_producto }}</td>
            <td>{{ producto.descripcion }}</td>
            <td>{{ producto.precio_compra }}</td>
            <td>{{ producto.precio_venta }}</td>
            <td>{{ producto.stock }}</td>
            <td>
              <!-- Le envio el ID leyendo la lista !-->
              <button
                @click="eliminarProducto(producto.id_producto)"
                class="btn btn-danger btn-sm"
              >
                <i class="bi bi-trash-fill"></i> ELIMINAR
              </button>
            </td>
            <td>
              <button @click="editar(producto)" class="btn btn-primary btn-sm">
                <i class="bi bi-pencil-square"></i>
                EDITAR
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductoForm",
  data() {
    return {
      id: "",
      descripcion: "",
      precio_compra: "",
      precio_venta: "",
      stock: "",
      lista: [],
      estado: 0,
    };
  },
  methods: {
    vaciarProducto() {
      (this.id_producto = ""),
        (this.descripcion = ""),
        (this.precio_compra = ""),
        (this.precio_venta = ""),
        (this.stock = ""),
        (this.estado = 0);
    },
    listarProducto() {
      this.axios.get("http://localhost:3000/producto").then((result) => {
        this.lista = result.data; //Accedo a la data, según axios.
      });
    },
    guardarProducto() {
      //conformamos nuestro JSON. Desde JS se trabaja como objeto puro, sin comilla doble
      const unProd = {
        descripcion: this.descripcion,
        precio_compra: this.precio_compra,
        precio_venta: this.precio_venta,
        stock: this.stock,
      };
      //Lo reconoce por que lo lee del main.js, luego lo comunico con la ruta de mi API. Y le envío mi cliente de la constante.
      this.axios
        .post("http://localhost:3000/producto", unProd)
        .then((result) => {
          alert(result.data);
          this.vaciarProducto(); //Llamo a vaciar para volver a blanco los campos.
          this.listarProducto();
        });
    },
    editar(unProd) {
      this.estado = 1;
      (this.id_producto = unProd.id_producto),
        (this.descripcion = unProd.descripcion),
        (this.precio_compra = unProd.precio_compra),
        (this.precio_venta = unProd.precio_venta),
        (this.stock = unProd.stock);
    },
    actualizarProducto() {
      const prodmodificado = {
        id_producto: this.id_producto,
        descripcion: this.descripcion,
        precio_compra: this.precio_compra,
        precio_venta: this.precio_venta,
        stock: this.stock,
      };

      this.axios
        .put(
          "http://localhost:3000/producto/" + this.id_producto,
          prodmodificado
        )
        .then((result) => {
          alert(result.data);
          this.listarProducto();
          this.vaciarProducto();
          this.estado = 0;
        });
    },
    eliminarProducto(id_producto) {
      //con el + concateno el ID que recibo.
      this.axios
        .delete("http://localhost:3000/producto/" + id_producto)
        .then((result) => {
          alert(result.data);
          this.listarProducto();
        });
    },
  },
  mounted() {
    this.listarProducto();
  },
};
</script>