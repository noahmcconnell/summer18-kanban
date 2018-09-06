<template>
  <div class="list">

    <button @click="deleteList(list._id)">DELETE LIST</button>
  </div>
</template>

<script>
  export default {
    name: "list",
    props: ["lists"],
    created() {
      if (!this.$store.state.user._id) {
        this.$router.push({ name: "login" });
      }
    },
    mounted() {
      this.$store.dispatch("getBoards");
    },
    
    computed: {
      list() {
        return this.$store.state.lists;
      }
    },
  };
  </script>

<style scoped>
</style>