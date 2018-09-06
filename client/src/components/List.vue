<template>
  <div class="list">
    <h6>{{list.name}}</h6>
    <button @click="deleteList(list._id)">DELETE LIST</button>
  </div>
</template>

<script>
  export default {
    name: "list",
    created() {
      if (!this.$store.state.user._id) {
        this.$router.push({ name: "login" });
      }
    },
    mounted() {
      this.$store.dispatch("getBoards");
    },
    data() {
    return {
      newList: {
        name: "",
        description: ""
      }
    };
  },
    computed: {
      list() {
        return this.$store.state.lists;
      }
    },
    methods: {
      deleteList(listId) {
        this.$store.dispatch("deleteList", listId);
      }
    }
  };
  </script>

<style scoped>
</style>