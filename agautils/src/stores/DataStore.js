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
		weaponGroupList: [],
		weaponGroupDict: {},
		combinationSkillList: null,

		// selected character and proof of valor
		selectedCharacter: "Leonhardt",
		proofOfValor: true,

		// choose weapons or skills
		// 1 = choose weapons
		// 2 = choose skills
		selectedUi: 0,

		// if selectedUi === 1
		// selected weapon
		characterWeaponable: null,
		selectedWeapon: null,
		possibleSkills: null,

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
			this.characterList = [];
			for (let i = 0; i < Utils.characterList.length; i++) {
				const name = Utils.characterList[i];
				const doc = this.loadDataFile(`./data/Character ${name}.yaml`);
				this.characterList.push(doc);
			}

			this.weaponGroupList = Utils.weaponGroupList;
			this.weaponGroupDict = {};
			for (let i = 0; i < this.weaponGroupList.length; i++) {
				const name = this.weaponGroupList[i];
				const doc = this.loadDataFile(`./data/Weapon ${name} List.yaml`);
				this.weaponGroupDict[name] = doc;
			}

			{
				const doc = this.loadDataFile(`./data/Combination Skill List.yaml`);
				this.combinationSkillList = doc;
			}
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
	},

});
