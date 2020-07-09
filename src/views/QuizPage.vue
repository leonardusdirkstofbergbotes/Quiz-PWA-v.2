<template>
    <div>
        <v-row v-if="optionSelect" row justify-space-around> <!-- Bar that lets you choose the options -->
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
        </v-row> <!-- Option bar ends -->

        <v-container v-if="quizes.length !== 0"> <!-- wrapper for each question card -->
            <v-flex >
                <h1 class="text-center">{{quizes[num].num}}. {{quizes[num].name}}</h1> <!-- Question number and title -->

                <v-layout row justify-space-between> <!-- contains the possible answers -->
                    <v-card width="250" min-height="150" v-for="item in quizes[num].questions" :key="item" @click="storeAnswer(item.correct)" >
                        {{item.question}}
                    </v-card>
                </v-layout>

            </v-flex>
        </v-container>
    </div>
</template>

<script>
export default {
    name: 'QuizPage',

    created () { // sets the code of the category
        if (this.category == 'Sport') {
            this.cat = 21
        } else if (this.category == 'General Knowledge') {
            this.cat = 9
        } else if (this.category == 'Animals') {
            this.cat = 27
        } else if (this.category == 'Celebrities') {
            this.cat = 26
        } else if (this.category == 'Books') {
            this.cat = 10
        } else if (this.category == 'Movies') {
            this.cat = 11
        } else if (this.category == 'Music') {
            this.cat = 12
        } else if (this.category == 'Theatre') {
            this.cat = 13
        } else if (this.category == 'TV') {
            this.cat = 14
        } else if (this.category == 'Video Games') {
            this.cat = 15
        } else if (this.category == 'Board Games') {
            this.cat = 16
        } else if (this.category == 'Science') {
            this.cat = 17
        }  else if (this.category == 'Computers') {
            this.cat = 18
        } else if (this.category == 'Maths') {
            this.cat = 19
        } else if (this.category == 'Myths') {
            this.cat = 20
        } else if (this.category == 'Geography') {
            this.cat = 22
        } else if (this.category == 'Historical') {
            this.cat = 23
        } else if (this.category == 'Politics') {
            this.cat = 24
        } else if (this.category == 'Art') {
            this.cat = 25
        } else if (this.category == 'Vehicles') {
            this.cat = 28
        } else if (this.category == 'Comics') {
            this.cat = 29
        } else if (this.category == 'Gadgets') {
            this.cat = 30
        } else if (this.category == 'Anime') {
            this.cat = 31
        } else if (this.category == 'Cartoons') {
            this.cat = 32
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
            questionType: 'multiple',
            num: 0
        }
    },

    watch: {
        category (value) { // Also sets the code of the category
            if (value == 'Sport') {
                this.cat = 21
            } else if (value == 'General Knowledge') {
                this.cat = 9
            } else if (value == 'Animals') {
                this.cat = 27
            } else if (value == 'Celebrities') {
                this.cat = 26
            } else if (value == 'Books') {
                this.cat = 10
            } else if (value == 'Movies') {
                this.cat = 11
            } else if (value == 'Music') {
                this.cat = 12
            } else if (value == 'Theatre') {
                this.cat = 13
            } else if (value == 'TV') {
                this.cat = 14
            } else if (value == 'Video Games') {
                this.cat = 15
            } else if (value == 'Board Games') {
                this.cat = 16
            } else if (value == 'Science') {
                this.cat = 17
            }  else if (value == 'Computers') {
                this.cat = 18
            } else if (value == 'Maths') {
                this.cat = 19
            } else if (value == 'Myths') {
                this.cat = 20
            } else if (value == 'Geography') {
                this.cat = 22
            } else if (value == 'Historical') {
                this.cat = 23
            } else if (value == 'Politics') {
                this.cat = 24
            } else if (value == 'Art') {
                this.cat = 25
            } else if (value == 'Vehicles') {
                this.cat = 28
            } else if (value == 'Comics') {
                this.cat = 29
            } else if (value == 'Gadgets') {
                this.cat = 30
            } else if (value == 'Anime') {
                this.cat = 31
            } else if (value == 'Cartoons') {
                this.cat = 32
            } 
            
        },

        quizes (value) { 
            this.QuizArrayLength = value.length
        }
    },

    methods: {
        storeAnswer(answer) {
            console.log(answer)
            this.num++
        },

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
                num: i + 1, 
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