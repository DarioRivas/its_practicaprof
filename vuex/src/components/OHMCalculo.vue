<template>
  <div class="col-4 border rounded p-5">
    <div class="mb-3">
      <label class="form-label"><b>METODO DE CALCULO</b></label>
      <select @change="modificarLabels()" v-model="select" class="form-select">
        <option value="-1" disabled selected>Seleccione un método:</option>
        <option value="0">Intensidad</option>
        <option value="1">Tensión</option>
        <option value="2">Potencia</option>
      </select>
    </div>

    <div class="mb-3">
      <label class="form-label">{{ lbl1 }}</label>
      <input v-model="dato1" class="form-control" type="number" />
    </div>

    <div class="mb-3">
      <label class="form-label">{{ lbl2 }}</label>
      <input v-model="dato2" class="form-control" type="number" />
    </div>
    <div class="row">
      <div class="col-4">
        <button @click="calcular()" class="btn btn-success float-left">
          Calcular
        </button>
      </div>
      <div class="col-8">
        <h3 class="text-center">{{ resultado }}</h3>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "OHMCalculo",
  data() {
    return {
      dato1: null,
      dato2: null,
      select: -1,
      lbl1: " ",
      lbl2: " ",
      resultado: null,
    };
  },
  methods: {
    validacion(to) {
      if (this.select == 0) {
        to == 0
          ? ((this.lbl1 = "Tensión"), (this.lbl2 = "Resistencia"))
          : (this.resultado = this.dato1 / this.dato2);
      } else {
        if (this.select == 1) {
          to == 0
            ? ((this.lbl1 = "Intensidad"), (this.lbl2 = "Resistencia"))
            : (this.resultado = this.dato1 * this.dato2);
        } else {
          to == 0
            ? ((this.lbl1 = "Resistencia"), (this.lbl2 = "Intensidad"))
            : (this.resultado = this.dato1 * Math.pow(this.dato2, 2));
        }
      }
    },
    modificarLabels() {
      this.validacion(0);
    },

    calcular() {
      this.validacion(1);
    },
  },
};
</script>