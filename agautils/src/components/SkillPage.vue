<template>
	<header>
		<h1>Choose Skills</h1>
	</header>

	<main>
		<form class="container flex-row">
			<div style="width: 100%;">
				<select v-model="selectedSkill" @change.prevent="refresh()" size="14" style="width: 100%;">
					<option v-for="(skill, index) in dataStore.combinationSkillList" :value="skill.name">
						{{ skill.name }} {{ skill.slots.length > 0 ? "(" + skill.slots.join(", ") + ")" : "" }}
					</option>
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

</style>
