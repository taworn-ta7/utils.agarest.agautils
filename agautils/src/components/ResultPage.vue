<template>
	<header>
		<h1>Possible Result</h1>
	</header>

	<main>
		<textarea v-model="possibleResult" rows="25" cols="50" />
		<br />

		<button @click.prevent="back()">
			Back
		</button>
		<button @click.prevent="save()">
			Save
		</button>
	</main>
</template>



<script>
import { useDataStore } from '@/stores/DataStore';

export default {

	components: {
	},

	data: function () {
		return {
			win: nw.Window.get(),
			dataStore: useDataStore(),
			possibleResult: null,
		};
	},

	mounted() {
		this.possibleResult = this.dataStore.possibleResult;
		this.refresh();
	},

	methods: {
		refresh: function () {
		},

		save: function () {
			alert("Will be implement!")
		},

		back: function () {
			this.$router.back();
		},
	},

};
</script>



<style scoped>
header {
	line-height: 1.5;
}
</style>
