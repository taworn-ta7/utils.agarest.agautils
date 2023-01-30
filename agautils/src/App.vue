<template>
	<div id="body">
		<router-view></router-view>
	</div>
</template>



<script>
import { useDataStore } from '@/stores/DataStore';

export default {

	name: 'App',

	components: {
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
