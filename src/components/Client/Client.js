import ClientDataService from "./services/ClientDataService";

export default {
  name: "client",
  data() {
    return {
      currentClient: null,
      message: ''
    };
  },
  methods: {
    getClient(id) {
      ClientDataService.get(id)
        .then(response => {
          this.currentClient = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updatePublished(status) {
      var data = {
        id: this.currentClient.id,
        title: this.currentClient.title,
        description: this.currentClient.description,
        published: status
      };

      ClientDataService.update(this.currentClient.id, data)
        .then(response => {
          this.currentClient.published = status;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateClient() {
      ClientDataService.update(this.currentClient.id, this.currentClient)
        .then(response => {
          console.log(response.data);
          this.message = 'The client was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteClient() {
      ClientDataService.delete(this.currentClient.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "clients" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getClient(this.$route.params.id);
  }
};