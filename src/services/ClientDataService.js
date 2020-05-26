import http from "../http-common";

class ClientDataService {
  getAll() {
    return http.get("/clients");
  }

  get(uuid) {
    return http.get(`/clients/${uuid}`);
  }

  create(data) {
    return http.post("/clients", data);
  }

  update(uuid, data) {
    return http.put(`/clients/${uuid}`, data);
  }

  delete(uuid) {
    return http.delete(`/clients/${uuid}`);
  }

  deleteAll() {
    return http.delete(`/clients`);
  }

  findByName(lastName) {
    return http.get(`/clients?title=${lastName}`);
  }
}

export default new ClientDataService();