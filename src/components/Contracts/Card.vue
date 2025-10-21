<script setup lang="ts">
import type { Schemas } from '@/spec.yml.client'

defineProps<{
  contract: Schemas.Contract
}>()
</script>

<template>
  <div>
    {{ contract.id }}
  </div>
</template>
