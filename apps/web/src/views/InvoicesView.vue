<template>
  <v-container fluid class="pa-4">
    <TitleUnderline title="Factuuroverzicht" underline-class="underlineOrange" />

    <v-container class="pa-4">
      <EmptyState v-if="invoices.length === 0" message="U heeft nog geen facturen." />

      <div v-for="group in invoicesByYear" :key="group.year" class="mb-8">
        <div class="year-label mb-2">{{ group.year }}</div>

        <div v-for="invoice in group.invoices" :key="invoice.id" class="invoice-bar mb-4">
          <span class="invoice-number font-weight-bold">{{ invoice.invoice_number }}</span>
          <span class="invoice-status">{{ formatStatus(invoice.status) }}</span>
          <span class="invoice-date" disabled>{{ formatDate(invoice.issued_at) }}</span>
          <v-btn icon variant="text" class="invoice-download" :aria-label="`Download factuur ${invoice.invoice_number}`"
            @click="downloadInvoice(invoice)">
            <v-icon size="28">mdi-tray-arrow-down</v-icon>
          </v-btn>
        </div>
      </div>
    </v-container>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useUserStore } from '@/stores/userStore'

import TitleUnderline from '@/components/ui/TitleUnderline.vue'
import EmptyState from '@/components/ui/EmptyState.vue'

const userStore = useUserStore()

const invoices = ref([])

const url = `${import.meta.env.VITE_API_URL}/invoices`

const formatStatus = (status) => {
  if (!status) return ''
  return status.charAt(0).toUpperCase() + status.slice(1)
}

const formatDate = (value) => {
  if (!value) return '-'
  return new Date(value).toLocaleDateString('nl-NL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

const invoicesByYear = computed(() => {
  const groups = {}

  for (const invoice of invoices.value) {
    const year = new Date(invoice.issued_at).getFullYear()
    if (!groups[year]) groups[year] = []
    groups[year].push(invoice)
  }

  return Object.keys(groups)
    .sort((a, b) => b - a)
    .map((year) => ({ year, invoices: groups[year] }))
})

const downloadInvoice = async (invoice) => {
  try {
    const response = await axios.get(`${url}/${invoice.id}/pdf`, {
      withCredentials: true,
      responseType: 'blob',
    })

    const blobUrl = window.URL.createObjectURL(response.data)
    const link = document.createElement('a')
    link.href = blobUrl
    link.download = `${invoice.invoice_number}.pdf`
    document.body.appendChild(link)
    link.click()
    link.remove()
    window.URL.revokeObjectURL(blobUrl)
  } catch (error) {
    console.error('Fout bij downloaden factuur:', error)
  }
}

onMounted(async () => {
  try {
    const response = await axios.get(url, { withCredentials: true })
    const all = response.data.invoices || response.data

    invoices.value = userStore.user
      ? all.filter((invoice) => invoice.user_id === userStore.user.id)
      : []
  } catch (error) {
    console.error('Fout bij ophalen facturen:', error)
  }
})
</script>

<style scoped>
.year-label {
  font-size: 1.25rem;
  color: var(--color-darkBlue);
  user-select: none;
}

.invoice-bar {
  display: flex;
  align-items: center;
  gap: 2rem;
  background-color: var(--color-lightBlue);
  border-radius: 10px;
  padding: 1.25rem 1.5rem;
  color: var(--color-darkBlue);
}

.invoice-number {
  flex: 0 0 12rem;
  user-select: none;
}

.invoice-status {
  flex: 0 0 8rem;
  user-select: none;
}

.invoice-date {
  flex: 1 1 auto;
  user-select: none;
}

.invoice-download {
  margin-left: auto;
  color: var(--color-darkBlue);
}
</style>
