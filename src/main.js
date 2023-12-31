// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'
import store from './store/store'

import axios from 'axios';

// Configurar la base URL de Axios
axios.defaults.baseURL = 'http://localhost:4040';

const app = createApp(App)
app.use(store)
registerPlugins(app)
app.mount('#app')
