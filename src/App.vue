<script setup>
import { onBeforeMount } from "vue";
import ContextMenu from "./components/ContextMenu.vue";
import Loading from "./components/Loading.vue";
import Notification from "./components/Notification.vue";
import Viewer from "./components/Viewer.vue";
import { state } from "./store";

onBeforeMount(async () => {
	document.body.classList.add(state.darkMode ? 'dark' : 'light');
})
</script>

<template>
	<router-view />
	<Notification />
	<ContextMenu />
	<Loading />
	<Viewer />
</template>