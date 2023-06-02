<script setup>
import { useAttrs } from 'vue';

const props = defineProps({
    color: String,
    icon: String,
    click: Function,
    alt: String
})

const attrs = useAttrs()

</script>

<template>
    <svg class=icon :class="{ clickable: attrs.onClick }">
        <title v-if=alt>{{ alt }}</title>
        <use :xlink:href="`#i-${icon}`" :fill=color @click=click />
        <slot />
    </svg>
</template>
