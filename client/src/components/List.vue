<template>
  <div class="list">
    <form @submit.prevent="addList">
      <input type="text" placeholder="title" v-model="newList.title" required>
      <input type="text" placeholder="description" v-model="newList.description">
      <button type="submit">Create List</button>
    </form>
    <div v-for="list in lists" :key="list._id" >
      <button @click="deleteList(list._id)">DELETE LIST</button>
    </div>
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
    data() {
      return {
        newList: {
          title: "",
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
      addList() {
        this.$store.dispatch("addList", this.newList);
        this.newList = { title: "", description: "" };
      },
      deleteList(listId) {
        this.$store.dispatch("deleteList", listId);
      }
    }
  };
  </script>

<style scoped>
</style>