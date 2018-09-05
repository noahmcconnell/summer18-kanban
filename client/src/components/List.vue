<template>
  <h1> HI List </h1>
</template>

<script>
export default {
  name: 'listComponent',
  props: ['list', 'inBoard'],
  methods: {
    addOrRemove(){
      if(this.inBoard){
        this.$store.dispatch('removeFromBoard', this.listId);
      }
    },

  }
}
</script>

<style scoped>
</style>
