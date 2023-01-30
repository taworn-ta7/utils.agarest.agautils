<template>
	<header>
		<h1>Choose Skills</h1>
	</header>

	<main>
		<select v-model="selectedSkill" @change.prevent="refresh()" size="25">
			<option v-for="(skill, index) in dataStore.combinationSkillList" :value="skill.name">
				{{ skill.name }} {{ skill.slots.length > 0 ? "(" + skill.slots.join(", ") + ")" : "" }}
			</option>
		</select>
		<br />

		<button @click.prevent="back()">
			Back
		</button>
		<button @click.prevent="next()">
			Next
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
			selectedSkill: null,
		};
	},

	mounted() {
		this.selectedSkill = this.dataStore.selectedSkill ? this.dataStore.selectedSkill.name : null;
		this.refresh();
	},

	methods: {
		refresh: function () {
		},

		next: function () {
			if (this.selectedSkill) {
				this.dataStore.selectedSkill = this.dataStore.getSkillData(this.selectedSkill);
				this.dataStore.findPossibleWeapons();
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
header {
	line-height: 1.5;
}
</style>
