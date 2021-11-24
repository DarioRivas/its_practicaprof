<template>
  <div class="bg-image imagen-fondo">
    <div class="sidebar-container">
      <div class="sidebar-logo">MENU</div>
      <ul class="sidebar-navigation text-center">
        <li class="header">Equipo</li>
        <li>
          <router-link class="nav-link" to="/"
            ><i class="h3 bi bi-house-door-fill"></i>
          </router-link>
        </li>
        <li>
          <router-link class="nav-link" to="/cliente"
            ><i class="h3 bi bi-person-workspace"></i><br />cliente
          </router-link>
        </li>
        <li class="header">Monitores</li>
        <li>
          <router-link class="nav-link" to="/cpu"
            ><i class="h3 bi bi-bar-chart-fill"></i><br />cpu
          </router-link>
        </li>
        <li>
          <router-link class="nav-link" to="/drive"
            ><i class="h3 bi bi-hdd"></i><br />drive
          </router-link>
        </li>
        <li>
          <router-link class="nav-link" to="/memoria"
            ><i class="h3 bi bi-stack"></i><br />memoria
          </router-link>
        </li>
        <li>
          <router-link class="nav-link" to="/netstat"
            ><i class="h3 bi bi-diagram-3-fill"></i><br />redes
          </router-link>
        </li>
        <li>
          <router-link class="nav-link" to="/os"
            ><i class="h3 bi bi-chat-square-dots-fill"></i><br />os
          </router-link>
        </li>
      </ul>
    </div>

    <div class="content-container">
      <div class="container-fluid">
        <div class="container mt-3">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "APP",
  data() {
    return {
      estado: 0,
    };
  },
  methods: {
    loadEstado() {
      this.estado = localStorage.getItem("estado");
    },
  },
  mounted() {
    this.loadEstado();
  },
};
</script>

<style>
.footer {
  margin-top: 20px;
  height: 20px;
}
.imagen-fondo {
  height: 100vh;
  background-image: url("../src/assets/back4.jpg");
  /*background: #3c3a39;*/
  background: -webkit-linear-gradient(
    to right,
    rgba(60, 58, 57, 0.5),
    rgba(20, 20, 20, 0.5)
  );
  background: linear-gradient(
    to right,
    rgba(60, 58, 57, 0.5),
    rgba(20, 20, 20, 0.5)
  );
  height: 100vh;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.sidebar-container {
  position: fixed;
  width: 120px;
  height: 100%;
  left: 0;
  overflow-x: hidden;
  overflow-y: auto;
  background: #1a1a1a;
  color: #fff;
}

.content-container {
  padding-top: 20px;
}

.sidebar-logo {
  padding: 10px 15px 10px 30px;
  font-size: 20px;
  background-color: #2574a9;
}

.sidebar-navigation {
  padding: 0;
  margin: 0;
  list-style-type: none;
  position: relative;
}

.sidebar-navigation li {
  background-color: transparent;
  position: relative;
  display: inline-block;
  width: 100%;
  line-height: 20px;
}

.sidebar-navigation li a {
  padding: 10px 15px 10px 30px;
  display: block;
  color: #fff;
}

.sidebar-navigation li .fa {
  margin-right: 10px;
}

.sidebar-navigation li a:active,
.sidebar-navigation li a:hover,
.sidebar-navigation li a:focus {
  text-decoration: none;
  outline: none;
}

.sidebar-navigation li::before {
  background-color: #2574a9;
  position: absolute;
  content: "";
  height: 100%;
  left: 0;
  top: 0;
  -webkit-transition: width 0.2s ease-in;
  transition: width 0.2s ease-in;
  width: 3px;
  z-index: -1;
}

.sidebar-navigation li:hover::before {
  width: 100%;
}

.sidebar-navigation .header {
  font-size: 12px;
  text-transform: uppercase;
  background-color: #151515;
  padding: 10px 15px 10px 30px;
}

.sidebar-navigation .header::before {
  background-color: transparent;
}

.content-container {
  padding-left: 120px;
}
</style>

     