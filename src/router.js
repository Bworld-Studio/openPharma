import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/clients",
      name: "clients",
      component: () => import("./components/clients/Clients/Clients")
    },
    {
      path: "/clients/:id",
      name: "client-details",
      component: () => import("./components/clients/Client/Client")
    },
    {
      path: "/add",
      name: "add",
      component: () => import("./components/clients/AddClient/AddClient")
    }
  ]
});