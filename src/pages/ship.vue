<script lang="ts" setup>
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
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

const queryClient = useQueryClient()
const orbit = useMutation({
  mutationFn: () => store.agentApi.post('/my/ships/{shipSymbol}/orbit', {
    path: {
      shipSymbol: route.params.id as string,
    },
  }),
  onSuccess: () => {
    return queryClient.invalidateQueries({ queryKey: ['ships', route.params.id] })
  },
})

const navigate = useMutation({
  mutationFn: (waypointSymbol: string) => {
    return store.agentApi.post('/my/ships/{shipSymbol}/navigate', {
      path: {
        shipSymbol: route.params.id as string,
      },
      body: { waypointSymbol },
    })
  },
  onSuccess: () => {
    return queryClient.invalidateQueries({ queryKey: ['ships', route.params.id] })
  },
})
</script>

<template>
  <div class="space-y-4">
    {{ $route.params.id }}
    {{ systemSymbol }}

    <ul>
      <li>System: {{ systemSymbol }}</li>
      <li>Status: {{ query.data.value?.data.nav.status }}</li>
      <li>Startpunkt: {{ query.data.value?.data.nav.route.origin }}</li>
      <li>Ziel: {{ query.data.value?.data.nav.route.destination }}</li>
      <li>Abflugzeit: {{ query.data.value?.data.nav.route.departureTime }}</li>
      <li>Ankunftszeit: {{ query.data.value?.data.nav.route.arrival }}</li>
    </ul>

    <UButton @click="orbit.mutate()">
      Orbit
    </UButton>

    <USeparator />

    <ul class="space-y-4">
      <li
        v-for="waypoint in systemQuery.data.value?.data"
        :key="waypoint.symbol"
      >
        {{ waypoint.symbol }} - {{ waypoint.type }}
        <UButton @click="navigate.mutate(waypoint.symbol)">
          Navigate
        </UButton>
      </li>
    </ul>
  </div>
</template>
