<template>
<div class="container">
	 <div class="card" v-for="(view) in views" :key="view.id" style="width: 25rem;"> <!-- v-bind:key="view.id" v-bind:title="{{$t(view.label)}}" -->
  		<div class="card-body">
				<h5 class="card-title">{{$t(view.title)}}</h5>
				<h6 class="card-subtitle mb-2 text-muted">{{$t(view.subtitle)}}</h6>
				<p class="card-text">{{$t(view.text)}}</p>
    		<a href="/Clients" class="card-link">{{$t(view.action1)}}</a>
    		<a href="/Client" class="card-link">{{$t(view.action2)}}</a>
  		</div>
		</div>
</div>
</template>

<script>
export default {
	name: 'Home',
	data () {
		return {
			views: [
				{ id: "Clients", title: 'global.viewsHome.clients.title', subtitle: 'global.viewsHome.clients.subtitle', text: 'global.viewsHome.clients.text', action1: 'global.viewsHome.clients.action1', action2: 'global.viewsHome.clients.action2' },
				{ id: "Products", title: 'global.viewsHome.products.title', subtitle: 'global.viewsHome.products.subtitle', text: 'global.viewsHome.products.text', action1: 'global.viewsHome.products.action1', action2: 'global.viewsHome.products.action2' }
			],

			// client: {
			// 	uuid: undefined,
			// 	numSS: '',
			// 	cleSS: '',
			// 	lastName: '',
			// 	firstName: '',
			// 	birthDate: '',
			// 	active: false,
			// 	isEdit: false
			// }
		}
	},
	mounted () {
		this.getTrucs() //TODO: RTO - Faire mieux que ça
	},
	methods: {
		getTrucs () {
			console.log("Home: Get trucs")
			// Call API
			// axios.get('/api/clients').then(
			// 	result => {
			// 		console.log(result.data)
			// 		this.clients = result.data
			// 	},
			// 	error => {
			// 		console.error(error)
			// 	}
			// )
		},
	}
}
</script>

<style>

</style>