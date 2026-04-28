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
      meta: {  
        showBreadcrumbs: false, 
        title: "Kerkhovenbeheer Nederland | Home",
        description: "Kerkhovenbeheer Nederland vereenvoudigt het beheer van kerkhoven. Beheer efficiënt uw graven, rechthebbenden en overledenen met ons automatiseringsysteem."
      },
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
      meta: { 
        showBreadcrumbs: false,
        title: "Inloggen | Kerkhovenbeheer Nederland",
        description: "Log in op uw account bij Kerkhovenbeheer Nederland om toegang te krijgen tot uw functies en gegevens in ons automatiseringssysteem."
      },
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard,
      meta: { 
        requiresAuth: true, 
        showBreadcrumbs: false,
        title: "Hoofddashboard Admin | Kerkhovenbeheer Nederland",
        description: "Via het hoofdashboard kunt u navigeren naar alle kerkhoven die u in beheer heeft en naar alle beheerders van uw kerkhoven.", 
      },
    },
    {
      path: "/kerkhoven",
      name: "Cemeteries",
      component: Cemeteries,
      meta: { requiresAuth: true, showBreadcrumbs: true,
        title: "Kerkhoven in uw beheer| Kerkhovenbeheer Nederland",
        description: "Beheer al uw kerkhoven op één plek. Zoek, filter of klik op een kerkhof en bekijk de details, voeg nieuwe kerkhoven toe en houd uw gegevens up-to-date." 
      },
    },
    {
      path: "/kerkhoven/:cemetery_id/graven",
      name: "Graves",
      component: Graves,
      meta: { 
        requiresAuth: true, 
        showBreadcrumbs: true,
        title: "Graven van uw kerkhof | Kerkhovenbeheer Nederland",
        description: "Beheer al uw graven van uw kerkhof op één plek. Zoek, filter of klik op een graf en bekijk de details, voeg nieuwe graven toe en houd uw gegevens up-to-date."   
      },
    },
    {
      path: "/beheerders",
      name: "CemeteryManagers",
      component: CemeteryManagers,
      meta: { 
        requiresAuth: true, 
        showBreadcrumbs: true,
        title: "Beheerders van uw kerkhoven | Kerkhovenbeheer Nederland",
        description: "Beheer al uw beheerders op één plek. Zoek, of klik op een beheerder en bekijk de details, voeg nieuwe beheerders toe en houd uw gegevens up-to-date."  
      },
    },
    {
      path: "/profiel",
      name: "Profile",
      component: Profile,
      meta: { 
        requiresAuth: true, 
        showBreadcrumbs: false,
        title: "Profiel | Kerkhovenbeheer Nederland",
        description: "Bekijk hier uw profielgegevens, zoals uw naam, e-mailadres en telefoonnummer. Pas eenvoudig uw gegevens aan om deze up-to-date te houden."
      },
    },
    {
      path: "/profiel/beveiliging",
      name: "Security",
      component: Security,
      meta: { 
        requiresAuth: true, 
        showBreadcrumbs: false,
        title: "Profielbeveiliging | Kerkhovenbeheer Nederland",
        description: "Beheer hier uw beveiligingsinstellingen en wachtwoord. Houd uw account veilig voor een optimale ervaring met Kerkhovenbeheer Nederland."  
      },
    },
  ],
});



router.beforeEach(async (to, from) => {

  const userStore = useUserStore()

  // If the user is not loaded yet, try to fetch it
  if (!userStore.user) {
    try {
      await userStore.fetchUser()
    } catch {
    }
  }
  
  // If the route requires authentication and the user is not logged in, redirect to login
  if (to.meta.requiresAuth && !userStore.user) {
    return "/login";
  }

  // If the user is logged in and tries to access the login page, redirect to dashboard
  if(to.path === "/login" && userStore.user) {
    return "/dashboard"
  }

    return true;
});

export default router;
