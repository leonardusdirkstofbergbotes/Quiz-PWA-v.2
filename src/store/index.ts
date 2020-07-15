import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggedInUser: false
  },
  mutations: {
    sign (state, payload) {
      state.loggedInUser = payload
    }
  },
  actions: {

    signUserIn ({commit}, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).then(response => {
        // auth the user and get uid 

        firebase.database().ref('users/' + response.user?.uid).once('value').then(data => {
          // get all the info of the user signed in

          console.log(data.val())
          // commit('sign', )
        })
      }) // firebase signin .then ENDS
      .catch(error => {
        console.log('Sign in error = ' + error)
      })// firebase signin .catch ENDS
    },

    createUser ({commit}, payload) {
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

      }) // firebase auth.then ENDS
      .catch(error => {
        console.log(error)
      }) // firebase auth.catch ENDS
    }
  },
  getters: {
    getUser (state) {
      return state.loggedInUser
    }
  }
})
