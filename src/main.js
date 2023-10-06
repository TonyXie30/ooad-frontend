import {createApp} from 'vue'
import App from './App.vue'
import router from "@/router";
import axios from "axios";

const app = createApp(App);

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8443/api'
});
app.config.globalProperties.$axios = axiosInstance;
// 使用路由插件
app.use(router);
app.mount('#app');


