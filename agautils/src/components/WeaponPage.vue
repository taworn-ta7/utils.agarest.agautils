<template>
	<header>
		<h1>Choose Weapons</h1>
	</header>

	<main>
		<form class="container flex-row">
			<div style="width: 100%;">
				<select v-model="selectedWeapon" @change.prevent="refresh()" size="14" style="width: 100%;">
					<optgroup v-for="(group, index) in dataStore.selectedCharacter.weapons" :label="group">
						<option v-for="(weapon, index) in dataStore.weaponGroupDict[group]" :value="weapon.key">
							<span>{{ weapon.name }} {{
								weapon.slots.length > 0 ? "(" + weapon.slots.join(", ") + ")" : ""
							}}</span>
						</option>
					</optgroup>
				</select>
			</div>
		</form>
	</main>

	<footer>
		<span>
			<button @click.prevent="back()">Back</button>
		</span>
		<span>
			<button @click.prevent="next()">Next</button>
		</span>
	</footer>
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
			selectedWeapon: null,
		};
	},

	mounted() {
		this.selectedWeapon = this.dataStore.selectedWeapon ? this.dataStore.selectedWeapon.key : null;
		this.refresh();
	},

	methods: {
		refresh: function () {
		},

		next: function () {
			if (this.selectedWeapon) {
				this.dataStore.selectedWeapon = this.dataStore.getWeaponData(this.selectedWeapon);
				this.dataStore.findPossibleSkills();
				this.$router.push('/result')
			}
		},

		back: function () {
			this.$router.back();
		},
	},

};
</script>



<style scoped>

</style>
