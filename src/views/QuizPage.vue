<template>
    <div>
        <v-select v-model="difficulty" :items="difficultyOptions" label="Difficulty" solo></v-select>
    </div>
</template>

<script>
export default {
    name: 'QuizPage',

    created() {
    this.$http.get('https://opentdb.com/api.php?amount=15&category=21&difficulty=easy&type=multiple')
      .then(response => {
        var i = 0
        var n = 0
       while (i < response.data.results.length) {
         let questionArray = []
        while (n < 3) {
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
         const question = {
           num: i, 
           questions: questionArray,
           name: response.data.results[i].question
         }
         this.quizes.push(question)
         i++
         n = 0
       }
        
      })
  },
  
    props: ['category'],

    data () {
        return {
            cat: this.category,
            quizes: [],
            QuizArrayLength: '',
            difficultyOptions: ['Easy', 'Medium', 'Hard'],
            difficulty: "easy"
        }
    },

    watch: {
        category (value) {
            this.cat = value
        },

        quizes (value) {
            this.QuizArrayLength = value.length
        },

        difficulty (value) {
            this.difficulty = value.toLowerCase()
        }
    },

}
</script>