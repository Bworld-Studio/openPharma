<template>
	<div id="clients-list" class="container-fluid">
		<div>
			<div class="">
				<!-- <h1 class="text-center">Client List</h1> -->
				<form v-on:submit.prevent="addClient">
					<span class="row">
						<label for="numSSInput">{{$t('clients.numss-input')}}</label>
						<input v-model="client.numSS" v-bind:placeholder="$t('clients.numss-input')" type="text" id="numSSInput" class="form-control"/>
						<input v-model="client.cleSS" v-bind:placeholder="$t('clients.keyss-input')" type="number" id="cleSSInput" class="form-control input_key" min="0" max="99" value="00"/>
					</span>
					<span class="row">
						<label for="lastNameInput">{{$t('clients.name-input')}}</label>
						<input v-model="client.lastName" type="text" id="lastNameInput" class="form-control" v-bind:placeholder="$t('clients.name-input')"/>
					</span>
					<span class="row">
						<label for="firstNameInput">{{$t('clients.firstname-input')}}</label>
						<input v-model="client.firstName" type="text" id="firstNameInput" class="form-control" v-bind:placeholder="$t('clients.firstname-input')"/>
					</span>
					<span class="row">
						<label for="birthDateInput">{{$t('clients.birthdate-input')}}</label>
						<input v-model="client.birthDate" type="date" id="birthDateInput" class="form-control" v-bind:placeholder="$t('clients.birthdate-input')"/>
					</span>
					<span class="row">
						<button v-if="this.client.isEdit == false" type="submit" class="btn btn-success btn-block mt-3">{{$t('buttons.save-button')}}</button>
						<button v-else v-on:click="updateClient()" type="button" class="btn btn-primary btn-block mt-3" >{{$t('buttons.update-button')}}</button>
					</span>
				</form>

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
import axios from 'axios'

export default {
	data () {
		return {
			clients: [],
			client: {
				uuid: undefined,
				numSS: '',
				cleSS: '',
				lastName: '',
				firstName: '',
				birthDate: '',
				active: false,
				isEdit: false
			}
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
		addClient () {
			console.log(this.client)
			this.client.active = true

			// Call API
			axios
				.post('api/clients', this.client)
				.then(res => {
					this.client = {}
					this.client.isEdit = false
					this.getClients()
				})
				.catch(err => {
					console.log(err)
				})
		},
		editClient (pClient) {
			this.client = pClient
			this.client.lastName = this.client.lastName.toUpperCase()
			this.client.isEdit = true
		},
		updateClient () {

			// Call API
			axios
				.put(`/api/clients/${this.client.uuid}`, this.client)
				.then(res => {
					this.client = {}
					this.client.isEdit = false
					this.getTasks()
					console.log(res)
				})
				.catch(err => {
					console.log(err)
				})
		},
		deleteClient (uuid) {
			
			// Call API
			axios
				.delete(`/api/clients/${uuid}`)
				.then(res => {
					this.client = {}
					this.getTasks()
					console.log(res)
				})
				.catch(err => {
					console.log(err)
				})
		}
	}
}
</script>

<style>

.input_key input[type=number]::-webkit-inner-spin-button, 
					 input[type=number]::-webkit-outer-spin-button { 
  -webkit-appearance: none; 
  margin: 0; 
	width: 4em;
}
</style>