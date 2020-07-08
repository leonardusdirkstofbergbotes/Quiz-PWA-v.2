<template>
    <div>
        <v-row row justify-space-around>
            <v-col>
                <v-select v-model="difficulty" :items="difficultyOptions" label="Difficulty"></v-select>
            </v-col>

            <v-col>
                <v-select v-model="number" :items="questionNumbers" label="How many Questions"></v-select>
            </v-col>

            <v-col>
                <v-select v-model="questionType" :items="questionTypeOptions" label="Type of Questions"></v-select>
            </v-col>

            <v-col>
                    <v-btn block @click="getQuestions">GO</v-btn>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    name: 'QuizPage',

    props: ['category'],

    data () {
        return {
            cat: this.category,
            quizes: [],
            QuizArrayLength: '',
            difficultyOptions: ['Easy', 'Medium', 'Hard'],
            difficulty: "Easy",
            number: 10,
            questionNumbers: [10, 15, 20, 25],
            questionType: 'Multiple',
            questionTypeOptions: ['Any','Multiple', 'True or False']
        }
    },

    watch: {
        category (value) {
            this.cat = value
        },

        quizes (value) { 
            this.QuizArrayLength = value.length
        }
    },

    methods: {
        getQuestions () {
            this.$http.get('https://opentdb.com/api.php?amount=15&category=21&difficulty=easy&type=multiple')
            .then(response => {
                var i = 0
                var n = 0
            while (i < response.data.results.length) { // goes into each object
                let questionArray = []
                while (n < 3) { // goes into the current objects sub array 
                var possible = {
                    question: response.data.results[i].incorrect_answers[n],
                    correct: false
                }
                questionArray.push(possible)
                n++
                }
                possible = { 
                question: response.data.results[i].correct_answer,
                correct: true
                }
                questionArray.push(possible)
                const question = { // an object that contains each specific question
                num: i, 
                questions: questionArray,
                name: response.data.results[i].question
                }
                this.quizes.push(question) // store each object inside an array
                i++
                n = 0 // reset the sub array numbering
            }
                
            })
        }
    }

}
</script>