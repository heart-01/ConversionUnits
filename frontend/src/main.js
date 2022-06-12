import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import NavigationsStore from '@/store/NavigationsStore.js'

import '@/styles/tailwind.css'

import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

const app = createApp(App)

app.use(NavigationsStore)
app.use(router)
app.use(VueSweetalert2)

app.mount('#app')