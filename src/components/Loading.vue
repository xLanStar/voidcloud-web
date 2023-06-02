<script setup>
import { state } from '../store';
</script>

<template>
    <div v-if=state.loading id=loading>
		<div v-for="(k) in Array(9)" :key=k />
	</div>
</template>

<style lang="scss">

#loading {
	@include flex-wrap;
	width: 5rem;
	gap: 1rem;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);

	>div {
        @include primary-background-light;
		width: 1rem;
		height: 1rem;
		border-radius: 50%;
		animation: anim .5s ease alternate infinite;

		@for $i from 1 through 9 {
			&:nth-child(#{$i}) {
				animation-delay: calc(random(10) / 10) + s;
			}
		}
	}
}

@keyframes anim {
	from {
		scale: .4;
	}

	to {
		scale: 1;
	}
}
</style>