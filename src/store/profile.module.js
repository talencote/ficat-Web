import { profileService } from '../services'

export const profile = {
  namespaced: true,
  actions: {
    removeFavFandom ({ dispatch, commit }, fandom) {
      return profileService.removeFavFandom(fandom)
    },
    addFavFandom ({ dispatch, commit }, fandom) {
      return profileService.addFavFandom(fandom)
    },
    getProfile ({ dispatch, commit }) {
      profileService.getProfile()
    }
  }
}
