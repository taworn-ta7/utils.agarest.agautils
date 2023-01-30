<template>
	<header>
		<h1>Possible Result</h1>
	</header>

	<main>
		<div class="container flex-column" style="width: 100%;">
			<div v-html="possibleResultHtml"></div>
		</div>
	</main>

	<footer>
		<span>
			<button @click.prevent="back()">Back</button>
		</span>
		<span>
			<button @click.prevent="save()">Save</button>
			<button @click.prevent="restart()">Restart Again</button>
		</span>
	</footer>
</template>



<script>
import { useDataStore } from '@/stores/DataStore';
import { marked } from 'marked';

export default {

	components: {
	},

	data: function () {
		return {
			win: nw.Window.get(),
			dataStore: useDataStore(),
			possibleResult: null,
			possibleResultHtml: null,
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
			let text = `# ${char.name}

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
			this.possibleResultHtml = marked(text);
		},

		generatePossibleWeaponListReport: function () {
			const char = this.dataStore.selectedCharacter;
			const ok = this.dataStore.weaponOk;
			const l1 = this.dataStore.weaponLack1;
			const l2 = this.dataStore.weaponLack2;
			let text = `# ${char.name}

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
			this.possibleResultHtml = marked(text);
		},

		restart: function () {
			this.$router.go(-2);
		},

		save: async function () {
			try {
				const handle = await window.showSaveFilePicker({
					suggestedName: this.dataStore.selectedCharacter.name,
					types: [
						{
							description: "Text file",
							accept: { 'text/plain': ['.txt'] },
						},
						{
							description: "Markdown file",
							accept: { 'text/plain': ['.md'] },
						},
					],
				});

				const stream = await handle.createWritable();
				await stream.write(this.possibleResult);
				await stream.close();
			}
			catch (e) {
				// no file selected, ignore
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
