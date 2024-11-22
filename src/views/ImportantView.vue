<script setup lang="ts">
import { defineOptions } from 'vue';
import ZapayoComponent from '../components/ZapayoComponent.vue';

defineOptions({
  components: {
  ZapayoComponent,
  }
});
</script>

<template>
  <main>
    <ZapayoComponent/>
  </main>
</template>
