import ClientDataService from "./services/ClientDataService";

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