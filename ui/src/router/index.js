import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Clients from '@/components/Clients'
import Client from '@/components/Client'
import Products from '@/components/Products'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{ path: '/', name: 'Home', component: Home },
		{ path: '/Clients', name: 'Clients', component: Clients },
		{ path: '/Client/:uuid', name: 'Client', component: Client, props: { uuid: '' } },
		{ path: '/Products', name: 'Products', component: Products }
	]
})