<script setup lang="ts">
import { defineOptions } from 'vue';
import GameComponent from '../components/GameComponent.vue';

defineOptions({
  components: {
  GameComponent,
  }
});
</script>

<template>
  <main>
    <GameComponent/>
  </main>
</template>
