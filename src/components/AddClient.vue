<template>
	<div class="submit-form">
		<div v-if="!submitted">
			<div class="form-group">
				<label for="guid">guid</label>
				<input type="text" class="form-control" id="guid" required v-model="client.guid" name="guid" />
			</div>

			<div class="form-group">
				<label for="description">Description</label>
				<input class="form-control" id="description" required v-model="client.description" name="description"/>
			</div>

			<!-- <div class="form-group">
				<label for="description">Description</label>
				<input class="form-control" id="description" required v-model="client.description" name="description"/>
			</div> -->

			<!-- <div class="form-group">
				<label for="description">Description</label>
				<input class="form-control" id="description" required v-model="client.description" name="description"/>
			</div> -->

			<button @click="saveClient" class="btn btn-success">Submit</button>
		</div>

		<div v-else>
			<h4>You submitted successfully!</h4>
			<button class="btn btn-success" @click="newClient">Add</button>
		</div>
	</div>
</template>

<script>
import ClientDataService from "../services/ClientDataService";

export default {
	name: "add-client",
	data() {
		return {
			client: {
				guid: null,
				title: "",
				description: "",
				published: false
			},
			submitted: false
		};
	},
	methods: {
		saveClient() {
			var data = {
				title: this.client.title,
				description: this.client.description
			};

			ClientDataService.create(data)
				.then(response => {
					this.client.id = response.data.id;
					console.log(response.data);
					this.submitted = true;
				})
				.catch(e => {
					console.log(e);
				});
		},

		newClient() {
			this.submitted = false;
			this.client = {};
		}
	}
};
</script>

<style>
.submit-form {
	max-width: 300px;
	margin: auto;
}
</style>