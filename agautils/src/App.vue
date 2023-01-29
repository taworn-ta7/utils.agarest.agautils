<template>
	<router-view></router-view>
</template>



<script>
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
		this.$router.replace('/');
	},

	methods: {
	},

};
</script>



<style scoped>

</style>
