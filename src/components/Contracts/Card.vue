<script setup lang="ts">
import type { Schemas } from '@/spec.yml.client'

defineProps<{
  contract: Schemas.Contract
}>()
defineEmits<{
  (e: 'accept', id: string): void
}>()
</script>

<template>
  <div class="p-4 rounded border">
    ID: {{ contract.id }}
    Accepted: {{ contract.accepted }}

    <UButton
      v-if="!contract.accepted"
      @click="$emit('accept', contract.id)"
    >
      Annehmen
    </UButton>
  </div>
</template>
