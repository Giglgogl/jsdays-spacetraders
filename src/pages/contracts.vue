<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query'
import ContractsCard from '@/components/Contracts/Card.vue'
import { useAgentStore } from '@/stores/agent'

const agentStore = useAgentStore()
const query = useQuery({
  queryFn: () => agentStore.agentApi.get('/my/contracts', {
    query: {
      page: 1,
      limit: 10,
    },
  }),
  queryKey: ['contracts'],
})
</script>

<template>
  <div>
    <ContractsCard
      v-for="contract in query.data.value?.data"
      :key="contract.id"
      :contract="contract"
    />

    <pre>{{ query.data }}</pre>
  </div>
</template>
