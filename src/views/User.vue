<script setup>
import { onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import Header from '../components/Header.vue';
import axiosapi from '../helper/APIHelpr';
import { PROFILE_API, USER_API } from '../reference';
import { state } from '../store';

const route = useRoute();

const { id } = route.params;

const user = reactive({
	isSelf: false,
	data: {
		id: '',
		name: '',
		introduction: ''
	}
});

onMounted(async () => {
	if (state.user && id === state.user.id)
		user.isSelf = true;
	user.data = (await axiosapi.get(`${USER_API}/${id}`)).user;
	console.log(user.data);
});
</script>

<template>
	<div class=main-content>
		<Header :icon="`${PROFILE_API}/${id}`" :title="user.data.name" :description="user.data.introduction">
		</Header>
		<div id=user-content>
		</div>
	</div>
</template>