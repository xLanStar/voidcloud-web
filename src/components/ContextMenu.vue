<script setup>
import { computed, onBeforeMount, ref } from 'vue';
import { hideMenu, menuData } from '../store';
import Option from './Option.vue';

const contextmenu = ref(null);

const pos = computed(() => {
    if (!contextmenu.value) return null;
    const horizontal = (menuData.x + contextmenu.value.offsetWidth >= window.innerWidth) ? { right: `${window.innerWidth - menuData.x}px` } : { left: `${menuData.x}px` }
    const vertical = (menuData.y + contextmenu.value.offsetHeight >= window.innerHeight) ? { bottom: `${window.innerHeight - menuData.y}px` } : { top: `${menuData.y}px` }
    return { ...horizontal, ...vertical };
})

onBeforeMount(() => {
    window.addEventListener('contextmenu', e => e.preventDefault());
})
</script>

<template>
    <div v-if="menuData.active" ref="contextmenu" :class="{ show: menuData.show }" id="contextmenu" :style="pos" @click.stop
        @mousedown.stop @contextmenu.stop.prevent>
        <Option v-for="(option, idx) in menuData.options" :key="idx" :option="option" @click="hideMenu" />
    </div>
</template>

<style lang="scss">
#contextmenu {
    @include flex-column;
    @include border-shadow;
    @include round-border;
    @include background-light;
    z-index: 9;
    position: fixed;
    padding: .5rem;
    gap: .5rem;
    opacity: 0;
    transform: translateY(-1rem);
    transition: opacity .2s ease-out, transform .1s ease-in;

    &.show {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>