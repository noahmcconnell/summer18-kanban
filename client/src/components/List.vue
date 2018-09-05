<template>
  <h1> HI List </h1>
</template>

<script>
export default {
  name: "listComponent",
  props: "list",
  methods: {
    getLists() {
      this.$store.dispatch("getLists");
    },
    addList() {
      this.$store.dispatch("addList");
    },
    deleteList(){
      this.$store.dispatch("deleteList")
    },
  }
};
</script>

<style scoped>
</style>
