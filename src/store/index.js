import Vue from 'vue'
import Vuex from 'vuex'

import fanfic from './fanfic'
import tags from './tags'
import { alert } from './alert.module'
import { authentication } from './authentication.module'
import { users } from './users.module'
import { profile } from './profile.module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    fanfic,
    tags,
    alert,
    authentication,
    users,
    profile
  }
})
