<template>
  <button class="ds-button"><slot /></button>
</template>

<style scoped>
.ds-button {
  background-color: var(--primary-color, #2563eb);
  font-family: var(--font-family, sans-serif);
  border-radius: var(--border-radius, 4px);
  color: white;
  padding: 0.5rem 1rem;
}
</style>