<script setup>
defineProps({
    title: String
})
</script>

<template>
    <div class=item-list>
        <span>{{ title }}</span>
        <div class=item-container>
            <slot />
        </div>
    </div>
</template>

<style lang="scss">
.item-list {
    @include flex-column;
    width: 100%;
    gap: 1.5rem;
}

.item-container {
    @include flex-wrap;
    gap: 1rem;
}
</style>