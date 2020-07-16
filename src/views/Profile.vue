<template>
 <v-container>
    <v-flex v-for="item in profileInfo" :key="item">
        {{item}}
    </v-flex>

    {{profileInfo}}
 </v-container>
</template>

<script>
export default {
    name: 'Profile section',
    data () {
        return {

        }
    },

    computed: {
        profileInfo () {
            return this.$store.getters.getProfile
        }
    }
}
</script>