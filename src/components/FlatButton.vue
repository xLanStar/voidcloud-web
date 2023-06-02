<script setup>
import { SVG_ICON_COLOR_PRIMARY, SVG_ICON_COLOR_SECONDARY } from '../reference';
import SvgIcon from './SvgIcon.vue';

const props = defineProps({
    active: Boolean,
    icon: String,
    text: String
})
</script>

<template>
    <div class=flat-button>
        <span>
            <slot name="lead" />
            <SvgIcon v-if="icon" :color="active ? SVG_ICON_COLOR_PRIMARY : SVG_ICON_COLOR_SECONDARY" :icon="icon" />
        </span>
        <span class="content">
            {{ text }}
            <slot />
        </span>
        <span>
            <slot name="tail" />
        </span>
    </div>
</template>

<style lang=scss>
.flat-button {
    @include clickable;
    @include flex-row;
    align-items: center;
    gap: 1rem;
    position: relative;
    transition: background-color .1s;

    >.content {
        overflow: hidden;
        white-space: nowrap;
    }

    >span{
        @include flex-row;
        align-items: center;
    }

    &.primary {
        @include primary-background-light;
        @include hover-primary-background;
        @include focus-primary-background;
    }

    &.secondary {
        @include secondary-background-light;
        @include hover-secondary-background;
        @include focus-secondary-background;
    }

    &.round {
        @include round-border;
    }

    &.shadow {
        @include border-shadow;

        &:focus,
        &:hover {
            @include dark-border-shadow;
            outline: 2px solid var(--color);
        }
    }
}
</style>