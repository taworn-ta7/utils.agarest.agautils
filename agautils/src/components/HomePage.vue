<template>
	<header>
		<h1>Agarest Utilities</h1>
	</header>

	<main>
		<select v-model="selectedCharacter" @change.prevent="refresh()">
			<option v-for="(character, index) in dataStore.characterList">{{
				character.name
			}}
			</option>
		</select>
		<br />

		<input type="checkbox" v-model="proofOfValor" id="proof-of-valor" @change.prevent="refresh()" />
		<label for="proof-of-valor">Proof of Valor</label>
		<br />

		<textarea v-model="resultSlots" rows="12" cols="50" />
		<br />

		<button @click.prevent="exit()">
			Exit
		</button>
		<button @click.prevent="weapon()">
			Choose Weapon
		</button>
		<button @click.prevent="skill()">
			Choose Skill
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
			selectedCharacter: null,
			proofOfValor: false,
			resultSlots: null,
		};
	},

	mounted() {
	},

	methods: {
		refresh: function () {
			const data = this.dataStore.getCharacterData(this.selectedCharacter);
			console.log(`data: ${JSON.stringify(data)}, proof of valor=${this.proofOfValor}`);
			let text = `${data.name}

Unit Slots:
- ${data.slots[0]}
- ${data.slots[1]}
- ${data.slots[2]}
- ${data.slots[3]}
`;
			if (this.proofOfValor) {
				text += `
Upgrade Slots:
- ${data.povSlots[0]}
- ${data.povSlots[1]}
`;
			}
			this.resultSlots = text;
		},

		weapon: function () {
			this.$router.push('/weapon')
		},

		skill: function() {
			this.$router.push('/skill')
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
