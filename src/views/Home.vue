<template>
  <v-layout row justify-space-around>
      <v-card @click="selectCategory(card.category)" max-height="350" max-width="300" v-for="card in quizCards" :disabled="card.free == false && user == false" :key="card.category" outlined class="hoverMe ma-4">
            <v-img contain max-height="300" :src="require(`@/assets/thumbs/${card.img}.webp`)"></v-img>
            <v-card-title class="justify-center">{{card.category}}</v-card-title>
      </v-card>
  </v-layout>
</template>

<script>

export default {
  name: 'Home',

  data () {
    return {

      quizCards: [
        {category: 'Sport', img: 'sports', free: true, title: 'ddd'},
        {category: 'General Knowledge', img: 'generalKnowledge', free: true},
        {category: 'Animals', img: 'animals', free: true},
        {category: 'Celebrities', img: 'celebrities', free: true},
        {category: 'Books', img: 'books', free: false, title: 'Please sign in'},
        {category: 'Movies', img: 'movies', free: false},
        {category: 'Vehicles', img: 'vehicles', free: false},
        {category: 'Historical', img: 'historical', free: false},
        {category: 'Maths', img: 'maths', free: false},
        {category: 'Music', img: 'music', free: false},
        {category: 'Myths', img: 'myths', free: false},
        {category: 'Video Games', img: 'videoGames', free: false},
        {category: 'Board Games', img: 'boardGames', free: false},
        {category: 'Theatre', img: 'theatre', free: false},
        {category: 'Science', img: 'science', free: false},
        {category: 'Politics', img: 'politics', free: false},
        {category: 'Geography', img: 'geography', free: false},
        {category: 'Computers', img: 'computers', free: false},
        {category: 'Comics', img: 'comics', free: false},
        {category: 'Art', img: 'art', free: false},
        {category: 'Anime', img: 'anime', free: false},
        {category: 'TV', img: 'tv', free: false},
        {category: 'Gadgets', img: 'gadgets', free: false},
        {category: 'Cartoons', img: 'cartoon', free: false},
      ]
    }
  },

  computed: {
    user () {
      return this.$store.getters.getUser
    }
  },

  methods: {
    selectCategory(category) {
      this.$router.push('/quiz/'+ category)
    }
  }
}
</script>

<style scoped>
.hoverMe {
  transition: 0.5s ease-in-out;
}

.hoverMe:hover {
  transform: scale(1.1);
}
</style>
