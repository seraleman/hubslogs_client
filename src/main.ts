import { createPinia } from 'pinia'
import router from './router'
import { createApp } from 'vue'
import { Quasar, Loading } from 'quasar'
import quasarIconSet from 'quasar/icon-set/svg-line-awesome'

// Import icon libraries
import '@quasar/extras/roboto-font-latin-ext/roboto-font-latin-ext.css'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/line-awesome/line-awesome.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

// Assumes your root component is App.vue
// and placed in same folder as main.js
import App from './App.vue'

const myApp = createApp(App)

myApp.use(createPinia()).use(router)

myApp.use(Quasar, {
  plugins: { Loading }, // import Quasar plugins and add here
  iconSet: quasarIconSet,
  /*
  config: {
    brand: {
      // primary: '#e46262',
      // ... or all other brand colors
    },
    notify: {...}, // default set of options for Notify Quasar plugin
    loading: {...}, // default set of options for Loading Quasar plugin
    loadingBar: { ... }, // settings for LoadingBar Quasar plugin
    // ..and many more (check Installation card on each Quasar component/directive/plugin)
  }
  */
})

// Assumes you have a <div id="app"></div> in your index.html
myApp.mount('#app')

// createApp(App).use(createPinia()).use(router).mount('#app')
