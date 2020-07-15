<template>
    <div>
        <audio id="timer" preload="auto">
            <source src="@/assets/sounds/timer.mp3"></source>
        </audio>
        <audio id="timesUp" preload="auto">
            <source src="@/assets/sounds/timesUp.mp3"></source>
        </audio>
         <audio id="wrong" preload="auto">
            <source src="@/assets/sounds/fail.mp3"></source>
        </audio>
        <audio id="right" preload="auto">
            <source src="@/assets/sounds/correct.mp3"></source>
        </audio>

        <!-- Bar that lets you choose the options -->
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
        <!-- Option bar ends -->

        <v-container v-if="quizes.length !== 0"> <!-- wrapper for each question card -->
        <v-progress-linear height="20" rounded v-if="progress !== 0" :value="progress">{{progressText}}</v-progress-linear>
        
        <v-flex v-if="countDown !== 0">
            <!-- Timer comes here -->{{countDown}}
        </v-flex>
            <v-flex >
                <h1 class="text-center">{{quizes[num].num}}. {{quizes[num].name}}</h1> <!-- Question number and title -->

                <!-- contains the possible answers -->
                <v-layout row justify-space-between> 
                    <v-card width="250" min-height="150" v-for="item in shuffleArray" :key="item.question" @click="storeAnswer(item.correct)" >
                        {{item.question}}
                    </v-card>
                </v-layout>

                <!-- correct answer dialog -->
               <v-dialog v-model="dialog" persistent max-width="350"> 
                    <v-card>
                        <v-card-title class="headline">{{dialogHeader}}</v-card-title>
                        <v-card-subtitle>The correct answer is:</v-card-subtitle>
                        <v-card-text>{{correctAnswer.question}}</v-card-text>
                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="green darken-1" text @click="resetSounds">Next Question</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

                <!-- try again dialog -->
                 <v-dialog v-model="tryAgainDialog" max-width="290">  
                    <v-card>
                        <v-card-title class="headline">Well done</v-card-title>

                        <v-card-text>
                            You scored {{correctCount}} out of {{QuizArrayLength}}
                        </v-card-text>

                        <v-card-actions>
                        <v-spacer></v-spacer>

                        <v-btn color="green darken-1" text @click="tryAgainDialog = false">
                            Disagree
                        </v-btn>

                        <v-btn color="green darken-1" text @click="tryAgain">
                            Try again
                        </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog> 
                <!-- try again dialog ends -->

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
            correctCount: 0,
            progress: 0,
            optionSelect: true,
            cat: this.category,
            quizes: [],
            QuizArrayLength: Number,
            difficultyOptions: ['easy', 'medium', 'hard'],
            difficulty: "easy",
            number: 10,
            questionNumbers: [10, 15, 20, 25],
            questionTypeOptions: ['any','multiple', 'boolean'],
            questionType: 'multiple',
            num: 0,
            tryAgainDialog: false, 
            dialog: false,
            countDown : 20,
            dialogHeader: ''
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
            
        }
    },

    computed: {
        sessionToken () { // token that prevents the same question being requested twice
            return this.$store.getters.getToken
        },

        progressText () {
            if (this.progress < 20) {
                return ''
            } else if (this.progress >= 21 && this.progress < 40) { 
                return "You're doing great"
            } else if (this.progress >= 50 && this.progress < 55) {
                return 'Halfway there'
            } else if (this.progress > 65 && this.progress < 79) {
                return 'Getting there'
            }else if (this.progress >= 90 && this.progress < 100) {
                return 'Almost there'
            }
        },

        correctAnswer () { // filter array for correct answer
           return this.quizes[this.num].questions.find(e => e.correct === true); 
        },

        shuffleArray(a,b,c,d) {
            var a = this.quizes[this.num].questions
               let results =  c=a.length;while(c)b=Math.random()*c--|0,d=a[c],a[c]=a[b],a[b]=d
               return a
            
        }
    },

    watch: {
        quizes (value) {
            this.QuizArrayLength = value.length
        },

        countDown (value) {
            if(value == 0) {
                var timer = document.getElementById('timer')
                timer.pause()
                timer.currentTime = 0
                this.dialogHeader = "Time is up" 
                var timesUp = document.getElementById('timesUp')
                timesUp.volume = 0.3 // Set volume of sound
                timesUp.play()
                this.dialog = true
                this.countDown = 20
                this.countDownTimer() // restart the timer
                this.progress = (this.num + 1) / this.QuizArrayLength * 100
            }
        }
    },

    methods: {
        tryAgain () {
            this.tryAgainDialog = false
            this.getQuestions()
            this.num = 0
            this.countDown = 20
        },

        resetSounds () {
            var wrong = document.getElementById('wrong')
            var right = document.getElementById('right')
            var timer = document.getElementById('timer')
            if (this.num < this.QuizArrayLength - 1) {
                this.num += 1
                this.dialog = false
                this.countDown = 20
                timer.play()
                
                wrong.pause()
                wrong.currentTime = 0
                
                right.pause()
                right.currentTime = 0
            } else if (this.num == this.QuizArrayLength - 1) {
                this.dialog = false
                this.tryAgainDialog = true
                this.countDown = -1
            }
            
        },

        storeAnswer(answer) {
            this.progress = (this.num + 1) / this.QuizArrayLength * 100
            
            var timer = document.getElementById('timer')
            timer.pause()
            timer.currentTime = 0
            
            var wrong = document.getElementById('wrong')
            wrong.volume = 0.3 // Set volume of sound
            var right = document.getElementById('right')
            right.volume = 0.3 // Set volume of sound
            
            if (answer == false) {
                this.dialogHeader = "Oops! That is incorrect"
                wrong.play()
                this.dialog = true
                    

            } else if (answer == true && this.num !== this.QuizArrayLength - 1) {
                right.play()
                this.correctCount++
                this.num++
                this.countDown = 20 // Reset the timer
                timer.play()

            } else if (this.num == this.QuizArrayLength - 1 && answer == true) {
                this.correctCount++
                this.tryAgainDialog = true
                this.countDown = -1

            } else if (this.num == this.QuizArrayLength - 1 && answer == false) {
                this.tryAgainDialog = true
                this.countDown = -1
            }
            
        
        },

        countDownTimer() {
            if(this.countDown > 0) { 
                setTimeout(() => {
                    this.countDown -= 1
                    if (this.dialog == true) { // If a answer is pressed then stop the timer
                        this.countDown += 1 //doesnt really stop but appears that way in the dom
                    }
                    this.countDownTimer()
                }, 1000)
            } else if (this.countDown == -1) {
                return
            }
        },


        getQuestions () {
            this.$store.dispatch('setLoadState', true)
            this.quizes.length = 0 // reset the array when user click 'Try again'
            this.$http.get('https://opentdb.com/api.php?amount=' + this.number + '&token=' + this.sessionToken + '&category=' + this.cat + '&difficulty=' + this.difficulty + '&type=' + this.questionType + '')
            .then(response => {
                var i = 0
                var n = 0
                this.countDownTimer() // starts the timer
                var timer = document.getElementById('timer')
                timer.play()
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
                this.$store.dispatch('setLoadState', false)
            })
            this.optionSelect = false // hides the option bar
        }
    }

}
</script>