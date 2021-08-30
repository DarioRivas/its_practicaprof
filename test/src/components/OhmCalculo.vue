<template>
  <div class="ohmcalculo">
    <div class="mb-3">
      <label class="form-label">Metodo de Calculo</label>
      <select v-model="select" class="form-select">
        <option value="-1">Seleccione una opcion</option>
        <option value="0">Intensidad</option>
        <option value="1">Tension</option>
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
    <button @click="calcular()" class="btn btn-success">Calcular</button>
    <div class="mb-3">
      <h3>{{ resultado }}</h3>
    </div>
  </div>
</template>


<script>
export default {
  name: "OhmCalculo",
  data() {
    return {
      dato1: null,
      dato2: null,
      select: null,
      lbl1: "",
      lbl2: "",
      resultado: null,
    };
  },
  methods: {
    validacion(to) {
      if (this.select == 0) {
        if (to == 0) {
          this.lbl1 = "Tension";
          this.lbl2 = "Resistencia";
        } else {
          this.resultado = this.dato1 / this.dato2;
        }
        //cambiamos labels
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

