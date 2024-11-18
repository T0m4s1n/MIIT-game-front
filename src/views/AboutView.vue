<script setup lang="ts">
import { defineOptions } from 'vue';
import AboutComponent from '../components/About.vue';

defineOptions({
  components: {
  AboutComponent,
  }
});
</script>

<template>
  <main>
    <AboutComponent/>
  </main>
</template>
