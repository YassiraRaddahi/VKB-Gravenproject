<template>
  <v-card
    class="dashboard-card"
    elevation="3"
    @click="goToPage"
  >
    <v-card-text class="dashboard-card-text text-center">

      <div>{{ title }}</div>

      <div class="dashboard-card-subtitle">
        <v-icon size="48">
          {{ icon }}
        </v-icon>
      </div>

    </v-card-text>
  </v-card>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  title: String,
  icon: String,
  routeName: String,
  params: {
    type: Object,
    default: () => ({})
  }
}
)



const router = useRouter()

function goToPage() {
  router.push({ name: props.routeName, params: props.params })
}
</script>
<style scoped>
.dashboard-card {
  width: 100%;
  max-width: 360px;
  min-height: 180px;
  border-radius: 40px;
  background-color: #16495d;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}


.dashboard-card-text {
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  text-transform: none;
}

.dashboard-card-subtitle {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.95rem;
  margin-top: 0.5rem;
  font-weight: 400;
}
</style>