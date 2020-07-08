<template>
    <div>
        THis is the quiz Page
        <p>{{cat}}</p>
    </div>
</template>

<script>
export default {
    props: ['category'],
    data () {
        return {
            cat: this.category
        }
    }
}
</script>