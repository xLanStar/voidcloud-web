<script setup>
</script>

<template>
    <!-- <div class="slider">
        <div class="slider-fill"></div>
        <div class="slider-dot"></div>
    </div> -->
    <input type="range" min="1" max="100" class="slider" />
</template>

<style lang="scss">
.slider {
    // @include flex-row;
    @include background-normal;
    height: 1rem;
    position: relative;

    // overflow: hidden;

    // .slider-fill {
    //     height: 100%;
    //     left: 0%;
    //     right: 0%;
    //     background-color: var(--primary-color-light);
    //     width: 100%;
    //     position:relative;
    // }

    // .slider-dot {
    //     @include background-dark;
    //     @include clickable;
    //     background-color: var(--primary-color-dark);
    //     border-radius: 50%;
    //     width: 1rem;
    //     height: 100%;
    //     top: 0;
    //     position: absolute;
    //     // transform: translateX(-50%);
    // }
}

</style>