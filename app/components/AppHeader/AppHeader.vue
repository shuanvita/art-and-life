<script setup lang="ts">
const menuOpen = ref(false);
</script>

<template>
  <header class="flex items-center justify-between container py-6 lg:py-10 border-b border-stroke">
    <AppHeaderLogo class="text-foreground text-base lg:text-md lg:tracking-[2.7px] tracking-[2.1px]"/>
    <AppHeaderNav class="lg:block hidden" />
    <button type="button" class="lg:hidden block" aria-label="Open menu" @click="menuOpen = true">
      <i-burger class="text-foreground w-6 h-6"/>
    </button>
    <AppHeaderMobileMenu v-model="menuOpen" />
  </header>
</template>