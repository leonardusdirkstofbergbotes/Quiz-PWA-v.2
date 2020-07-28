<template>
    <div id="quizWrapper">
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
        <v-flex elevation-5  class="ma-1 mt-6 pa-3 rounded-lg" v-if="optionSelect">
        <v-row  justify-space-around align="center" justify="center"> 
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
                    <v-btn height="60px" dark block @click="getQuestions" color="orange" class="customBtn">START</v-btn>
            </v-col>
        </v-row> 
        </v-flex>
        <!-- Option bar ends -->

        <v-container v-if="noMoreResults" id="noResultImgHolder">
            <h2 class="display-2 text-center">No more results</h2>
            <h3 class="sub-heading text-center">We are getting more soon</h3>
            <img id="noResultImg" src="@/assets/images/noResult.jpg">
            <h2 class="display-2 text-center">Try choosing other options</h2>
            <v-btn text to="/">Or choose another topic</v-btn>
        </v-container>

        <v-container v-if="quizes.length !== 0"> <!-- wrapper for each question card -->
        <v-progress-linear height="20" rounded v-if="progress !== 0" :value="progress" class="my-5">{{progressText}}</v-progress-linear>
        
        <v-flex v-if="countDown !== 0" id="timerHolder" class="mt-10">
            <!-- Timer comes here -->
            <b :style="{color: timerColor}" class="display-4">{{countDown}}</b>
        </v-flex>

            <v-flex >
                <h1 class="text-center">{{quizes[num].num}}. {{quizes[num].name}}</h1> <!-- Question number and title -->

                <!-- contains the possible answers -->
                <v-layout row justify-space-between> 
                    <v-card width="40%" min-height="200" v-for="item in shuffleArray" :key="item.question" @click="storeAnswer(item.correct)" elevation-10 class="rounded-lg my-5">
                        <v-card-text class="text-center display-3">{{item.question}}</v-card-text>
                    </v-card>
                </v-layout>

                <!-- correct answer dialog -->
               <v-dialog v-model="dialog" persistent max-width="350"> 
                    <v-card>
                        <v-card-title class="headline text-center">{{dialogHeader}}</v-card-title>
                        <v-card-subtitle class="text-center">The correct answer is:</v-card-subtitle>
                        <v-card-text class="text-center display-3">{{correctAnswer.question}}</v-card-text>
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


                        
                        <v-flex xs12 v-if="this.user == false">
                            <v-layout column>
                                <b class="dislpay-3">Register to save your results</b>
                                <v-btn @click="registerToSave">Register</v-btn>
                            </v-layout>
                        </v-flex>

                        
                        
                        <v-card-actions>
                            <v-btn to="/" color="green darken-1" text @click="tryAgainDialog = false">
                                Home
                            </v-btn>

                            <v-spacer></v-spacer>

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
            noMoreResults: false,
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
            dialogHeader: '',
            badge: ''
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
        },

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

        profileCheck () {
            return this.$store.getters.getProfile
        },

        user() {
            return this.$store.getters.getUser
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
            
        },

        timerColor () {
            if (this.countDown >= 15) {
                return "green"
            } else if (this.countDown >= 10) {
                return "blue"
            } else if (this.countDown > 5) {
                return "yellow"
            } else {
                return "red"
            }
        }
    },

    methods: {
        registerToSave () { // when a user has completed a quiz and want to save his progress by registering
            const TempData = {
                correct: this.correctCount,
                totalQuestions: this.QuizArrayLength,
                numberOfGames: 1,
                lastGame: {
                    category: this.cat,
                    score: this.correctCount + ' out of ' + this.QuizArrayLength
                },
                badges: [this.badge]
            }
            this.$store.dispatch('storeTempData', TempData)
            this.$router.push('/register')
        },
        
        tryAgain () {
            this.tryAgainDialog = false
            this.getQuestions()
            this.num = 0
        },

        resetSounds () {  // when a user presses on next question this method runs
            var wrong = document.getElementById('wrong')
            var right = document.getElementById('right')
            var timer = document.getElementById('timer')
            if (this.num < this.QuizArrayLength - 1) { // if its not the last question
                this.dialog = false
                this.countDown = 20
                timer.play()
                wrong.pause()
                wrong.currentTime = 0
                right.pause()
                right.currentTime = 0
                setTimeout(() => {  this.num += 1; }, 200);
            } else if (this.num == this.QuizArrayLength - 1 && this.user !== false) { // if it is the last question and the user is signed in
                this.dialog = false // close the next question dialog and open the try again dialog
                this.tryAgainDialog = true
                this.countDown = -1

                if (this.profileCheck == undefined && this.user !== false) { // if it is the users first game
                console.log('users first game') 
                    const profileUpdateInfo = { // profile info to be send to firestore
                        name: this.user.name, 
                        surname: this.user.surname,
                        uid: this.user.uid,
                        correct: this.correctCount,
                        totalQuestions: this.QuizArrayLength,
                        numberOfGames: 1,
                        lastGame: {
                            category: this.cat,
                            score: this.correctCount + ' out of ' + this.QuizArrayLength
                        },
                        badges: [this.badge]
                    } 
                    this.$store.dispatch('sendProfileData', profileUpdateInfo)
                }

                else if (this.profileCheck !== undefined && this.user !== false) { // user already has a profile
                    const profileUpdateInfo = {
                        name: this.user.name, 
                        surname: this.user.surname,
                        uid: this.user.uid,
                        correct: this.profileCheck.correct + this.correctCount,
                        totalQuestions: this.profileCheck.totalQuestions + this.QuizArrayLength,
                        numberOfGames: this.profileCheck.numberOfGames + 1,
                        lastGame: {
                            category: this.cat,
                            score: this.correctCount + ' out of ' + this.QuizArrayLength
                        },
                        badges: this.profileCheck.badges
                    }
                    this.$store.dispatch('sendProfileData', profileUpdateInfo)
                } 
            
                
            } else if (this.num == this.QuizArrayLength - 1 && this.user == false) { // if its the last question and user is not yet signed in
                this.dialog = false
                this.tryAgainDialog = true
            }
            
        },

        storeAnswer(answer) {
            if (this.profileCheck !== undefined) {
                console.log('user already has a profile')
            } else if (this.profileCheck == undefined) {
                console.log("user has no profile yet")
            }
            this.progress = (this.num + 1) / this.QuizArrayLength * 100
            
            var timer = document.getElementById('timer')
            timer.pause()
            timer.currentTime = 0
            
            var wrong = document.getElementById('wrong')
            wrong.volume = 0.3 // Set volume of sound
            var right = document.getElementById('right')
            right.volume = 0.3 // Set volume of sound
            
            if (answer == false) { // if its not the last question and the answer is incorrect
                this.dialogHeader = "Oops! That is incorrect"
                wrong.play()
                this.dialog = true // show the right question in dialog
                    

            } else if (answer == true && this.num !== this.QuizArrayLength - 1) { // if its not the last question and the answer is right
                right.play()
                this.correctCount++
                this.num++
                this.countDown = 20 // Reset the timer
                timer.play()

                // quiz is done
            } else if (this.num == this.QuizArrayLength - 1 && answer == true) { // if is is the last question and the answer is right
                this.dialog = false
                this.correctCount++
                this.tryAgainDialog = true
                this.countDown = -1

                if (this.profileCheck == undefined && this.user !== false) { // if it is the users first game
                console.log('users first game')
                    const profileUpdateInfo = { // profile info to be send to firestore
                        name: this.user.name, 
                        surname: this.user.surname,
                        uid: this.user.uid,
                        correct: this.correctCount,
                        totalQuestions: this.QuizArrayLength,
                        numberOfGames: 1,
                        lastGame: {
                            category: this.cat,
                            score: this.correctCount + ' out of ' + this.QuizArrayLength,
                        },
                        badges: [this.badge]
                    } 
                    this.$store.dispatch('sendProfileData', profileUpdateInfo)
                } else if (this.profileCheck !== undefined && this.user !== false) { // user already has a profile
                    const profileUpdateInfo = {
                        name: this.user.name, 
                        surname: this.user.surname,
                        uid: this.user.uid,
                        correct: this.profileCheck.correct + this.correctCount,
                        totalQuestions: this.profileCheck.totalQuestions + this.QuizArrayLength,
                        numberOfGames: this.profileCheck.numberOfGames + 1,
                        lastGame: {
                            category: this.cat,
                            score: this.correctCount + ' out of ' + this.QuizArrayLength
                        },
                        badges: this.profileCheck.badges
                    }
                    this.$store.dispatch('sendProfileData', profileUpdateInfo)
                } else if (this.user == false) { // user is not yet signed in (still part of last question IF)
                    
                }

                //quiz is also done
            } else if (this.num == this.QuizArrayLength - 1 && answer == false) { // if its the last question and the answer is wrong
                this.dialog = true // Show the correct answer
                this.tryAgainDialog = true
                this.countDown = -1

                if (this.profileCheck == undefined && this.user !== false) { // if it is the users first game 
                console.log('users first game')
                    const profileUpdateInfo = { // profile info to be send to firestore
                        name: this.user.name, 
                        surname: this.user.surname,
                        uid: this.user.uid,
                        correct: this.correctCount,
                        totalQuestions: this.QuizArrayLength,
                        numberOfGames: 1,
                        lastGame: {
                            category: this.cat,
                            score: this.correctCount + ' out of ' + this.QuizArrayLength,
                        },
                        badges: [this.badge]
                    } 
                    this.$store.dispatch('sendProfileData', profileUpdateInfo)
                }

                else if (this.profileCheck !== undefined && this.user !== false) { // user already has a profile
                    const profileUpdateInfo = {
                        name: this.user.name, 
                        surname: this.user.surname,
                        uid: this.user.uid,
                        correct: this.profileCheck.correct + this.correctCount,
                        totalQuestions: this.profileCheck.totalQuestions + this.QuizArrayLength,
                        numberOfGames: this.profileCheck.numberOfGames + 1,
                        lastGame: {
                            category: this.cat,
                            score: this.correctCount + ' out of ' + this.QuizArrayLength
                        },
                        badges: this.profileCheck.badges
                    }
                    this.$store.dispatch('sendProfileData', profileUpdateInfo)
                } else if (this.user == false) { // user is not signed in and answer is wrong
                    this.dialog = true // show the correct answer
                }

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
                if (response.data.response_code == 4) {
                    this.$store.dispatch('setLoadState', false)
                    this.optionSelect = true
                    this.noMoreResults = true
                } else {
                    var i = 0
                    var n = 0
                    this.countDown = 20
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
                    this.optionSelect = false // hides the option bar
                }
                
            }) // then ENDS
            .catch(error => {
                console.log(error)
            })
            
            
        }
    }

}
</script>

<style scoped>

#timerHolder {
    width: 50%;
    margin: auto;
    text-align: center;
}

#dialogHeader {
    background-color: red;
}

.customBtn {
    font-size: 40px!important;
}

#noResultImgHolder {
    display: flex;
    width: auto;
    flex-direction: column;;
    align-content: center;
    padding: 20px;
    margin-bottom: 20px;
}

#noResultImg {
    margin: auto;
    height: 70vh;
    max-width: 800px;
}
</style>