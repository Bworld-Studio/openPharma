<template>

					<!-- <tr v-for="(line) in clients" v-bind:key="line.uuid" v-bind:title="line.numSS"> -->
						<!-- <td class="text-left">{{line.lastName}}</td> -->
						<!-- <td class="text-left">{{line.firstName}}</td> -->
						<!-- <td class="text-left">{{ $d(new Date(line.birthDate), "short") }}</td> -->
						<!-- <td class="text right"> -->
							<!-- <button class="btn btn-info" v-on:click="editClient(line)">{{$t('buttons.edit-button')}}</button> -->
							<!-- <button class="btn btn-danger" v-on:click="deleteClient(line.uuid)">{{$t('buttons.delete-button')}}</button> -->
						<!-- </td> -->


<div class="container">
	 <div class="card" v-for="(view) in views" :key="view.id"> <!-- v-bind:key="view.id" v-bind:title="{{$t(view.label)}}" -->
  		<div class="card-body">
    		{{$t(view.label)}}
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
				{ id: "Clients", label: 'global.views.clients', text: 'global.views.clients' },
				{ id: "Products", label: 'global.views.products', text: 'global.views.products' }
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