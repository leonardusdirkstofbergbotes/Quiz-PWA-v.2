<template>
  <v-layout row justify-space-around>
      <v-card @click="selectCategory(card.category)" height="350" max-width="300" v-for="card in quizCards" :key="card.category" outlined class="hoverMe">
            <v-img height="300" :src="card.img"></v-img>
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
        {category: 'Sport', img: 'https://previews.123rf.com/images/macrovector/macrovector1503/macrovector150300795/37811640-sport-equipment-concept-with-competitive-games-accessories-and-sportswear-vector-illustration.jpg', free: true},
        {category: 'General Knowledge', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSXSKPd9ZyWIECQrdISGkY_ZxVYb6_-JTm1KA&usqp=CAU', free: true},
        {category: 'Animals', img: 'https://image.freepik.com/free-vector/funny-collection-hand-drawn-animals_23-2147602713.jpg', free: true},
        {category: 'Celebrities', img: 'https://thumbs.dreamstime.com/z/celebrities-couple-walking-red-carpet-vector-illustration-people-marriage-two-actor-wedding-70223496.jpg', free: true}
      ]
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
