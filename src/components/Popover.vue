<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
    title: String,
    placement: String,
    content: String
})

const active = ref(false);
const shown = ref(false);

let timeout;

const show = () => {
    if (timeout) clearTimeout(timeout);
    active.value = true;
    timeout = setTimeout(() => {
        shown.value = true;
    }, 10);
};
const hide = () => {
    if (timeout) clearTimeout(timeout);
    shown.value = false;
    setTimeout(() => {
        active.value = false;
    }, 200)
};

const contentName = computed(() => props.content || 'content')

</script>

<template>
    <div class="popover-container">
        <slot v-bind="{ show, hide }"/>
        <div v-if="active" class="popover" :class="[placement, { shown }]" @click.stop>
            <div class="popover-arrow" />
            <div class="popover-title" v-if="title">{{ title }}</div>
            <div class="popover-content">
                <slot :name="contentName" />
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.popover-container {
    position: relative;
}

.popover {
    @include border-shadow;
    @include round-border;
    background-color: white;
    position: absolute;
    width: max-content;
    opacity: 0;
    transition: opacity .2s ease-out;

    &.shown {
        opacity: 1;
    }

    &.topRight {
        top: 0;
        left: 100%;
        transform: translateX(1rem);

        > .popover-arrow {
            top: max(5%, 12px);
            left: 0;
            transform: translateX(-50%) rotate(135deg);
        }
    }

    &.right {
        top: 50%;
        left: 100%;
        transform: translate(1rem, -50%);

        > .popover-arrow {
            top: 50%;
            left: 0;
            transform: translate(-50%, -50%) rotate(135deg);
        }
    }
    
    &.bottomRight {
        bottom: 0;
        left: 100%;
        transform: translateX(1rem);

        > .popover-arrow {
            bottom: max(5%, 12px);
            left: 0;
            transform: translateX(-50%) rotate(135deg);
        }
    }
}

.popover-arrow {
    border-top-color: transparent;
    border-right-color: white;
    border-bottom-color: white;
    border-left-color: transparent;
    box-shadow: 3px 3px 7px #00000012;
    position: absolute;
    background-color: transparent;
    border-style: solid;
    border-width: .5rem;
}

.popover-content {
    padding: .5rem;
}

.popover-title {
    border-bottom: 1px solid black;
    font-size: var(--medium-font-size);
    line-height: var(--medium-font-size);
    margin: .5rem;
}
</style>