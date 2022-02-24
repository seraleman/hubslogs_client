import { createPinia } from 'pinia'
import { createApp } from 'vue'
import router from './router'
import App from './App.vue'

// Imports Quasar
import { Quasar, Loading, Notify } from 'quasar'
import quasarIconSet from 'quasar/icon-set/svg-line-awesome'
// Import icon libraries
import '@quasar/extras/roboto-font-latin-ext/roboto-font-latin-ext.css'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/line-awesome/line-awesome.css'
// Import Quasar css
import 'quasar/src/css/index.sass'

const myApp = createApp(App)

myApp.use(createPinia()).use(router)

myApp.use(Quasar, {
  plugins: { Loading, Notify },
  iconSet: quasarIconSet,
})

myApp.mount('#app')
