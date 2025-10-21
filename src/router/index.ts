import { createRouter, createWebHistory } from 'vue-router'

import Contracts from '@/pages/contracts.vue'
import Index from '@/pages/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'index', component: Index },
    { path: '/contracts', name: 'contracts', component: Contracts },
  ],
})

export default router
