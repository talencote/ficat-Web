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
    router-view
</template>

<script>
export default {
  data () {
    return {
      menuShow: false,
      linkMenu: [
        {title: 'Home', url: '/'},
        {title: 'Fanfic Edit', url: '/fanficEdit'},
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
