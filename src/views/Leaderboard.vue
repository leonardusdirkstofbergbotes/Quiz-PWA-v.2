<template>
<v-container>
    
        <v-data-table
            :headers="tableHeaders"
            :items="leaderboard"
            :items-per-page="10"
            class="elevation-1"
        ></v-data-table>
    
        <!-- <v-layout row v-for="obj in leaderboard" :key="obj"> -->
            
            <!-- <v-flex>PP</v-flex>
            <v-flex>{{obj.name + ' ' + obj.surname}}</v-flex>
            <v-flex>{{obj.correct}}</v-flex>
            <v-flex>{{obj.totalQuestions}}</v-flex>
            <v-flex>{{obj.numberOfGames}}</v-flex>
            <v-flex>{{Math. round(((obj.correct / obj.totalQuestions) * 100) * 100) / 100}}</v-flex>
             -->
        <!-- </v-layout> -->
    </v-flex>
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