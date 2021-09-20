<template>
  <div class="mb-3">
    <label class="form-label" for="">Nombre</label>
    <input
    v-model="nombre"
      class="form-control"
      type="text"
      placeholder="Nombre"
      name=""
      id=""
    />
  </div>
  <div class="mb-3">
    <label class="form-label" for="">Apellido</label>
    <input}
    v-model="apellido"
      class="form-control"
      type="text"
      placeholder="Apellido"
      name=""
      id=""
    />
  </div>
  <div class="mb-3">
    <label class="form-label" for="">DNI</label>
    <input
    v-model="dni" class="form-control" type="number" placeholder="DNI" name="" id="" />
  </div>
  <div class="mb-3">
    <button class="btn btn-success">GUARDAR CLIENTE</button>
  </div>
</template>

<script>
export default {
  name: "ClienteForm",
  data(){
      return{
          nombre:'',
          apellido:'',
          dni:null
      }
  },
  methods:{
      guardarCliente(){
          
      }
  }
}
</script>