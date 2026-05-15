<script setup lang="ts">
import type { MarqueeTextProps } from './MarqueeText.types'

const { items, speed = 40, reverse = false, ariaLabel = 'Scrolling text' } = defineProps<MarqueeTextProps>()

const duration = computed(() => `${Math.max(1, speed)}s`)
const direction = computed(() => (reverse ? 'reverse' : 'normal'))
</script>

<template>
  <div
      v-if="items?.length"
      class="marquee overflow-hidden py-4 focus:outline-none focus-visible:ring-1 focus-visible:ring-accent"
      :aria-label="ariaLabel"
      tabindex="0"
  >
    <div class="marquee__track flex w-max">
      <ul
          v-for="copy in 2"
          :key="copy"
          :aria-hidden="copy === 2 ? 'true' : undefined"
          class="flex items-center shrink-0"
      >
        <li
            v-for="(item, i) in items"
            :key="`${copy}-${i}`"
            class="flex items-center text-fg-muted font-sans text-[11px]/[1.5] tracking-[2.2px] uppercase whitespace-nowrap"
        >
          <span class="px-8">{{ item }}</span>
          <span
              class="inline-block w-1.5 h-1.5 rounded-full bg-accent shrink-0"
              aria-hidden="true"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.marquee__track {
  animation: marquee-scroll v-bind(duration) linear infinite;
  animation-direction: v-bind(direction);
}

@media (prefers-reduced-motion: reduce) {
  .marquee__track {
    animation: none;
    flex-wrap: wrap;
    width: 100%;
  }
  .marquee__track > ul[aria-hidden="true"] {
    display: none;
  }
}

/* iOS Safari :hover после тапа залипает: fix */
@media (hover: hover) {
  .marquee:hover .marquee__track {
    animation-play-state: paused;
  }
}
.marquee:focus-within .marquee__track {
  animation-play-state: paused;
}

@keyframes marquee-scroll {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(-50%, 0, 0);
  }
}
</style>
