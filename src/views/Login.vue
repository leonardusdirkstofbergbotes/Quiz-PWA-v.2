<template>
  <v-form @submit.prevent="loginUser">
    <v-container>

      <v-snackbar v-model="snackbar" multi-line top timeout="-1"> <!-- holds the login errors -->
      {{ snackbarText }}

      <template v-slot:action="{ attrs }">
        <v-btn color="red" text v-bind="attrs" @click="closeAndResetError">Close</v-btn>
      </template>
    </v-snackbar>

      <v-row>

        <v-flex xs12>
          <v-text-field v-model="emailAdress" :rules="emailRules" label="E-mail" required></v-text-field>
        </v-flex>

        <v-flex>
          <v-text-field
            v-model="password"
            label="Enter password"
            type="password"
            :rules="[passwordRules]"
          ></v-text-field>
        </v-flex>
      </v-row>

      <v-flex>
            <v-btn type="submit" x-large color="primary">Login</v-btn>
      </v-flex>

    </v-container>


      <v-btn to='/register'>Don't have an account yet?</v-btn>
  </v-form>

</template>

<script>
export default {
    name: 'Login page',
    data() {
        return {
            snackbar: false,
            snackbarText: '',
            emailAdress: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid',
            ],
            password: '',
            passwordRules: [
        //         password: value => {
        //   const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        //   return (
        //     pattern.test(value) ||
        //     "Min. 8 characters with at least one capital letter, a number and a special character."
        //   );
        // }
            ]
            
        }
    },

    methods: {
      closeAndResetError () {
        this.snackbar = false
        this.$store.dispatch('resetLoginErrors')
      },

      loginUser () {
          this.$store.dispatch('signUserIn', {email: this.emailAdress, password: this.password})
      }
    },  

    computed: {
      LoginErrors() {
        return this.$store.getters.getFirebaseLoginErrors
      },

      userSuccessfull () {
        return this.$store.getters.getUser
      }
    },

    watch: {
      userSuccessfull (value) {
        if (value !== false) {
          this.$router.push('/')
        }
      },

      LoginErrors (value) {
        console.log('watch errors are = ' + value)
        if (value == '') {
          // Do nothing
        } else if (value !== '') {
          this.snackbarText = value
          this.snackbar = true
        }
      }
    }
}
</script>