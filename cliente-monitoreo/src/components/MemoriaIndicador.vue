<template>
  <div class="card bg-fondo">
    <div class="card-header text-center p-3">
      <div class="row">
        <div class="col">
          <div class="text-start"><h3>MEMORIA</h3></div>
        </div>
        <div class="col">
          <div class="text-end"><i class="h3 bi bi-stack"></i></div>
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
                <p class="card-text">Estado de Memoria del equipo</p>
                <a href="#/cliente" class="btn btn-primary">Seleccionar otro equipo</a>
              </div>
              <div class="card-footer text-muted">Refresh 1000ms</div>
            </div>
          </div>
          <div class="col-9 back_imagen img-fluid"></div>
        </div>
        <div class="row mb-5">
          <div class="col-3">
            <div class="card mt-5">
              <div class="card-header text-center">
                <h5>{{ memTotalDescripcion }}</h5>
              </div>
              <div class="card-body text-center">
                <h4>{{ memTotalValor }}</h4>
              </div>
            </div>
          </div>
          <div class="col-3">
            <div class="card mt-5">
              <div class="card-header text-center">
                <h5>{{ memFreeDescripcion }}</h5>
              </div>
              <div class="card-body text-center">
                <h4>{{ memFreeValor }}</h4>
              </div>
            </div>
          </div>
          <div class="col-3">
            <div class="card mt-5">
              <div class="card-header text-center">
                <h5>{{ memUsedDescripcion }}</h5>
              </div>
              <div class="card-body text-center">
                <h4>{{ memUsedValor }}</h4>
              </div>
            </div>
          </div>
          <div class="col-3">
            <div class="card mt-5">
              <div class="card-header text-center">
                <h5>{{ memFreePDescripcion }}</h5>
              </div>
              <div class="card-body text-center">
                <h4>{{ memFreePValor }}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
     <div id="graph" class="mt-3"></div>
  </div>
