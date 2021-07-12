<template lang="pug">
  .content-wrapper
    section
      .container
        h1.ui-title-1 Fanfic Edit
        input(
          type="text"
          placeholder="Fanfic Title"
          v-model="fanficName"
        )
        textarea(
          type="text"
          v-model="fanficDescription"
          placeholder="Fanfic Description here!"
        )
        .fanfic-content-edit
          textarea(
            type="text"
            v-model="content"
            placeholder="Fanfic Content here!"
          )
        input.fandom(
          type="text"
          placeholder="Fandom"
          v-model="fanficFandom"
        )
        .tag-list
          .ui-tag__wrapper(
            v-for="tag in tags"
            :key="tag.title"
          )
            .ui-tag(
              @click="addTag(tag)"
              :class="{used: tag.use}"
            )
              span.tag-title.unselectable {{ tag.title }}
              span.button-close(
                :class="{active: !tag.use}"
              )
        .button.button--round.button-primary(
          @click="createFanfic"
        ) Create Fanfic
</template>

<script>
export default {
  data () {
    return {
      fanficName: '',
      fanficDescription: '',
      content: '',
      fanficFandom: '',

      // Tags
      tagsUsed: []
    }
  },
  methods: {
    createFanfic () {
      const fanfic = {
        'name': this.fanficName,
        'descriprion': this.fanficDescription,
        'content': this.content,
        'tags': this.tagsUsed
      }
      this.$store.dispatch('fanfic/create', fanfic)
      // Reset
      this.fanficName = ''
      this.fanficDescription = ''
      this.content = ''
      this.fanficFandom = ''
      this.tagsUsed = []

      for (let i = 0; i < this.tags.length; i++) {
        this.tags[i].use = false
      }
    },
    addTag (tag) {
      tag.use = !tag.use
      if (tag.use) {
        this.tagsUsed.push(
          tag.title
        )
      } else {
        this.tagsUsed.splice(tag.title, 1)
      }
    }
  },
  computed: {
    tags () {
      return this.$store.getters.tags
    }
  }
}
</script>

<style lang="stylus" scoped>
.fanfic-content-edit
  textarea
    min-height 200px

.button
  display table

.ui-tag
  margin 4px
  margin-left 0px
  .button-close
    &.active
      transform: rotate(45deg)
  &.used
    background-color: #444ce0
    color #fff
    .button-close
      &:before,
      &:after
        background-color: #fff

.fandom
  max-width 150px
  float right

.unselectable
  -moz-user-select none
  -khtml-user-select none
  -webkit-user-select none
  user-select none
</style>
