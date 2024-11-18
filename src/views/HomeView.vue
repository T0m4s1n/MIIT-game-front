<script setup lang="ts">
import { defineOptions } from 'vue';
import HeroComponent from '../components/HeroComponent.vue';

defineOptions({
  components: {
  HeroComponent,
  }
});
</script>

<template>
  <main>
    <HeroComponent/>
  </main>
</template>
