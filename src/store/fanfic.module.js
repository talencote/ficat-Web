import { authToken } from '../helpers/auth-token'

export const fanfic = {
  namespaced: true,
  state: {
    fanfics: []
  },
  actions: {
    getPopular ({ dispatch, commit }) {
      var headers = new Headers()
      headers.append('Content-Type', 'application/json')
      headers.append('Authorization', authToken())

      const requestOptions = {
        method: 'GET',
        headers: headers,
        body: JSON.stringify()
      }

      fetch(`/api/fanfic/popular/1`, requestOptions)
        .then(resoponse => {
          resoponse.json().then(data => {
            // console.log(JSON.parse(JSON.stringify(data)))
            commit('setFanfics', JSON.parse(JSON.stringify(data)))
            return data
          })
        })
    },
    create ({ dispatch, commit }, fanfic) {
      var headers = new Headers()
      headers.append('Content-Type', 'application/json')
      headers.append('Authorization', authToken())

      const requestOptions = {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(fanfic)
      }

      fetch(`/api/fanfic/edit/add`, requestOptions)
        .then(data => {
          return data
        })
    }
  },
  mutations: {
    setFanfics (state, payload) {
      state.fanfics = JSON.parse(JSON.stringify(payload))
      console.log(state.fanfics)
    }
  },
  getters: {
    fanfics (state) {
      return state.fanfics
    }
  }
}
