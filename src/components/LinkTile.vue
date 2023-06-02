<script setup>
import { useSlots } from 'vue';
import FlatButton from './FlatButton.vue';
defineProps({
    to: String | Object,
    icon: String,
    text: String,
})
const slots = useSlots();
</script>

<template>
    <router-link :to="to" custom v-slot="{ navigate, isActive: active }">
        <FlatButton class=linktile :icon="icon" :active=active :class=active @click="navigate" :text=text>
            <template v-for="(index, name) in slots" v-slot:[name]="data">
                <slot :name="name" v-bind="data"></slot>
            </template>
        </FlatButton>
    </router-link>
</template>

<style lang=scss>
.linktile {
    @include hover-secondary-background;
    height: 2rem;
    padding: 4px 0;

    &.active>.linktile-text {
        color: var(--primary-color-dark)
    }
}

.linktile-icon {
    position: absolute;
    left: 2rem;
}

.linktile-text {
    position: absolute;
    left: 5rem;
    opacity: 1;
}
</style>