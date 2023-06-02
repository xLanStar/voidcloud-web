<script setup>
import { onBeforeMount, reactive, ref } from "vue";
import Option from "./Option.vue";

defineProps({
    options: Array,
});

const menu = ref(null);
const active = ref(false);
const _pos = reactive({
    x: 0,
    y: 0,
});

const show = (x, y) => {
    console.log("show");
    _pos.x = x;
    _pos.y = y;
    // if (x + menu.value)
    active.value = true;
    console.log(menu.value);
};

onBeforeMount(() => {
    window.addEventListener("click", () => {
        active.value = false;
    });
});
</script>

<template>
    <slot v-bind:active="active" v-bind:show="show" />
    <div ref="menu" v-if="active" class="menu" :style="{ right: `${_pos.x}px`, top: `${_pos.y}px` }" @click.stop>
        <Option v-for="(option, idx) in options" :key="idx" :option="option" @click="active = false" />
    </div>
</template>

<style lang="scss">
.menu {
    @include flex-column;
    @include border-shadow;
    @include round-border;
    @include background-light;
    z-index: 9;
    position: fixed;
    padding: 0.5rem;
    gap: 0.5rem;
}
</style>
