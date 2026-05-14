<script setup lang="ts">
type HeadingLevel = 1 | 2 | 3 | 4

interface Props {
  level?: HeadingLevel
  as?: `h${HeadingLevel}`
}

const props = withDefaults(defineProps<Props>(), {
  level: 1,
})

const sizeClasses: Record<HeadingLevel, string> = {
  1: 'text-display tracking-tight',
  2: 'text-4xl',
  3: 'text-3xl',
  4: 'text-xl',
}

const tag = computed(() => props.as ?? (`h${props.level}` as const))
const sizeClass = computed(() => sizeClasses[props.level])
</script>

<template>
  <component
    :is="tag"
    :class="[
      'font-serif font-regular text-foreground',
      sizeClass,
    ]"
  >
    <slot />
  </component>
</template>