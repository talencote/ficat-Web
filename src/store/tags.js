export default {
  state: {
    tags: [
      {
        title: 'Anime',
        use: false
      },
      {
        title: 'Action',
        use: false
      },
      {
        title: 'Romance',
        use: false
      }
    ]
  },
  mutations: {},
  actions: {},
  getters: {
    tags (state) {
      return state.tags
    }
  }
}
