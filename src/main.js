import { createApp } from 'vue'
import 'tailwindcss/tailwind.css'

import App from './App.vue'
import Utils from './mixins/Utils.js'

const app = createApp(App)
app.mixin(Utils)
app.mount('#app')
