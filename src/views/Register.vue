<template>
    <v-form v-model="valid">
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
            @click:append="() => (value = !value)"
            type="password"
            :rules="[passwordRules]"
          ></v-text-field>
        </v-flex>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
    name: 'Register',
    data() {
        return {
            valid: false,
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
    }
}
</script>