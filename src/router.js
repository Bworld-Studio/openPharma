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
      component: () => import("./components/Clients/Clients")
    },
    {
      path: "/clients/:id",
      name: "client-details",
      component: () => import("./components/Client/Client")
    },
    {
      path: "/add",
      name: "add",
      component: () => import("./components/AddClient/AddClient")
    }
  ]
});