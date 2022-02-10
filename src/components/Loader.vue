<template>
  <div class="d-block text-center">
    <span class="spinner-border-md text-primary spinner-border"></span>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Loader'
})
</script>

<style lang="scss" scoped>
.spinner-border-xs {
  width: 1rem;
  height: 1rem;
  border-width: .15rem;
}
</style>
