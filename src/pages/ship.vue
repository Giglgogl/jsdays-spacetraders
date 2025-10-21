<script lang="ts" setup>
import { useQuery } from '@tanstack/vue-query'
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
</script>

<template>
  <div>
    Test - {{ $route.params.id }}

    <pre>{{ query.data.value?.data }}</pre>
  </div>
</template>
