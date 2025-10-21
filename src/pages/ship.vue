<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAgentStore } from '@/stores/agent'

const route = useRoute()

const store = useAgentStore()
const query = useQuery({
  queryFn: () => store.agentApi.get('/my/ships/{shipSymbol}', {
    path: {
      shipSymbol: route.params.id as string,
    },
  }),
  queryKey: ['ships', route.params.id],
})

const systemSymbol = computed(() => {
  if (!query.data.value?.data) {
    return undefined
  }
  return query.data.value.data.nav.systemSymbol
})

const systemQuery = useQuery({
  queryFn: () => {
    if (!systemSymbol.value) {
      return null
    }
    return store.agentApi.get('/systems/{systemSymbol}/waypoints', {
      path: {
        systemSymbol: systemSymbol.value,
      },
      query: {
        page: 1,
        limit: 10,
      },
    })
  },
  queryKey: ['systems', systemSymbol, 'waypoints'],
})
</script>

<template>
  <div>
    {{ $route.params.id }}
    {{ systemSymbol }}

    <ul>
      <li
        v-for="waypoint in systemQuery.data.value?.data"
        :key="waypoint.symbol"
      >
        {{ waypoint.symbol }} - {{ waypoint.type }}
      </li>
    </ul>
  </div>
</template>
