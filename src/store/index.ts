import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sessionToken: '',
    loading: false,
    loggedInUser: false
  },
  mutations: {
    storeToken (state, payload) {
      state.sessionToken = payload
    },

    load (state, payload) {
      state.loading = payload
    },

    sign (state, payload) {
      state.loggedInUser = payload
    },

    logout (state, payload) {
      state.loggedInUser = payload
    }
  },
  actions: {

    sendToken ({commit}, payload) {
      commit('storeToken', payload)
    },

    signUserIn ({commit}, payload) {
      commit('load', true) // start loading
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).then(response => {
        // auth the user and get uid 

        firebase.database().ref('users/' + response.user?.uid).once('value').then(data => {
          // get all the info of the user signed in

          commit('sign', data.val())
        })
        commit('load', false) // stop loading
      }) // firebase signin .then ENDS
      .catch(error => {
        console.log('Sign in error = ' + error)
        commit('load', false) // stop loading
      })// firebase signin .catch ENDS
    },

    createUser ({commit}, payload) {
      commit('load', true) // start loading
      firebase.auth().createUserWithEmailAndPassword(payload.email , payload.password).then(response => {
        const newUser = {
          uid: response.user?.uid,
          name: payload.name,
          surname: payload.surname,
          email: payload.email
          // dont store password in db
        }

        firebase.database().ref('users/' + response.user?.uid).set(newUser) // store the new user in the database
      
        // if successful then sign user in at the same time
        firebase.auth().signInWithEmailAndPassword(newUser.email, payload.password).then(response => {
          // auth the user
            
           commit('sign', newUser) 
        
        }) // firebase signin .then ENDS
        .catch(signInerror => {
          console.log(signInerror)
        }) // firebase signin .catch ENDS

        commit('load', false) // stop loading
      }) // firebase auth.then ENDS
      .catch(error => {
        console.log(error)
        commit('load', false) // stop loading
      }) // firebase auth.catch ENDS
    },

    logoutUser ({commit}) {
      commit('load', true) // start loading
      firebase.auth().signOut().then(function() {
        console.log('Signed Out');
        commit('logout', false)
        commit('load', false) // stop loading
      }, function(error) {
        console.error('Sign Out Error', error);
        commit('load', false) // stop loading
      });
    },

    setLoadState ({commit}, payload) {
      commit('load', payload)
    }
  },
  getters: {
    getUser (state) {
      return state.loggedInUser
    },

    getLoading (state) {
      return state.loading
    },

    getToken (state) {
      return state.sessionToken
    }
  }
})
