import { defineStore } from 'pinia';
import Characters from '@/helpers/characters';

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
			Characters.loadCharacters();
		},

		// ----------------------------------------------------------------------

	},

});
