<template>
    <v-form @submit.prevent="registerUser">
    <v-container>
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
      registerUser () {
        const userData = {
          name: this.name,
          surname: this.surname,
          email: this.emailAdress,
          password: this.password
        }
        this.$store.dispatch('createUser', userData)
      }
    }
}
</script>