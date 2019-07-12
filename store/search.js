
export const state = () => ({
    suggestions: []
})



export const getters = {
	suggestions: state => state.suggestions,

}


export const actions = {
	findJob({commit}, payload) {
		return new Promise((resolve, reject) => {
			this.$api.search(payload).then(res => {
				commit('suggestions', res);
				resolve();
			}).catch(reject);
		})
	},
	clear({commit}) {
		commit('clear');
	}

}


export const mutations = {
	suggestions(state, data) {
		state.suggestions = data;
	},
	clear(stste) {
		stste.suggestions = [];
	}

}
