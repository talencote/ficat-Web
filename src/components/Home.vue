<template lang="pug">
  .content-wrapper
    section
      .container
        h1.ui-title-1 Home
    section
      .fanfic-list
        .fanfic-item(
          v-for="fanfic in fanfics"
          :key="fanfic.id"
        )
          .ui-card.ui-card--shadow
            .fanfic-item__info
              h2.ui-title-2 {{ fanfic.name }}
              .fanfic-item-descriprion
                span.ui-text-regular {{ fanfic.descriprion }}
              .tags-list
                .ui-tag(
                  v-for="tag in fanfic.tags"
                )
                  span.tag-title {{ tag }}
              .fanfic-item__info-footer
                span.ui-text-small {{ fanfic.fandom }}
                span.ui-text-small.author {{ fanfic.author }}
</template>

<script>
export default {
  computed: {
    fanfics () {
      return this.$store.getters.fanfics
    }
  }
}
</script>

<style lang="stylus" scoped>
.fanfic-item
  margin 10px
  margin-bottom 20px
  &:last-child
    margin-bottom 0px

h2.ui-title-2
  margin-bottom 10px

.fanfic-item-descriprion
  margin-bottom 25px

.tags-list
  display flex
  margin-bottom 10px

.ui-tag
  margin-right 6px
  &:last-child
    margin-right 0px

.fanfic-item__info-footer
  display flex
  align-items center
  justify-content space-between
</style>
