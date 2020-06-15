<template>
	<div id="clients-list" class="container">
		<div class="row">
			<div class="col-md-6 mx-auto">
				<h1 class="text-center">Client List</h1>
				<form v-on:submit.prevent="addNewClient">
					<label for="numSSInput">Numéro SS</label>
					<input
						type="text"
						id="numSSInput"
						class="form-control"
						placeholder="Numéro de sécurité sociale"
					/>

					<button
						v-if="this.isEdit == false"
						type="submit"
						class="btn btn-success btn-block mt-3"
					>Sauvegarder</button>
					<button v-else type="button" class="btn btn-primary btn-block mt-3">Sauvegarder</button>
				</form>

				<table class="table">
					<tr v-for="(client) in clients" v-bind:key="client.uuid" v-bind:title="client.numSS">
						<td class="text-left">{{client.lastName}}</td>
						<td class="text-left">{{client.fistName}}</td>
						<td class="text-left">{{client.birthDate}}</td>
						<td class="text right">
							<button class="btn btn-info" v-on:click="editClient(client.uuid)"></button>
							<button class="btn btn-danger" v-on:click="deleteClient(client.uuid)"></button>
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
			uuid: "",
			lastName: "",
			firstName: "",
			isEdit: false
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
			axios
				.post("api/clients", {
					uuid: this.uuid,
					lastName: this.lastName,
					firstName: this.firstName
				})
				.then(res => {
					this.client = {};
					this.getClients();
				})
				.catch(err => {
					console.log(err);
				});
		}
	}
};
</script>