<script lang="ts" setup>
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import ShipsCard from '@/components/Ships/Card.vue'
import { useAgentStore } from '@/stores/agent'

const agentStore = useAgentStore()
const query = useQuery({
  queryFn: () => agentStore.agentApi.get('/my/ships', {
    query: {
      page: 1,
      limit: 10,
    },
  }),
  queryKey: ['contracts'],
})

const queryClient = useQueryClient()
const mutation = useMutation({
  mutationFn: (id: string) => {
    return agentStore.agentApi.post('/my/contracts/{contractId}/accept', {
      path: {
        contractId: id,
      },
    })
  },
  onSuccess: () => {
    return queryClient.invalidateQueries({ queryKey: ['contracts'] })
  },
})
</script>

<template>
  <div>
    <ShipsCard
      v-for="ship in query.data.value?.data"
      :key="ship.symbol"
      :ship="ship"
    />
  </div>
</template>
