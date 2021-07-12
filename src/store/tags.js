export default {
  state: {
    tags: [
      {
        title: 'Action',
        use: false
      },
      {
        title: 'Romance',
        use: false
      },
      {
        title: 'Detective',
        use: false
      },
      {
        title: 'Sport',
        use: false
      },
      {
        title: 'Fantasy',
        use: false
      },
      {
        title: 'Cyberpunk',
        use: false
      },
      {
        title: 'Steampunk',
        use: false
      },
      {
        title: 'Horror',
        use: false
      },
      {
        title: 'Anime',
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
