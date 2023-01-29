<template>
	<router-view></router-view>
</template>



<script>
import { useDataStore } from '@/stores/DataStore';
import HomePage from '@/components/HomePage.vue';

export default {

	name: 'App',

	components: {
		HomePage,
	},

	data: function () {
		return {
		};
	},

	mounted() {
		useDataStore().setup();
		this.$router.replace('/');
	},

	methods: {
	},

};
</script>



<style scoped>

</style>
