import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/userStore";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/home" },
    {
      path: "/home",
      name: "Home",
      component: () => import("../views/HomeView.vue"),
      meta: {
        showBreadcrumbs: false,
        showNavigationDrawer: true,
        title: "Kerkhovenbeheer Nederland | Home",
        description: "Kerkhovenbeheer Nederland vereenvoudigt het beheer van kerkhoven. Beheer efficiënt uw graven, rechthebbenden en overledenen met ons automatiseringsysteem."
      },
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("../views/LoginView.vue"),
      meta: {
        showBreadcrumbs: false,
        showNavigationDrawer: false,
        title: "Inloggen | Kerkhovenbeheer Nederland",
        description: "Log in op uw account bij Kerkhovenbeheer Nederland om toegang te krijgen tot uw functies en gegevens in ons automatiseringssysteem."
      },
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: () => import("../views/DashboardView.vue"),
      meta: {
        requiresAuth: true,
        showBreadcrumbs: false,
        showNavigationDrawer: true,
        title: "Hoofddashboard Admin | Kerkhovenbeheer Nederland",
        description: "Via het hoofdashboard kunt u navigeren naar alle kerkhoven die u in beheer heeft en naar alle beheerders van uw kerkhoven.",
      },
    },
    {
      path: "/kerkhoven",
      name: "Cemeteries",
      component: () => import("../views/CemeteriesView.vue"),
      meta: {
        requiresAuth: true,
        showBreadcrumbs: true,
        showNavigationDrawer: true,
        title: "Kerkhoven in uw beheer| Kerkhovenbeheer Nederland",
        description: "Beheer al uw kerkhoven op één plek. Zoek, filter of klik op een kerkhof en bekijk de details, voeg nieuwe kerkhoven toe en houd uw gegevens up-to-date."
      },
    },
    {
      path: "/beheerder/:manager_id/kerkhoven",
      name: "CemeteriesOfManager",
      component: () => import("../views/CemeteriesView.vue"),
      meta: {
        requiresAuth: true,
        showBreadcrumbs: true,
        showNavigationDrawer: true,
        title: "Kerkhoven in uw beheer| Kerkhovenbeheer Nederland",
        description: "Beheer al uw kerkhoven op één plek. Zoek, filter of klik op een kerkhof en bekijk de details, voeg nieuwe kerkhoven toe en houd uw gegevens up-to-date."
      },
    },
    {
      path: "/kerkhoven/:cemetery_id",
      name: "CemeteryDetails",
      component: () => import("../views/CemeteriesDetails.vue"),
      meta: {
        requiresAuth: true,
        showBreadcrumbs: true,
        showNavigationDrawer: true,
        title: "Details van kerkhof | Kerkhovenbeheer Nederland",
        description: "Bekijk de details van dit kerkhof, inclusief informatie over beheerders en toegang tot graven."
      },
    },
    {
      path: "/kerkhoven/:cemetery_id/graven",
      name: "Graves",
      component: () => import("../views/GravesView.vue"),
      meta: {
        requiresAuth: true,
        showBreadcrumbs: true,
        showNavigationDrawer: true,
        title: "Graven van uw kerkhof | Kerkhovenbeheer Nederland",
        description: "Beheer al uw graven van uw kerkhof op één plek. Zoek, filter of klik op een graf en bekijk de details, voeg nieuwe graven toe en houd uw gegevens up-to-date."
      },
    },
    {
      path: "/kerkhoven/:cemetery_id/graves/:grave_id",
      name: "GravesDetails",
      component: () => import("../views/GravesDetails.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: "/beheerders",
      name: "CemeteryManagers",
      component: () => import("../views/CemeteryManagersView.vue"),
      meta: {
        requiresAuth: true,
        showBreadcrumbs: true,
        showNavigationDrawer: true,
        title: "Beheerders van uw kerkhoven | Kerkhovenbeheer Nederland",
        description: "Beheer al uw beheerders op één plek. Zoek, of klik op een beheerder en bekijk de details, voeg nieuwe beheerders toe en houd uw gegevens up-to-date."
      },
    },
    {
      path: "/beheerders/:manager_id",
      name: "CemeteryManager",
      component: () => import("../views/CemeteryManagerView.vue"),
      meta: {
        requiresAuth: true,
        showBreadcrumbs: true,
        showNavigationDrawer: true,
        title: "Beheerder Details | Kerkhovenbeheer Nederland",
        description: "Bekijk hier de details van een specifieke beheerder. Pas eenvoudig de gegevens aan om deze up-to-date te houden."
      },
    },
    {
      path: "/profiel",
      name: "Profile",
      component: () => import("../views/ProfileView.vue"),
      meta: {
        requiresAuth: true,
        showBreadcrumbs: false,
        showNavigationDrawer: false,
        title: "Profiel | Kerkhovenbeheer Nederland",
        description: "Bekijk hier uw profielgegevens, zoals uw naam, e-mailadres en telefoonnummer. Pas eenvoudig uw gegevens aan om deze up-to-date te houden."
      },
    },
    {
      path: "/profiel/beveiliging",
      name: "Security",
      component: () => import("../views/SecurityView.vue"),
      meta: {
        requiresAuth: true,
        showBreadcrumbs: false,
        showNavigationDrawer: false,
        title: "Profielbeveiliging | Kerkhovenbeheer Nederland",
        description: "Beheer hier uw beveiligingsinstellingen en wachtwoord. Houd uw account veilig voor een optimale ervaring met Kerkhovenbeheer Nederland."
      },
    },
    {
      path: "/personenbeheer",
      name: "UserManagement",
      component: () => import("../views/UserManagementView.vue"),
      meta: {
        requiresAuth: true,
        showBreadcrumbs: true,
        showNavigationDrawer: true,
      },
    },
    {
      path: "/personenbeheer/type/:role",
      name: "UserManagementByRole",
      component: () => import("../views/PersonSubdashboardView.vue"),
      meta: {
        requiresAuth: true,
        showBreadcrumbs: true,
        showNavigationDrawer: true,
      },
    },

    {
      path: "/rechthebbenden",
      name: "RightsHolders",
      component: () => import("../views/RightsHoldersView.vue"),
      meta: {
        requiresAuth: true,
        showBreadcrumbs: true,
        showNavigationDrawer: true,
      }
    },
    {
      path: "/kerkhoven/toevoegen",
      name: "AddCemetery",
      component: () => import("../views/CemeteryAddView.vue"),
      meta: {
        requiresAuth: true,
        showBreadcrumbs: true,
        showNavigationDrawer: true,
      }
    },
    {
      path: "/personenbeheer/overledenen/beheren",
      name: "Deceased",
      component: () => import("../views/DeceasedView.vue"),
      meta: {
        requiresAuth: true,
        showBreadcrumbs: true,
        showNavigationDrawer: true,
      },
    },
    {
      path: "/personenbeheer/rechthebbenden/beheren",
      name: "RightsHoldersDashboard",
      component: () => import("../views/RightsHoldersView.vue"),
      meta: {
        requiresAuth: true,
        showBreadcrumbs: true,
        showNavigationDrawer: true,
      },
    },
    {
      path: "/personenbeheer/grafonderhouders/beheren",
      name: "GraveCaretakers",
      component: () => import("../views/GraveCaretakersView.vue"),
      meta: {
        requiresAuth: true,
        showBreadcrumbs: true,
        showNavigationDrawer: true,
      },
    },
    {
      path: "/personenbeheer/overledenen/koppelen-aan-graf",
      name: "LinkDeceasedToGrave",
      component: () => import("../views/GravesView.vue"),
      meta: {
        requiresAuth: true,
        showBreadcrumbs: true,
        showNavigationDrawer: true,
      },
    },
    {
      path: "/personenbeheer/rechthebbenden/koppelen-aan-graf",
      name: "LinkRightHolderToGrave",
      component: () => import("../views/GravesView.vue"),
      meta: {
        requiresAuth: true,
        showBreadcrumbs: true,
        showNavigationDrawer: true,
      },
    },
    {
      path: "/personenbeheer/grafonderhouders/koppelen-aan-graf",
      name: "LinkGraveCaretakerToGrave",
      component: () => import("../views/GravesView.vue"),
      meta: {
        requiresAuth: true,
        showBreadcrumbs: true,
        showNavigationDrawer: true,
      },
    }
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
  if (to.path === "/login" && userStore.user) {
    return "/dashboard"
  }

  return true;
});

export default router;
