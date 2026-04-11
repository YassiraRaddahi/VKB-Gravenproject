import { createRouter, createWebHistory } from "vue-router";
import axios from "axios";

import Home from "../views/HomeView.vue";
import Cemeteries from "../views/CemeteriesView.vue";
import Graves from "../views/GravesView.vue";
import CemeteryManagers from "../views/CemeteryManagersView.vue";
import Login from "../views/LoginView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/home" },
    { path: "/home", name: "Home", component: Home },
    { path: "/login", name: "Login", component: Login },
    {
      path: "/begraafplaatsen",
      name: "Cemeteries",
      component: Cemeteries,
      meta: { requiresAuth: true },
    },
    {
      path: "/graven/:cemetery_id",
      name: "Graves",
      component: Graves,
      meta: { requiresAuth: true },
    },
    {
      path: "/beheerders",
      name: "CemeteryManagers",
      component: CemeteryManagers,
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    try {
      await axios.get("http://localhost:3001/api/me", {
        withCredentials: true,
      });
      next();
    } catch {
      next("/login");
    }
  } else if (to.path === "/login") {
    try {
      await axios.get("http://localhost:3001/api/me", {
        withCredentials: true,
      });
      next("/dashboard");
    } catch {
      next();
    }
  } else {
    next();
  }
});

export default router;
