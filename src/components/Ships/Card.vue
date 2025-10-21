<script lang="ts" setup>
import type { Schemas } from '@/spec.yml.client'

defineProps<{
  ship: Schemas.Ship
}>()
</script>

<template>
  <div>
    <RouterLink :to="`/ships/${ship.symbol}`">
      {{ ship.symbol }}
    </RouterLink>
  </div>
</template>
