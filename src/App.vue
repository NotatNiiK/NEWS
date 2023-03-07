<template>
    <div class="app">
      <Transition>
        <RouterView></RouterView>
      </Transition>
    </div>
</template>

<style lang="scss">
.v-enter-active,
.v-leave-active {
  transition: opacity .6s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0.2;
}
</style>
