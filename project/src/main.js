import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import { Select, Collapse } from 'ant-design-vue'

import './assets/styles/main.css'
import 'ant-design-vue/dist/antd.css';

const app = createApp(App)

app.use(router).use(store).use(Select).use(Collapse);

app.mount('#app')
