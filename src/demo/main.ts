import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import DialogPlugin from '../plugin';

createApp(App).use(DialogPlugin).mount('#app');
