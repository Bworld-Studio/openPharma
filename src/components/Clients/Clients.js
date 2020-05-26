import ClientDataService from "./services/ClientDataService";

export default {
  name: "clients-list",
  data() {
    return {
      clients: [],
      currentClient: null,
      currentIndex: -1,
      title: ""
    };
  },
  methods: {
    retrieveClients() {
      ClientDataService.getAll()
        .then(response => {
          this.clients = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveClients();
      this.currentClient = null;
      this.currentIndex = -1;
    },

    setActiveClient(client, index) {
      this.currentClient = client;
      this.currentIndex = index;
    },

    removeAllClients() {
      ClientDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchTitle() {
      ClientDataService.findByTitle(this.title)
        .then(response => {
          this.clients = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveClients();
  }
};