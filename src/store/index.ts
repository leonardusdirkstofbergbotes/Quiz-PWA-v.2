import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sessionToken: '',
    loading: false,
    loggedInUser: false,
    profile: undefined,
    tempData: {} as any,
    firebaseLoginErrors: '',
    firebaseRegisterErrors: '',
    leaderBoard: [] as any
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
    },

    storeProfileInfo (state, payload) {
      state.profile = payload
    },

    tempData (state, payload) {
      state.tempData = payload
    },

    saveLoginError (state, payload) {
      state.firebaseLoginErrors = payload
    },

    saveRegisterError (state, payload) {
      state.firebaseRegisterErrors = payload
    },

    storeLeaderBoardData (state, payload) {
      state.leaderBoard.push(payload)
    }
  },


  actions: {

    fetchLeaderBoard ({commit}) {
      firebase.firestore().collection("profile").get().then(snapshot => {
        snapshot.docs.forEach(doc => {
          commit('storeLeaderBoardData', doc.data())
        })
      })
    },

    storeTempData ({commit}, payload) {
      commit('tempData', payload)
    },

    sendToken ({commit}, payload) {
      commit('storeToken', payload)
    },

    signUserIn ({commit}, payload) {
      commit('load', true) // start loading
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).then(response => {
        // auth the user and get uid 
        
        // get user profile info
        firebase.firestore().collection('profile').doc(response.user?.uid).get().then(profileData => {
          commit('storeProfileInfo', profileData.data())
        }).catch(profileRetrieveError => {
          console.log('profile retrieve error = ' + profileRetrieveError)
        })

        firebase.database().ref('users/' + response.user?.uid).once('value').then(data => {
          // get all the info of the user signed in

          commit('sign', data.val())
        })
        commit('saveLoginError', '')
        commit('load', false) // stop loading
      }) // firebase signin .then ENDS
      .catch(error => {
        console.log('Sign in error = ' + error.message)
        commit('saveLoginError', error.message)
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
          if (this.state.tempData !== 'empty') { // new user is registering to save the results
            let tempo = this.state.tempData
            firebase.firestore().collection('profile').doc(response.user?.uid).set(tempo).then( () => { //store the temp data
              firebase.firestore().collection('profile').doc(response.user?.uid).get().then(profileData => { // fetch the new profile info
                commit('tempData', {}) // reset the tempdata to empty
                commit('storeProfileInfo', profileData.data()) // save the info to the users profile page
              })
            })
          }
           commit('sign', newUser) // sign him in
        
        }) // firebase signin .then ENDS
        .catch(signInerror => {
          console.log(signInerror)
        }) // firebase signin .catch ENDS
        commit('saveRegisterError', '')
        commit('load', false) // stop loading
      }) // firebase auth.then ENDS
      .catch(error => {
        console.log(error)
        commit('saveRegisterError', error.message)
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
    },

    sendProfileData ({commit}, payload) {
      console.log(payload)
      firebase.firestore().collection('profile').doc(payload.uid).set(payload, {merge: true}).then(response => { //send new data to profile 
        firebase.firestore().collection('profile').doc(payload.uid).get().then(profileData => { // fetch the updated data and store in profile
          commit('storeProfileInfo', profileData.data())
        })
      })
    }, 

    resetLoginErrors ({commit}) {
      commit('saveLoginError', '')
    },

    resetRegisterErrors ({commit}) {
      commit('saveRegisterError', '')
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
    },

    getProfile (state) {
      return state.profile
    },

    getFirebaseLoginErrors (state) {
      return state.firebaseLoginErrors
    },

    getFirebaseRegisterErrors (state) {
      return state.firebaseRegisterErrors
    },

    getLeaderBoard (state) {
      return state.leaderBoard
    }
  }
})
