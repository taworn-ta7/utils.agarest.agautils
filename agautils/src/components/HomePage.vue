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

		<textarea v-model="resultSlots" rows="14" cols="40" />
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
		this.selectedCharacter = this.dataStore.selectedCharacter ? this.dataStore.selectedCharacter.name : null;
		this.proofOfValor = this.dataStore.proofOfValor;
		this.refresh();
	},

	methods: {
		formatWeaponList(weapons) {
			let result = "";
			for (let i = 0; i < weapons.length; i++)
				result += `- ${weapons[i]}
`;
			return result;
		},

		refresh: function () {
			if (this.selectedCharacter) {
				const data = this.dataStore.getCharacterData(this.selectedCharacter);
				let text = `${data.name}

Weapons:
${this.formatWeaponList(data.weapons)}
Unit Slots:
- ${data.slots[0]}
- ${data.slots[1]}
- ${data.slots[2]}
- ${data.slots[3]}
`;
				if (this.proofOfValor) {
					text += `- ${data.slots[4]}
- ${data.slots[5]}
`;
				}
				this.resultSlots = text;
			}
			else {
				this.resultSlots = "";
			}
		},

		weapon: function () {
			if (this.selectedCharacter) {
				this.dataStore.selectedCharacter = this.dataStore.getCharacterData(this.selectedCharacter);
				this.dataStore.proofOfValor = this.proofOfValor;
				this.dataStore.selectedUi = 1;
				this.dataStore.selectedWeapon = null;
				this.$router.push('/weapon');
			}
		},

		skill: function () {
			if (this.selectedCharacter) {
				this.dataStore.selectedCharacter = this.dataStore.getCharacterData(this.selectedCharacter);
				this.dataStore.proofOfValor = this.proofOfValor;
				this.dataStore.selectedUi = 2;
				this.dataStore.selectedSkill = null;
				this.$router.push('/skill');
			}
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
