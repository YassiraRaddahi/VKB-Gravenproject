import { createRouter, createWebHistory } from "vue-router";
import axios from "axios";

import Home from "../views/HomeView.vue";
import Login from "../views/LoginView.vue";
import Dashboard from "../views/DashboardView.vue";
import Cemeteries from "../views/CemeteriesView.vue";
import Graves from "../views/GravesView.vue";
import CemeteryManagers from "../views/CemeteryManagersView.vue";
import Profile from "../views/ProfileView.vue";
import Security from "../views/SecurityView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/home" },
    {
      path: "/home",
      name: "Home",
      component: Home,
      meta: { showBreadcrumbs: false },
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
      meta: { showBreadcrumbs: false },
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard,
      meta: { requiresAuth: true, showBreadcrumbs: false },
    },
    {
      path: "/begraafplaatsen",
      name: "Cemeteries",
      component: Cemeteries,
      meta: { requiresAuth: true, showBreadcrumbs: false },
    },
    {
      path: "/graven/:cemetery_id",
      name: "Graves",
      component: Graves,
      meta: { requiresAuth: true, showBreadcrumbs: false },
    },
    {
      path: "/beheerders",
      name: "CemeteryManagers",
      component: CemeteryManagers,
      meta: { requiresAuth: true, showBreadcrumbs: false },
    },
    {
      path: "/profiel",
      name: "Profile",
      component: Profile,
      meta: { requiresAuth: true, showBreadcrumbs: false },
    },
    {
      path: "/profiel/beveiliging",
      name: "Security",
      component: Security,
      meta: { requiresAuth: true, showBreadcrumbs: false },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    try {
      await axios.get("http://localhost:3001/api/active-token", {
        withCredentials: true,
      });
      next();
    } catch {
      next("/login");
    }
  } else if (to.path === "/login") {
    try {
      await axios.get("http://localhost:3001/api/active-token", {
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
