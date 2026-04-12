import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/userStore";

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
      meta: { requiresAuth: true, showBreadcrumbs: true },
    },
    {
      path: "/graven/:cemetery_id",
      name: "Graves",
      component: Graves,
      meta: { requiresAuth: true, showBreadcrumbs: true },
    },
    {
      path: "/beheerders",
      name: "CemeteryManagers",
      component: CemeteryManagers,
      meta: { requiresAuth: true, showBreadcrumbs: true },
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

  const userStore = useUserStore()

  if (to.meta.requiresAuth) {
    if (!userStore.user) {
      try {
        await userStore.fetchUser()
      } catch {
        return next("/login");
      }
    }
    return next();
  } 
  else if (to.path === "/login" && userStore.user) {
    return next("/dashboard");
  } 
  else {
    return next();
  }

});

export default router;