</template>
<style>
.back_imagen {
  background-image: url(../assets/ram.png);
}
.bg-fondo {
  background-color: #111111;
}
</style>
<script>
import io from "socket.io-client";
import Highcharts from "highcharts";
import Exporting from "highcharts/modules/exporting";
Exporting(Highcharts);
export default {
  name: "Memoria",
  data() {
    return {
      direccion_ip: "",
      clienteIp: "",
      clienteRazon: "",
      memFreeValor: "",
      memFreeDescripcion: "",
      memFreePValor: "",
      memFreePDescripcion: "",
      memUsedValor: "",
      memUsedDescripcion: "",
      memTotalValor: "",
      memTotalDescripcion: "",
    };
  },
  methods: {
    obtenerDatos() {
      this.clienteIp =
        //"http://" + localStorage.getItem("localClienteIp") + ":3000";
        "http://" + localStorage.getItem("localClienteIp");
      this.direccion_ip = localStorage.getItem("localClienteIp");
      this.clienteRazon = localStorage.getItem("localClienteRazon");
    },
    addIndicadores() {
      const socket = io(this.clienteIp);
      socket.on("mem-info", (objeto) => {
        this.memFreeValor = objeto.dataLibre;
        this.memFreeDescripcion = objeto.descLibre;
        this.memUsedValor = objeto.dataUtil;
        this.memUsedDescripcion = objeto.descUtil;
        this.memTotalValor = objeto.dataTotal;
        this.memTotalDescripcion = objeto.descTotal;
        this.memFreePValor = objeto.dataPorc;
        this.memFreePDescripcion = objeto.descPorc;
      });
    },
     iniciar_grafico() {
      const socket = io(this.clienteIp);
      Highcharts.chart("graph", {
        chart: {
          type: "line",
          animation: Highcharts.svg,
          marginRight: 10,
          events: {
            load: function () {
              var series = this.series[0];
              socket.on("mem-graph", function (num) {
                var x = new Date().getTime();
                console.log(num.data);
                series.addPoint([x, num.data], true, true);
              });
            },
          },
        },
        time: {
          useUTC: false,
        },
        title: {
          text: "Uso de Memoria",
        },
        xAxis: {
          type: "datetime",
          tickPixelInterval: 150,
        },
        yAxis: {
          title: {
            text: "Uso RAM porcentual (%)",
          },
          plotLines: [
            {
              value: 0,
              width: 100,
              color: "#808080",
            },
          ],
        },
        tooltip: {
          headerFormat: "<b>{series.name}</b><br/>",
          pointFormat: "{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}%",
        },
        legend: {
          enabled: false,
        },
        exporting: {
          enabled: false,
        },
        series: [
          {
            name: "% de Uso el",
            data: (function () {
              var data = [],
                time = new Date().getTime(),
                i;
              for (i = -19; i <= 0; i += 1) {
                var y = null;
                socket.on("mem-graph", function (num) {
                  y = num.data;
                });
                data.push({
                  x: time + i * 1000,
                  y: y,
                });
              }
              return data;
            })(),
          },
        ],
      });
    },
    aplicar_tema() {
      Highcharts.theme = {
        colors: [
          "#2b908f",
          "#90ee7e",
          "#f45b5b",
          "#7798BF",
          "#aaeeee",
          "#ff0066",
          "#eeaaee",
          "#55BF3B",
          "#DF5353",
          "#7798BF",
          "#aaeeee",
        ],
        chart: {
          backgroundColor: {
            linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
            stops: [
              [0, "#2a2a2b"],
              [1, "#3e3e40"],
            ],
          },
          style: {
            fontFamily: "'Unica One', sans-serif",
          },
          plotBorderColor: "#606063",
        },
        title: {
          style: {
            color: "#E0E0E3",
            textTransform: "uppercase",
            fontSize: "20px",
          },
        },
        subtitle: {
          style: {
            color: "#E0E0E3",
            textTransform: "uppercase",
          },
        },
        xAxis: {
          gridLineColor: "#707073",
          labels: {
            style: {
              color: "#E0E0E3",
            },
          },
          lineColor: "#707073",
          minorGridLineColor: "#505053",
          tickColor: "#707073",
          title: {
            style: {
              color: "#A0A0A3",
            },
          },
        },
        yAxis: {
          gridLineColor: "#707073",
          labels: {
            style: {
              color: "#E0E0E3",
            },
          },
          lineColor: "#707073",
          minorGridLineColor: "#505053",
          tickColor: "#707073",
          tickWidth: 1,
          title: {
            style: {
              color: "#A0A0A3",
            },
          },
        },
        tooltip: {
          backgroundColor: "rgba(0, 0, 0, 0.85)",
          style: {
            color: "#F0F0F0",
          },
        },
        plotOptions: {
          series: {
            dataLabels: {
              color: "#F0F0F3",
              style: {
                fontSize: "13px",
              },
            },
            marker: {
              lineColor: "#333",
            },
          },
          boxplot: {
            fillColor: "#505053",
          },
          candlestick: {
            lineColor: "white",
          },
          errorbar: {
            color: "white",
          },
        },
        legend: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          itemStyle: {
            color: "#E0E0E3",
          },
          itemHoverStyle: {
            color: "#FFF",
          },
          itemHiddenStyle: {
            color: "#606063",
          },
          title: {
            style: {
              color: "#C0C0C0",
            },
          },
        },
        credits: {
          style: {
            color: "#666",
          },
        },
        labels: {
          style: {
            color: "#707073",
          },
        },
        drilldown: {
          activeAxisLabelStyle: {
            color: "#F0F0F3",
          },
          activeDataLabelStyle: {
            color: "#F0F0F3",
          },
        },
        navigation: {
          buttonOptions: {
            symbolStroke: "#DDDDDD",
            theme: {
              fill: "#505053",
            },
          },
        },
        // scroll charts
        rangeSelector: {
          buttonTheme: {
            fill: "#505053",
            stroke: "#000000",
            style: {
              color: "#CCC",
            },
            states: {
              hover: {
                fill: "#707073",
                stroke: "#000000",
                style: {
                  color: "white",
                },
              },
              select: {
                fill: "#000003",
                stroke: "#000000",
                style: {
                  color: "white",
                },
              },
            },
          },
          inputBoxBorderColor: "#505053",
          inputStyle: {
            backgroundColor: "#333",
            color: "silver",
          },
          labelStyle: {
            color: "silver",
          },
        },
        navigator: {
          handles: {
            backgroundColor: "#666",
            borderColor: "#AAA",
          },
          outlineColor: "#CCC",
          maskFill: "rgba(255,255,255,0.1)",
          series: {
            color: "#7798BF",
            lineColor: "#A6C7ED",
          },
          xAxis: {
            gridLineColor: "#505053",
          },
        },
        scrollbar: {
          barBackgroundColor: "#808083",
          barBorderColor: "#808083",
          buttonArrowColor: "#CCC",
          buttonBackgroundColor: "#606063",
          buttonBorderColor: "#606063",
          rifleColor: "#FFF",
          trackBackgroundColor: "#404043",
          trackBorderColor: "#404043",
        },
      };
      // Apply the theme
      Highcharts.setOptions(Highcharts.theme);
    },
  },
  mounted() {
    this.obtenerDatos();
    this.addIndicadores();
        this.aplicar_tema();
    this.iniciar_grafico();
  },
};
</script>




