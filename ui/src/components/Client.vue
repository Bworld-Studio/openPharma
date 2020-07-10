<template>
<div class="container-fluid">
	<form v-on:submit.prevent="addClient">
		<span class="row">
			<label for="numSSInput">{{$t('clients.numss-input')}}</label>
			<div class="col">
				<input v-model="client.numSS" v-bind:placeholder="$t('clients.numss-input')" type="text" id="numSSInput" class="form-control input_ss form-control-sm" size="13"/>
			</div>
			<div class="col">
				<input v-model="client.cleSS" v-bind:placeholder="$t('clients.keyss-input')" type="number" id="cleSSInput" class="form-control input_key form-control-sm" min="0" max="99" value="00" size="2"/>
			</div>
		</span>
		<span class="row">
			<label for="lastNameInput">{{$t('clients.name-input')}}</label>
			<input v-model="client.lastName" type="text" id="lastNameInput" class="form-control form-control-sm" v-bind:placeholder="$t('clients.name-input')"/>
		</span>
		<span class="row">
			<label for="firstNameInput">{{$t('clients.firstname-input')}}</label>
			<input v-model="client.firstName" type="text" id="firstNameInput" class="form-control form-control-sm" v-bind:placeholder="$t('clients.firstname-input')"/>
		</span>
		<span class="row">
			<label for="birthDateInput">{{$t('clients.birthdate-input')}}</label>
			<input v-model="client.birthDate" type="date" id="birthDateInput" class="form-control form-control-sm" v-bind:placeholder="$t('clients.birthdate-input')"/>
		</span>
		<span class="row">
			<label for="birthDateInput">{{$t('clients.address-input')}}</label>
			<input v-model="client.address" type="text" id="addressInput" class="form-control form-control-sm" v-bind:placeholder="$t('clients.address-input')"/>
		</span>
		<span class="row">
			<label for="birthDateInput">{{$t('clients.address2-input')}}</label>
			<input v-model="client.address2" type="text" id="address2Input" class="form-control form-control-sm" v-bind:placeholder="$t('clients.address2-input')"/>
		</span>
		<span class="row">
			<label for="birthDateInput">{{$t('clients.zipcode-input')}}</label>
			<input v-model="client.zipcode" type="text" id="zipcodeInput" class="form-control form-control-sm" v-bind:placeholder="$t('clients.zipcode-input')"/>
		</span>
		<span class="row">
			<label for="birthDateInput">{{$t('clients.city-input')}}</label>
			<input v-model="client.city" type="text" id="cityInput" class="form-control form-control-sm" v-bind:placeholder="$t('clients.city-input')"/>
		</span>
		<span class="row">
			<label for="birthDateInput">{{$t('clients.cellphone-input')}}</label>
			<input v-model="client.cellphone" type="tel" pattern="[0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2}" id="cellphoneInput" class="form-control form-control-sm" v-bind:placeholder="$t('clients.cellphone-input')"/>
		</span>
		<span class="row">
			<label for="birthDateInput">{{$t('clients.center-input')}}</label>
			<input v-model="client.center" type="text" id="centerInput" class="form-control form-control-sm" v-bind:placeholder="$t('clients.center-input')"/>
		</span>
		<span class="row">
			<label for="birthDateInput">{{$t('clients.viewAt-input')}}</label>
			<input readonly v-model="client.viewAt" type="text" id="viewAtInput" class="form-control form-control-sm form-control-plaintext" v-bind:placeholder="$t('clients.viewAt-input')"/>
		</span>

		<!--  -->
		<!-- <span class="row">
			<label for="birthDateInput">{{$t('clients.')}}</label>
			<input v-model="client.birthDate" type="date" id="birthDateInput" class="form-control form-control-sm" v-bind:placeholder="$t('clients.birthdate-input')"/>
		</span> -->
		<span class="row">
			<button v-if="this.client.isEdit == false" type="submit" class="btn btn-success btn-block btn-sm mt-3" >{{$t('buttons.save-button')}}</button>
			<button v-else v-on:click="updateClient()" type="button" class="btn btn-primary btn-block btn-sm mt-3" >{{$t('buttons.update-button')}}</button>
		</span>
	</form>
</div>
</template>

<script>
import axios from 'axios'

export default {
	name: 'Client',
	data () {
		return {
			uuid: '',
			client: {
				uuid: undefined,
				numSS: '',
				cleSS: '',
				lastName: '',
				firstName: '',
				birthDate: '',
				address: '',
				address2: '',
				city: '',
				zipcode: '',
				cellphone: '',
				phone: '',
				center: '',
				viewAt: '',
				active: false,
				isEdit: false
			}
		}
	},
	mounted () {
		if (this.$route.params.uuid !== undefined) {
			this.uuid = this.$route.params.uuid
			this.getClient(this.uuid)
		} else {

		}
	},
	methods: {
		getClient (uuid) {
			var url = '/api/clients/' + uuid
			axios.get(url)
				.then(result => {
					this.mapClient(result.data)
				},
				error => { console.error(error) }
				)
		},
		mapClient (pClient) {
			debugger
			console.log(pClient.birthDate)
			this.client = pClient
			var viewAt = new Date()
			this.client.viewAt = viewAt
		},
		addClient () {
			this.client.active = true

			axios
				.post('api/clients', this.client).then(res => {
					this.client = {}
					this.client.isEdit = false
					this.getClients()
				}).catch(err => { console.log(err) })
		},
		updateClient () {
			axios
				.put(`/api/clients/${this.client.uuid}`, this.client).then(res => {
					this.client = {}
					this.client.isEdit = false
					this.getTasks()
					console.log(res)
				})
				.catch(err => { console.log(err) })
		},
		deleteClient (uuid) {
			axios
				.delete(`/api/clients/${uuid}`).then(res => {
					this.client = {}
					this.getTasks()
					console.log(res)
				}).catch(err => { console.log(err) })
		}
	}
}
</script>

<style>

.input_ss { width: 9em; }
.input_key { width: 3em; }
.input_key input[type=number], input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button {
	-moz-appearance: textfield;
	-webkit-appearance: none;
	margin: 0;
}

</style>
