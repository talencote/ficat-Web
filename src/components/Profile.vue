<template lang="pug">
  .content-wrapper
    section
      .container
        h1.ui-title-1 {{ user.username }}
        span.ui-text-regular Profile Description:
        .add-descriprion
          input(
            type="text"
            v-model="description"
          )
          .button.button--round.button-primary(
          @click="changeDescription"
        ) Change
        .fandoms
          span.ui-title-3.fandoms_title Favorite Fandoms:
          .add-fandom
            input(
              type="text"
              v-model="fandom"
              placeholder="Add New Favorite Fandom"
            )
            .button.button--round.button-primary(
            @click="addFandom"
            ) Add
          .fandoms-list
            .fandom-item(
              v-for="fandom in fandoms"
              :key="fandom"
            )
              .ui-card.ui-card--shadow
                span.ui-title-4 {{ fandom }}
                .button.button--round.button-warning(
                  @click="removeFandom(fandom)"
                )
                  span Delete
</template>

<script>
export default {
  data () {
    return {
      description: '',
      fandom: ''
    }
  },
  computed: {
    user () {
      return JSON.parse(localStorage.getItem('user'))
    },
    userDetails () {
      const det = JSON.parse(localStorage.getItem('userDetails'))
      this.description = det.description
      return det
    },
    fandoms () {
      if (this.userDetails.favoriteFandoms !== null) {
        let arr = this.userDetails.favoriteFandoms.split(';')
        arr.pop()
        return arr
      } else {
        return null
      }
    }
  },
  methods: {
    changeDescription () {
      this.description = ''
    },
    removeFandom (fandom) {
      // this.fandoms = this.fandoms.splice(this.fandoms.indexOf(fandom), 1)
      this.$store.dispatch('profile/removeFavFandom', fandom)
      setTimeout(() => {
        this.fandom = ''
        this.$router.go()
      }, 1000)
    },
    addFandom () {
      this.$store.dispatch('profile/addFavFandom', this.fandom)
      setTimeout(() => {
        this.fandom = ''
        this.$router.go()
      }, 1000)
    }
  }
}

</script>

<style lang="stylus" scoped>
.add-descriprion,
.add-fandom
  margin-bottom 8px
  margin-top 8px
  display flex

input
  height 60px
  margin-right 8px

.button
  height 60px
  width 20vw

.fandoms_title
  margin-top 30px

.fandom-item
  margin-bottom 8px
  &:last-child
    margin-bottom 0px

.button.button--round.button-warning
  height 40px

.ui-card.ui-card--shadow
  display flex
  justify-content space-between
</style>
