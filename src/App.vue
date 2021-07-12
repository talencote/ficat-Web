<template lang="pug">
  .wrapper
    header
      .navbar
        .container
          .navbar-content
            router-link.header-logo(
              to="/"
            ) Ficat
            .button-burger(
              :class="{ active: menuShow }"
              @click="menuShow = !menuShow"
            )
              span.line.line-1
              span.line.line-2
              span.line.line-3
            .navbar-list__wrapper(
              :class="{ active: menuShow }"
            )
              ul.navbar-list
                li.navbar-item(
                  v-for="link in linkMenu"
                  :key="link.title"
                  @click="menuShow = false"
                )
                  router-link.navbar-link(
                    :to="`${link.url}`"
                  ) {{ link.title }}
                li.navbar-item(
                  v-if="checkUser"
                  @click="logout"
                )
                  span.navbar-link Logout
    router-view
</template>

<script>
export default {
  data () {
    return {
      menuShow: false
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('authentication/logout')
      console.log(this.$router)
      this.$router.push('/login')
      this.$router.go()
    }
  },
  computed: {
    checkUser () {
      return (localStorage.getItem('user') !== null)
    },
    linkMenu () {
      if (this.checkUser) {
        return [
          {title: 'Home', url: '/'},
          {title: 'Profile', url: '/profile'},
          {title: 'Fanfic Edit', url: '/fanficEdit'}
        ]
      }
      return [
        {title: 'Home', url: '/'},
        {title: 'Login', url: '/login'},
        {title: 'Registration', url: '/registration'}
      ]
    }
  }
}
</script>

<style lang="stylus">
@import './assets/stylus/main.styl'
</style>
