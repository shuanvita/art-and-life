<script setup lang="ts">
import Ticker from "../components/ui/ticker/Ticker.vue";

useSeoMeta({
  title: 'Home',
  description: 'Home Page',
  ogTitle: 'Home',
  ogDescription: 'Home Page',
  ogType: 'website',
  ogSiteName: 'Art & Life',
})
</script>

<template>
  <div class="text-2xl container">
    <UiHeading class="text-foreground text-center mb-8 pt-20">Art <span class="text-accent">&amp;</span> Life</UiHeading>
    <Ticker :items="['NEWS TICKER', 'LOREM IPSUM DOLOR SIT AMET, CONSECTETUR ADIPISCING ELIT', 'LATEST UPDATES']" />
  </div>
</template>
