<template>
	<header>
		<h1>Agarest Utilities</h1>
	</header>

	<main>
		<ul>
			<li>
				<button @click.prevent="showCombinationSkills()">
					Choose Player + Weapon, show possible Combination Skills
				</button>
			</li>
			<li>
				<button @click.prevent="showWeapons()">
					Choose Player + Combination Skills, show usable Weapons
				</button>
			</li>
			<li>
				<button @click.prevent="exit()">
					Exit
				</button>
			</li>
		</ul>
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
		};
	},

	mounted() {
		useDataStore().setup();
	},

	methods: {
		showCombinationSkills: function () {
		},

		showWeapons: function () {
			this.$router.push('/character');
		},

		exit: function () {
			this.win.close();
		},

	},

};
</script>



<style scoped>
header {
	line-height: 1.5;
}
</style>
