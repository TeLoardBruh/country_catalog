import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import { createPinia } from 'pinia';
import 'element-plus/dist/index.css';
import './style.css';
import App from './App.vue';

const pinia = createPinia();

createApp(App).use(ElementPlus).use(pinia).mount('#app');
