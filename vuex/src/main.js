import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootswatch/dist/materia/bootstrap.min.css';
import axios from 'axios';
import VueAxios from 'vue-axios';
import 'bootstrap-icons/font/bootstrap-icons.css';
createApp(App).use(router).use(VueAxios,axios).mount('#app')
