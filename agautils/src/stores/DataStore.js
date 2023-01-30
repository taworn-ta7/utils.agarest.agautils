const fs = require('fs');
const YAML = require('yaml');
import { defineStore } from 'pinia';
import Utils from '../helpers/utils';

/**
 * Data singleton class.
 */
export const useDataStore = defineStore({

	id: 'DataStore',

	state: () => ({
		// preloaded data
		characterList: [],
		weaponList: [],
		weaponGroupList: [],
		weaponGroupDict: {},
		combinationSkillList: null,

		// selected character and proof of valor
		selectedCharacter: null,
		proofOfValor: true,

		// choose weapons or skills
		// 1 = choose weapons
		// 2 = choose skills
		selectedUi: 0,

		// if selectedUi === 1
		// selected weapon
		selectedWeapon: null,
		skillOk: null,
		skillLack1: null,
		skillLack2: null,

		// if selectedUi === 2
		// selected skill
		selectedSkill: null,
		possibleWeapons: null,

		// possible result
		possibleResult: null,
	}),

	actions: {
		/**
		 * Loads all data.
		 */
		async setup() {
			// loads characters
			this.characterList = [];
			for (let i = 0; i < Utils.characterList.length; i++) {
				const name = Utils.characterList[i];
				const doc = this.loadDataFile(`./data/Character ${name}.yaml`);
				this.characterList.push(doc);
			}

			// loads weapons
			this.weaponList = [];
			this.weaponGroupList = Utils.weaponGroupList;
			this.weaponGroupDict = {};
			for (let i = 0; i < this.weaponGroupList.length; i++) {
				const name = this.weaponGroupList[i];
				const doc = this.loadDataFile(`./data/Weapon ${name} List.yaml`);
				this.weaponGroupDict[name] = doc;
				for (let i = 0; i < doc.length; i++)
					this.weaponList.push(doc[i]);
			}

			// loads combination skills
			const doc = this.loadDataFile(`./data/Combination Skill List.yaml`);
			this.combinationSkillList = doc;
			for (let i = 0; i < this.combinationSkillList.length; i++) {
				// adds computation helper
				const skill = this.combinationSkillList[i];
				skill.compute = {
					Fire: 0,
					Water: 0,
					Thunder: 0,
					Wind: 0,
					Earth: 0,
					Dark: 0,
					Light: 0,
					Extra: 0,
					General: 0,
					Power: 0,
					Combo: 0,
					Special: 0,
				};
				for (let j = 0; j < skill.slots.length; j++) {
					skill.compute[skill.slots[j]]++;
				}
			}

			// start with character: Leonhardt
			this.selectedCharacter = this.getCharacterData("Leonhardt");
		},

		// ----------------------------------------------------------------------

		loadDataFile(file) {
			const fh = fs.readFileSync(file, 'utf8');
			const doc = YAML.parse(fh);
			return doc;
		},

		getCharacterData(characterName) {
			return this.characterList.find((e) => e.name === characterName);
		},

		getWeaponData(weaponKey) {
			return this.weaponList.find((e) => e.key === parseInt(weaponKey));
		},

		// ----------------------------------------------------------------------

		findPossibleSkills() {
			// computes character + weapon slots
			const player = {
				Fire: 0,
				Water: 0,
				Thunder: 0,
				Wind: 0,
				Earth: 0,
				Dark: 0,
				Light: 0,
				Extra: 0,
				General: 0,
				Power: 0,
				Combo: 0,
				Special: 0,
			};
			const slots = this.selectedCharacter.slots;
			player[slots[0]]++;
			player[slots[1]]++;
			player[slots[2]]++;
			player[slots[3]]++;
			if (this.proofOfValor) {
				player[slots[4]]++;
				player[slots[5]]++;
			}
			const weaponSlots = this.selectedWeapon.slots;
			for (let i = 0; i < weaponSlots.length; i++) {
				player[weaponSlots[i]]++;
			}
			//console.log(`player #1: ${JSON.stringify(player, null, 2)}`);

			// loop for all combination skills
			this.skillOk = [];
			this.skillLack1 = [];
			this.skillLack2 = [];
			for (let i = 0; i < this.combinationSkillList.length; i++) {
				// computation
				const skill = this.combinationSkillList[i];
				const c = skill.compute;
				const p = {
					Fire: player.Fire - c.Fire,
					Water: player.Water - c.Water,
					Thunder: player.Thunder - c.Thunder,
					Wind: player.Wind - c.Wind,
					Earth: player.Earth - c.Earth,
					Dark: player.Dark - c.Dark,
					Light: player.Light - c.Light,
					Extra: player.Extra - c.Extra,
					General: player.General - c.General,
					Power: player.Power - c.Power,
					Combo: player.Combo - c.Combo,
					Special: player.Special - c.Special,
				};
				//console.log(`${skill.name}: after compute ${JSON.stringify(p, null, 2)}`);

				// gets result
				const a = [
					p.Fire,
					p.Water,
					p.Thunder,
					p.Wind,
					p.Earth,
					p.Dark,
					p.Light,
					p.Extra,
					p.General,
					p.Power,
					p.Combo,
					p.Special,
				];
				if (a.every((v) => v >= 0)) {
					// this skill is ok
					//console.log(`${skill.name}: ok`)
					this.skillOk.push(skill)
				}
				else {
					let missing = [];
					for (let j = 0; j < a.length; j++) {
						if (a[j] < 0) {
							const slot = Utils.slotList[j];
							for (let k = 0; k < -a[j]; k++)
								missing.push(slot);
						}
					}
					//console.log(`${skill.name}: lack ${missing}`);
					if (missing.length === 1) {
						this.skillLack1.push([
							skill,
							missing,
						])
					}
					else if (missing.length === 2) {
						this.skillLack2.push([
							skill,
							missing,
						])
					}
				}
			}
		},
	},

});
