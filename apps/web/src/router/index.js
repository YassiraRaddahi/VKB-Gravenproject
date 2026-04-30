import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/userStore";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/home" },
    {
      path: "/seo",
      name: "Seo",
      component: () => import("../views/SeoView.vue"),
      meta: {
        showBreadcrumbs: false,
        title: "SEO – Kerkhovenbeheer Nederland",
        description: "Overzicht van de toegepaste SEO-optimalisaties.",
      },
    },
    {
      path: "/home",
      name: "Home",
      component: () => import("../views/HomeView.vue"),
      meta: {
        showBreadcrumbs: false,
        title: "Kerkhovenbeheer Nederland",
        description: "Kerkhovenbeheer Nederland – beheer begraafplaatsen en graven eenvoudig online.",
      },
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("../views/LoginView.vue"),
      meta: {
        showBreadcrumbs: false,
        title: "Inloggen – Kerkhovenbeheer Nederland",
        description: "Log in om begraafplaatsen en graven te beheren.",
      },
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: () => import("../views/DashboardView.vue"),
      meta: {
        requiresAuth: true,
        showBreadcrumbs: false,
        title: "Dashboard – Kerkhovenbeheer Nederland",
        description: "Overzicht van je begraafplaatsen en recente activiteit.",
      },
    },
    {
      path: "/begraafplaatsen",
      name: "Cemeteries",
      component: () => import("../views/CemeteriesView.vue"),
      meta: {
        requiresAuth: true,
        showBreadcrumbs: true,
        title: "Begraafplaatsen – Kerkhovenbeheer Nederland",
        description: "Bekijk en beheer alle begraafplaatsen.",
      },
    },
    {
      path: "/graven/:cemetery_id",
      name: "Graves",
      component: () => import("../views/GravesView.vue"),
      meta: {
        requiresAuth: true,
        showBreadcrumbs: true,
        title: "Graven – Kerkhovenbeheer Nederland",
        description: "Bekijk en beheer de graven van een begraafplaats.",
      },
    },
    {
      path: "/beheerders",
      name: "CemeteryManagers",
      component: () => import("../views/CemeteryManagersView.vue"),
      meta: {
        requiresAuth: true,
        showBreadcrumbs: true,
        title: "Beheerders – Kerkhovenbeheer Nederland",
        description: "Overzicht van alle begraafplaatsbeheerders.",
      },
    },
    {
      path: "/profiel",
      name: "Profile",
      component: () => import("../views/ProfileView.vue"),
      meta: {
        requiresAuth: true,
        showBreadcrumbs: false,
        title: "Mijn profiel – Kerkhovenbeheer Nederland",
        description: "Beheer je profielgegevens.",
      },
    },
    {
      path: "/profiel/beveiliging",
      name: "Security",
      component: () => import("../views/SecurityView.vue"),
      meta: {
        requiresAuth: true,
        showBreadcrumbs: false,
        title: "Beveiliging – Kerkhovenbeheer Nederland",
        description: "Beheer je wachtwoord en beveiligingsinstellingen.",
      },
    },
  ],
});

router.afterEach((to) => {
  document.title = to.meta.title || "Kerkhovenbeheer Nederland";

  let metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription && to.meta.description) {
    metaDescription.setAttribute("content", to.meta.description);
  }
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
  } else if (to.path === "/login" && userStore.user) {
    return "/dashboard";
  } else {
    return true;
  }
});

export default router;
