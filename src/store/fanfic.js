export default {
  state: {
    fanfics: [
      {
        'id': 1,
        'name': 'FanficName',
        'descriprion': 'Nostrud non magna elit et reprehenderit proident velit.',
        'author': 'Admin',
        'fandom': 'Naruto',
        'tags': [
          'Anime',
          'Romance'
        ],
        'imageUrl': 'url'
      },
      {
        'id': 2,
        'name': 'FanficName2',
        'descriprion': 'Do pariatur ad non adipisicing eu enim.Eiusmod anim dolore magna ex nostrud.',
        'author': 'User',
        'fandom': 'Death Note',
        'tags': [
          'Anime',
          'Action'
        ],
        'imageUrl': 'url'
      }
    ]
  },
  mutations: {
    newFanfic (state, payload) {
      state.fanfics.push(payload)
    }
  },
  actions: {
    newFanfic ({commit}, payload) {
      commit('newFanfic', payload)
    }
  },
  getters: {
    fanfics (state) {
      return state.fanfics
    }
  }
}
