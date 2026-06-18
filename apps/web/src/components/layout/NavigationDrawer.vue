<template>
  <v-navigation-drawer expand-on-hover permanent rail width="256">
    <v-list nav>
      <v-list-item class="menu-title-section" prepend-icon="mdi-menu-close" title="Menu"
        :subtitle="toUpperCaseFirstLetter(user?.role_name || '')" />
    </v-list>

    <v-divider />

    <v-list class="navigation-list" density="compact" nav>
      <template v-for="item in navigationItems" :key="item.value">
        <v-list-group v-if="item.children" :value="item.value">
          <template #activator="{ props }">
            <v-list-item v-bind="props" :prepend-icon="item.icon" :title="item.title" />
          </template>

          <template v-for="child in item.children" :key="child.value">
            <v-list-group v-if="child.children" :value="child.value">
              <template #activator="{ props }">
                <v-list-item v-bind="props" :prepend-icon="child.icon" :title="child.title" />
              </template>

              <template v-for="subChild in child.children" :key="subChild.value">
                <v-list-group v-if="subChild.children" :value="subChild.value">
                  <template #activator="{ props }">
                    <v-list-item v-bind="props" :prepend-icon="subChild.icon" :title="subChild.title" />
                  </template>

                  <v-list-item v-for="thirdChild in subChild.children" :key="thirdChild.value" :title="thirdChild.title"
                    :value="thirdChild.value" :to="thirdChild.to" />
                </v-list-group>

                <v-list-item v-else :prepend-icon="subChild.icon" :title="subChild.title" :value="subChild.value"
                  :to="subChild.to" />
              </template>
            </v-list-group>

            <v-list-item v-else :prepend-icon="child.icon" :title="child.title" :value="child.value" :to="child.to" />
          </template>
        </v-list-group>

        <v-list-item v-else :prepend-icon="item.icon" :title="item.title" :value="item.value" :to="item.to" />
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const navigationItems = computed(() => {
  const role = user.value?.role_name

  if (role === 'admin') {
    return [
      {
        title: 'Homepagina',
        value: 'homepage',
        icon: 'mdi-home',
        to: { name: 'Home' }
      },
      {
        title: 'Dashboard',
        value: 'dashboard',
        icon: 'mdi-view-dashboard',
        children: [
          {
            title: 'Beheer Kerkhoven',
            value: 'cemeteries',
            icon: 'mdi-cross',
            to: { name: 'Cemeteries' }
          },
          {
            title: 'Beheer Beheerders',
            value: 'cemetery_managers',
            icon: 'mdi-account-multiple',
            to: { name: 'CemeteryManagers' }
          }
        ]
      },

    ]
  }

  if (role === 'beheerder') {
    return [
      {
        title: 'Homepagina',
        value: 'homepage',
        icon: 'mdi-home',
        to: { name: 'Home' }
      },
      {
        title: 'Dashboard',
        value: 'dashboard',
        icon: 'mdi-view-dashboard',
        children: [
          {
            title: 'Gekoppelde kerkhoven',
            value: 'linked_cemeteries',
            icon: 'mdi-cross',
            to: {
              name: 'Cemeteries',
              query: { manager: user.value.id }
            }
          },
          {
            title: 'Personenbeheer',
            value: 'user_management',
            icon: 'mdi-account-group',
            children: [
              {
                title: 'Overledenen',
                value: 'overledenen',
                icon: 'mdi-account',
                children: [
                  {
                    title: 'Beheer overledenen',
                    value: 'beheer_overledenen',
                    to: { name: 'Deceased' }
                  },
                  {
                    title: 'Koppel overledene aan graf',
                    value: 'koppel_overledene_aan_graf',
                  }
                ]
              },
              {
                title: 'Rechthebbenden',
                value: 'rechthebbenden',
                icon: 'mdi-account-group',
                children: [
                  {
                    title: 'Beheer rechthebbenden',
                    value: 'beheer_rechthebbenden',
                    to: { name: 'RightsHolders' }
                  },
                  {
                    title: 'Koppel rechthebbende aan graf',
                    value: 'koppel_rechthebbende_aan_graf',

                  }
                ]
              },
              {
                title: 'Grafonderhouders',
                value: 'grafonderhouders',
                icon: 'mdi-account-hard-hat',
                children: [
                  {
                    title: 'Beheer grafonderhouders',
                    value: 'beheer_grafonderhouders',
                    to: { name: 'GraveCaretakers' }
                  },
                  {
                    title: 'Koppel grafonderhouder aan graf',
                    value: 'koppel_grafonderhouder_aan_graf',
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
    if (role === 'rechthebbende') {
  return [
    {
      title: 'Homepagina',
      value: 'homepage',
      icon: 'mdi-home',
      to: { name: 'Home' }
    },
    {
      title: 'Dashboard',
      value: 'dashboard',
      icon: 'mdi-view-dashboard',
      children: [
        {
          title: 'Gekoppelde graven',
          value: 'linked_graves',
          icon: 'mdi-cross',
          to: {
            name: 'Cemeteries',
            query: { manager: user.value.id }
          }
        }
      ]
    }
  ]
}
 if (role === 'grafonderhouder') {
  return [
    {
      title: 'Homepagina',
      value: 'homepage',
      icon: 'mdi-home',
      to: { name: 'Home' }
    },
    {
      title: 'Dashboard',
      value: 'dashboard',
      icon: 'mdi-view-dashboard',
      children: [
        {
          title: 'Toegewezen graven',
          value: 'assigned_graves',
          icon: 'mdi-cross',
        }
      ]
    }

  ]
 }
  return [
    {
      title: 'Homepagina',
      value: 'homepage',
      icon: 'mdi-home',
      to: { name: 'Home' }
    }
  ]
})

function toUpperCaseFirstLetter(string) {
  if (!string) return ''
  return string.charAt(0).toUpperCase() + string.slice(1)
}
</script>

<style scoped>
/* Hover state */
:deep(.navigation-list .v-list-item:hover) {
  background-color: rgba(190, 225, 224, 0.16);
  /* #bee1e0 */
}

/* Active (current route) */
:deep(.navigation-list .v-list-item--active) {
  background-color: rgba(190, 225, 224, 0.28);
}

/* Active + hover (slightly stronger) */
:deep(.navigation-list .v-list-item--active:hover) {
  background-color: rgba(190, 225, 224, 0.35);
}


/* List item titles */
:deep(.v-list-item-title) {
  color: #0d475a;
  font-size: 0.95rem;
  font-weight: 500;
  line-height: 1.5;
}

:deep(.menu-title-section .v-list-item-title) {
  color: #f08360;
  font-size: 0.95rem;
  font-weight: 500;
  line-height: 1.5;
}

:deep(.menu-title-section .v-list-item-subtitle) {
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1.4;
}



/* Icons */
:deep(.v-list-item__prepend .v-icon) {
  color: #ea5a0b;
  font-size: 28px;
}


:deep(.v-list-item) {
  padding: 4.667px;
}



@media (max-width: 1144px) {}
</style>