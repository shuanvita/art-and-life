<script setup lang="ts">
const open = defineModel<boolean>({ default: false });

const links = useNavLinks();

const close = () => {
  open.value = false;
};

if (import.meta.client) {
  watch(open, (v) => {
    document.body.style.overflow = v ? 'hidden' : '';
  }, { immediate: true });

  const desktop = window.matchMedia('(min-width: 1024px)');
  const onDesktopChange = (e: MediaQueryListEvent) => {
    if (e.matches) close();
  };
  desktop.addEventListener('change', onDesktopChange);

  const onKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && open.value) close();
  };
  window.addEventListener('keydown', onKeydown);

  onBeforeUnmount(() => {
    document.body.style.overflow = '';
    desktop.removeEventListener('change', onDesktopChange);
    window.removeEventListener('keydown', onKeydown);
  });
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200"
      leave-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        role="dialog"
        aria-modal="true"
        class="fixed inset-0 z-50 bg-emerald text-white flex flex-col lg:hidden"
      >
        <div class="flex items-center justify-between container py-6 border-b border-stroke-light">
          <AppHeaderLogo class="text-white text-base tracking-[2.1px]" />
          <button type="button" aria-label="Close menu" @click="close">
            <i-close class="w-6 h-6 text-white" />
          </button>
        </div>

        <nav class="container py-20 flex-1 overflow-y-auto">
          <ul class="flex flex-col gap-8">
            <li
              v-for="link in links"
              :key="link.label"
              class="font-serif text-4xl/[1] text-white"
            >
              <NuxtLink :to="link.href" exact-active-class="text-accent-dark" @click="close">
                {{ link.label }}
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
    </Transition>
  </Teleport>
</template>