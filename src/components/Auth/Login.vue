<template lang="pug">
  .content-wrapper
    section
      .container
        .auth
          .auth__form
            span.ui-title-2 Login
            form(@submit.prevent="onSubmit")
              .form-item(
                :class="{ errorInput: $v.username.$error }"
              )
                input(
                  type="text"
                  placeholder="Username"
                  v-model="username"
                  :class="{ error: $v.username.$error }"
                  @change="$v.username.$touch()"
                )
                .error(v-if="!$v.username.required") Field is required
              .form-item(
                :class="{ errorInput: $v.password.$error }"
              )
                input(
                  type="password"
                  placeholder="Password"
                  v-model="password"
                  :class="{ error: $v.password.$error }"
                  @change="$v.password.$touch()"
                )
                .error(v-if="!$v.password.required") Password is required.
                .error(v-if="!$v.password.minLength")
                  | Password must have at least {{ $v.password.$params.minLength.min }} letters.
              .buttons-list
                button.button.button-primary(
                  type="submit"
                  :disabled="submitStatus === 'PENDING'"
                ) Login
              .buttons-list.button--round.buttons-list--info
                p.typo__p(v-if="submitStatus === 'OK'") Thanks for your submission!
                p.typo__p(v-if="submitStatus === 'ERROR'") Please fill the form correctly.
                p.typo__p(v-if="submitStatus === 'PENDING'") Sending...
              .buttons-list.buttons-list--info
                span Need Registration?
                  router-link(to="/registration")  Enter Here

</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      username: '',
      password: '',
      submitStatus: null
    }
  },
  validations: {
    username: {
      required
    },
    password: {
      required,
      minLength: minLength(6)
    }
  },
  methods: {
    onSubmit () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        // do your submit logic here
        this.submitStatus = 'PENDING'

        const { username, password } = this
        const { dispatch } = this.$store
        if (username && password) {
          dispatch('authentication/login', { username, password })
          if (localStorage.getItem('user') !== null) {
            this.submitStatus = 'OK'
            this.$router.push('/')
          }
        }
      }
    }
  },
  computed: {
    loggingIn () {
      return this.$store.state.authentication.status.loggingIn
    }
  },
  created () {
    // reset login status
    // this.$store.dispatch('authentication/logout')
  }
}
</script>

<style lang="stylus" scoped>
.auth
  display flex
  align-items center
  justify-content center
  height 60vh

.form-item
  .error
    display none
    margin-bottom 8px
    font-size 13.4px
    color #fc5c65
  &.errorInput
    .error
      display block

input
  &.error
    border-color #fc5c65

.buttons-list
  text-align right
  margin-bottom 20px
  &.buttons-list--info
    text-align center
    &:last-child
      margin-bottom 0

a
  color #444ce0
</style>
