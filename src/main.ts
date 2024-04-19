import './assets/main.css'
// import './assets/bootstrap.min.css';
import './assets/tw.css'
import './assets/scss/global.scss'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import router from './router'
import { socket } from './common/socket'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(createPinia()).use(router).use(ElementPlus)

app.mount('#app')
socket.connect()
