<script setup>
import { SVG_ICON_COLOR_PRIMARY } from '../reference';
import SvgIcon from './SvgIcon.vue';

defineProps({
    grid: Boolean,
    active: Boolean,
    file: Object
})
</script>

<template>
    <div class="file-item" :class="[{ active }, grid ? 'grid-item' : 'list-item']">
        <template v-if="grid">
            <SvgIcon class="file-item-icon" :color="SVG_ICON_COLOR_PRIMARY" :icon="file.isDir ? 'Folder' : 'File'" />
            <span>{{ file.basename }}</span>
        </template>
        <template v-else>
            <span>
                <SvgIcon class="file-item-icon" :color="SVG_ICON_COLOR_PRIMARY" :icon="file.isDir ? 'Folder' : 'File'" />
                <span>{{ file.basename }}</span>
            </span>
            <span>
                {{ new Date(file.lastmod).toLocaleString() }}
            </span>
        </template>
    </div>
</template>

<style lang="scss">
$item-height: calc($small-font-size * 1.5);
$item-text-height: $small-font-size;

.file-item {
    @include clickable;
    @include focus-secondary-background;
    @include hover-secondary-background;
    @include round-border;
    align-items: center;
    justify-content: space-between;
    padding: .2rem 0;
    font-size: $item-text-height;
    line-height: $item-text-height;

    &.active {
        @include primary-background-light;
    }

    >span {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
}

.list-item {
    @include flex-row;

    >span {
        @include flex-row;
        align-items: center;

        &:nth-child(1) {
            flex: 1;
        }

        &:nth-child(2) {
            width: 30%;
        }
    }
}

.grid-item {
    position: relative;
    width: 140px;
    height: 140px;

    >.icon {
        width: 100%;
        height: calc(100% - $item-text-height);
    }

    >span {
        position: absolute;
        width: 100%;
        bottom: 0;
        left: 0;
        text-align: center;
    }
}

.file-item-icon {
    min-height: calc($item-text-height * 2);
    min-width: calc($item-text-height * 2);
}
</style>