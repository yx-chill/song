import { createApp } from 'vue';
import Notifications from '@kyvg/vue3-notification';
import App from './App.vue';
import router from './router';
import store from './store';
import VeeValidatePlugin from './includes/validation';
import './assets/tailwind.css';
import './assets/main.css';
import ProgressBar from './includes/progress-bar';
import 'nprogress/nprogress.css';

ProgressBar(router);

const app = createApp(App);

app.use(store);
app.use(router);
app.use(VeeValidatePlugin);
app.use(Notifications);

app.mount('#app');
