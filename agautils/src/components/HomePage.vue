<template>
	<header>
		<h1>Agarest Utilities</h1>
	</header>

	<main>
		<form class="container flex-row">
			<div>
				<div style="width: 10rem;">
					<select v-model="selectedCharacter" @change.prevent="refresh()" size="12" style="width: 100%;">
						<option v-for="(character, index) in dataStore.characterList">{{
							character.name
						}}
						</option>
					</select>
				</div>

				<input type="checkbox" v-model="proofOfValor" id="proof-of-valor" @change.prevent="refresh()" />
				<label for="proof-of-valor" class="label-right">Proof of Valor</label>
			</div>

			<div class="part-right">
				<textarea v-model="resultSlots" rows="14" cols="25" />
			</div>

			<div class="part-right" style="width: 100%; max-width: 600px;">
				<img :alt="selectedCharacter" :src="`/img/${selectedCharacter}.jpg`" style="width: 100%;" />
			</div>
		</form>
	</main>

	<footer>
		<span>
			<button @click.prevent="exit()">Exit</button>
		</span>
		<span>
			<button @click.prevent="weapon()">Choose Weapon</button>
			<button @click.prevent="skill()">Choose Skill</button>
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

</style>
