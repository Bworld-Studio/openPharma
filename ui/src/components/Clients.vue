<template>
	<div id="clients-list" class="container-fluid">
		<div>
			<div class="">
				<h1 class="text-center">Client List</h1>
				<table class="table">
					<tr v-for="(line) in clients" v-bind:key="line.uuid" v-bind:title="line.numSS">
						<td class="text-left">{{line.lastName}}</td>
						<td class="text-left">{{line.firstName}}</td>
						<td class="text-left">{{ $d(new Date(line.birthDate), "short") }}</td>
						<td class="text right">
							<button class="btn btn-info" v-on:click="editClient(line)">{{$t('buttons.edit-button')}}</button>
							<!-- <button class="btn btn-danger" v-on:click="deleteClient(line.uuid)">{{$t('buttons.delete-button')}}</button> -->
						</td>
					</tr>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
const axios = require('axios')
// import axios from 'axios'

export default {
	name: 'Clients',
	data () {
		return {
			clients: []
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
		this.getClients()
	},
	methods: {
		getClients () {
			// Call API
			axios.get('/api/clients').then(
				result => {
					console.log(result.data)
					this.clients = result.data
				},
				error => {
					console.error(error)
				}
			)
		},
		// addClient () {
		// 	console.log(this.client)
		// 	this.client.active = true

		// 	// Call API
		// 	axios
		// 		.post('api/clients', this.client)
		// 		.then(res => {
		// 			this.client = {}
		// 			this.client.isEdit = false
		// 			this.getClients()
		// 		})
		// 		.catch(err => {
		// 			console.log(err)
		// 		})
		// },
		editClient (pClient) {
			this.$router.push({ name: 'Client', params: { uuid: pClient.uuid } })
			// this.client = pClient
			// this.client.lastName = this.client.lastName.toUpperCase()
			// this.client.isEdit = true
		}
		// updateClient () {

		// 	// Call API
		// 	axios
		// 		.put(`/api/clients/${this.client.uuid}`, this.client)
		// 		.then(res => {
		// 			this.client = {}
		// 			this.client.isEdit = false
		// 			this.getTasks()
		// 			console.log(res)
		// 		})
		// 		.catch(err => {
		// 			console.log(err)
		// 		})
		// },
		// deleteClient (uuid) {

		// 	// Call API
		// 	axios
		// 		.delete(`/api/clients/${uuid}`)
		// 		.then(res => {
		// 			this.client = {}
		// 			this.getTasks()
		// 			console.log(res)
		// 		})
		// 		.catch(err => {
		// 			console.log(err)
		// 		})
		// }
	}
}
</script>

<style>

.input_key { width: 55px; }
.input_key input[type=number], input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button {
	-moz-appearance: textfield;
  -webkit-appearance: none;
  margin: 0;
}

</style>