import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import { Select, Collapse, Input } from 'ant-design-vue'

import './assets/styles/main.scss'
import 'ant-design-vue/dist/antd.css';

const app = createApp(App)

app.use(router).use(store).use(Select).use(Collapse).use(Input);

app.mount('#app')
