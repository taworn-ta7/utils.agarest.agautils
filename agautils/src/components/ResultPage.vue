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
		this.refresh();
	},

	methods: {
		refresh: function () {
			if (this.dataStore.selectedUi === 1) {
				this.generatePossibleSkillListReport();
			}
			else if (this.dataStore.selectedUi === 2) {
				this.generatePossibleWeaponListReport();
			}
		},

		formatSlots: function (slots) {
			let result = "";
			for (let i = 0; i < slots.length; i++)
				result += `- ${slots[i]}
`;
			return result;
		},

		generatePossibleSkillListReport: function () {
			const char = this.dataStore.selectedCharacter;
			const ok = this.dataStore.skillOk;
			const l1 = this.dataStore.skillLack1;
			const l2 = this.dataStore.skillLack2;
			let text = `${char.name}

Weapon: ${this.dataStore.selectedWeapon.name}
${this.formatSlots(this.dataStore.selectedWeapon.slots)}
Unit Slots:
- ${char.slots[0]}
- ${char.slots[1]}
- ${char.slots[2]}
- ${char.slots[3]}
`;
			if (this.dataStore.proofOfValor) {
				text += `- ${char.slots[4]}
- ${char.slots[5]}
`;
			}

			text += `
Can Use Skill(s):
`;
			for (let i = 0; i < ok.length; i++) {
				text += `- ${ok[i].name}
`;
			}

			text += `
Lack 1 Slot
`;
			for (let i = 0; i < l1.length; i++) {
				const item = l1[i];
				text += `- ${item[0].name} (${item[1][0]})
`;
			}

			text += `
Lack 2 Slots
`;
			for (let i = 0; i < l2.length; i++) {
				const item = l2[i];
				text += `- ${item[0].name} (${item[1][0]}, ${item[1][1]})
`;
			}

			this.possibleResult = text;
		},

		generatePossibleWeaponListReport: function () {
			const char = this.dataStore.selectedCharacter;
			const ok = this.dataStore.weaponOk;
			const l1 = this.dataStore.weaponLack1;
			const l2 = this.dataStore.weaponLack2;
			let text = `${char.name}

Unit Slots:
- ${char.slots[0]}
- ${char.slots[1]}
- ${char.slots[2]}
- ${char.slots[3]}
`;
			if (this.dataStore.proofOfValor) {
				text += `- ${char.slots[4]}
- ${char.slots[5]}
`;
			}

			text += `
Skill: ${this.dataStore.selectedSkill.name}
${this.formatSlots(this.dataStore.selectedSkill.slots)}
Can Use Weapon(s):
`;
			for (let i = 0; i < ok.length; i++) {
				text += `- ${ok[i].name}
`;
			}

			text += `
Lack 1 Slot
`;
			for (let i = 0; i < l1.length; i++) {
				const item = l1[i];
				text += `- ${item[0].name} (${item[1][0]})
`;
			}

			text += `
Lack 2 Slots
`;
			for (let i = 0; i < l2.length; i++) {
				const item = l2[i];
				text += `- ${item[0].name} (${item[1][0]}, ${item[1][1]})
`;
			}

			this.possibleResult = text;
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
