<template>
    <div>
        <v-row v-if="optionSelect" row justify-space-around>
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

    created () {
        if (this.category == 'Sport') {
            this.cat = 21
        } else if (this.category == 'General Knowledge') {
            this.cat = 9
        } else if (this.category == 'Animals') {
            this.cat = 27
        } else if (this.category == 'Celebrities') {
            this.cat = 26
        }
    },

    props: ['category'],

    data () {
        return {
            optionSelect: true,
            cat: this.category,
            quizes: [],
            QuizArrayLength: '',
            difficultyOptions: ['easy', 'medium', 'hard'],
            difficulty: "easy",
            number: 10,
            questionNumbers: [10, 15, 20, 25],
            questionTypeOptions: ['any','multiple', 'True or False'],
            questionType: 'multiple'
        }
    },

    watch: {
        category (value) {
            if (value == 'Sport') {
                this.cat = 21
            } else if (value == 'General Knowledge') {
                this.cat = 9
            } else if (value == 'Animals') {
                this.cat = 27
            } else if (value == 'Celebrities') {
                this.cat = 26
            }
            
        },

        quizes (value) { 
            this.QuizArrayLength = value.length
        }
    },

    methods: {
        getQuestions () {
            this.$http.get('https://opentdb.com/api.php?amount=' + this.number + '&category=' + this.cat + '&difficulty=' + this.difficulty + '&type=' + this.questionType + '')
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
                } // while loop from incorrect answers ends

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
            } // while loop from individual question object ends
                
            })
            this.optionSelect = false // hides the option bar
        }
    }

}
</script>