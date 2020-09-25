import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Base from "../views/Base.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/Login",
    name: "Login",
    component: Login
  },
  {
    path: "/Register",
    name: "Register",
    component: Register
  },
  {
    path: "/",
    name: "Base",
    component: Base,
    children: [
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
