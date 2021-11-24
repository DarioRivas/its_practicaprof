<template>
     <div class="card">
        <div class="card-header text-center">
          <h3>
            <b>{{ info }}</b>
          </h3>
        </div>
        <div class="card-body">
          <h3> BODY </h3>
        </div>
        <div class="card-footer">
          <h4> FOOTER </h4>
        </div>
      </div>
</template>
<script>
import si from "systeminformation";

export default {
    name: "SysInfo",
    data(){
        return{
            temperatura,

        };
    },
    methods:{
        obtener_info(){
            const info = si.cpuTemperature(dataSi)
        }
    }
}
</script>
