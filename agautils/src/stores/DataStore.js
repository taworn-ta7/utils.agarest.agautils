import { defineStore } from 'pinia';
import Utils from '../helpers/utils';

/**
 * Data singleton class.
 */
export const useDataStore = defineStore({

	id: 'DataStore',

	state: () => ({
	}),

	actions: {
		/**
		 * Loads all data.
		 */
		async setup() {
			console.log(JSON.stringify(Utils.characterList, null, 2));
		},

		// ----------------------------------------------------------------------

	},

});
