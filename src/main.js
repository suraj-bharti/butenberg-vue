import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from "axios";

import '@/assets/scss/app.scss'

const headers = { 
	'Content-Type': 'application/json'
  }

axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT
axios.defaults.headers = headers
window.axios = axios

createApp(App)
	.use(router)
	.mount('#app')
