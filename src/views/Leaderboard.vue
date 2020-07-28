<template>
    <v-container id="leaderboardPage" class="mt-4">
        <h1 class="display-4 text-center orange--text">Leader board</h1>
        <h2 class="display-1 text-center">Where do you rank against the {{leaderboard.length - 1}} other users?</h2>
        <v-data-table
            :headers="tableHeaders"
            :items="leaderboard"
            :items-per-page="10"
            class="elevation-1 my-4 customBack"
        ></v-data-table>
    </v-container>
</template>

<script>
export default {
    name: 'leaderboard',
    created () {
        let check = this.$store.getters.getLeaderBoard
        if (check.length == 0) {
            this.$store.dispatch('fetchLeaderBoard') // fetch the leaderboard only if it has not already been fetched
        } else {
            // do nothing 
        }
        
    },

    data () {
        return {
            tableHeaders: [
                {
                    text: 'Name',
                    align: 'center',
                    value: 'name',
                    sortable: false
                }, 
                {
                    text: 'Total correct',
                    align: 'center',
                    value: 'correct'
                },
                {
                    text: 'Total Questions so far',
                    align: 'center',
                    value: 'totalQuestions'
                },
                {
                    text: 'Number of games',
                    align: 'center',
                    value: 'numberOfGames'
                }
            ]
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

<style scoped>
#leaderboardPage {
    background-image: url('../assets/backgrounds/leaderboardPage.webp');
}

.customBack {
    background-color: rgba(255, 255, 255, 0.7)!important;
}
</style>