
<template>
<div class="submit-form">
	<div v-if="!submitted">
		<div class="form-group">
			<label for="guid">guid</label>
			<input type="text" class="form-control" id="guid" required v-model="client.guid" name="guid"/>
		</div>

		<div class="form-group">
			<label for="numss">Num SS</label>
			<input class="form-control" id="descripnumsstion" required v-model="client.numss" name="numss"/>
		</div>

		<div class="form-group">
			<label for="lastName">Last Name</label>
			<input class="form-control" id="description" required v-model="client.lastname" name="lastName"/>
		</div>

		<div class="form-group">
			<label for="firstName">First Name</label>
			<input class="form-control" id="firstName" required v-model="client.firstname" name="firstName"/>
		</div>

		<button @click="saveClient" class="btn btn-success">Submit</button>
	</div>

	<div v-else>
		<h4>You submitted successfully!</h4>
		<button class="btn btn-success" @click="newClient">Add</button>
	</div>
</div>
</template>
<script>
import ClientDataService from "@/services/ClientDataService";

export default {
	name: "add-client",
	data() {
		return {
			client: {
				guid: null,
				numss: "",
				lastname: "",
				firstname: "",
			}
		};
	},
	methods: {
		saveClient() {
			var data = {
				numss: this.client.numss,
				lastname: this.client.lastname,
				firstname: this.client.firstname
			};

			ClientDataService.create(data)
				.then(response => {
					this.client.guid = response.data.guid;
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
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>