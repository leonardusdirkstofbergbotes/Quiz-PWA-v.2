<template>
        <v-form @submit.prevent="loginUser">
    <v-container>
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

  </v-form>

</template>

<script>
export default {
    name: 'Login page',
    data() {
        return {
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
        loginUser () {
            this.$store.dispatch('signUserIn', {email: this.emailAdress, password: this.password})
        }
    }
}
</script>