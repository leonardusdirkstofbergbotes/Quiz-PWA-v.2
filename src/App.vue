<template>
  <v-app id="inspire">

    <v-overlay v-if="loading == true">
      <v-progress-circular id="loadingCircle" :size="100" color="primary" indeterminate></v-progress-circular>
    </v-overlay>
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense> <!-- Side bar container -->

        <v-list-item link to="/"> <!-- Home link -->
          <v-list-item-action>
            <v-icon>fa-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-if="signedIn == false" link to="/register"> <!-- Register user -->
          <v-list-item-action>
            <v-icon>fa-user-plus</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Register</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-if="signedIn == false" link to="/login"> <!-- Login user -->
          <v-list-item-action>
            <v-icon>fa-user-check</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Login</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item v-for="item in sidebarOptions" :key="item.name" link :to="item.link"> <!-- Link to categories -->
          <v-list-item-content>
            <v-list-item-title>{{item.name}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list> <!-- Side bar ends -->
    </v-navigation-drawer>

    <v-app-bar app color="indigo" dark dense>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Application</v-toolbar-title>
      <v-spacer></v-spacer>

       <!-- If user is nog yet signed in -->
        <v-btn v-if="user == false" text to="/register">Register<v-icon>fa-user-plus</v-icon></v-btn>
        <v-btn v-if="user == false" text to="/login">Login<v-icon>fa-user-check</v-icon></v-btn>
     

      <v-btn text v-if="user !== false"> <!-- If user is signed in -->
        Welcome {{user.name}}
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
    <v-footer color="indigo" app>
      <span class="white--text">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>


<script>
  export default {
    name: 'main app',
    data: () => ({
      signedIn: false,
      drawer: null,
      sidebarOptions: [
        {name: 'Profile', link: 'profile', requireSignIn: true}
      ]
    }),

    computed: {
      user () {
        return this.$store.getters.getUser
      },

      loading () {
        return this.$store.getters.getLoading
      }
    },

    watch: {
      user (value) {
        console.log(value) 
        if (value !== null) {
          this.signedIn = true
        }
      }
    }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#loadingCircle {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  z-index: 1;
}
</style>
