<script setup>
import FlagButton from './FlatButton.vue';
defineProps({
    option: Object
})
</script>

<template>
    <FlagButton class="option" :icon="option.icon" :active="true" :text="option.text" @click="option.click" />
</template>

<style lang="scss">
.option {
    @include hover-secondary-background;
    @include round-border;
    padding: 4px 6px;
}
</style>