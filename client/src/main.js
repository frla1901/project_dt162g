/* Projekt - DT162G, JavaScript-baserad webbutveckling 
    Skapad av Frida Lazzari 2020*/

import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
    render: h => h(App),

}).$mount('#app')