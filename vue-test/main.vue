<template>
    <h1>{{ name }}</h1>
  </template>
  <script lang="ts">
  import { defineComponent } from "vue";
  export default defineComponent({
    setup() {
      const name = "和光不同尘";
      return {
        name,
      };
    },
  });
  </script>
  