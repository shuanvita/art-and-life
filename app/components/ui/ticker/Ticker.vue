<script setup lang="ts">
interface Props {
  items: string[]
  speed?: number
  reverse?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  speed: 40,
  reverse: false,
})

const duration = computed(() => `${props.speed}s`)
const direction = computed(() => (props.reverse ? 'reverse' : 'normal'))
</script>

<template>
  <div
    class="ticker border-y border-stroke overflow-hidden py-4"
    role="marquee"
    aria-label="Ticker"
  >
    <div class="ticker__track flex w-max">
      <ul
        v-for="copy in 2"
        :key="copy"
        :aria-hidden="copy === 2 ? 'true' : undefined"
        class="ticker__list flex items-center shrink-0"
      >
        <li
          v-for="(item, i) in items"
          :key="`${copy}-${i}`"
          class="ticker__item flex items-center text-fg-muted font-sans text-sm uppercase whitespace-nowrap"
        >
          <span class="px-10">{{ item }}</span>
          <span
            class="ticker__dot inline-block w-1 h-1 rounded-full bg-accent shrink-0"
            aria-hidden="true"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.ticker__track {
  animation: ticker-scroll v-bind(duration) linear infinite;
  animation-direction: v-bind(direction);
}

@keyframes ticker-scroll {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(-50%, 0, 0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .ticker__track {
    animation: none;
  }
}

.ticker:hover .ticker__track {
  animation-play-state: paused;
}
</style>
