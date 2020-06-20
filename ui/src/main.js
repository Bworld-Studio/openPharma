// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import i18n from './i18n'
require('../node_modules/bootstrap/dist/css/bootstrap.css')

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: { App },
	template: '<App/>',
	i18n,
	render: h => h(App)
}).$mount('#app')

Vue.use(i18n)