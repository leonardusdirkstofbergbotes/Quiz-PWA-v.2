<template>
    <v-form @submit.prevent="registerUser">
    <v-container>

      <v-snackbar v-model="snackbar" multi-line top timeout="-1"> <!-- holds the login errors -->
        {{ snackbarText }}

        <template v-slot:action="{ attrs }">
          <v-btn color="red" text v-bind="attrs" @click="closeAndResetError">Close</v-btn>
        </template>
    </v-snackbar>

      <v-row>
        <v-flex xs12>
          <v-text-field v-model="name" :rules="nameRules" :counter="10" label="First name" required></v-text-field>
        </v-flex>

        <v-flex xs12>
          <v-text-field v-model="surname" :rules="nameRules" :counter="10" label="Last name" required></v-text-field>
        </v-flex>

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
            <v-btn type="submit" x-large color="primary">Register</v-btn>
      </v-flex>

    </v-container>

  </v-form>
</template>

<script>
export default {
    name: 'Register',
    data() {
        return {
            snackbar: false,
            snackbarText: '',
            profilePic: null,
            name: '',
            nameRules: [
                v => !!v || 'Name is required',
                v => v.length <= 10 || 'Name must be less than 10 characters',
            ],
            surname: '',
            emailAdress: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid',
            ],
            password: '',
            confirmPassword: '',
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
    }, //data ends

    methods: {
      closeAndResetError () {
        this.snackbar = false
        this.$store.dispatch('resetRegisterErrors')
      },

      registerUser () {
        const userData = {
          name: this.name,
          surname: this.surname,
          email: this.emailAdress,
          password: this.password
        }
        this.$store.dispatch('createUser', userData)
      }
    },

    computed: {
      registerError () {
        return this.$store.getters.getFirebaseRegisterErrors
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

      registerError (value) {
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