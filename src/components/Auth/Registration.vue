<template lang="pug">
  .content-wrapper
    section
      .container
        .auth
          .auth__form
            span.ui-title-2 Registration
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
                :class="{ errorInput: $v.email.$error }"
              )
                input(
                  type="email"
                  placeholder="Email"
                  v-model="email"
                  :class="{ error: $v.email.$error }"
                  @change="$v.email.$touch()"
                )
                .error(v-if="!$v.email.required") Field is required
                .error(v-if="!$v.email.email") Email is not correct
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
              .form-item(
                :class="{ errorInput: $v.repeatPassword.$error }"
              )
                input(
                  type="password"
                  placeholder="Repeat your Password"
                  v-model="repeatPassword"
                  :class="{ error: $v.repeatPassword.$error }"
                  @change="$v.repeatPassword.$touch()"
                )
                .error(v-if="!$v.repeatPassword.sameAsPassword") Passwords must be identical.
              .buttons-list
                button.button.button--round.button-primary(
                  type="submit"
                  :disabled="submitStatus === 'PENDING'"
                ) Registration
              .buttons-list.buttons-list--info
                p.typo__p(v-if="submitStatus === 'OK'") Thanks for your submission!
                p.typo__p(v-if="submitStatus === 'ERROR'") {{ errorMessage }}
                p.typo__p(v-if="submitStatus === 'PENDING'") Sending...
              .buttons-list.buttons-list--info
                span Do u have acount?
                  router-link(to="/login")  Enter Here
</template>

<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      username: '',
      email: '',
      password: '',
      repeatPassword: '',
      submitStatus: null,
      errorMessage: null
    }
  },
  validations: {
    username: {
      required
    },
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    },
    repeatPassword: {
      sameAsPassword: sameAs('password')
    }
  },
  methods: {
    onSubmit () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
        this.errorMessage = 'Please fill the form correctly.'
      } else {
        // do your submit logic here
        this.submitStatus = 'PENDING'
        this.errorMessage = null

        const { username, email, password } = this
        const { dispatch } = this.$store
        if (username && email && password) {
          dispatch('authentication/registration', { username, email, password })
            .then(
              () => {
                this.submitStatus = 'OK'
                this.$router.push('/login')
              },
              error => {
                this.submitStatus = 'ERROR'
                this.errorMessage = error
              })
        }
      }
    }
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
