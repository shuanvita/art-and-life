<script setup lang="ts">
const links = useNavLinks();
</script>

<template>
  <nav>
    <ul class="flex items-center gap-10">
      <li v-for="link in links" :key="link.label" class="text-sm tracking-[1.8px] uppercase font-bold font-sans text-foreground">
        <NuxtLink :to="link.href" exact-active-class="text-accent-dark">{{ link.label }}</NuxtLink>
      </li>
    </ul>
  </nav>
</template>