import { createApp } from 'vue';
import App from './App.vue';
import "./assets/scss/index.scss";
import { validate } from './auth';
import Router from './router';

// 驗證
await validate();


// Vue App
let app = createApp(App);
app.use(Router);
app.mount('#app');