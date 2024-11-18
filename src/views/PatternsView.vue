<script setup lang="ts">
import { defineOptions } from 'vue';
import PatternsComponent from '../components/Patterns.vue';

defineOptions({
  components: {
  PatternsComponent
  }
});
</script>

<template>
  <main>
    <PatternsComponent/>
  </main>
</template>
