import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/userStore";

// Views
import Home from "../views/HomeView.vue";
import Login from "../views/LoginView.vue";
import Dashboard from "../views/DashboardView.vue";
import Cemeteries from "../views/CemeteriesView.vue";
import Graves from "../views/GravesView.vue";
import CemeteryManagers from "../views/CemeteryManagersView.vue";
import Profile from "../views/ProfileView.vue";
import Security from "../views/SecurityView.vue";
import Seo from "../views/SEO.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/home",
    },

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

    {
      path: "/seo",
      name: "Seo",
      component: Seo,
      meta: { showBreadcrumbs: false },
    },
  ],
});

router.beforeEach(async (to) => {
  const userStore = useUserStore();

  if (to.meta.requiresAuth) {
    if (!userStore.user) {
      try {
        await userStore.fetchUser();
      } catch {
        return "/login";
      }
    }
    return true;
  }

  if (to.path === "/login" && userStore.user) {
    return "/dashboard";
  }

  return true;
});

export default router;
router.afterEach((to) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }

  const metaDescription = document.querySelector('meta[name="description"]')
  if (metaDescription && to.meta.description) {
    metaDescription.setAttribute('content', to.meta.description)
  }
})