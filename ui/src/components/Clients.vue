<template>
	<div id="clients-list" class="container-fluid">
		<div>
			<div class="">
				<h1 class="text-center">Client List</h1>
				<form v-on:submit.prevent="addClient">
					<span class="row">
						<label for="numSSInput">Numéro SS</label>
						<input v-model="client.numSS" type="text" id="numSSInput" class="form-control" placeholder="Numéro de sécurité sociale"/>
					</span>
					<span class="row">
						<label for="numSSInput">Nom</label>
						<input v-model="client.lastName" type="text" id="lastNameInput" class="form-control" placeholder="Nom"/>
					</span>
					<span class="row">
						<label for="numSSInput">Prénom</label>
						<input v-model="client.firstName" type="text" id="firstNameInput" class="form-control" placeholder="Prénom"/>
					</span>
					<span class="row">
						<label for="numSSInput">Prénom</label>
						<input v-model="client.firstName" type="date" id="firstNameInput" class="form-control" placeholder="Prénom"/>
					</span>
					<span class="row">
						<button v-if="this.client.isEdit == false" type="submit" class="btn btn-success btn-block mt-3">Sauvegarder</button>
						<button v-else type="button" class="btn btn-primary btn-block mt-3" v-on:click="updateClient()">Mettre à jour</button>
					</span>
				</form>

				<table class="table">
					<tr v-for="(line) in clients" v-bind:key="line.uuid" v-bind:title="line.numSS">
						<td class="text-left">{{line.lastName}}</td>
						<td class="text-left">{{line.fistName}}</td>
						<td class="text-left">{{line.birthDate}}</td>
						<td class="text right">
							<button class="btn btn-info" v-on:click="editClient(line.uuid)">Editer</button>
							<button class="btn btn-danger" v-on:click="deleteClient(line.uuid)">Supprimer</button>
						</td>
					</tr>
				</table>
			</div>
		</div>
	</div>
</template>
<script>
import axios from "axios";

export default {
	data() {
		return {
			clients: [],
			client: {
				uuid: "",
				numSS: "",
				lastName: "",
				firstName: "",
				birthDate: "",
				isEdit: false
			}
		};
	},
	mounted() {
		this.getClients();
	},
	methods: {
		getClients() {
			axios.get("/api/clients").then(
				result => {
					console.log(result.data);
					this.clients = result.data;
				},
				error => {
					console.error(error);
				}
			);
		},
		addClient() {
			console.log(this.client);
			axios
				.post("api/clients", this.client)
				.then(res => {
					this.client = {};
					this.getClients();
				})
				.catch(err => {
					console.log(err);
				});
		},
		editClient(p_client) {
			this.client = p_client;
			this.client.isEdit = true;
		},
		updateClient() {
			axios
				.put(`/api/clients/${this.client.uuid}`, this.client)
				.then(res => {
					this.client = {};
					this.client.isEdit = false;
					this.getTasks();
					console.log(res);
				})
				.catch(err => {
					console.log(err);
				});
		},
		deleteClient(uuid) {
			axios
				.delete(`/api/clients/${uuid}`)
				.then(res => {
					this.client = {};
					this.getTasks();
					console.log(res);
				})
				.catch(err => {
					console.log(err);
				});
		}
	}
};
</script>
<style>
</style>