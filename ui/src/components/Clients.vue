<template>
	<div id="clients-list" class="container">
		<div class="row">
			<div class="col-md-6 mx-auto">
				<h1 class="text-center">Client List</h1>
				<form v-on:submit.prevent="addClient">
					<label for="numSSInput">Numéro SS</label>
					<input type="text" id="numSSInput" class="form-control" placeholder="Numéro de sécurité sociale"/>
					<label for="numSSInput">Nom</label>
					<input type="text" id="lastNameInput" class="form-control" placeholder="Nom"/>
					<label for="numSSInput">Prénom</label>
					<input type="text" id="firstNameInput" class="form-control" placeholder="Prénom"/>

					<button v-if="this.client.isEdit == false" type="submit" class="btn btn-success btn-block mt-3">Sauvegarder</button>
					<button v-else type="button" class="btn btn-primary btn-block mt-3" v-on:click="updateClient()">Mise à jour</button>
				</form>

				<table class="table">
					<tr v-for="(line) in clients" v-bind:key="line.uuid" v-bind:title="line.numSS">
						<td class="text-left">{{line.lastName}}</td>
						<td class="text-left">{{line.fistName}}</td>
						<td class="text-left">{{line.birthDate}}</td>
						<td class="text right">
							<button class="btn btn-info" v-on:click="editClient(line.uuid)"></button>
							<button class="btn btn-danger" v-on:click="deleteClient(line.uuid)"></button>
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
			client : {
				uuid: "",
				lastName: "",
				firstName: "",
				isEdit: false
			}
		};
	},
	mounted() {
		this.getClients();
	},
	methods: {
		getClients() {
			axios.get("/api/client").then(
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
			axios.post("api/client", this.client )
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
			axios.put(`/api/client/${this.client.uuid}`, this.client )
				.then(res => {
					this.client = {}
					this.client.isEdit = false;
					this.getTasks();
					console.log(res);
				})
				.catch(err => {
					console.log(err);
				});
		},
		deleteClient(uuid) {
			axios.delete(`/api/client/${uuid}`)
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