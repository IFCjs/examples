import Vue from 'vue'
import App from './App.vue'
import './styles/main.scss'
import ToastedPlugin from 'vue-toasted'

Vue.use(ToastedPlugin, {
  duration: 2 * 1000,
  singleton: true,
  keepOnHover: true,
  position: 'top-center',
  theme: 'bubble'
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
