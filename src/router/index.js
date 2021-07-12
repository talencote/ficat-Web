import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import FanficEdit from '@/components/FanficEdit'
import Login from '@/components/Auth/Login'
import Registration from '@/components/Auth/Registration'
import Profile from '@/components/Profile'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/fanficEdit',
      name: 'fanficEdit',
      component: FanficEdit
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/registration',
      name: 'registration',
      component: Registration
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    }
  ]
})
// .beforeEach((to, from, next) => {
//   // redirect to login page if not logged in and trying to access a restricted page
//   const publicPages = ['/login']
//   const authRequired = !publicPages.includes(to.path)
//   const loggedIn = localStorage.getItem('user')

//   if (authRequired && !loggedIn) {
//     return next('/login')
//   }

//   next()
// })
