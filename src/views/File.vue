<script setup>
import { useRoute } from 'vue-router';
const { folder, file } = useRoute().query;

if (file) document.title = `${file} - iBox`;
console.log({ folder, file });
</script>

<template>

</template>