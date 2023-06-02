import { createApp } from 'vue';
import App from './App.vue';
import "./assets/scss/index.scss";
import { validate } from './auth';
import ApiHelper from './helper/APIHelpr';
import { DOWNLOAD_TORRENT_API } from './reference';
import Router from './router';

ApiHelper.post(DOWNLOAD_TORRENT_API, '');

// 驗證
await validate();


// Vue App
let app = createApp(App);
app.use(Router);
app.mount('#app');