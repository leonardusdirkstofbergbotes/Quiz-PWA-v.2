<template>
<v-container>
    <v-flex v-for="user in leaderboard" :key="user">
        {{user}}
    </v-flex>
</v-container>
</template>

<script>
export default {
    name: 'leaderboard',
    created () {
       this.$store.dispatch('fetchLeaderBoard')
    },

    data () {
        return {
            board: ''
        }
    },

    methods: {

    },

    computed: {
        leaderboard () {
            return this.$store.getters.getLeaderBoard
        }
    }
}
</script>