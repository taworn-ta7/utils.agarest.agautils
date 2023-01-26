<template>
	<main>
		<ul>
			<li>
				<button @click.prevent="this.$router.go(-1)">Back</button>
			</li>
		</ul>
	</main>
</template>



<script>
export default {

	components: {
	},

	data: function () {
		return {
		};
	},

	mounted() {
	},

	methods: {
	},

};
</script>



<style scoped>

</style>
