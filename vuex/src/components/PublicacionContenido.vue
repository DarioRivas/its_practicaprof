<template>
  <div class="row">
    <div class="col-4 border rounded p-5">
      <div class="mb-3">
        <label class="form-label">Titulo</label>
        <input v-model="titulo" type="text" class="form-control" />
      </div>
      <div class="mb-3">
        <label class="form-label">Noticia</label>
        <textarea v-model="cuerpo" class="form-control" rows="5"></textarea>
      </div>

      <button @click="mostrar()" class="btn btn-primary">Mostrar</button>
    </div>

    <div class="col-8">
      <ul class="list-group">
        <li
          v-for="p of publicaciones"
          v-bind:key="p.id"
          class="list-group-item active"
        >
          {{ p.title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "PublicacionContenido",
  data() {
    return {
      cuerpo: "",
      titulo: "",
      publicaciones: [],
    };
  },
  methods: {
    mostrar() {
      console.log(`
                NOTICIA DE HOY
                ${this.titulo}

                Desarrollo:
                ${this.cuerpo}
           `);
      this.listarPublicaciones();
    },
    async listarPublicaciones() {
      const lista = await fetch("http://jsonplaceholder.typicode.com/posts");
      this.publicaciones = await lista.json();
    },
  },
};
</script>