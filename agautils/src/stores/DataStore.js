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
		characterList: [],
		weaponGroupList: [],
		combinationSkillList: null,
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

			this.weaponGroupList = [];
			for (let i = 0; i < Utils.weaponGroupList.length; i++) {
				const name = Utils.weaponGroupList[i];
				const doc = this.loadDataFile(`./data/Weapon ${name} List.yaml`);
				this.weaponGroupList.push(doc);
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
